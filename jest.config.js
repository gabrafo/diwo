module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json'],
    roots: ['<rootDir>/src'],
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest'
    },
    collectCoverageFrom: [
      '**/*.(t|j)s'
    ],
    coverageDirectory: '../coverage'
};