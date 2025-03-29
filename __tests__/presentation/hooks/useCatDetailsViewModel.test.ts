import {renderHook, act} from '@testing-library/react-hooks';
import {useCatDetailsViewModel} from '../../../src/presentation/hooks/useCatDetailsViewModel';
import {CatModel, Cat} from '../../../src/domain/entities/Cat';
import {ApiError} from '../../../src/core/network/ApiError';
import {Either} from '../../../src/core/utils/Either';

// Mock dependencies
const mockedCatDetailsUseCase = {
  execute: jest.fn(),
};

// Mock the useInjection hook
jest.mock('../../../src/di/useInjection', () => ({
  useInjection: () => ({
    getCatDetailsUseCase: mockedCatDetailsUseCase,
  }),
}));

// Mock the cataasLogger directly
jest.mock('../../../src/core/logger/setupLogger', () => ({
  cataasLogger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

describe('useCatDetailsViewModel Test suite', () => {
  // Mock data
  const mockCat: Cat = {
    id: 'special-cat-id',
    createdAt: '2023-01-01',
    tags: ['tag1', 'tag2'],
    url: 'https://cataas.com/cat/special-cat-id',
  };
  const mockCatDetails = new CatModel(mockCat);

  const mockError = new ApiError('Failed to fetch cat details', 500);

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with the provided cat data and loading state', () => {
    mockedCatDetailsUseCase.execute.mockReturnValue(new Promise(() => {}));
    const {result} = renderHook(() => useCatDetailsViewModel('special-cat-id'));

    expect(result.current.loading).toBe(true);
    expect(result.current.cat).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('fetches cat details on initial render', async () => {
    const successEither = Either.success<ApiError, CatModel>(mockCatDetails);
    mockedCatDetailsUseCase.execute.mockResolvedValue(successEither);

    const {result} = renderHook(() => useCatDetailsViewModel('special-cat-id'));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.cat).toEqual(mockCatDetails);
    expect(result.current.error).toBeNull();
  });

  it('handles error when fetching cat details fails', async () => {
    const failureEither = Either.failure<ApiError, CatModel>(mockError);
    mockedCatDetailsUseCase.execute.mockResolvedValue(failureEither);

    const {result} = renderHook(() => useCatDetailsViewModel('special-cat-id'));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.cat).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });

  it('refetches cat details when refetch is called', async () => {
    const initialEither = Either.success<ApiError, CatModel>(mockCatDetails);
    mockedCatDetailsUseCase.execute.mockResolvedValue(initialEither);

    const {result} = renderHook(() => useCatDetailsViewModel('special-cat-id'));

    await act(async () => {
      jest.runAllTimers();
    });

    mockedCatDetailsUseCase.execute.mockReset();

    const updatedCat: Cat = {
      ...mockCat,
      tags: ['new-tag'],
    };
    const updatedDetailedCat = new CatModel(updatedCat);
    const refetchEither = Either.success<ApiError, CatModel>(
      updatedDetailedCat,
    );
    mockedCatDetailsUseCase.execute.mockResolvedValue(refetchEither);

    await act(async () => {
      result.current.refetch();
      jest.runAllTimers();
    });

    expect(mockedCatDetailsUseCase.execute).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.cat).toEqual(updatedDetailedCat);
  });
});
