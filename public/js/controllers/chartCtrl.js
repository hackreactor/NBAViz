angular.module('mean.chart')
  .controller('chartCtrl', ['$scope', '$http', 'Global', 'Stats', 'Spearman', function ($scope, $http, Global, Stats, Spearman) {
    $scope.options = {width: 840, height: 500};
    $scope.teams = Stats.teams;
    $scope.calculateAllTeamStarVals = Stats.calculateAllTeamStarVals;
    $scope.playerStars = Stats.playerStars
    $scope.changeSliders = Stats.changeSliders;
    $scope.nestedSliders = Stats.nestedSliders;
    $scope.spearman = Spearman;
    $scope.rhoVal = 0;

    Global.stats.then(function(data){
      $scope.teamStats = data.teams;
      $scope.teamStatsNorm = data.teamsNorm;
      $scope.statsInfo = data.statsInfo
      $scope.stats = {};
      for (var statName in $scope.statsInfo){
        if(statName === 'GP' || statName === 'MIN'){
          continue;
        }
        $scope.stats[statName] = {weight: 1, cat: $scope.statsInfo[statName].cat};
      }
      $scope.nestedSliders = Stats.assignNestedSliders($scope.stats, $scope.nestedSliders);
      $scope.calculateAllTeamStarVals($scope.teamStatsNorm, $scope.teams, $scope.stats);
      $scope.playerStars($scope.teamStatsNorm, $scope.stats);
      $scope.updateRho();
    });

    // for collasping grouped sliders
    $scope.isCollapsed = true;

    $scope.updateRho = function (){
      $scope.rhoVal = $scope.spearman.rho($scope.teams);
    }

    $scope.players = [
      { playerName: "Lebron James",
        topFiveStats: [
          { statName: "Stat #1", statVal: 0.777 },
          { statName: "Stat #2", statVal: 0.555 },
          { statName: "Stat #3", statVal: 0.777 },
          { statName: "Stat #4", statVal: 0.333 },
          { statName: "Stat #5", statVal: 0.777 }
        ]
      },
      { playerName: "Dwayne Wade",
        topFiveStats: [
          { statName: "Stat #1", statVal: 0.777 },
          { statName: "Stat #2", statVal: 0.555 },
          { statName: "Stat #3", statVal: 0.777 },
          { statName: "Stat #4", statVal: 0.333 },
          { statName: "Stat #5", statVal: 0.777 }
        ]
      },
      { playerName: "Kobe Bryant",
        topFiveStats: [
          { statName: "Stat #1", statVal: 0.777 },
          { statName: "Stat #2", statVal: 0.555 },
          { statName: "Stat #3", statVal: 0.777 },
          { statName: "Stat #4", statVal: 0.333 },
          { statName: "Stat #5", statVal: 0.777 }
        ]
      },
      { playerName: "Stephen Curry",
        topFiveStats: [
          { statName: "Stat #1", statVal: 0.777 },
          { statName: "Stat #2", statVal: 0.555 },
          { statName: "Stat #3", statVal: 0.777 },
          { statName: "Stat #4", statVal: 0.333 },
          { statName: "Stat #5", statVal: 0.777 }
        ]
      },
      { playerName: "Andrew Bogut",
        topFiveStats: [
          { statName: "Stat #1", statVal: 0.777 },
          { statName: "Stat #2", statVal: 0.555 },
          { statName: "Stat #3", statVal: 0.777 },
          { statName: "Stat #4", statVal: 0.333 },
          { statName: "Stat #5", statVal: 0.777 }
        ]
      },
    ];

    $scope.makeHeadShotUrl = function(name) {
      var url = "http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/statscube/players/large/";
      var name_parts = name.split(" ");
      var new_name = name_parts.join("_");
      
      return url + new_name.toLowerCase();
    };
   

    // $scope.findOptimal = function (){
    //   for (var shootingSliderPosition = 0; shootingSliderPosition <= 5; shootingSliderPosition++) {
    //     for (var reboundingSliderPosition = 0; reboundingSliderPosition <= 5; reboundingSliderPosition++) {
    //       for (var possessionSliderPosition = 0; possessionSliderPosition <= 5; possessionSliderPosition++) {
    //         for (var defenseSliderPosition = 0; defenseSliderPosition <= 5; defenseSliderPosition++) {
    //           for (var athleticismSliderPosition = 0 ; athleticismSliderPosition <= 5 ; athleticismSliderPosition++) {
    //             $scope.nestedSliders.Athleticism.main = athleticismSliderPosition;
    //             $scope.changeSliders($scope.nestedSliders,"Athleticism");
    //             $scope.nestedSliders.Defense.main = defenseSliderPosition;
    //             $scope.changeSliders($scope.nestedSliders,"Defense");
    //             $scope.nestedSliders.Possession.main = possessionSliderPosition;
    //             $scope.changeSliders($scope.nestedSliders,"Possession");
    //             $scope.nestedSliders.Rebounding.main = reboundingSliderPosition;
    //             $scope.changeSliders($scope.nestedSliders,"Rebounding");
    //             $scope.nestedSliders.Shooting.main = shootingSliderPosition;
    //             $scope.changeSliders($scope.nestedSliders,"Shooting");
    //             $scope.calculateAllTeamStarVals($scope.teamStatsNorm, $scope.teams, $scope.stats);
    //             Spearman.rho($scope.teams);
    //           }
    //         }
    //       }
    //     }
    //   }
    // };
  }]);



