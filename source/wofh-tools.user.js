'use strict';

import JQ from 'jquery';

import './modules/ui/ui.scss';
import storage from './modules/storage.js';
import gameData from './modules/GameData.js';
import ui from './modules/ui/UI.js';
import settings from './modules/ui/settings/settings.js';
import VER from './version';
import g from './modules/windowObject';


(function() {
  // let $ = unsafeWindow.jQuery;
  // if (!$) return;

  let WINDOW_TITLE = 'Wofh-Tools UserScript v' + VER;

  // noinspection JSUnresolvedVariable
  if (DEV_MODE) {
    WINDOW_TITLE = 'Wofh-Tools UserScript v' + VER + ' (DEBUG MODE)';
  }

  console.log(WINDOW_TITLE);

  if (g.location.pathname === '/game') return;
  if (/glagna/.test(g.location.pathname)) return;

  console.log('location:', g.location.href);

  if (wofh.town) {
    let original2             = iTown.prototype.afterShow;
    iTown.prototype.afterShow = function() {
      original2.apply(this, arguments);
      console.log('iTown.prototype.afterShow', g.servodata);
      ui.drawButtonMain();

      JQ(document).on('click', '.js-wt-main', function() {
        wndMgr.addSimpleWnd(settings.getHtml(g.servodata), WINDOW_TITLE, 1, {
          moving  : true,
          showBack: false,
          canClose: true,
          noScroll: true,
          setHash : false,
        });
        return false;
      });

      JQ(document).on('click', '.js-wt-science', function() {
        let logger = storage.getLogger('scilogger');
        gameData.send(g.servodata, logger);
      });
    };
  }

  // console.info('reqMgr', g.reqMgr);
  let origGetReport = g.reqMgr.getReport;
  g.reqMgr.getReport = function(reportId, reportCode, noLogin, callback) {
    // console.log('getReport', arguments);
    origGetReport.apply(this, [reportId, reportCode, noLogin, function(data){
      console.log('Получили отчёт', data);
      callback(data);
      let info = `<pre>
Type: ${data.type}
</pre>`;
        let dataForSend = {};
      try {
        dataForSend = {
          target: {
            playerId   : data.data.townowner.id,
            playerName : data.data.townowner.name,
            countryId  : data.data.townowner.country.id,
            countryName: data.data.townowner.country.name,
            countryFlag: data.data.townowner.country.flag,
            townId     : data.town1.id,
            townName   : data.town1.name,
          }
        };
      } catch(e){
        console.error(e.message);
      }
      $('.report-content').prepend(`
      <form action="http://wofh-tools.project/log/" method="post" target="_blank"
       style="margin-top: -10px; padding-bottom: 10px; border-bottom: 1px solid #AC6120; margin-bottom: 10px;">
        <input type="hidden" name="data" value='${encodeURIComponent(JSON.stringify(dataForSend))}'>
        <button class="button1 -type-green" type="submit">Send to WarLogger</button>
        ${info}
      </form>
      `);
    }]);
  };

  // gameData.ready(function(data) {
  //   console.log('Data read.', data);
  //   observer.start();
  //
  // }, VER, g);
  //
  // JQ(document).on('change', '#js-wt-lang-switch', function() {
  //   if (JQ(this).is(':checked')) {
  //     storage.setLang('ru');
  //     i18n.update(1);
  //   } else {
  //     storage.setLang('en');
  //     i18n.update(0);
  //   }
  //   JQ('.js-wt-main').trigger('click');
  // });
  //
  // JQ(document).on('click', '.js-wt-battle', function() {
  //   let id     = parseInt(JQ(this).data('id'));
  //   let data   = window['wofh'].reports[id];
  //   let logger = storage.getLogger('warlogger');
  //   gameData.send(gameData.formatReportBattle(data), logger);
  // });
})();
