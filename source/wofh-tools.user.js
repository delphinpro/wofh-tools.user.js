'use strict';

import JQ from 'jquery';

// import './modules/ui/ui.scss';
// import storage from './modules/storage.js';
// import gameData from './modules/GameData.js';
// import ui from './modules/ui/UI.js';
// import settings from './modules/ui/settings/settings.js';
import pkg from '../package.json';
import g from './modules/windowObject';


const VER = pkg.version;

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

  function startTownScreen() {
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

  console.log('location:', g.location.href);

  let wofhInit = wofh.init;
  wofh.init = function() {
    wofhInit.apply(this, arguments);
    console.log('wofh inited');
  };

  if (wofh.town) {
    startTownScreen();
  }

  function collectDataType19(data) {
    let prepared = {
      reportId  : data.id,
      reportCode: data.code,
      replayHash: data.data.replay,
      type      : data.type,
      time      : data.time,
      duration  : data.data.period,
      url       : location.host,
      result    : data.data.result,
      training  : data.data.training,
    };

    prepared.target = {
      playerId     : data.data.townowner.id,
      playerName   : data.data.townowner.name,
      townId       : data.town1.id,
      townName     : data.town1.name,
      country      : null,
      fortification: {
        id   : data.data.defstruct,
        level: data.data.deflevel,
      },
      wonder       : data.data.defwonder,
      destroy      : data.data.destroy,
    };

    if (data.data.townowner.country) {
      prepared.target.country = {
        id  : data.data.townowner.country.id,
        name: data.data.townowner.country.name,
        flag: data.data.townowner.country.flag,
      };
    }

    prepared.attackers = [];
    data.data.attackers.forEach(attacker => {
      let item = {
        playerId : attacker.acc,
        townId   : attacker.town.id,
        countryId: null,
        army     : attacker.army,
        killed   : attacker.killed,
        robbed   : attacker.robbed,
        survived : attacker.survived,
        bonus    : attacker.bonus,
      };

      if (attacker.country) {
        item.countryId = attacker.country.id;
      }

      prepared.attackers.push(item);
    });

    prepared.defenders = null;
    if (data.data.defenders) {
      prepared.defenders = [];
      data.data.defenders.forEach(defender => {
        let item = {
          playerId : defender.acc,
          townId   : defender.town.id,
          countryId: null,
          army     : defender.army,
          killed   : defender.killed,
          robbed   : defender.robbed,
          survived : defender.survived,
          bonus    : defender.bonus,
        };

        if (defender.country) {
          item.countryId = defender.country.id;
        }

        prepared.defenders.push(item);
      });
    }

    prepared.accounts = {};
    for (let id in data.accounts) {
      if (!data.accounts.hasOwnProperty(id)) continue;
      prepared.accounts[id] = {
        name   : data.accounts[id].name,
        race   : data.accounts[id].race.id,
        sex    : data.accounts[id].sex,
        country: data.accounts[id].country ? data.accounts[id].country.id : null,
      };
    }

    prepared.towns = {};
    for (let id in data.towns) {
      if (!data.towns.hasOwnProperty(id)) continue;
      prepared.towns[id] = {
        name: data.towns[id].name,
      };
    }

    prepared.countries = {};
    for (let id in data.countries) {
      if (!data.countries.hasOwnProperty(id)) continue;
      prepared.countries[id] = {
        name: data.countries[id].name,
        flag: data.countries[id].flag,
      };
    }

    return prepared;
  }

  // console.info('reqMgr', g.reqMgr);
  let origGetReport  = g.reqMgr.getReport;
  g.reqMgr.getReport = function(reportId, reportCode, noLogin, callback) {
    // console.log('getReport', arguments);
    origGetReport.apply(this, [
      reportId, reportCode, noLogin, function(data) {
        console.log('Получили отчёт', data);
        callback(data);
        let info        = `<pre>
Type: ${data.type}
</pre>`;
        let dataForSend = {};
        try {
          if (data.type === 19) {
            dataForSend = collectDataType19(data);
          }
        } catch (e) {
          console.error(e);
        }
        dataForSend.raw = data;
        // dataForSend.wofh = wofh;
        $('.report-content').prepend(`
      <form action="http://localhost:3000/log/" method="post" target="_blank"
       style="margin-top: -10px; padding-bottom: 10px; border-bottom: 1px solid #ac6120; margin-bottom: 10px;">
        <input type="hidden" name="data" value="${encodeURIComponent(JSON.stringify(dataForSend))}">
        <button class="button1 -type-green" type="submit">Send to WarLogger</button>
        ${info}
      </form>
      `);
      },
    ]);
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
