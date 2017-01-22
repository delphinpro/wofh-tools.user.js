"use strict";

import JQ from "jquery";

import i18n from "I18n.js";
import storage from "storage.js";
import template from "./logger.twig";

class LoggerPanel {
    constructor(data) {
        this.data = data;
        this.data.loggers = storage.getLoggers(data.loggerType);
        this.data.selectedLogger = storage.getLogger(data.loggerType);
    }

    render() {
        return template(JQ.extend(i18n, this.data));
    }
}

JQ(document).on('click', '.js-wt-logger-add', function () {
    let type = JQ(this).data('type');
    let $input = JQ('.js-wt-logger-new').filter('[data-type="' + type + '"]');
    let $select = JQ('.js-wt-' + type + '-list');
    let val = JQ.trim($input.val());
    if (val && !storage.existsLogger(type, val)) {
        storage.addLogger(type, val);
        $input.val('');
        $select.append(`<option>${val}</option>`);
    }
    return false;
});

JQ(document).on('click', '.js-wt-logger-remove', function () {
    let type = JQ(this).data('type');
    let $select = JQ('.js-wt-' + type + '-list');
    let $option = $select.find('option').filter(':selected');
    let val = $option.text();

    if (val == 'wofh-tools.ru/sci' || val == 'wofh-tools.ru/log') {
        return;
    }

    $option.remove();
    $select.find('option').filter(':first').attr('selected', true);
    $select.trigger('change');

    storage.removeLogger(type, val);
    return false;
});

JQ(document).on('change', '.js-wt-logger-list', function(){
    let $this = JQ(this);
    let val = $this.find('option').filter(':selected').text();
    let type = $this.data('type');
    storage.selectLogger(type, val);
});

export default LoggerPanel;
