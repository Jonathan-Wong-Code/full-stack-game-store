const COVERAGE = 70;

module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx}", "pages/**/*.{jsx,jsx}"],

  coverageThreshold: {
    global: {
      statements: COVERAGE,
      branches: COVERAGE,
      functions: COVERAGE,
      lines: COVERAGE,
    },
  },

  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    ".*\\.(css|less|styl|scss|sass)$":
      "<rootDir>/src/common/tests/mocks/cssModule.js",
    ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/common/tests/mocks/image.js",
  },
  setupFilesAfterEnv: ["./setupTests.js"], // run this file before tests run.
  testRegex: "__tests__/.*\\.test\\.js$", // look in these folders for test files.
  snapshotSerializers: [],
};
