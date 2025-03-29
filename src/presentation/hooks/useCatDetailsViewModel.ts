import {useState, useEffect} from 'react';
import {useInjection} from '../../di/useInjection';
import {CatModel} from '../../domain/entities/Cat';
import {ApiError} from '../../core/network/ApiError';
/**
 * Custom hook for managing the state of a single cat's details
 */
export function useCatDetailsViewModel(catId: string) {
  const [cat, setCat] = useState<CatModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  // Get the use case from the DI container
  const {getCatDetailsUseCase} = useInjection();

  // Function to load cat details
  const loadCatDetails = async () => {
    if (!catId) return;

    setLoading(true);
    setError(null);

    const result = await getCatDetailsUseCase.execute(catId);

    result.resolve(
      err => {
        setError(err);
        setLoading(false);
      },
      data => {
        setCat(data);
        setLoading(false);
      },
    );
  };

  // Load cat details when the component mounts or catId changes
  useEffect(() => {
    loadCatDetails();
  }, [catId]);

  // Provide a function to manually refresh the data
  const refetch = async () => {
    return loadCatDetails();
  };

  return {
    cat,
    loading,
    error,
    refetch,
  };
}
