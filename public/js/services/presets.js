angular.module('MoneyBaller').factory("Presets", ['$http', 'Global', 'Spearman', function($http, Global, Spearman) {
  var exports = {
    userPresets: [],
    sendScore: function(weights){
      var name = prompt("Name these Slider Presets");
      if (!name){return;}
      delete weights._id;
      delete weights.created;
      weights.score = Spearman.rhoVal;
      weights.presetName = name;
      weights.user = Global.user._id;
      $http.post('/highscore',weights).success(function(data){
        if (exports.userPresets){
          exports.userPresets.push(weights);
        }
      });
    }
  }
  if(Global.user){
    $http.get('/presets').success(function(data){
      exports.userPresets = data;
    });
  }
  return exports;
}]);