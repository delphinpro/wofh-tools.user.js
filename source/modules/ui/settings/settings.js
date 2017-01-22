"use strict";

import JQ from 'jquery';

import i18n from '../../I18n';
import storage from '../../storage';
import tplSettings from './settings.twig';
import Logger from './logger/logger';
import gameData from '../../GameData';

export default {
    getHtml: function (data) {
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

        return tplSettings(JQ.extend(i18n, {
            accountId     : data.account[0],
            worldSign     : gameData.domainToSign(data.domain),
            isNewTown     : wofh.version.town == 'new' ? '-hover' : '',
            sciLoggerPanel: sciLogger.render(),
            warLoggerPanel: warLogger.render()
        }));
    }
}
