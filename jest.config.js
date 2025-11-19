/** @type {import('jest').Config} */
module.exports = {
  // Use ts-jest to handle TypeScript files
  preset: 'ts-jest',
  
  // Run tests in Node.js environment (not browser)
  testEnvironment: 'node',
  
  // Look for test files in the tests directory
  roots: ['<rootDir>/tests'],
  
  // File extensions Jest should process
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Pattern for test files
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  
  // Coverage settings
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts'
  ],
  
  // Coverage thresholds (we'll set these low initially)
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  
  // Display verbose output
  verbose: true
};
