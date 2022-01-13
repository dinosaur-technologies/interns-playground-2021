/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '^@enums/(.*)': '<rootDir>/src/enums/$1',
    '^@exceptions/(.*)': '<rootDir>/src/exceptions/$1',
    '^@interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '^@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '^@providers/(.*)': '<rootDir>/src/providers/$1',
    '^@repositories/(.*)': '<rootDir>/src/repositories/$1',
    '^@servers/(.*)': '<rootDir>/src/servers/$1',
    '^@services/(.*)': '<rootDir>/src/services/$1',
    '^@utils/(.*)': '<rootDir>/src/utils/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
