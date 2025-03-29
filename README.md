# Cat Image Browser App

A React Native application for browsing cat images from the [CATAAS API](https://cataas.com/) (Cat as a Service). This project demonstrates clean architecture principles, comprehensive testing, and modern React Native development practices.

## Overview

This application provides a seamless experience for browsing and viewing cat images, featuring:
- A responsive list view of cat images with thumbnails
- Detailed view for individual cats
- Elegant error handling and loading states
- Type-safe data management
- Comprehensive test coverage

## Architecture

The application follows Clean Architecture principles with a clear separation of concerns:

```
src/
├── core/         # Core utilities and services
│   ├── network/  # Network layer (JobberNetwork, AxiosNetworkClient)
│   ├── logger/   # Logging functionality
│   ├── config/   # Application configuration
│   └── utils/    # Utility classes (Either pattern)
├── data/         # Data access layer with repositories
│   └── repositories/ # Repositories for data sources
├── domain/       # Business logic and entities
│   ├── entities/ # Domain models (CatModel)
│   └── usecases/ # Business logic use cases
├── presentation/ # UI components and state management
│   ├── components/  # UI components organized by feature
│   ├── screens/     # Screen components (CatsListScreen, CatDetailScreen)
│   ├── navigation/  # Navigation configuration (AppNavigator)
│   ├── hooks/       # Custom hooks and view models
│   └── styles/      # Shared styles and theme
└── di/           # Dependency injection (useInjection)
```

### Key Design Patterns

- **Repository Pattern**: Abstracts data access behind interfaces
- **Either Pattern**: Type-safe error handling through `Either<E, A>`
- **Dependency Injection**: Manages dependencies via `useInjection`
- **ViewModel Pattern**: Custom hooks for UI state management
- **Navigation**: Stack-based navigation with React Navigation

## Test Coverage

The application maintains comprehensive test coverage across different layers:

```
----------------------------|---------|----------|---------|---------|----------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered
----------------------------|---------|----------|---------|---------|----------
All files                   |   79.74 |    57.14 |   77.77 |   80.76 |
core/network               |       0 |        0 |      20 |       0 |
core/utils                 |     100 |      100 |     100 |     100 |
data/repositories          |     100 |      100 |     100 |     100 |
domain/entities            |   26.66 |    71.42 |      20 |   26.66 |
presentation/hooks         |   97.43 |       50 |     100 |     100 |
----------------------------|---------|----------|---------|---------|----------
```

### Test Statistics
- Test Suites: 4 passed, 4 total
- Tests: 23 passed, 23 total
- Coverage: 79.74% statement coverage

## Getting Started

### Prerequisites

- Yarn
- Standard React Native development environment

### Installation

```bash
# Install dependencies
yarn
```

### Running the App

```bash
# Start Metro bundler
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

### Running Tests

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test --coverage
```

## Implementation Details

### Network Layer

The network layer implements a facade pattern with type-safe error handling:

```typescript
// Example network request
const response = await jobberNetwork.get<Cat[]>('/api/cats');
```

### Repository Layer

The repository layer abstracts data access logic:

```typescript
export class CatRepository implements CatRepositoryInterface {
  async fetchAllCatsPaginated(limit: number): Promise<Either<ApiError, CatModel[]>> {
    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit.toString());

    const response = await jobberNetwork.get<Cat[]>(`/api/cats?${queryParams.toString()}`);

    return response.resolve(
      error => Either.failure<ApiError, CatModel[]>(error),
      cats => Either.success<ApiError, CatModel[]>(cats.map(cat => new CatModel(cat))),
    );
  }
}
```

### ViewModel Pattern with Hooks

View models manage UI state and business logic:

```typescript
export function useCatsListViewModel(params: { limit: number }) {
  const [cats, setCats] = useState<CatModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const { getCatsUseCase } = useInjection();

  const loadCats = async () => {
    setLoading(true);
    const result = await getCatsUseCase.execute(params);
    
    result.resolve(
      err => {
        setError(err);
        setLoading(false);
      },
      data => {
        setCats(data);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    jobberLogger.info(`Loading cats with limit: ${params.limit}`);
    loadCats();
  }, [params.limit]);

  return { cats, loading, error, refetch: loadCats };
}
```
