"use strict";

let storageKey = 'wofh-tools.ru';
let storageData = {
    selectedLogger: {
        scilogger: 'wofh-tools.ru/sci',
        warlogger: 'wofh-tools.ru/log'
    },
    loggers       : {
        scilogger: [],
        warlogger: []
    }
};

function readData() {
    let sData = localStorage.getItem(storageKey);
    if (!sData) {
        sData = '{}';
    }
    let rgData = JSON.parse(sData);
    storageData = $.extend(storageData, rgData);
    console.info('WOFH_TOOLS Data: ', storageData);
}

function saveData() {
    let sData = JSON.stringify(storageData);
    localStorage.setItem(storageKey, sData);
}

readData();

export default {

    existsLogger: function (type, data) {
        return storageData.loggers[type].indexOf(data) > -1;
    },

    addLogger: function (type, data) {
        storageData.loggers[type].push(data);
        saveData();
    },

    removeLogger: function (type, data) {
        let index = storageData.loggers[type].indexOf(data);
        storageData.loggers[type].splice(index, 1);
        saveData();
    },

    selectLogger: function (type, data) {
        if (this.existsLogger(type, data)) {
            storageData.selectedLogger[type] = data;
            saveData();
        }
    },

    getLoggers: function (type) {
        return storageData.loggers[type];
    },

    getLogger: function (type) {
        return storageData.selectedLogger[type];
    },

    getData: function () {
        return storageData;
    }
}
