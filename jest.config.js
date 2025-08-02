module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@src/(.*)": ["<rootDir>/src/$1"],
  },
  modulePathIgnorePatterns: [
    "<rootDir>/build"
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/build'],
  testTimeout: 60000,
  transform: {
    "^.+\\.(ts|tsx)$": ['ts-jest', {
      isolatedModules: true,
    }]
  },
};
