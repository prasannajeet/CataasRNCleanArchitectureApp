import {useState, useEffect} from 'react';
import {useInjection} from '../../di/useInjection';
import {CatModel} from '../../domain/entities/Cat';
import {ApiError} from '../../core/network/ApiError';

/**
 * ViewModel for the CatsListScreen, implemented using React Hooks
 */
export function useCatsListViewModel(limit: number) {
  const [cats, setCats] = useState<CatModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  // Get dependencies
  const {getCatsUseCase} = useInjection();

  // Load data function
  const loadCats = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getCatsUseCase.execute(limit);

      setLoading(false);
      result.resolve(
        err => {
          setError(err);
        },
        data => {
          setCats(data);
        },
      );
    } catch (error) {
      setError(error as ApiError);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCats();
  }, [limit]);

  const refetch = async () => {
    return loadCats();
  };

  return {
    cats,
    loading,
    error,
    refetch,
  };
}
