"use strict";

import JQ from 'jquery';

export default {
    drawButtonMain: function () {

        if (JQ('#m2_town').size()) {
            this.drawButtonMainLegacy();
            return;
        }

        let i;
        i = setInterval(function () {
            let $menuList = JQ('.smenu-list');
            if ($menuList.size()) {
                clearInterval(i);
                $menuList.append('' +
                    '<li>' +
                    '<a class="smenu-itemBtn button1 js-wt-main">WofhTools</a> ' +
                    '<a class="js-wt-main">' +
                    '<span class="smenuIcon wt-btn-main" data-title="WofhTools"></span>' +
                    '</a>' +
                    '</li>'
                );
            }
        }, 100);
    },

    drawButtonMainLegacy: function () {
        let wtButton = JQ('<div/>', {'class': 'wt-main-button js-wt-main'});
        wtButton.prependTo(JQ('#m2_town').closest('.m2'));
        JQ('<span/>').appendTo(wtButton);
    },
}
