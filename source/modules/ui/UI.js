"use strict";

import sciLoggerButton from "./sci-logger-button/button.js";
import warLoggerButton from "./war-logger-button/button.js";

export default {
    drawButtonMain: function () {

        if ($('#m2_town').size()) {
            this.drawButtonMainLegacy();
            return;
        }

        let i;
        i = setInterval(function () {
            let $menuList = $('.smenu-list');
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
        var wtButton = $('<div/>', {'class': 'wt-main-button js-wt-main'});
        wtButton.prependTo($('#m2_town').closest('.m2'));
        $('<span/>').appendTo(wtButton);
    },

    drawButtonDevMode: function () {
        $("<a/>", {
            href   : "/?test",
            text   : "ENTER TO DEV MODE",
            "class": "wt-btn-dev-mode"
        }).appendTo("body");
    },

    drawButtonScience: function(parentNode) {
        sciLoggerButton.insertToDOM(parentNode);
    },

    drawButtonBattle: function(parentNode, reportId) {
        warLoggerButton.insertToDOM(parentNode, reportId);
    }
}
