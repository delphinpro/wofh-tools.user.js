"use strict";

import cookie from "Cookie.js";

let i18n = {
    text_HybridInterface : ['Hybrid interface', 'Гибридный интерфейс'],
    text_ClassicInterface: ['Classic interface', 'Классический интерфейс'],
    text_ClassicMap      : ['Classic map', 'Классическая карта'],
    text_Remove          : ['Remove', 'Удалить'],
    text_Add             : ['Add', 'Добавить'],
    text_ADD_SCI_HINT    : ['Custom address of scilogger', 'Адрес альтернативной науковницы'],
    text_ADD_WAR_HINT    : ['Custom address of warlogger', 'Адрес альтернативной логовницы'],
    text_ToSciLogger     : ['Send to SciLogger', 'Отправить в науковницу'],
    text_ToWarLogger     : ['Send to WarLogger', 'Отправить в логовницу'],
    text_SciLogger       : ['SciLogger', 'Науковница'],
    text_WarLogger       : ['WarLogger', 'Логовница']
};

let currentLang = cookie.get('lang') == 'en' ? 0 : 1;
console.info('Current LANG: ', currentLang == 1 ? 'EN' : 'RU');

for (let k in i18n) {
    if (!i18n.hasOwnProperty(k)) continue;
    if (i18n[k][currentLang]) {
        i18n[k] = i18n[k][currentLang];
    }
}

export default i18n;
