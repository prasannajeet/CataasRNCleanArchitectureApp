# Contributing to CataasSampleApp

Thank you for your interest in contributing to CataasSampleApp! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Exercise empathy and kindness
- Provide constructive feedback
- Focus on what is best for the community
- Show courtesy and respect in all interactions

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) >=18
- You have installed [Yarn](https://yarnpkg.com/) (npm is not supported)
- You are familiar with React Native development

### Setting Up for Development

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/CataasSampleApp.git
   cd CataasSampleApp
   ```
3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/CataasSampleApp.git
   ```
4. Install dependencies:
   ```bash
   yarn install
   ```

## Development Workflow

### Branching Strategy

We use a simplified Git workflow:

- `main` branch contains the latest stable code
- Feature branches should be created from `main`
- Use descriptive names for feature branches, prefixed with the type (e.g., `feat/add-search`, `fix/loading-state`)

### Commit Messages

This project uses the [Conventional Commits](https://www.conventionalcommits.org/) format and enforces it with commit hooks. Each commit message must start with one of these types:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Formatting changes
- `refactor:` - Code changes that neither fix bugs nor add features
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `build:` - Changes to build system or dependencies
- `ci:` - Changes to CI configuration
- `chore:` - Other changes
- `revert:` - Reverts a previous commit

Examples:
```
feat: add cat image search functionality
fix: resolve infinite API call issue in cat list screen
docs: update README with new API documentation
```

### Code Style and Linting

We use ESLint and Prettier to maintain code quality. Run the linter before submitting a PR:

```bash
yarn lint
```

### Testing

Make sure all tests pass before submitting a PR:

```bash
yarn test
```

When adding new features, please also add appropriate tests. We aim to maintain or increase test coverage with each contribution.

## Pull Request Process

1. **Update your fork**: Always fetch and merge changes from upstream before creating a PR:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes**: Implement your feature or fix, following the project's code style

4. **Run tests**: Ensure all tests pass with your changes:
   ```bash
   yarn test
   ```

5. **Commit your changes**: Use the conventional commit format:
   ```bash
   git commit -m "feat: add new feature"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feat/your-feature-name
   ```

7. **Submit a Pull Request**: Include a clear description of the changes and any relevant issue numbers

8. **Code Review**: Address any comments/feedback from the maintainers

### PR Title Guidelines

PR titles should follow the same conventional commit format:

```
feat: add image caching for better performance
```

### PR Description Template

Please use this template for PR descriptions:

```markdown
## Description
Brief description of the changes

## Type of change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Please describe the tests that you ran to verify your changes.

## Screenshots (if appropriate):

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

## Reporting Issues

### Bug Reports

When reporting bugs, please use the following template:

```markdown
## Bug Description
A clear and concise description of what the bug is.

## Steps To Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear and concise description of what you expected to happen.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
 - Device: [e.g. iPhone 15, Pixel 6]
 - OS: [e.g. iOS 17.2, Android 12]
 - React Native Version: [e.g. 0.78.1]

## Additional Context
Add any other context about the problem here.
```

### Feature Requests

For feature requests, please use the following template:

```markdown
## Feature Description
A clear and concise description of the feature you'd like to see.

## Problem It Solves
Describe the problem or limitation this feature would address.

## Proposed Solution
Describe how you envision this feature working.

## Alternatives Considered
Any alternative solutions or features you've considered.

## Additional Context
Add any other context, screenshots, or examples about the feature request here.
```

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Clean Architecture References](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

Thank you for contributing to CataasSampleApp! 