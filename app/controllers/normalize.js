var _ = require('lodash');
exports.normTeams = function(allStats,map){
  var teams = {};
  for (var player in allStats){
    pTeam = allStats[player].TEAM_ABBREVIATION;
    teams[pTeam] = teams[pTeam] || {};
    for (var stat in allStats[player]){
      if (!map[stat].name && stat !== 'MIN'){continue;}
      teams[pTeam][stat] = teams[pTeam][stat] || 0;
      teams[pTeam][stat] += allStats[player][stat];
    }
  }
  toPerMinute(teams,map,1);
  var mmr = maxMinRange(teams);
  normalize(teams,mmr);
  return teams;
};

exports.normPlayers = function(allStats,map,teams){
  var players = _.cloneDeep(allStats);
  var totalLeagueMinutes = 0;
  for (var team in teams){
    totalLeagueMinutes += team.MIN;
  }
  var cutoff = totalLeagueMinutes/1200;
  toPerMinute(players,map,1);
  var mmr = maxMinRange(players,cutoff);
  normalize(players,mmr);
  console.log(players);
  return players;
};

var normalize = function(collection,mmr){
  var norm = {};
  for (var item in collection){
    for (var stat in collection[item]){
      if (typeof collection[item][stat] === "string"){continue;}
      collection[item][stat] = 1-(mmr[stat].max - (collection[item][stat]))/mmr[stat].range;
    }
  }
};

var maxMinRange = function(collection,cutoff){
  //expected structure of teams{team:{stat:x}}, players{player:{stat:x}}
  var mmr = {};
  for (var item in collection){
    for (var stat in collection[item]){
      if (cutoff && collection[item].MIN < cutoff){continue;}
      mmr[stat] = mmr[stat] || {max:0,min:100000,range:0};
      var thisStat = collection[item][stat];
      if (thisStat > mmr[stat].max){
        mmr[stat].max = thisStat;
      }
      if (thisStat < mmr[stat].min){
        mmr[stat].min = thisStat;
      }
      thisRange = mmr[stat].max - mmr[stat].min;
      if (thisRange > mmr[stat].range){
        mmr[stat].range = thisRange;
      }
    }
  }
  return mmr;
};

var toPerMinute = function(collection,map,teamify){
  for (var item in collection){
    for (var stat in collection[item]){
      if (!map[stat].name){continue;}
      collection[item][stat] = teamify * collection[item][stat]/collection[item].MIN;
    }
  }
};