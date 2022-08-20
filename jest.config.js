module.exports = {
  // testEnvironment: 'node',
  testEnvironment: 'jsdom',
  // setupFiles: ['./tools/jest/test-setup'],
  setupFilesAfterEnv: ['./tools/jest/test-setup-after-env'],
  //setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/tools/__mocks__/styleMock.js',
  },
  // snapshotSerializers: ['enzyme-to-json/serializer'],
}
