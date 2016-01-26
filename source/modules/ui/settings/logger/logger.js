"use strict";

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
        return template($.extend(i18n, this.data));
    }
}

$(document).on('click', '.js-wt-logger-add', function () {
    let type = $(this).data('type');
    let $input = $('.js-wt-logger-new').filter('[data-type="' + type + '"]');
    let $select = $('.js-wt-' + type + '-list');
    let val = $.trim($input.val());
    if (val && !storage.existsLogger(type, val)) {
        storage.addLogger(type, val);
        $input.val('');
        $select.append(`<option>${val}</option>`);
    }
    console.info('Logger added: ', val, storage.getData());
    return false;
});

$(document).on('click', '.js-wt-logger-remove', function () {
    let $this = $(this);
    let type = $(this).data('type');
    let $select = $('.js-wt-' + type + '-list');
    let $option = $select.find('option').filter(':selected');
    let val = $option.text();
    $option.remove();
    $select.find('option').filter(':first').attr('selected', true);
    $select.trigger('change');

    storage.removeLogger(type, val);
    console.info('Logger removed: ', val, storage.getData());
    return false;
});

$(document).on('change', '.js-wt-logger-list', function(){
    let $this = $(this);
    let val = $this.find('option').filter(':selected').text();
    let type = $this.data('type');
    storage.selectLogger(type, val);
    console.info('CHANGE TO: ', val);
});

export default LoggerPanel;
