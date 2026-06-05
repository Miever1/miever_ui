module.exports = {
  bail: 1,
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  // Stub style imports (e.g. rc-tooltip's bundled CSS) so jest can parse
  // component modules that import .css/.scss directly.
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "<rootDir>/jest.styleMock.cjs",
  },
};