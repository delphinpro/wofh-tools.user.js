"use strict";

import JQ from "jquery";

import "./modules/ui/ui.css";

import observer from "./modules/Observer.js";
import storage from "./modules/storage.js";
import gameData from "./modules/GameData.js";
import ui from "./modules/ui/UI.js";
import settings from "./modules/ui/settings/settings.js";
import VER from "./version";

//noinspection JSUnresolvedVariable
if (DEV_MODE) {
    ui.drawButtonDevMode();
}

ui.drawButtonMain();

observer.observe('/science', function (el) {
    if (el.classList.contains("-if-desk")) {
        ui.drawButtonScience(el);
    }
});

observer.observe('/report/([\\d]+)', function (el, url) {
    if (el.classList.contains("-if-desk") && (window['wofh'].reports[url[1]].type == 19)) {
        ui.drawButtonBattle(el, url[1]);
    }
});

gameData.ready(function (data) {
    console.log('Data read.', data);
    observer.start();

    JQ(document).on('click', '.js-wt-science', function () {
        let logger = storage.getLogger('scilogger');
        gameData.send(data, logger);
    });

        wndMgr.addSimpleWnd(settings.getHtml(data), 'Wofh-Tools UserScript v' + VER, 1, {
    JQ(document).on('click', '.js-wt-main', function () {
            moving  : true,
            showBack: true,
            canClose: true,
            noScroll: true,
            setHash : false
        });
        return false;
    });
}, VER);

JQ(document).on('click', '.js-wt-battle', function () {
    let id = parseInt(JQ(this).data('id'));
    let data = window['wofh'].reports[id];
    let logger = storage.getLogger('warlogger');
    gameData.send(gameData.formatReportBattle(data), logger);
});
