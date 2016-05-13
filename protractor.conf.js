exports.config = {
    allScriptsTimeout: 11000,
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    specs: [
        './Scripts/e2e-test/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://127.0.0.1:8080/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: true
    }
};