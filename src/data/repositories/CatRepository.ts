import {cataasNetwork} from '../../core/network';
import {cataasLogger} from '../../core/logger';
import {ApiError} from '../../core/network/ApiError';
import {Either} from '../../core/utils/Either';
import {Cat, CatModel} from '../../domain/entities/Cat';

/**
 * Repository interface for interacting with cat data
 */
export interface CatRepositoryInterface {
  /**
   * Get a list of cats
   * @param limit Number of cats to fetch
   * @param tag Optional tag to filter by
   */
  fetchAllCatsPaginated(limit: number): Promise<Either<ApiError, CatModel[]>>;

  /**
   * Get a single cat by ID
   * @param id The cat ID
   */
  getCatById(id: string): Promise<Either<ApiError, CatModel>>;
}

/**
 * Repository for Cat data
 * This class demonstrates how to use the CataasNetwork in a repository
 */
export class CatRepository implements CatRepositoryInterface {
  /**
   * Get a list of cats
   * @param limit Number of cats to fetch
   */
  async fetchAllCatsPaginated(
    limit: number,
  ): Promise<Either<ApiError, CatModel[]>> {
    // Build the query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit.toString());

    // Make the API request
    const response = await cataasNetwork.get<Cat[]>(
      `/api/cats?${queryParams.toString()}`,
    );

    return response.resolve(
      error => Either.failure<ApiError, CatModel[]>(error),
      cats =>
        Either.success<ApiError, CatModel[]>(
          cats.map(cat => new CatModel(cat)),
        ),
    );
  }

  /**
   * Get a single cat by ID
   * @param id The cat ID
   */
  async getCatById(id: string): Promise<Either<ApiError, CatModel>> {
    const response = await cataasNetwork.get<Cat>(`/cat/${id}`);

    return response.resolve(
      error => Either.failure<ApiError, CatModel>(error),
      cat => Either.success<ApiError, CatModel>(new CatModel(cat)),
    );
  }
}
