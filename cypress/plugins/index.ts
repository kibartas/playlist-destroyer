/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import execa from 'execa';

type Browser = {
  name: string;
  channel: string;
  family: string;
  displayName: string;
  version: string;
  path: string;
  majorVersion: number;
};

type PromisedBrowser = Promise<Browser>;

const findBrowser = (): PromisedBrowser => {
  // the path is hard-coded for simplicity
  const browserPath = '/usr/bin/brave';

  return execa(browserPath, ['--version']).then((result) => {
    // STDOUT will be like "Brave Browser 77.0.69.135"
    const [, version] = /Brave Browser (\d+\.\d+\.\d+\.\d+)/.exec(
      result.stdout,
    );
    const majorVersion = parseInt(version.split('.')[0], 10);

    return {
      name: 'Brave',
      channel: 'stable',
      family: 'chromium',
      displayName: 'Brave',
      version,
      path: browserPath,
      majorVersion,
    };
  });
};

/**
 * @type {Cypress.PluginConfig}
 */
export default (
  on: never,
  config: { browsers: Browser[] },
): Promise<{ browsers: Browser[] }> => {
  return findBrowser().then((browser: Browser) => {
    return {
      browsers: config.browsers.concat(browser),
    };
  });
};
