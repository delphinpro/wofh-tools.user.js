"use strict";

import i18n from "I18n.js";
import template from "./logger.twig";

class LoggerPanel {
    constructor(data) {
        this.data = data;
    }

    render() {
        return template($.extend(i18n, this.data));
    }
}

export default LoggerPanel;
