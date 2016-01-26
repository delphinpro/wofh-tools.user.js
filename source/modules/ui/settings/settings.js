"use strict";

import i18n from "I18n.js";
import storage from "storage.js";
import tplSettings from "./settings.twig";
import Logger from "./logger/logger.js";

export default {
    getHtml: function () {
        let sciLogger = new Logger({
            loggerTitle         : i18n.text_SciLogger,
            loggerType          : 'scilogger',
            loggerDefaultLink   : 'wofh-tools.ru/sci',
            loggerPlaceholderAdd: i18n.text_ADD_SCI_HINT
        });
        let warLogger = new Logger({
            loggerTitle         : i18n.text_WarLogger,
            loggerType          : 'warlogger',
            loggerDefaultLink   : 'wofh-tools.ru/log',
            loggerPlaceholderAdd: i18n.text_ADD_WAR_HINT
        });

        return tplSettings($.extend(i18n, {
            isNewTown     : wofh.version.town == 'new' ? '-hover' : '',
            isOldTown     : wofh.version.town == 'old' ? '-hover' : '',
            sciLoggerPanel: sciLogger.render(),
            warLoggerPanel: warLogger.render()
        }));
    }
}