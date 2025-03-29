import {ApiError} from '../../core/network/ApiError';
import {Either} from '../../core/utils/Either';
import {CatModel} from '../entities/Cat';
import {CatRepositoryInterface} from '../../data/repositories/CatRepository';

/**
 * Use case for fetching cats with optional filtering
 */
export class GetCatsUseCase {
  constructor(private catRepository: CatRepositoryInterface) {}

  /**
   * Execute the use case to get cats
   * @param params Parameters for fetching cats
   */
  async execute(limit: number): Promise<Either<ApiError, CatModel[]>> {
    const result = await this.catRepository.fetchAllCatsPaginated(limit);

    return result.resolve(
      error => Either.failure<ApiError, CatModel[]>(error),

      cats => {
        let allCats = [...cats];
        allCats.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        return Either.success<ApiError, CatModel[]>(allCats);
      },
    );
  }
}
