import {ApiError} from '../../core/network/ApiError';
import {Either} from '../../core/utils/Either';
import {CatModel} from '../entities/Cat';
import {CatRepositoryInterface} from '../../data/repositories/CatRepository';

/**
 * Error indicating a cat wasn't found
 */
export class CatNotFoundError extends ApiError {
  constructor(id: string) {
    super(`Cat with ID ${id} was not found`, 404, undefined, 'CAT_NOT_FOUND');
  }
}

/**
 * Use case for fetching a single cat's details
 */
export class GetCatDetailsUseCase {
  constructor(private catRepository: CatRepositoryInterface) {}

  /**
   * Execute the use case to get a cat's details
   * @param id The cat ID to fetch
   */
  async execute(id: string): Promise<Either<ApiError, CatModel>> {
    // Fetch cat from repository
    const result = await this.catRepository.getCatById(id);

    // Apply business logic transformation using Either pattern
    return result.resolve(
      // Handle specific error cases
      error => {
        // Convert 404 errors to a more specific error
        if (error.status === 404) {
          return Either.failure<ApiError, CatModel>(new CatNotFoundError(id));
        }
        // Pass through other errors
        return Either.failure<ApiError, CatModel>(error);
      },

      // Process the cat data if found
      cat => {
        // Here we could add additional business logic
        // like fetching related data or transforming the response
        return Either.success<ApiError, CatModel>(cat);
      },
    );
  }
}
