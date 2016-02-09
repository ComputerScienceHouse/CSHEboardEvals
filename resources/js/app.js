

function toggleSubmission(val,callback){     
 $.ajax({
        type: "GET",
        url: '../resources/api/?submission='+val,
        async:false,
        success: function(data) {
            if(val == "T"){
                logMessage = "Submissions are now open.";
            }
            else{
                logMessage = "Submissions are now closed.";
            }
            notify("success",logMessage);
            if(typeof callback === "function") callback(true);
            
        },
        error: function() {
            notify("error","Cannot toggle submissions.");
            if(typeof callback === "function")  callback(false);
        }
    });
    
    
    
}

function archiveEval($http,id){
    $http.get('../resources/api/?archive='+id)
    .success(function(data, status, headers, config) {
         $("#"+id).parent(".row").fadeOut();
    })
    .error(function(data, status, headers, config) {   
        notify("error","Cannot archive eval.") //debug
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    
   
    
}

function deleteEval($http,id){
    $http.get('../resources/api/?delete='+id)
    .success(function(data, status, headers, config) {
         $("#"+id).parent(".row").fadeOut();
    })
    .error(function(data, status, headers, config) {   
        notify("error","Cannot delete eval.") //debug
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    
   
    
}




var app = angular.module('EboardEvals', []);

app.controller('evalController', function ($scope, $http) {
    $http.get('../resources/api/?evals=active')
    .success(function(data, status, headers, config) {
        console.log(data) //debug
        $scope.data = data;
        
  })
  .error(function(data, status, headers, config) {   
        notify("error","Cannot get evals.") //debug
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
    $scope.archiveEval = function(id){
        
        archiveEval($http,id);
    }
    $scope.deleteEval = function(id){
        //validate
        var response = confirm("Are you sure you want to delete this eval? This cannot be undone.");
        
        if(response == true){
            deleteEval($http,id);
        }
        
    }


});

app.controller('navController', function ($scope, $http) {
    $http.get('../resources/api/?submission')
    .success(function(data, status, headers, config) {
        console.log(data) //debug
        $scope.submissions = data.data[0].config_value;
        
  })
  .error(function(data, status, headers, config) {   
        notify("error","Cannot get submission status.") //debug
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
    
  $scope.toggleSubmission = function(val){
     toggleSubmission(val, function(success){
        if(val == "F"){
            if(success){
                $scope.submissions = "F";
            }
          
        }
         else{
             if(success){
                $scope.submissions = "T";
            }
          
        }  
         
     });
      
  }


});