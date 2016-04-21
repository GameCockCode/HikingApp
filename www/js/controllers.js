angular.module('starter.controllers', ['ngCordova'])
.controller('LoginCtrl', function($scope, $state, Users) {
   $scope.authorize = function() {
    if(Users.getCurrentUser() == null){
        $state.go('tab.signin');
    }else{
        $state.go('tab.profile');
    }
  };
    $scope.data = {};
 
    $scope.signupEmail = function(){  
        //Create a new user on Parse
        var user = new Parse.User();
        user.set("username", $scope.data.username);
        user.set("password", $scope.data.password);
        user.set("email", $scope.data.email);

        // other fields can be set just like with Parse.Object
        //user.set("somethingelse", "like this!");

        user.signUp(null, {
        success: function(user) {
            // Hooray! Let them use the app now.
            console.log("New user registered")
            $state.go("tab.signin")
            
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            console.log("Error: " + error.code + " " + error.message);
        }
        });
    };

    $scope.loginEmail = function(){
        Parse.User.logIn($scope.data.username, $scope.data.password, {
            success: function(user) {
            $scope.currentUser = user;
            Users.setCurrentUser(user);
            $state.go('tab.trails')
            },
            error: function(user, error) {
            console.log(user);
            console.log("error!" + error.code + " " + error.message);
            alert("There seems to be a problem with your username or password. Please try again.")
            }
        });
    };
    
    $scope.logOut = function(form) {
        
        if (Users.getCurrentUser() == null) {
            console.log("There is no one currently logged in.");
        }else{
            Parse.User.logOut();
            $scope.currentUser = null;
            Users.setCurrentUser(null);
            $state.go('tab.trails');
        }
    };
 
})

.controller('CameraCtrl', function($scope, $cordovaCamera) {

   $scope.takePhoto = function () {
                  var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 375,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true,
                    correctOrientation:true
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;                       
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;                      
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }

})


.controller('TrailsCtrl', function($scope, $state, Trails, Users) {

     var self=this;

     function getDataFromParse() {

     var TrailObject = Parse.Object.extend("Trail");
     var query = new Parse.Query(TrailObject);

     if (self.parameter == null || self.parameter == ''){;

     } else {
        query.contains( "Name", self.parameter );

     }

      query.find({
    success: function(results) {
    var temptrails = [];

   /*  for (var i = 0; i < results.length; i++) {
            temptrails.push(results[i]);
            
        }
        $scope.trails = temptrails;*/
        $scope.trails = results;
        Trails.setTrails(results);
         $scope.$apply();

},
    error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
    }
});
              
                 
};


 
  //$scope.trails = Trails.all();
  $scope.trails = getDataFromParse();
  
  $scope.authorize = function() {
    if(Users.getCurrentUser() == null){
        return false;
    }else{
        return true;
    }
  };


   $scope.addToProposal=function (selectedtrail) {
      
            Trails.addToProposal(selectedtrail);
              $scope.$apply();
          
           
       
    };


 $scope.keyupprocess = function () {
          // console.log( "Handler for .keyup() called." );
          delay(function(){
            getDataFromParse();
              
          
            
              // $scope.search();

              //$scope.$apply();
              //$state.go('tab.trails');
             
            }, 500 );

          
   };


  

})

.controller('AddTrailCtrl', function($scope,$state,Trails, $ionicPopup , $cordovaCamera) {

    
    $scope.takeTrailPhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
                        
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
                
    $scope.chooseTrailPhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
    
    var self=this;
    self.trailName = '';
    self.hikeHours = null;
    self.trailLength = null;
    self.state = '';
    self.zip = '';
    self.city = '';
    self.latitude = null;
    self.longitude = null;
    
    $scope.save=function () {
        if (self.trailName == '' || self.state == '' || self.trailLength == null || self.hikeHours == null || self.zip == '', self.city == '' || self.latitude == null || self.longitude == null) {
            $ionicPopup.alert({
                title: 'Alert!',
                content: 'All fields are required!!!'
            }).then(function(res) {
                console.log('Test Alert Box');
            });
        } else {
            Trails.addtrail(self.trailName,self.trailLength,self.hikeHours,self.state,self.zip,self.city, self.longitude, self.latitude, $scope.imgURI);

            $scope.trails = Trails.all();
            self.trailName = '';
            self.trailLength = null;
            self.hikeHours = null;
            self.state = '';
            self.zip = '';
            self.city = '';
            self.latitude = null;
            self.longitude = null;

          //  $scope.trails = $scope.getDataFromParse();

            $state.go("tab.trails");
        }
    };

})

.controller('TrailDetailCtrl', function($scope, $state, $stateParams, $http, Trails, Comments, Users) {
    
    function getCommentData(){
        var comments = [];
        var CommentObject = Parse.Object.extend("Comment");
        var query = new Parse.Query(CommentObject);
        query.find({
        success: function(results) {
           /* for (var i = 0; i < results.length; i++) {
                comments.push(results[i]);
            }*/
            Comments.setComments(results);
            $scope.comments = Comments.get($stateParams.trailId);
            $scope.$apply();
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
        });
    }
    getCommentData();
    $scope.trail = Trails.get($stateParams.trailId);
    $scope.user = Users.getCurrentUser();
    var self=this;
    self.comment = '';
    
    $scope.save=function () {
        console.log("save called");
        Comments.addcomment(self.comment, $scope.trail, $scope.user);
        
        self.comment = '';
        $state.go("tab.trails");
    }

     $scope.addToProposal=function (selectedtrail) {
      
            Trails.addToProposal(selectedtrail);                 
           
       
    };
    
    $scope.authorize = function() {
    if(Users.getCurrentUser() == null){
        return false;
    }else{
        return true;
    }
  };
})

.controller('ProfileCtrl', function($scope, $state, $stateParams, Trails, Users) {
    
     
    $scope.user = Users.getCurrentUser();

    // This function retrieves the proposals for the current user to display on 
    // their profile.
    function getProposals() {

        var HikingProposal = Parse.Object.extend("HikingProposal");
        var query = new Parse.Query(HikingProposal);
        
        query.equalTo( "user", $scope.user );
        query.include("trail");
        query.find({
        success: function(results) {
            $scope.proposals = results;       
            $scope.$apply();
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
        });          
    };
    
    $scope.deleteItem= function(proposal) {
        
        var HikingProposal = Parse.Object.extend("HikingProposal");
        var query = new Parse.Query(HikingProposal);

        query.get(proposal.id,{
        success: function(results) {
            results.destroy({});
            getProposals();
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
        });  
    };
    
    $scope.doRefresh = function() {
        $http.get('/new-items')
            .success(function(newItems) {
        
        })
    }

    getProposals();

})

.controller('GeoLocCtrl', function($scope, $ionicLoading, $ionicPlatform,$stateParams, Trails) {

    var self=this;
    $scope.trail = Trails.get($stateParams.trailId);
    
    $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    });
  
    $ionicPlatform.ready(function() {
        self.lati  = $scope.trail.get("start_location").latitude
        self.longi = $scope.trail.get("start_location").longitude
        var myLatlng = new google.maps.LatLng(self.lati, self.longi);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };          

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
    
            var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: myLatlng
            });  

            var infoWindow = new google.maps.InfoWindow({
                content: "Here I am!"
            });
            
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
            });    
        }); 
        $ionicLoading.hide(); 
    });     
});
