"use strict";

import JQ from 'jquery';

function stateStringToArray(state, currentId) {
    state = state.replace(/-/g, '0').replace(/\*/g, '1').replace(/\+/g, '2').split('');
    for (let i in state) {
        if (!state.hasOwnProperty(i)) continue;
        if (i == currentId) continue;
        state[i] = parseInt(state[i]);
    }
    return state;
}

function formattingData(s, lib) {
    let version = lib.main.version;

    let scienceCurrentId = s.account.science.current;
    let scienceState = stateStringToArray(s.account.science.state, scienceCurrentId);
    let scienceNext = s.account.science.next !== 999 ? s.account.science.next : null;
    let scienceCurrentProgress = s.account.science.inc;
    let scienceProgress = s.account.science.progress;


    let data = {
        // report data
        account     : {
            id     : s.account.id,
            name   : s.account.name,
            sex    : s.account.sex,
            raceId : s.account.race.id,
            regTime: s.account.regtime
        },
        domain      : lib.main.domain,
        generateTime: s.account.science.updated ? s.account.science.updated : Math.round(+new Date() / 1000),
        science     : {
            current : {
                id      : scienceCurrentId,
                progress: scienceCurrentProgress
            },
            next    : scienceNext,
            state   : scienceState,
            progress: scienceProgress
        },

        // additional data
        version: version,
        country: (typeof s.account.country != 'undefined') ? {
            id  : s.account.country.id,
            name: s.account.country.name,
            flag: s.account.country.flag
        } : null
    };

    return data;
}

function formattingDataLegacy(s, lib) {
    let version = lib.main.version;

    let scienceCurrentId = s.account.science.current;
    let scienceState = stateStringToArray(s.account.science.state, scienceCurrentId);
    let scienceNext = s.account.science.next !== 999 ? s.account.science.next : null;
    let scienceCurrentProgress = s.account.science.inc;
    let scienceProgress = s.account.science.progress;


    let data = {
        // report data
        account     : [
            s.account.id,
            s.account.name,
            s.account.sex,
            s.account.race.id
        ],
        domain      : lib.main.domain,
        generatetime: s.account.science.updated ? s.account.science.updated : Math.round(+new Date() / 1000),
        science     : {
            current: {
                id      : scienceCurrentId,
                progress: scienceCurrentProgress
            }
            ,
            next   : scienceNext,
            known  : scienceState,
            started: scienceProgress
        },

        // additional data
        version: version,
        country: (typeof s.account.country != 'undefined') ? {
            id  : s.account.country.id,
            name: s.account.country.name,
            flag: s.account.country.flag
        } : null
    };

    return data;
}

export default {
    ready: function (complete, usVer) {
        let i;
        i = setInterval(function () {
            if (typeof servodata.account != 'undefined') {
                clearInterval(i);


                let data = formattingDataLegacy(servodata, lib);
                data.usVer = usVer;

                complete(data);
            }
        }, 100);
    },

    send: function (data, action) {
        let form = JQ('<form/>', {
            action: 'http://' + action + '/',
            method: 'post',
            target: '_blank',
            css   : {display: 'none'}
        });
        JQ('<input/>', {
            type : 'hidden',
            name : 'sData',
            value: encodeURIComponent(JSON.stringify(data))
        }).appendTo(form);
        form.appendTo('body');
        form.submit();
        setTimeout(function () {
            form.remove();
        }, 500);
    },

    formatReportBattle: function (r) {
        let attacker = {};
        attacker.id = r.data.attackers[0].acc;
        attacker.name = r.data.accounts[attacker.id][0];
        attacker.sex = r.data.accounts[attacker.id][1];
        attacker.race = r.data.accounts[attacker.id][2];
        attacker.townId = r.data.attackers[0].town;
        attacker.townName = r.data.towns[attacker.townId][0];

        let defending = {};
        defending.id = r.data.defenders ? r.data.defenders[0].acc : 0;
        defending.name = defending.id ? r.data.accounts[defending.id][0] : 0;
        defending.sex = defending.id ? r.data.accounts[defending.id][1] : 1;
        defending.race = defending.id ? r.data.accounts[defending.id][2] : 1;
        defending.townId = r.data.defenders ? r.data.defenders[0].town : 0;
        defending.townName = defending.townId ? r.data.towns[defending.townId][0] : '';


        let report = {
            "time"     : r.time,
            "domain"   : lib.main.domain,
            "owner"    : r.owner,
            "account1" : [attacker.id, attacker.name, attacker.sex, attacker.race],
            "account2" : [defending.id, defending.name, defending.sex, defending.race],
            "code"     : r.code,
            "data"     : {
                "account1" : [attacker.id, attacker.name, attacker.sex, attacker.race],
                "account2" : [defending.id, defending.name, defending.sex, defending.race],
                "army1"    : r.data.attackers[0].army,
                "army2"    : defending.id ? r.data.defenders[0].army : '',
                "bonus1"   : r.data.attackers[0].bonus,
                "bonus2"   : defending.id ? r.data.defenders[0].bonus : '',
                //"deathair" : "",
                //"defdamage": 0,
                //"defstruct": [3, 8],
                "destroy"  : r.data.destroy,
                "fullload" : 0,
                "grabbed"  : r.data.attackers[0].robbed,
                "killed"   : r.data.killed,
                "result"   : r.data.result,
                "survived1": r.data.attackers[0].survived,
                "survived2": defending.id ? r.data.defenders[0].survived : '',
                "tactics1" : "",
                "tactics2" : "",
                "wonder1"  : 0,
                "wonder2"  : 0
            }
            ,
            "id"       : r.id,
            "read"     : 0,
            "town1"    : [attacker.townId, attacker.townName],
            "town2"    : [defending.townId, defending.townName],
            "type"     : 19,
            "isAnother": false,
            "templates": []
        };
        return report;
    },

    domainToSign: function (domain) {
        let world, sign = 'en';

        world = domain.match(/en([\d]+)\.waysofhistory\.com/);
        if (!world) {
            world = domain.match(/ru([\d]+)\.waysofhistory\.com/);
            sign = 'ru';
        }
        if (!world) {
            world = domain.match(/w([\d]+)\.wofh\.ru/);
            sign = 'ru';
        }
        if (!world) {
            world = domain.match(/w([\d]+)\.wofh\.de/);
            sign = 'de';
        }
        if (!world) {
            return null;
        }

        return sign + world[1];
    }
};
