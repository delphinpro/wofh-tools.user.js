// ==UserScript==
// @name 		Wofh Tools Client
// @namespace   http://wofh-tools.ru/
// @author      DelphinPRO
// @copyright   Copyright (C) 2014 DelphinPRO. All rights reserved.
// @license     Licensed under the MIT license
// @version     1.0.25
// @grant       none
// @include     http://w*.wofh.ru/*
// @include     http://w*.wofh.de/*
// @include     http://en*.waysofhistory.com/*
// @exclude     http://en.waysofhistory.com/
// @exclude     http://en.waysofhistory.com/forum
// @exclude     http://en.waysofhistory.com/forum#/*
// @description Wofh Tools client extension
// ==/UserScript==

"use strict";

var WT = {
	mainMenu : {
		'wt-mm-send-science': 'Науковница',
		'wt-mm-send-war'    : 'Логовница',
		'wt-mm-settings'    : 'Настройки расширения'
	},
	images   : {
		menuBg    : 'data:image/png;base64,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',
		menuItemBg: 'data:image/png;base64,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',
		icon32    : 'data:image/png;base64,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',
		wndTitleBg: 'data:image/png;base64,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',
		wndBodyBg : 'data:image/jpg;base64,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'
	},
	templates: {
		settings: '<table cols="3" width="100%" cellspacing="0" cellpadding="2" class="aL">\
			<colgroup><col width="45%"><col width="192px"></colgroup><tr><td>Логовница:</td>\
			<td><select id="wt-settings-log" class="wt-input" name="wt-log">%battle%</select></td>\
			</tr><tr><td>Науковница:</td>\
			<td><select id="wt-settings-sci" class="wt-input" name="wt-sci">%science%</select></td>\
			</tr><tr><td></td>\
			<td style="padding-top:20px;"><button id="wt-settings-save" class="wt-button button1 -type-green wt-button-ok" type="button">Сохранить</button></td>\
			</tr></table>'
	}
};

WT.stylesString = "\
	#wt-button {width:57px;height:36px;cursor:default;float:left;z-index:999;position:relative;\
		background-image:url(" + WT.images.menuBg + ");-webkit-user-select:none;user-select:none;}\
	#wt-button:hover #wt-main-menu {display:block;}\
	#wt-main-menu {position:absolute;top:100%;left:0;width:150px;z-index:100;margin:0;padding:0;\
		list-style:none;display:none;}\
	#wt-main-menu li {background-image:url(" + WT.images.menuItemBg + ");background-size:100% 100%;}\
	#wt-main-menu li a {display:block;padding:3px 5px;cursor:pointer;margin:0;background:none;width:auto;height:auto;float:none;\
		color:#fff;text-shadow:1px 1px 1px #000;padding:3px 5px 6px;font-size:10px;}\
	#wt-main-menu li a:hover {color: #FED030;text-shadow: 1px 1px 1px #000;}\
	.wt-mask {position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:999;display:none;}\
	.wt-wnd {position:fixed;left:50%;top:100px;transform:translateX(-50%);z-index:1000;width:500px;\
		box-shadow: 0 10px 50px #000;display: none;}\
	.wt-wnd-title {font-size: 18px;padding: 1px;border-bottom: 1px solid #000;text-align: center;color: #fff;\
		text-shadow: 1px 1px 5px #000;background-color: #451B02;box-sizing: border-box;\
		background-image: url(" + WT.images.wndTitleBg + ");height: 26px;line-height: 24px;}\
	.wt-wnd-body {box-sizing: border-box;padding: 20px 30px;min-height: 200px;background-color: #F5BD70;\
		background-image: url(" + WT.images.wndBodyBg + ");position: relative;\
		border-top: 1px solid #FFCD75;border-bottom: 1px solid #351502;}\
	.wt-wnd-body::before,.wt-wnd-body::after {content:'';position:absolute;width:10px;top:-27px;bottom:0;}\
	.wt-wnd-body::before {left: 0;background-image: linear-gradient(to right, #3D2F1C, rgba(0,0,0,0));}\
	.wt-wnd-body::after {right: 0;background-image: linear-gradient(to left, #3D2F1C, rgba(0,0,0,0));}\
	.wt-input {width: 100%;box-sizing: border-box;}";

WT.insertStyles = function () {
	$('<style type="text/css">' + WT.stylesString + '</style>').appendTo('head');
};

WT.config = (function () {
	var lists = {
		science: [
			'wofh-tools.ru/sci'
			//'science.magifromwofh.com/sclog'
			//,'wofh-tools.project/sci'
		],
		battle : [
			'wofh-tools.ru/log'
			//'army.magifromwofh.com/alog'
		]
	};

	var cfg = localStorage.getItem('wt.config');
	cfg = cfg ? JSON.parse(cfg) : {};
	return {
		getOption  : function (name, def) {
			def = def || null;
			return cfg[name] ? cfg[name] : def;
		},
		setOption  : function (name, value) {
			cfg[name] = value;
			localStorage.setItem('wt.config', JSON.stringify(cfg));
		},
		getList    : function (name) {
			return lists[name] ? lists[name] : [];
		},
		getListItem: function (name, index) {
			var list = this.getList(name);
			return list[index] ? list[index] : list[0];
		}
	}
}());

