
app.controller("menuCtrl",function(){ 
  
  this.mainMenu = true;
  this.maMenu = false;
  this.HeaderText = "";
  
  // MainMenu Active เพิ่มตัวแปรตัวจำนวน main menu
  
  this.usoAct = "";
  this.eclassAct = "";
  this.apAct = "";
  this.apAddAct = "";
  this.jobAct = "";
  
    this.setMainMenu = function(menuVal){
        this.mainMenu = menuVal;
    }
    
     this.setMaMenu = function(menuVal){
        this.maMenu = menuVal;
    }
    
    
    
 // เลือก Main Menu Active
 
    this.setMainMenuActive = function(menuAct){
        if (menuAct === 'uso'){
                this.usoAct = 'active';
                this.eclassAct = "";
                this.apAct = "";
                this.apAddAct = "";
                this.jobAct = "";
        }
        
        else if (menuAct == 'ecr'){
                this.usoAct = "";
                this.eclassAct = "active";
                this.apAct = "";
                this.apAddAct = "";
                this.jobAct = "";
        }
        
        else if (menuAct == 'ap'){
                this.usoAct = "";
                this.eclassAct = "";
                this.apAct = "active";
                this.apAddAct = "";
                this.jobAct = "";
        }
        
        else if (menuAct == 'apAdd'){
                this.usoAct = "";
                this.eclassAct = "";
                this.apAct = "";
                this.apAddAct = "active";
                this.jobAct = "";
        }
        
        else if (menuAct == 'job'){
                this.usoAct = "";
                this.eclassAct = "";
                this.apAct = "";
                this.apAddAct = "";
                this.jobAct = "active";
        }
        
    }

})


.controller("loadingCtrl",["$scope","$location","mySch",  
function($scope,$location,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    
  this.loading  = mySch.loading();
      
      
}]) 


// ไว้อัพเดทเวลาปัจจุบัน
app.controller("displayCtrl",function(){ 

this.toDay = new Date();
  
})









///////////////////////////


var ProgressDemoCtrl = function ($scope) {
   
  $scope.random = function() {
    var value = Math.floor((Math.random()*100)+1);
    var type;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    $scope.dynamic = value;
    $scope.dynamicObject = {
      value: value,
      type: type
    };
  };
  $scope.random();
  
  var types = ['success', 'info', 'warning', 'danger'];
  $scope.randomStacked = function() {
    $scope.stackedArray = [];
    $scope.stacked = [];
    
    var n = Math.floor((Math.random()*4)+1);

    for (var i=0; i < n; i++) {
        var value = Math.floor((Math.random()*30)+1);
        $scope.stackedArray.push(value);
        
        var index = Math.floor((Math.random()*4));
        $scope.stacked.push({
          value: value,
          type: types[index]
        });
    }
  };
  $scope.randomStacked();
};
