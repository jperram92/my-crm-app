module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Resolves 'src/' as the root
  },
  moduleDirectories: ['node_modules', 'src'],  // Add 'src' for module resolution
}

// jest.config.js
module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'], // Path to your setup file
};

module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Maps 'src' to your root directory
  },
};