WT.menu = (function () {
	var ul = $('<ul/>', {id: 'wt-main-menu'});
	return {
		build: function () {
			var wtButton = $('<div/>', {id: 'wt-button'});
			var container = $('.view-mmenu');
			if (container.size() > 0) {
				wtButton.css({
					position          : 'absolute',
					top               : '-5px',
					left              : '50%',
					marginLeft        : '-305px',
					textAlign         : 'center',
					backgroundPosition: '-10px 0'
				}).appendTo('body');
			} else {
				wtButton.prependTo($('#m2_town').closest('.m2'));
			}
			$('<img/>', {src: WT.images.icon32}).appendTo(wtButton);

			for (var id in WT.mainMenu) if (WT.mainMenu.hasOwnProperty(id)) {
				$('<a/>', {id: id, text: WT.mainMenu[id]}).appendTo($('<li/>').appendTo(ul));
			}
			ul.appendTo(wtButton);
		},
		item : function (id) {
			return ul.find(id);
		}
	}
}());

WT.windows = (function () {
	var mask = $('<div/>', {class: 'wt-mask'}).appendTo('body');
	var wnd = $('<div/>', {class: 'wt-wnd'}).appendTo('body');
	var wndTitle = $('<div/>', {class: 'wt-wnd-title', text: 'Настройки'}).appendTo(wnd);
	var wndBody = $('<div/>', {class: 'wt-wnd-body'}).appendTo(wnd);

	mask.on('click', function () {
		wnd.fadeOut(100);
		mask.fadeOut(100);
	});

	return {

		show : function () {
			mask.fadeIn(300);
			wnd.fadeIn(300);
		},
		close: function () {
			wnd.fadeOut(100);
			mask.fadeOut(100);
		},

		template : function (tName, data) {
			var tmpl = WT.templates[tName];
			data = data || {};
			for (var i in data) {
				if (!data.hasOwnProperty(i)) continue;
				var item = '%' + i + '%';
				tmpl = tmpl.replace(item, data[i]);
			}
			wndBody.html(tmpl);
			wndBody.on('click', '.wt-button-ok', function () {
				if (WT.windows.onSuccess) {
					WT.windows.onSuccess();
				}
			});
		},
		onSuccess: function () {
			alert(1);
		}
	}
}());

WT.data = (function () {
	var data = {};
	return {
		read   : function () {
			//console.log('READ DATA: servodata', servodata);
			//console.log('READ DATA: library', library);

			var
				version = library.version ? library.version : "1.3",
				legacy = false,// (version == "1.3"),
				s = servodata,
				progress = {},
				currentId = legacy ? s.account.science.current.id : s.account.science.current,
				currentNeed = legacy ? s.account.science.current.need : null,
				currentProgress = legacy
					? s.account.science.current.progress
					: s.account.science.progress[currentId],
				progressList = legacy ? s.account.science.started : s.account.science.progress,
				state;

			if (legacy) {
				state = s.account.science.known;
			} else {
				state = s.account.science.state;
				state = state.replace(/-/g, '0').replace(/\*/g, '1').replace(/\+/g, '2').split('');
				for (var i in state) {
					if (!state.hasOwnProperty(i)) continue;
					if (i == currentId) continue;
					state[i] = parseInt(state[i]);
				}
			}

			for (var sc in progressList) {
				if (!progressList.hasOwnProperty(sc)) continue;
				progress[sc] = progressList[sc];
			}

			// Приводим к старому формату, чтобы приемник не перепиливать :)
			data.account = [
				s.account.id,
				s.account.name,
				s.account.sex,
				s.account.race.id
			];
			data.domain = library.domain ? library.domain : location.host;
			data.generatetime = legacy ? Math.round(+new Date() / 1000) : s.account.science.updated;
			data.science = {
				current: {
					id      : currentId,
					need    : currentNeed,
					progress: currentProgress
				},
				known  : state,
				next   : s.account.science.next,
				started: progress
			};

			// Дополнительные данные
			data.version = library.version ? library.version : '1.3';
			data.country = (typeof s.account.country != 'undefined') ? {
				id  : s.account.country.id,
				name: s.account.country.name,
				flag: s.account.country.flag
			} : null;
			data.account.tz = s.account.timezone;
			data.account.regTime = s.account.regtime;

			//console.log('READING DATA: data', data);
		},
		getData: function () {
			return data;
		}
	}
}());

WT.html = (function () {
	return {
		buildOptionsList: function (list, selected) {
			var result = '';
			for (var i = 0; i < list.length; i++) {
				result += '<option value="' + i + '"' + ((i == selected) ? ' selected' : '') + '>'
				+ list[i] + '</option>';
			}
			return result;
		}
	}
}());

$(function () {
	WT.insertStyles();
	WT.menu.build();
	WT.data.read();

	WT.menu.item('a#wt-mm-send-science').on('click', function () {
		var scienceReport = WT.data.getData();
		//console.log('SEND: ', scienceReport);
		var sData = encodeURIComponent(JSON.stringify(scienceReport));
		var action = WT.config.getListItem('science', WT.config.getOption('sci', 0));
		action = 'http://' + action + '/';
		var form = $('<form/>', {action: action, method: 'post', target: '_blank', css: {display: 'none'}});
		$('<input/>', {type: 'hidden', name: 'sdata', value: sData}).appendTo(form);
		$('<input/>', {type: 'hidden', name: 'key', value: ''}).appendTo(form);
		form.appendTo('body');
		form.submit();
		setTimeout(function () {
			form.remove();
		}, 200);
	});

	WT.menu.item('a#wt-mm-send-war').on('click', function () {
		alert('Логовницы пока нет');
	});

	WT.menu.item('a#wt-mm-settings').on('click', function () {
		WT.windows.template('settings', {
			battle : WT.html.buildOptionsList(WT.config.getList('battle'), WT.config.getOption('battle', 0)),
			science: WT.html.buildOptionsList(WT.config.getList('science'), WT.config.getOption('sci', 0))
		});
		WT.windows.show();
		WT.windows.onSuccess = function () {
			WT.config.setOption('sci', $('#wt-settings-sci').val());
			WT.config.setOption('battle', $('#wt-settings-log').val());
			WT.windows.close();
		}
	});
});



