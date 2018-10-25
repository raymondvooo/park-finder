'use strict';

module.exports = function(AppUser) {
    AppUser.afterRemote('login', async(ctx, user, next) =>{
        if (user) {
            user.token = user.id;
        }
   })
    
AppUser.observe('after save', function(ctx, next) {
    if (ctx.isNewInstance === true) {
      var instance = ctx.instance;
       instance.createAccessToken(1209600000, function(err, response){
          if (err === null) {
             ctx.instance['userId'] = response.userId
             ctx.instance["token"] = response.id;
           }
            next();
         });
          }
          else {
              next();
          }
      });
  

};

