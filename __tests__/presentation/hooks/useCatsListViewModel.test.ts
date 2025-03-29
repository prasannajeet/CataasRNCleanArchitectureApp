import {renderHook, act} from '@testing-library/react-hooks';
import {useCatsListViewModel} from '../../../src/presentation/hooks/useCatsListViewModel';
import {CatModel, Cat} from '../../../src/domain/entities/Cat';
import {ApiError} from '../../../src/core/network/ApiError';
import {Either} from '../../../src/core/utils/Either';

// Mock the cataasLogger directly
jest.mock('../../../src/core/logger/setupLogger', () => ({
  cataasLogger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock dependencies
const mockedCatsUseCase = {
  execute: jest.fn(),
};

// Mock the useInjection hook
jest.mock('../../../src/di/useInjection', () => ({
  useInjection: () => ({
    getCatsUseCase: mockedCatsUseCase,
  }),
}));

describe('useCatsListViewModel', () => {
  // Sample cats data
  const mockCats: Cat[] = [
    {
      id: 'cat1',
      createdAt: '2023-01-01T12:00:00.000Z',
      tags: ['cute'],
      url: 'https://cataas.com/cat/cat1',
    },
    {
      id: 'cat2',
      createdAt: '2023-01-02T12:00:00.000Z',
      tags: ['kitten'],
      url: 'https://cataas.com/cat/cat2',
    },
  ];
  const mockCatModels = mockCats.map(cat => new CatModel(cat));

  // Sample error
  const mockError = new ApiError('Failed to fetch cats', 500);

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers({doNotFake: ['setTimeout']});
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with loading state and empty cats array', () => {
    // Mock a successful response that won't resolve during this test
    mockedCatsUseCase.execute.mockReturnValue(new Promise(() => {}));

    const {result} = renderHook(() => useCatsListViewModel(10));

    // Initial state should be loading with empty cats array
    expect(result.current.loading).toBe(true);
    expect(result.current.cats).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('fetches cats on initial render', async () => {
    // Mock the usecase to return a successful result
    const successEither = Either.success<ApiError, CatModel[]>(mockCatModels);
    mockedCatsUseCase.execute.mockResolvedValue(successEither);

    const {result} = renderHook(() => useCatsListViewModel(10));

    // Initial state should show loading
    expect(result.current.loading).toBe(true);

    // Advance timers and wait for promises to resolve
    await act(async () => {
      jest.advanceTimersByTime(0);
      await Promise.resolve();
    });

    // Should update state with fetched cats
    expect(result.current.loading).toBe(false);
    expect(result.current.cats).toEqual(mockCatModels);
    expect(result.current.error).toBeNull();

    // Verify that execute was called with the correct params
    expect(mockedCatsUseCase.execute).toHaveBeenCalledWith(10);
  }, 10000);

  it('handles error when fetching cats fails', async () => {
    // Mock the usecase to return a failure result
    const failureEither = Either.failure<ApiError, CatModel[]>(mockError);
    mockedCatsUseCase.execute.mockResolvedValue(failureEither);

    const {result} = renderHook(() => useCatsListViewModel(10));

    // Initial state should show loading
    expect(result.current.loading).toBe(true);

    // Advance timers and wait for promises to resolve
    await act(async () => {
      jest.advanceTimersByTime(0);
      await Promise.resolve();
    });

    // Should update state with error
    expect(result.current.loading).toBe(false);
    expect(result.current.cats).toEqual([]);
    expect(result.current.error).toEqual(mockError);
  }, 10000);

  it('refetches cats when refetch is called', async () => {
    // Mock the usecase to return a successful result initially
    const initialEither = Either.success<ApiError, CatModel[]>(mockCatModels);
    mockedCatsUseCase.execute.mockResolvedValue(initialEither);

    const {result} = renderHook(() => useCatsListViewModel(10));

    // Advance timers and wait for promises to resolve for initial load
    await act(async () => {
      jest.advanceTimersByTime(0);
      await Promise.resolve();
    });

    // Reset mock and prepare for refetch
    mockedCatsUseCase.execute.mockReset();

    // Create updated cats for refetch
    const updatedCat: Cat = {
      ...mockCats[0],
      tags: ['fluffy'],
    };
    const updatedCatModel = new CatModel(updatedCat);
    const refetchedCats = [updatedCatModel, ...mockCatModels.slice(1)];
    const refetchEither = Either.success<ApiError, CatModel[]>(refetchedCats);
    mockedCatsUseCase.execute.mockResolvedValue(refetchEither);

    // Call refetch and wait for promises to resolve
    await act(async () => {
      result.current.refetch();
      jest.advanceTimersByTime(0);
      await Promise.resolve();
    });

    // Verify that execute was called again and state was updated
    expect(mockedCatsUseCase.execute).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.cats).toEqual(refetchedCats);
  }, 10000);

  it('fetches cats with updated limit when limit changes', async () => {
    // Mock the usecase to return a successful result initially
    const initialEither = Either.success<ApiError, CatModel[]>(mockCatModels);
    mockedCatsUseCase.execute.mockResolvedValue(initialEither);

    const {rerender} = renderHook(props => useCatsListViewModel(props), {
      initialProps: 10,
    });

    // Advance timers and wait for promises to resolve for initial load
    await act(async () => {
      jest.advanceTimersByTime(0);
      await Promise.resolve();
    });

    // Reset mock for the next call with different limit
    mockedCatsUseCase.execute.mockReset();

    // Create a new success result for the updated limit
    const updatedEither = Either.success<ApiError, CatModel[]>(mockCatModels);
    mockedCatsUseCase.execute.mockResolvedValue(updatedEither);

    // Update the limit prop and wait for promises to resolve
    await act(async () => {
      rerender(20);
      jest.advanceTimersByTime(0);
      await Promise.resolve();
    });

    // Verify that execute was called with the new limit
    expect(mockedCatsUseCase.execute).toHaveBeenCalledWith(20);
  }, 10000);
});
