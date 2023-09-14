module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: [ 'js', 'jsx' ],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: [ './jest.setup.cjs' ],
};
