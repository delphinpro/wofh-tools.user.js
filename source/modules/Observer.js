"use strict";

let observer = {};

let list = [];
let observerObject = null;
let observerOptions = {
    'childList': true,
    'subtree'  : true
};


observer.start = function () {
    if (observerObject) return;

    let hashCache = '';

    observerObject = new MutationObserver(function (queue) {

        let hash = window.location.hash.replace(/^#[\d]*/, '');

        if (hash === '') {
            hashCache = hash;
            return;
        }

        if (hash == hashCache) {
            //console.info('hash cancelled', hash === '' ? "''" : hash);
            //return;
        }

        hashCache = hash;


        let callingHash;
        let urlParsed;

        for (let hashId in list) {
            if (!list.hasOwnProperty(hashId)) continue;

            let regExp = new RegExp(hashId);
            //console.info('searching hashId', hashId);
            //console.info('regExp', regExp);
            if (regExp.test(hash)) {
                callingHash = hashId;
                urlParsed = regExp.exec(hash);
                break;
            }
        }


        if (callingHash) {
            let callable = list[callingHash];

            queue.map(function (node) {
                if (!/mCS/.test(node.target.className)
                    && !/chat-messages/.test(node.target.className)
                    && !/js-timer/.test(node.target.className)
                ) {
                    if (typeof callable == 'function') {
                        callable(node.target, urlParsed);
                    }
                }
            });
        }
    });

    observerObject.observe(document.body, observerOptions);

};

observer.observe = function (key, callback) {
    list[key] = callback;
};

export default observer;
