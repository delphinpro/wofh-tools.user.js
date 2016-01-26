"use strict";

import "./modules/ui/ui.css";

import i18n from "I18n.js";
import observer from "Observer.js";
import storage from "storage.js";
import gameData from "GameData.js";
import ui from "./modules/ui/UI.js";
import settings from "./modules/ui/settings/settings.js";

const VERSION = '2.0.2';

if (DEV_MODE) {
    ui.drawButtonDevMode();
}

ui.drawButtonMain();

observer.observe('/science', function (el) {
    if (el.classList.contains("wnd-layer2")) {
        ui.drawButtonScience(el);
    }
});

observer.observe('/report/([\\d]+)', function (el, url) {
    if (el.classList.contains("wnd-layer2") && (window['wofh'].reports[url[1]].type == 19)) {
        ui.drawButtonBattle(el, url[1]);
    }
});

gameData.ready(function (data) {
    console.info('Data read.', data);
    observer.start();

    $(document).on('click', '.js-wt-science', function () {
        let logger = storage.getLogger('scilogger');
        gameData.send(data, logger);
    });
}, VERSION);

$(document).on('click', '.js-wt-main', function () {
    wndMgr.addSimpleWnd(settings.getHtml(), 'Wofh-Tools UserScript v' + VERSION, 1, {
        moving  : true,
        showBack: true,
        canClose: true,
        noScroll: true,
        setHash : false
    });
    return false;
});

$(document).on('click', '.js-wt-battle', function () {
    let id = parseInt($(this).data('id'));
    let data = window['wofh'].reports[id];
    let logger = storage.getLogger('warlogger');
    gameData.send(gameData.formatReportBattle(data), logger);
});
