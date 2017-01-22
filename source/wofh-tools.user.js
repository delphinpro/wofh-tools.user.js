"use strict";

import JQ from "jquery";

import "./modules/ui/ui.scss";

import i18n from "./modules/I18n";
import observer from "./modules/Observer.js";
import storage from "./modules/storage.js";
import gameData from "./modules/GameData.js";
import ui from "./modules/ui/UI.js";
import settings from "./modules/ui/settings/settings.js";
import VER from "./version";

let WINDOW_TITLE = 'Wofh-Tools UserScript v' + VER;

//noinspection JSUnresolvedVariable
if (DEV_MODE) {
    ui.drawButtonDevMode();
    WINDOW_TITLE = 'Wofh-Tools UserScript v' + VER + ' (DEBUG MODE)';
}

ui.drawButtonMain();

gameData.ready(function (data) {
    console.log('Data read.', data);
    observer.start();

    JQ(document).on('click', '.js-wt-science', function () {
        let logger = storage.getLogger('scilogger');
        gameData.send(data, logger);
    });

    JQ(document).on('click', '.js-wt-main', function () {
        wndMgr.addSimpleWnd(settings.getHtml(data), WINDOW_TITLE, 1, {
            moving  : true,
            showBack: false,
            canClose: true,
            noScroll: true,
            setHash : false
        });
        return false;
    });
}, VER);

JQ(document).on('change', '#js-wt-lang-switch', function () {
    if (JQ(this).is(':checked')) {
        storage.setLang('ru');
        i18n.update(1);
    } else {
        storage.setLang('en');
        i18n.update(0);
    }
    JQ('.js-wt-main').trigger('click');
});

JQ(document).on('click', '.js-wt-battle', function () {
    let id = parseInt(JQ(this).data('id'));
    let data = window['wofh'].reports[id];
    let logger = storage.getLogger('warlogger');
    gameData.send(gameData.formatReportBattle(data), logger);
});
