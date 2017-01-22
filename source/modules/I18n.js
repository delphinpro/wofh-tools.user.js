"use strict";

import storage from './storage.js';

let translations = {
    text_Statistic       : ['Your statistics', 'Ваша статистика'],
    text_Remove          : ['Remove', 'Удалить'],
    text_Add             : ['Add', 'Добавить'],
    text_ADD_SCI_HINT    : ['Custom address of scilogger', 'Адрес альтернативной науковницы'],
    text_ADD_WAR_HINT    : ['Custom address of warlogger', 'Адрес альтернативной логовницы'],
    text_ToSciLogger     : ['Send to SciLogger', 'Отправить в науковницу'],
    text_ToWarLogger     : ['Send to WarLogger', 'Отправить в логовницу'],
    text_SciLogger       : ['SciLogger', 'Науковница'],
    text_WarLogger       : ['WarLogger', 'Логовница'],
};

let i18n = {
    text_Statistic       : translations[0],
    text_Remove          : translations[0],
    text_Add             : translations[0],
    text_ADD_SCI_HINT    : translations[0],
    text_ADD_WAR_HINT    : translations[0],
    text_ToSciLogger     : translations[0],
    text_ToWarLogger     : translations[0],
    text_SciLogger       : translations[0],
    text_WarLogger       : translations[0],

    update : function(lang) {
        for (let k in translations) {
            if (!translations.hasOwnProperty(k)) continue;
            if (translations[k][lang]) {
                this[k] = translations[k][lang];
            }
        }
    },
};

let currentLang = storage.getLang() == 'ru' ? 1 : 0;

i18n.update(currentLang);

export default i18n;
