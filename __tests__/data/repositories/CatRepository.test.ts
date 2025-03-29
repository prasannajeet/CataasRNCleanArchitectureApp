import {CatRepository} from '../../../src/data/repositories/CatRepository';
import {CataasNetwork} from '../../../src/core/network/CataasNetwork';
import {ApiError} from '../../../src/core/network/ApiError';
import {CatModel} from '../../../src/domain/entities/Cat';

// Mock logger
jest.mock('../../../src/core/logger/setupLogger', () => ({
  jobberLogger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
  },
}));

// Mock the network module
jest.mock('../../../src/core/network/CataasNetwork', () => ({
  CataasNetwork: {
    getInstance: jest.fn().mockReturnValue({
      get: jest.fn(),
    }),
  },
}));

describe('CatRepository', () => {
  let repository: CatRepository;
  let network: CataasNetwork;

  beforeEach(() => {
    network = CataasNetwork.getInstance('https://api.example.com');
    repository = new CatRepository();
    jest.clearAllMocks();
  });

  describe('fetchAllCatsPaginated', () => {
    const mockCats = [
      {
        id: '1',
        tags: ['tag1', 'tag2'],
        createdAt: '2024-03-24T12:00:00Z',
      },
      {
        id: '2',
        tags: ['tag3'],
        createdAt: '2024-03-25T12:00:00Z',
      },
    ];

    it('should fetch cats successfully', async () => {
      // Arrange
      const limit = 10;
      const mockResponse = {
        resolve: jest
          .fn()
          .mockImplementation((_, onSuccess) => onSuccess(mockCats)),
      };
      (network.get as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await repository.fetchAllCatsPaginated(limit);

      // Assert
      expect(network.get).toHaveBeenCalledWith('/api/cats?limit=10');
      expect(result.isSuccess()).toBe(true);
      const cats = result.getValue();
      expect(cats).toBeInstanceOf(Array);
      expect(cats).toHaveLength(2);
      expect(cats[0]).toBeInstanceOf(CatModel);
      expect(cats[0].id).toBe('1');
      expect(cats[1].id).toBe('2');
    });

    it('should handle network errors', async () => {
      // Arrange
      const limit = 10;
      const mockError = new ApiError('Network error', 500);
      const mockResponse = {
        resolve: jest.fn().mockImplementation(onError => onError(mockError)),
      };
      (network.get as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await repository.fetchAllCatsPaginated(limit);

      // Assert
      expect(result.isSuccess()).toBe(false);
      const error = result.getError();
      expect(error).toBeInstanceOf(ApiError);
      expect(error.message).toBe('Network error');
    });

    it('should handle empty response', async () => {
      // Arrange
      const limit = 10;
      const mockResponse = {
        resolve: jest
          .fn()
          .mockImplementation((onError, onSuccess) => onSuccess([])),
      };
      (network.get as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await repository.fetchAllCatsPaginated(limit);

      // Assert
      expect(result.isSuccess()).toBe(true);
      const cats = result.getValue();
      expect(cats).toBeInstanceOf(Array);
      expect(cats).toHaveLength(0);
    });
  });

  describe('getCatById', () => {
    const mockCat = {
      id: '1',
      tags: ['tag1', 'tag2'],
      created_at: '2024-03-24T12:00:00Z',
    };

    it('should fetch a single cat successfully', async () => {
      // Arrange
      const catId = '1';
      const mockResponse = {
        resolve: jest
          .fn()
          .mockImplementation((_, onSuccess) => onSuccess(mockCat)),
      };
      (network.get as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getCatById(catId);

      // Assert
      expect(network.get).toHaveBeenCalledWith('/cat/1');
      expect(result.isSuccess()).toBe(true);
      const cat = result.getValue();
      expect(cat).toBeInstanceOf(CatModel);
      expect(cat.id).toBe('1');
      expect(cat.tags).toEqual(['tag1', 'tag2']);
    });

    it('should handle network errors', async () => {
      // Arrange
      const catId = '1';
      const mockError = new ApiError('Cat not found', 404);
      const mockResponse = {
        resolve: jest.fn().mockImplementation(onError => onError(mockError)),
      };
      (network.get as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getCatById(catId);

      // Assert
      expect(result.isSuccess()).toBe(false);
      const error = result.getError();
      expect(error).toBeInstanceOf(ApiError);
      expect(error.message).toBe('Cat not found');
    });

    it('should handle missing cat data', async () => {
      // Arrange
      const catId = '1';
      const mockResponse = {
        resolve: jest.fn().mockImplementation((_, onSuccess) => onSuccess({})),
      };
      (network.get as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getCatById(catId);

      // Assert
      expect(result.isSuccess()).toBe(true);
      const cat = result.getValue();
      expect(cat).toBeInstanceOf(CatModel);
      expect(cat.id).toBeUndefined();
      expect(cat.tags).toEqual([]);
      expect(cat.createdAt).toBe('');
    });
  });
});
