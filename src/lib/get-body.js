'use strict';

module.exports = parsed => parsed.childNodes
                            .find(child => child.nodeName === 'html').childNodes
                            .find(child => child.nodeName === 'body');