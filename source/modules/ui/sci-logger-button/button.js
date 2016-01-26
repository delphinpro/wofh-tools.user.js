"use strict";

import i18n from "I18n.js";
import storage from "storage.js";
import template from "./button.twig";

export default {
    insertToDOM: function (parentNode) {
        let $container = $(parentNode).find('.science-account-info');
        if ($container.find('.js-wt-science').size() == 0) {
            let content = template($.extend(i18n, {
                sendSciLoggerButtonClass: 'js-wt-science',
                loggerLink: storage.getLogger('scilogger')
            }));
            $container.append(content);
            console.info('Button "Send to SciLogger" inserted');
        }
    }
}
