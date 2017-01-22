"use strict";

import JQ from "jquery";

import i18n from "I18n.js";
import storage from "storage.js";
import template from "./button.twig";

export default {
    insertToDOM: function (parentNode, reportId) {
        let $container = JQ(parentNode).find('.report-battle');
        if ($container.find('.js-wt-battle').size() == 0) {
            let content = template(JQ.extend(i18n, {
                sendWarLoggerButtonClass: 'js-wt-battle',
                reportId: reportId,
                loggerLink: storage.getLogger('warlogger')
            }));
            $container.append(content);
        }
    }
}
