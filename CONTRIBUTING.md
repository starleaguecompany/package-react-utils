# Contributing

The following is a set of guidelines for contributing to Design System. Please spend several minutes reading these guidelines before you create an issue or pull request.

## Branch Organization

According to our release schedule, we maintain two branches, `main` and `feature`. If you send a bugfix pull request, please do it against the `main` branch, if it's a feature pull request, please do it against the `feature` branch.

## Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

**Before submitting a pull request**, please make sure the following is done:

1. Fork the repository and create your branch from the correct branch.
2. Run `yarn install` in the repository root.
3. If you've fixed a bug or added code that should be tested, add tests!
4. Ensure the test suite passes (`yarn test`).
5. Run `yarn test -- -u` to update the jest snapshots and commit these changes as well (if there are any updates).
6. Make sure your code lints (`yarn lint`). Tip: Lint runs automatically when you `git commit` (Use Git Hooks).

Sending a Pull Request

## Development Workflow

After cloning design-system, run `yarn install` to fetch its dependencies. Then, you can run several commands:

1. `yarn dev` runs Design System storybook locally.
2. `yarn lint` checks the code style.
3. `yarn test` runs the complete test suite.
4. `yarn build` compiles TypeScript code to the dist directory.
