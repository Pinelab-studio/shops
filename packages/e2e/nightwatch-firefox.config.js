module.exports = {
  src_folders: ['nightwatch'],

  webdriver: {
    start_process: true,
    server_path: './node_modules/.bin/geckodriver',
    cli_args: ['--log', 'debug'],
    port: 4444,
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'firefox',
        acceptInsecureCerts: true,
        alwaysMatch: {
          'moz:firefoxOptions': {
            // "args": [ "-headless" ]
          },
        },
      },
    },
  },
};
