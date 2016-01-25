"use strict";

import "./modules/ui/ui.css";

import tplOptions from "./modules/ui/opts.twig";
import observer from "./modules/Observer.js";
import gameData from "./modules/GameData.js";
import i18n from "./modules/I18n.js";
import ui from "./modules/ui/UI.js";

const VERSION = '2.0.0';

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
}, VERSION);

$(document).on('click', '.js-wt-main', function () {
    let content = tplOptions($.extend(i18n, {
        isNewTown: wofh.version.town == 'new' ? '-hover' : '',
        isOldTown: wofh.version.town == 'old' ? '-hover' : ''
    }));
    wndMgr.addSimpleWnd(content, 'Wofh-Tools UserScript', 1, {
        moving  : true,
        showBack: false,
        canClose: true,
        noScroll: true,
        setHash : false
    });
    return false;
});

$(document).on('click', '.js-wt-scilogger-add', function () {
    let $input = $('.js-wt-scilogger-new');
    let text = $.trim($input.val());
    $input.val('');
    $('.js-wt-scilogger-list').append('<option>' + text + '</option>');
});

$(document).on('click', '.js-wt-science', function () {
    gameData.send(data, 'wofh-tools.ru/sci');
});

$(document).on('click', '.js-wt-battle', function () {
    let id = parseInt($(this).data('id'));
    let data = window['wofh'].reports[id];
    gameData.send(gameData.formatReportBattle(data), 'wofh-tools.ru/log');
});
