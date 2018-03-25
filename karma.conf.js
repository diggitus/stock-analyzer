// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-verbose-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-phantomjs-launcher'),
            require('karma-junit-reporter'),
            require('@angular/cli/plugins/karma'),
            require('karma-clear-screen-reporter')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'dev'
        },
        junitReporter: {
            outputDir: 'test-reports',
            outputFile: 'junit-report.xml'
        },
        reporters: ['verbose', 'kjhtml', 'junit', 'clear-screen'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,

        // Test options for delaying a failure. Maybe fixes the Jenkins issues.
        captureTimeout: 30000,
        browserDisconnectTolerance: 3,
        browserDisconnectTimeout: 30000,
        browserNoActivityTimeout: 30000
    });
};
