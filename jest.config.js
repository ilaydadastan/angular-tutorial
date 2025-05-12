module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': 'ts-jest',
    },
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    collectCoverage: true,
    coverageReporters: ['html'],
};
