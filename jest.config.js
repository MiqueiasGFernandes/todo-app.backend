module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/data/use-cases/**/*.ts',
    '<rootDir>/src/infra/http/express/decorators/**/*.(util|decorator).ts',
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFiles: [
    '<rootDir>/src/tests/setup/LoadReflection.setup.ts',
  ],
  moduleNameMapper: {
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@data/(.*)': '<rootDir>/src/data/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@tests/(.*)': '<rootDir>/src/tests/$1',
    '@presentation/(.*)': '<rootDir>/src/presentation/$1',
  },
};
