"use strict";

import template from "./button.twig";
import i18n from "../../I18n.js";

export default {
    insertToDOM: function (parentNode, reportId) {
        let $container = $(parentNode).find('.report-battle');
        if ($container.find('.js-wt-battle').size() == 0) {
            let content = template($.extend(i18n, {
                sendWarLoggerButtonClass: 'js-wt-battle',
                reportId: reportId
            }));
            $container.append(content);
            console.info('Button "Send to WarLogger" inserted');
        }
    }
}
