"use strict";

import template from "./button.twig";
import i18n from "../../I18n.js";

export default {
    insertToDOM: function (parentNode) {
        let $container = $(parentNode).find('.science-account-info');
        if ($container.find('.js-wt-science').size() == 0) {
            let content = template($.extend(i18n, {sendSciLoggerButtonClass: 'js-wt-science'}));
            $container.append(content);
            console.info('Button "Send to SciLogger" inserted');
        }
    }
}
