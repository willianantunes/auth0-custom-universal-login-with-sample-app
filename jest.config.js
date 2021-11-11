const { defaults } = require("jest-config")

module.exports = {
  ...defaults,
  moduleFileExtensions: ["js"],
  testPathIgnorePatterns: ["<rootDir>/scripts/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/scripts/", "/node_modules/"],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
}
