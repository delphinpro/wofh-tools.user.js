const pkg = require('../package.json');

let banner = `// ==UserScript==
// @name        Wofh Tools browser extension
// @description Wofh Tools browser extension
// @namespace   http://wofh-tools.ru/
// @version     ${pkg.version}
// @author      delphinpro
// @copyright   copyright © 2014-2017 delphinpro
// @license     licensed under the MIT license
// @grant       unsafeWindow
// @include     https://ru*.waysofhistory.com/*
// @include     https://en*.waysofhistory.com/*
// @exclude     https://en.waysofhistory.com/
// @exclude     https://en.waysofhistory.com/forum
// @exclude     https://en.waysofhistory.com/forum#/*
// @match       https://*.waysofhistory.com/gen/html/*
// ==/UserScript==
`;

module.exports = banner;
