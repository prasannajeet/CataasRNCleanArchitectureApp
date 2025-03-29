import {CatRepository} from '../data/repositories/CatRepository';
import {GetCatsUseCase} from '../domain/usecases/GetCatsUseCase';
import {GetCatDetailsUseCase} from '../domain/usecases/GetCatDetailsUseCase';

// Repositories
const catRepository = new CatRepository();

// Use cases
const getCatsUseCase = new GetCatsUseCase(catRepository);
const getCatDetailsUseCase = new GetCatDetailsUseCase(catRepository);

/**
 * Custom hook that provides access to all dependencies
 * This is the only way to access dependencies in the application
 */
export function useInjection() {
  return {
    // Use cases
    getCatsUseCase,
    getCatDetailsUseCase,

    // Repositories
    catRepository,
  };
}
