define("Utility", ['underscore'], function (_) {
_.mixin({
      whatsChanged: function(oldValues,newValues) {
        var returnObj = {};
        _.each(oldValues,function(oldValue,key){
          if(newValues[key] != oldValue) returnObj[key] = newValues[key];
        })

        return returnObj;
      }
    })
});