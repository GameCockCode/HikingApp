angular.module('starter.services', [])

.factory('Users', function(){
  
  var currentUser = null;  
  var users = [];
  var UserObject = Parse.Object.extend("User");
  var query = new Parse.Query(UserObject);
    query.find({
    success: function(results) {
        for (var i = 0; i < results.length; i++) {
            users.push(results[i]);
        }
    },
    error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
    }
    });
    
    
     return {
        get: function(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].get("objectId") === userId) {
                    return users[i];
                }
            }
        },
        getCurrentUser: function() {
            return currentUser;
        },
        setCurrentUser: function(user){
            currentUser = user;
        }
     };
})

.factory('Comments', function() {

  var comments = [];

  return {
    all: function() {
      return comments;
    },
    setComments: function(newcomments) {
        comments = newcomments;
    },
    get: function(trailId) {
      var trailcomments =[];
      for (var i = 0; i < comments.length; i++) {
        if (comments[i].get("trail").id === trailId) {
            trailcomments.push(comments[i]);
        }

      }
        return trailcomments;
    },
    addcomment: function (text, trail, user) {
 
        var Comment = Parse.Object.extend("Comment");
        var comm = new Comment();
        comm.set("comment", text);
        comm.set("trail", trail);
        comm.set("poster", user);
        comm.save(null,{
            success: function(gameScore) {
                alert('New comment created with objectId: ' + comm.id);
            },
            error: function(gameScore, error) {
                alert('Failed to create new comment, with error code: ' + error.message);
            }
        });
    }
  };
})
.factory('Trails', function() {

    var trails = [];

    return {
    all: function() {
        return trails;
    },
    setTrails: function(newtrails) {
        trails = newtrails;
    },
    addToProposal: function(selectedtrail) {
        var currentUser = Parse.User.current();
        var HikingProposal = Parse.Object.extend("HikingProposal");
        var hikingProposal = new HikingProposal();
        hikingProposal.set("user", currentUser);
        hikingProposal.set("trail", selectedtrail);
        hikingProposal.set("date", new Date());
        
        

        hikingProposal.save(null,{
                            success: function(propose) {
                                alert("This trail has been added to your list!");
                                console.log('New Trail created with name: ' + hikingProposal.id);
                            },
                            error: function(propose, error) {
                                alert("Oops! Looks like something went wrong. Please try again..");
                                console.log('Failed to create new object, with error code: ' + error.message);
                            }
                        });
        
    },
    get: function(trailId) {
        for (var i = 0; i < trails.length; i++) {
            if (trails[i].id === trailId) {
                return trails[i];
            }
        }
        return null;
    },
    addtrail: function(trailName,trailLength,hikeHours,state,zip,city,longitude,latitude, imagedata){     
 
        var currentUser = Parse.User.current();
        var Trail = Parse.Object.extend("Trail");
        var geopoint = new Parse.GeoPoint({latitude: latitude, longitude: longitude});
        
        if(currentUser==null){
          console.log(" cannot find user obj");
        }

        var file = new Parse.File("myfile.zzz", { base64: imagedata });
        var trail = new Trail();
        trail.set("Name", trailName);
        trail.set("length", trailLength);
        trail.set("hike_hours", hikeHours);
        trail.set("state", state);
        trail.set("zip_code", zip);
        trail.set("city", city);
        trail.set("start_location", geopoint);

 
        if (imagedata !== undefined){
            file.save({ success: function() {
                
            },
            error: function(file, error) {
              alert('Failed to create new object, with error code: ' + error.message);
            }
        }).then(function(thefile) {
        // The file has been saved to Parse.
        trail.set("picture", thefile);
        trail.save(null,{
                            success: function(gameScore) {
                                alert('New Trail created with name: ' + trail.Name);
                            },
                            error: function(gameScore, error) {
                                alert('Failed to create new object, with error code: ' + error.message);
                            }
                        });
        });
        }  else {
            trail.save(null, {
          success: function(gameScore) {
           
            alert('New Trail created with name: ' + trail.Name);
            },
          error: function(gameScore, error) {
             
              alert('Failed to create new object, with error code: ' + error.message);
          }
          });

          }
    }
  };
});
