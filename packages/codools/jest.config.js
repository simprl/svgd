export default {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@svgo/core$": "<rootDir>/src/index",
        "^tests(.*?)$": "<rootDir>/tests$1",
    },
    moduleDirectories: ["node_modules", "src", "tests"],
};
