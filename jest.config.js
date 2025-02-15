module.exports = {
  testEnvironment: 'jsdom',  // Use jsdom as the test environment
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Set up jest-dom for better assertions
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest to transform JS/JSX/TS/TSX files
  },
  moduleDirectories: ['node_modules', 'src'],  // Add 'src' to module directories for resolving imports
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Maps 'src' to the root directory for imports
  },
  setupFiles: ['<rootDir>/jest.setup.js'],  // Specify the setup file
};
