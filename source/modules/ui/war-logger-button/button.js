"use strict";

import i18n from "I18n.js";
import storage from "storage.js";
import template from "./button.twig";

export default {
    insertToDOM: function (parentNode, reportId) {
        let $container = $(parentNode).find('.report-battle');
        if ($container.find('.js-wt-battle').size() == 0) {
            let content = template($.extend(i18n, {
                sendWarLoggerButtonClass: 'js-wt-battle',
                reportId: reportId,
                loggerLink: storage.getLogger('warlogger')
            }));
            $container.append(content);
            console.info('Button "Send to WarLogger" inserted');
        }
    }
}
