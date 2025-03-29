# Cat Image Browser App

A React Native application for browsing cat images from the [CATAAS API](https://cataas.com/) (Cat as a Service). This project demonstrates clean architecture principles, comprehensive testing, and modern React Native development practices.

## Overview

This application provides a seamless experience for browsing and viewing cat images, featuring:
- A responsive list view of cat images with thumbnails
- Detailed view for individual cats
- Elegant error handling and loading states
- Type-safe data management
- Comprehensive test coverage
- Conventional commit enforcement

## Architecture

The application follows Clean Architecture principles with a clear separation of concerns:

```
src/
├── core/         # Core utilities and services
│   ├── network/  # Network layer (CataasNetwork, AxiosNetworkClient)
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
----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   57.85 |    44.44 |   55.76 |   58.82 |                   
 core/config                |      80 |      100 |       0 |      80 | 11                
 core/network               |   11.42 |        0 |   10.52 |   11.76 |                   
 core/utils                 |     100 |      100 |     100 |     100 |                   
 data/repositories          |     100 |      100 |     100 |     100 |                   
 domain/entities            |      20 |    55.55 |   16.66 |      20 | 31-78             
 presentation/hooks         |    92.5 |       50 |     100 |   94.87 |                   
----------------------------|---------|----------|---------|---------|-------------------
```

### Test Statistics
- Test Suites: 4 passed, 4 total
- Tests: 23 passed, 23 total

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

# Run on iOS simulator
yarn ios:sim

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
const response = await cataasNetwork.get<Cat[]>('/api/cats');
```

### Repository Layer

The repository layer abstracts data access logic:

```typescript
export class CatRepository implements CatRepositoryInterface {
  async fetchAllCatsPaginated(limit: number): Promise<Either<ApiError, CatModel[]>> {
    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit.toString());

    const response = await cataasNetwork.get<Cat[]>(`/api/cats?${queryParams.toString()}`);

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
export function useCatsListViewModel(limit: number) {
  const [cats, setCats] = useState<CatModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const { getCatsUseCase } = useInjection();

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

  return { cats, loading, error, refetch: loadCats };
}
```

## Development Practices

### Conventional Commits

This project enforces the [Conventional Commits](https://www.conventionalcommits.org/) format for all commit messages using commitlint and husky. Each commit message must start with one of the following types:

- `feat:` - New features
- `fix:` - Bug fixes 
- `docs:` - Documentation changes
- `style:` - Formatting changes
- `refactor:` - Code changes that neither fix bugs nor add features
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `build:` - Changes to build system or dependencies
- `ci:` - Changes to CI configuration
- `chore:` - Other changes that don't modify src or test files
- `revert:` - Reverts a previous commit

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 CataasApp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
