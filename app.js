/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// สร้าง module ชื่อ app และ inject ngRoute เข้าไป หมายถึง เรียกใช้งาน ngRoute service  
var app = angular.module("app",["ngRoute"])   

// กำหนดค่า url สำหรับเรียกไฟล์ php ด้านล่าง เป็นของ ที่ทดสอบ เปลี่ยนตามความเหมาะสม  
// โดยเรียก path ให้ถูกต้อง  
.value("urlData","http://sp.prinnm.com/data/model.php")  //http://localhost/obec_uso/data/model.php  //http://sp.prinnm.com/data/model.php
// กำหนด object service ชื่อ myFriend   
.factory("mySch",["$http","urlData", // inject ค่า $http กับ urlData ไปใช้งาน  
function($http,urlData){ // กำหนดตรงนี้ด้วย  
    var factory = {}; // สร้างตัวแปร object  
    var loading_stat = "";
    
    // สร้างฟังก์ั่น ใน service myFriend ตัวนี้เป็น  
    // ฟังก์ชั่น สำหรับแสดงข้อมูล มีการส่งค่า id ไปด้วย โดยจะเป็นค่าว่างก็ได้  
    factory.viewSch = function(Id){  
        // ใช้ $http service ไปดึงข้อมูลมาแสด ส่งค่า get viewSch กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.get(urlData+"?viewSch=&Id="+Id);  // คืนค่าข้อมูลกลับ  
    };  
   
    // สร้างฟังก์ชั่น ใน service myFriend ตัวนี้เป็นฟังก์ชั่น  
    // สำหรับการอัพเดทข้อมูล มีการส่งค่าข้อมูลในฟอร์ม และ Id ของข้อมูลที่จะแก้ไขเข้ามาด้วย  
    factory.updateSch = function(objSch,Id){  
    // ใช้ http service ส่งค่าข้อมูลไปทำการแก้ไข และมีการส่งค่า get updateFriend กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.post(urlData+"?updateSch&Id="+Id,objSch);  
    };          
      
    // สร้างฟังก์ั่น ใน service mySch ตัวนี้เป็น  
    // ฟังก์ชั่น บันทึกข้อมล ส่งค่าแบบ post ส่งค่า object ชุดข้อมูล objFriend  
    factory.addSch = function(objSch){  
         // ใช้ $http service ส่งค่าแบบ post   
         // และมีการส่งตัวแปรแบบ get ชื่อ addFriend ไปเป็นเงื่อนไขทำงานคำสั่ง เพิ่มข้อมูล  
      return $http.post(urlData+"?addSch",objSch);  
    };  
      
     // สร้างฟังก์ั่น ใน service myFriend ตัวนี้เป็น  
    // ฟังก์ชั่น ลบข้อมูล โดยส่งค่า Id เข้าไปทำการลบข้อมูล  
    factory.deleteSch = function(Id){  
         // ใช้ $http service ส่งค่าแบบ get   
         // และมีการส่งตัวแปรแบบ get ชื่อ deleteFriend  
        // กับ Id สำหรัลใย้ในการลบข้อมูล  
      return $http.get(urlData+"?deleteSch&Id="+Id);      
    };  
    
         ////////////////////// AP ////////////////////////////
    factory.viewAp = function(Id){  
        // ใช้ $http service ไปดึงข้อมูลมาแสด ส่งค่า get viewSch กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.get(urlData+"?viewAp=&Id="+Id);  // คืนค่าข้อมูลกลับ  
    }; 
    
    factory.ApviewAp = function(Id){  
        // ใช้ $http service ไปดึงข้อมูลมาแสด ส่งค่า get viewSch กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.get(urlData+"?ApviewAp=&Id="+Id);  // คืนค่าข้อมูลกลับ  
    }; 
    
    factory.viewApSn = function(Id){  
        // ใช้ $http service ไปดึงข้อมูลมาแสด ส่งค่า get viewSch กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.get(urlData+"?viewApSn=&Id="+Id);  // คืนค่าข้อมูลกลับ  
    }; 
    
    factory.maAp = function(Id){  
        // ใช้ $http service ไปดึงข้อมูลมาแสด ส่งค่า get viewSch กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.get(urlData+"?maAp=&Id="+Id);   
    }; 
    
    factory.addAp = function(objSch){  
      return $http.post(urlData+"?addAp",objSch);  
    };
    
     factory.updateAp = function(objSch,Id){  
    // ใช้ http service ส่งค่าข้อมูลไปทำการแก้ไข และมีการส่งค่า get updateFriend กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.post(urlData+"?updateAp&Id="+Id,objSch);  
    };
    
    factory.updateApSn = function(objSch,Id){  
    // ใช้ http service ส่งค่าข้อมูลไปทำการแก้ไข และมีการส่งค่า get  กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.post(urlData+"?updateApSn&Id="+Id,objSch);  
    }; 
    
    
    ////////////////////// E-Classroom ////////////////////////////
    factory.viewEcr = function(Id){  
        // ใช้ $http service ไปดึงข้อมูลมาแสด ส่งค่า get viewSch กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.get(urlData+"?viewEcr=&Id="+Id);  // คืนค่าข้อมูลกลับ  
    }; 
    
    factory.updateEcr = function(objSch,Id){  
    // ใช้ http service ส่งค่าข้อมูลไปทำการแก้ไข และมีการส่งค่า get updateFriend กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.post(urlData+"?updateEcr&Id="+Id,objSch);  
    }; 
    
      
    ////////////////////// USO ////////////////////////////
    factory.viewUso = function(Id){  
        // ใช้ $http service ไปดึงข้อมูลมาแสด ส่งค่า get viewSch กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.get(urlData+"?viewUso=&Id="+Id);  // คืนค่าข้อมูลกลับ  
    }; 
    
    factory.updateUso = function(objSch,Id){  
    // ใช้ http service ส่งค่าข้อมูลไปทำการแก้ไข และมีการส่งค่า get updateFriend กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.post(urlData+"?updateUso&Id="+Id,objSch);  
    }; 
    
    ////////////////////// SCH ////////////////////////////
    factory.viewSch = function(Id){  
        // ใช้ $http service ไปดึงข้อมูลมาแสด ส่งค่า get viewSch กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.get(urlData+"?viewSch=&Id="+Id);  // คืนค่าข้อมูลกลับ  
    }; 
    
    
    ////////////////////// Job ////////////////////////////
    factory.viewJob = function(Id){  
        // ใช้ $http service ไปดึงข้อมูลมาแสด ส่งค่า get viewSch กับ Id ที่เป็นตัวแปรไปด้วย  
      return $http.get(urlData+"?viewJob=&Id="+Id);  // คืนค่าข้อมูลกลับ  
    }; 
     
    factory.addJob = function(objSch){  
      return $http.post(urlData+"?addJob",objSch);  
    };
    
    
    //////////////////////////////////////////////////////
    
    
    factory.setLoading = function(getStat){     
      loading_stat = getStat; 
    };  
     factory.loading = function(){     
      return loading_stat == "loading";  
    }; 
    
      
    return factory; // คืนค่า object ไปให้ myFriend service  
}])  
// การ config ค่า provider service ในที่นี้เป็นการตั้งต่าการ  
// ลิ้งค์ไปมาระหว่างไฟล์ ด้วย $routeProvider   
.config(function($routeProvider) {  
  $routeProvider  
    .when('/', {  // ถ้ามีค่าเท่ากับ  /   
      controller:'UsoListCtrl', // ให้กำหนด หรือสร้าง controller ชื่อ ListCtrl   
      templateUrl:'tpl/uso_list.html' // โดยดึงจากไฟล์ templage ชื่อ list.html  
    })  
    .when('/view/:Id', { // เหมือนด้านบน แค่เปลี่ยนคำ  
      controller:'ViewCtrl',  
      templateUrl:'tpl/view.html'  
    })    
    .when('/edit/:Id', {  
      controller:'EditCtrl',  
      templateUrl:'tpl/detail.html'  //**
    })  
    .when('/new', {  
      controller:'CreateCtrl',  
      templateUrl:'tpl/detail.html'  //** test
    }) 
    
     ////////////// AP //////////////////////
     .when('/ap', {  
      controller:'ApListCtrl',  
      templateUrl:'tpl/ap_list.html'  //** test
    })
    
    .when('/ap_listap', {  
      controller:'ApListAPCtrl',  
      templateUrl:'tpl/ap_listap.html'  
    })
    
    .when('/ap_view/:Id', { // เหมือนด้านบน แค่เปลี่ยนคำ  
      controller:'ApViewCtrl',  
      templateUrl:'tpl/ap_view.html'  
    }) 
    
    .when('/ap_add/:Id', { // เหมือนด้านบน แค่เปลี่ยนคำ  
      controller:'ApAddCtrl',  
      templateUrl:'tpl/ap_add.html'  
    }) 
    
     .when('/ap_ma/:Id', { // ตัวแทนเข้า
      controller:'ApMaCtrl',  
      templateUrl:'tpl/ap_ma.html'  
    }) 
    
     .when('/ap_edit/:Id', {  
      controller:'ApEditApCtrl',  
      templateUrl:'tpl/ap_add.html'  //**
    }) 
    
     .when('/ap_upload', {  
      controller:'',  
      templateUrl:'tpl/ap_upload.html'  //**
    }) 
    
    
         ////////////// E-Class //////////////////////
     .when('/ecr', {  
      controller:'EcrListCtrl',  
      templateUrl:'tpl/ecr_list.html'  //** test
    })
    
    .when('/ecr_edit/:Id', {  
      controller:'EcrEditCtrl',  
      templateUrl:'tpl/ecr_detail.html'  //**
    }) 
        
    .when('/ecr_view/:Id', { // เหมือนด้านบน แค่เปลี่ยนคำ  
      controller:'EcrViewCtrl',  
      templateUrl:'tpl/ecr_view.html'  
    }) 
    
    
    ////////////// USO //////////////////////
    
    .when('/uso', {  
      controller:'UsoListCtrl',  
      templateUrl:'tpl/uso_list.html'  //** test
    })
    
    .when('/uso_view/:Id', { // เหมือนด้านบน แค่เปลี่ยนคำ  
      controller:'UsoViewCtrl',  
      templateUrl:'tpl/uso_view.html'  
    }) 
    
    .when('/uso_edit/:Id', {  
      controller:'UsoEditCtrl',  
      templateUrl:'tpl/uso_detail.html'  //**
    }) 
    
     .when('/print/uso/:Id', {  
      controller:'UsoViewCtrl',  
      templateUrl:'../print/uso.html'  //**
    }) 
    
    
    ////////////  SCH View ////////////////////
    .when('/sch_view/:Id', { // เหมือนด้านบน แค่เปลี่ยนคำ  
      controller:'SchViewCtrl', 
      templateUrl:'tpl/sch_view.html'  
    }) 
    
    ////////////// JOB //////////////////////
    
     .when('/job', {  
      controller:'JobListCtrl',  
      templateUrl:'tpl/job_list.html'  //** test
    })
    
    
    
    .otherwise({ // กรณีอื่นๆ ที่่ไม่เข้าเงื่อนไข  
      redirectTo:'/' // ให้ไปที่ ค่า /  
    });  
})  
// พอเราเปิดมาครั้งแรก $routeProvider จะเท่ากับ / ตาม config ด้านลน  
// ทำให้มีการสร้าง ListCtrl controller ขึน เราจะมาใช้งานกันในส่วนหน้าแรกกัน ในส่วนนี้  
// มีการ inject หรือใช้งาน $scope , $location (คล้าย window.location) และ myFriend service ที่เราสร้าง  
.controller("ListCtrl",["$scope","$location","mySch",  
function($scope,$location,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
      
    $scope.sch = {}; // กำหนด ตัวแปร object ที่เราจะไปเรียกใช้ ในหน้า list.html  
    // พอแสดงหน้า list.html ให้ เรียกใช้งาน ฟังก์ชั่น ใน myFriend service ที่เราสร้าง  
    mySch.viewSch('').success(function(result){ // ดึงข้อมูลสำเร็จ ส่งกลับมา  
        $scope.sch = result;  // เอาค่าข้อมูลที่ได้ กำหนดให้กับ ตัวแปร object  
    });  
      
    $scope.predicate = "smis";  // อันนี้กำหนดค่า สำหรับการเรียงข้อมูลเริ่มต้น ในตารางไฟล์ list.html  
    // เรียงข้อมูลจาก id  
   
    // กำหนดฟังก์ชัน ลบข้อมูล จากที่เรียกใช้ในหน้า template list.html  
    $scope.deleteData = function(Id){ // ส่ง Id เข้ามา  
        if(confirm("Confirm delete?")){ // ขึ้นแจ้งยืนยันการลบก่อน  
            // ถ้ายืนยันการลบข้อมูลแล้ว ให้เรยกใช้งาน mySch service ที่เราสร้าง เพื่อลบข้อมูล  
            mySch.deleteSch(Id).success(function(){ // ถ้า ok ลบข้อมูล  
               $location.path("#/"); // ลบแล้วให้รีเฟรส  
            });       
        }  
    };      
      
}])  
//  เมื่อมาที่หน้า เพิ่มข้อมูล ทำให้มีการสร้าง CreateCtrl controller ขึ้น  
// มีการ inject หรือใช้งาน $scope , $location (คล้าย window.location) และ myFriend service ที่เราสร้าง  
.controller("CreateCtrl",["$scope","$location","mySch",  
function($scope,$location,mySch){  // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนด ฟังก์ชั่น สำหรับรับค่า การ submit ฟอร์ม โดยส่ง object data เข้ามาด้วย  
    $scope.submitForm = function(objSch){  
        if($scope.myForm.$valid){ // ตรวจสอบฟอร์ม หากพร้อมให้ทำงาน  
            // เรียกใช้งาน ฟังก์ชั่น ใน myFriend service ที่เราสร้าง ชื่อ addFriend  
            // โดยจะส่งข้อมูล object เข้าไป  
            mySch.addSch(objSch).success(function(){  
                // หากทำการบันทึกข้อมูลสำเร็จ  
                $scope.myForm.$setPristine(); // ล้างค่าข้อมูลในฟอร์ม พร้อมบันทึกใหม่  
                $scope.data = null; // ให้ object ชื่อ data เป็นค่าว่าง รอรับข้อมูลใหม่  
            });  
        }  
    };  
      
}])  
// เมื่อมาที่หน้า แสดงข้อมูล จะมีการสร้าง ViewCtrl controller จากค่าการ config ด้านบน  
// เมื่อมีการคลิก เข้ามาหน้าแสดงข้อมูล จะมีการส่งค่า Id ของข้อมูลเข้ามาด้วย  
// inject หรือเรียกใช้ $scope $location $routeParams และก็ myFriend service ที่เราสร้าง  
.controller("ViewCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object สำหรับไว้ส่งค่าไปแสดงในหน้า view.html  
    $scope.sch = {};  
    // เรียกใช้งาน ฟังก์ชั่น viewSch โดยส่งค่า Id ของข้อมูลไปด้วย  
    // ฟังก์ชั่นนี้ เราไม่ต้องสร้างเพิ่ม ใช้ตัวเดียวกันกับ ตอนลิสรายการ แต่กรณีนี้มีการส่ง Id ไปด้วย  
    mySch.viewSch($routeParams.Id).success(function(result){  
        $scope.sch = result;  // เมื่อมีกาาคืนค่า ก็ให้เขาข้อมูลที่ได้มาไว้ในตัวแปร object  
    });  
}])  
// เมื่อมาที่หน้า แก้ไข จะมีการสร้าง EditCtrl controller จากค่าการ config ด้านบน  
// เมื่อมีการคลิก เข้ามาหน้าแก้ไขข้อมูล จะมีการส่งค่า Id ของข้อมูลเข้ามาด้วย  
// หรือเรียกใช้ $scope $location $routeParams และก็ myFriend service ที่เราสร้าง  
.controller("EditCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object เพื่อใช้งานในหน้าแก้ไข ชื่อต้องเหมือนกับชื่อ instance อ้างอิงที่เราใช้งาน  
    $scope.data = {};  
   // เรียกใช้งาน ฟังก์ชั่น viewSch โดยส่งค่า Id ของข้อมูลไปด้วย  
    // ฟังก์ชั่นนี้ เราไม่ต้องสร้างเพิ่ม ใช้ตัวเดียวกันกับ ตอนลิสรายการ แต่กรณีนี้มีการส่ง Id ไปด้วย      
    mySch.viewSch($routeParams.Id).success(function(result){  
        // เนื่องจากหน้า แก้ไขเราใช้ไฟล์ เดียวกับตอนเพิ่มข้อมูล  
        // ดังนั้นการส่งค่ากลับไปแบบ ใน ViewCtrl จะทำไม่ได้ เราจะใช้วิธี  
        // ส่งค่าแบบกำหนดค่า object แต่ละตัวแทนเอา โดยผลลัพธ์ของข้อมูล  
        // ที่ส่งกลับมาจะมี index id = 0 การเรียกใช้จึงเป็น result[0].id แบบนี้เป็นต้น  
        $scope.data.smis = result[0].smis;  
        $scope.data.name = result[0].name;  
        $scope.data.tel = result[0].tel;  
        $scope.data.address = result[0].address; 
        // เมื่อรับค่าจากการไปดึงข้อมูลส่วนที่ต้องการมาแก้ไข แล้ว ตัวแปรเหล่านี้  
        // ก็จะไปแสดงในหน้าแก้ไข  
          
    });  
  
//    สร้างฟังก์ชั่น รับค่าการบันทึกข้อมูล  
//    เมื่อคลิกที่ปุ่ม save โดยใช้ฟังก์ชั่น submitForm โดยส่งค่า object instance ข้อมูลฟอร์มเข้ามาด้วย  
    $scope.submitForm = function(objSch){  
        if($scope.myForm.$valid){  // ตรวจสอบข้อมูลฟอร์ม ถูกต้องหรือไม่  
            // เรียกใช้งานฟังก์ชั่น updateFriend ใน myFriend service เพื่ออัพเดทข้อมูล  
            // โดยจะมีการส่งค่า object ข้อมูล และ  Id ของข้อมูล เพื่ออ้างอิง ไปทำการแก้ไข ด้วย  
            mySch.updateSch(objSch,$routeParams.Id).success(function(){  
                // เมื่อแก้ไขข้อมูลสำหรับ ล้างค่าตัวแปร object ที่เราสร้าง  
                $scope.data = null;  
//                ลิ้งค์ไปหน้า รายการที่เราแก้ไข เพื่อดูข้อมูลว่า แก้ไขเรียบร้อยถูกต้องไหม  
               $location.path("/view/"+$routeParams.Id);                    
            });  
        }  
    };      
  
    // ในหน้าแก้ไขข้อมูล จะพบว่า เรามีปุ่มลบ ปุ่มนี้จะแสดงเมื่อมีการแก้ไขข้อมูล หรือมีการส่งค่า  
    // Id ข้อมูลที่ต้องการแก้ไข เข้าไปด้วย การลบข้อมูลไม่มีอะไร เหมือนกับ การลข้อมูลในหน้า  
    // ลิสรายการ ตามโค้ดด้านบน ที่เคยอธิบายแล้ว บรรทัดส่วนนี้ขอไม่่อธิบายเพิ่ม  
    $scope.deleteData = function(Id){  
        if(confirm("Confirm delete?")){  
            mySch.deleteSch(Id).success(function(){  
                $scope.data = null;  
               $location.path("#/");  
            });       
        }  
    };      
  
      
}])  
// controller หน้า index.html หลัก  

//////////////////////////    AP  ////////////////////////////////////////      
.controller("ApListCtrl",["$scope","$location","mySch",  
function($scope,$location,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
      
    $scope.ap = {}; // กำหนด ตัวแปร object ที่เราจะไปเรียกใช้ ในหน้า list.html  
    // พอแสดงหน้า list.html ให้ เรียกใช้งาน ฟังก์ชั่น ใน myFriend service ที่เราสร้าง  
    mySch.viewAp('').success(function(result){ // ดึงข้อมูลสำเร็จ ส่งกลับมา   << USO
        $scope.ap = result;  // เอาค่าข้อมูลที่ได้ กำหนดให้กับ ตัวแปร object  
    });  
      
    $scope.predicate = "ap_smis";  // อันนี้กำหนดค่า สำหรับการเรียงข้อมูลเริ่มต้น ในตารางไฟล์ list.html  
    // เรียงข้อมูลจาก id  
   
    // กำหนดฟังก์ชัน ลบข้อมูล จากที่เรียกใช้ในหน้า template list.html  
    $scope.deleteData = function(Id){ // ส่ง Id เข้ามา  
        if(confirm("Confirm delete?")){ // ขึ้นแจ้งยืนยันการลบก่อน  
            // ถ้ายืนยันการลบข้อมูลแล้ว ให้เรยกใช้งาน mySch service ที่เราสร้าง เพื่อลบข้อมูล  
            mySch.deleteUso(Id).success(function(){ // ถ้า ok ลบข้อมูล  
               $location.path("#/"); // ลบแล้วให้รีเฟรส  
            });       
        }  
    };      
      
}])  

.controller("ApListAPCtrl",["$scope","$location","mySch",  
function($scope,$location,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
      
    $scope.ap = {}; // กำหนด ตัวแปร object ที่เราจะไปเรียกใช้ ในหน้า list.html  
    // พอแสดงหน้า list.html ให้ เรียกใช้งาน ฟังก์ชั่น ใน myFriend service ที่เราสร้าง  
    mySch.ApviewAp('').success(function(result){ // ดึงข้อมูลสำเร็จ ส่งกลับมา   << 
        $scope.ap = result;  // เอาค่าข้อมูลที่ได้ กำหนดให้กับ ตัวแปร object  
    });  
      
    $scope.predicate = "de_smis";  // อันนี้กำหนดค่า สำหรับการเรียงข้อมูลเริ่มต้น ในตารางไฟล์ list.html  
    // เรียงข้อมูลจาก id  
   
    // กำหนดฟังก์ชัน ลบข้อมูล จากที่เรียกใช้ในหน้า template list.html  
        
      
}]) 

.controller("ApViewCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object สำหรับไว้ส่งค่าไปแสดงในหน้า view.html  
    $scope.ap = {};  
    $scope.job = {}; 
    
    // เรียกใช้งาน ฟังก์ชั่น viewSch โดยส่งค่า Id ของข้อมูลไปด้วย  
    // ฟังก์ชั่นนี้ เราไม่ต้องสร้างเพิ่ม ใช้ตัวเดียวกันกับ ตอนลิสรายการ แต่กรณีนี้มีการส่ง Id ไปด้วย  
    mySch.viewAp($routeParams.Id).success(function(result){  
        $scope.ap = result;  // เมื่อมีกาาคืนค่า ก็ให้เขาข้อมูลที่ได้มาไว้ในตัวแปร object << USO
    }); 
            
    mySch.viewJob('').success(function(result){ // ดึงข้อมูลสำเร็จ ส่งกลับมา   << USO
        $scope.job = result;  // เอาค่าข้อมูลที่ได้ กำหนดให้กับ ตัวแปร object  
    });
    
    
}]) 

.controller("ApMaCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object สำหรับไว้ส่งค่าไปแสดงในหน้า view.html  
    $scope.ap = {};  
    
    
    // ฟังก์ชั่นนี้ เราไม่ต้องสร้างเพิ่ม ใช้ตัวเดียวกันกับ ตอนลิสรายการ แต่กรณีนี้มีการส่ง Id ไปด้วย  
    mySch.viewAp($routeParams.Id).success(function(result){  
        $scope.ap = result;  // เมื่อมีกาาคืนค่า ก็ให้เขาข้อมูลที่ได้มาไว้ในตัวแปร object 

    }); 
    
    
    //// ส่วนของการ Update ค่าใน Table AP
     $scope.submitmyApMaForm = function(objSch){  
        
            // เรียกใช้งานฟังก์ชั่น updateFriend ใน myFriend service เพื่ออัพเดทข้อมูล  
            // โดยจะมีการส่งค่า object ข้อมูล และ  Id ของข้อมูล เพื่ออ้างอิง ไปทำการแก้ไข ด้วย  
            mySch.updateAp(objSch,$routeParams.Id).success(function(){  
                // เมื่อแก้ไขข้อมูลสำหรับ ล้างค่าตัวแปร object ที่เราสร้าง  
                $scope.data = null;  
             
            });  
        
        
    }; 
    
    ////// ส่วนของการ Add Job
        $scope.addJobForm = function(objSch){     
            mySch.addJob(objSch).success(function(){  
                // หากทำการบันทึกข้อมูลสำเร็จ   
                $scope.data = null; // ให้ object ชื่อ data เป็นค่าว่าง รอรับข้อมูลใหม่  
            });  
         
 };  
        
    
    
}]) 

.controller("ApAddCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){  // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนด ฟังก์ชั่น สำหรับรับค่า การ submit ฟอร์ม โดยส่ง object data เข้ามาด้วย  
    $scope.data = {};  

    $scope.data.de_smis = $routeParams.Id;
     
    $scope.submitApAddForm = function(objSch){  
            mySch.addAp(objSch).success(function(){  
                // หากทำการบันทึกข้อมูลสำเร็จ  
                $scope.ApForm.$setPristine(); // ล้างค่าข้อมูลในฟอร์ม พร้อมบันทึกใหม่  
              //  $scope.data = null; // ให้ object ชื่อ data เป็นค่าว่าง รอรับข้อมูลใหม่  
            });          
 };  
       
         
 
}])  

.controller("ApEditApCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object เพื่อใช้งานในหน้าแก้ไข ชื่อต้องเหมือนกับชื่อ instance อ้างอิงที่เราใช้งาน  
    $scope.data = {};  
   // เรียกใช้งาน ฟังก์ชั่น viewUSO โดยส่งค่า Id ของข้อมูลไปด้วย  
    // ฟังก์ชั่นนี้ เราไม่ต้องสร้างเพิ่ม ใช้ตัวเดียวกันกับ ตอนลิสรายการ แต่กรณีนี้มีการส่ง Id ไปด้วย      
    mySch.viewApSn($routeParams.Id).success(function(result){  
        // เนื่องจากหน้า แก้ไขเราใช้ไฟล์ เดียวกับตอนเพิ่มข้อมูล  
        // ดังนั้นการส่งค่ากลับไปแบบ ใน ViewCtrl จะทำไม่ได้ เราจะใช้วิธี  
        // ส่งค่าแบบกำหนดค่า object แต่ละตัวแทนเอา โดยผลลัพธ์ของข้อมูล  
        // ที่ส่งกลับมาจะมี index id = 0 การเรียกใช้จึงเป็น result[0].id แบบนี้เป็นต้น  
       
        
        $scope.data.de_sn = result[0].de_sn;
        $scope.data.de_name = result[0].de_name;
        $scope.data.de_project = result[0].de_project; 
        $scope.data.de_type = result[0].de_type; 
        $scope.data.de_stat = result[0].de_stat; 
        $scope.data.de_smis = result[0].de_smis;
        $scope.data.de_warranty_end = result[0].de_warranty_end;
        $scope.data.de_note = result[0].de_note;
        
 
        // เมื่อรับค่าจากการไปดึงข้อมูลส่วนที่ต้องการมาแก้ไข แล้ว ตัวแปรเหล่านี้  
        // ก็จะไปแสดงในหน้าแก้ไข  
          
    });  
  
//    สร้างฟังก์ชั่น รับค่าการบันทึกข้อมูล  
//    เมื่อคลิกที่ปุ่ม save โดยใช้ฟังก์ชั่น submitForm โดยส่งค่า object instance ข้อมูลฟอร์มเข้ามาด้วย  
    $scope.submitApAddForm = function(objSch){  
        if($scope.ApForm.$valid){  // ตรวจสอบข้อมูลฟอร์ม ถูกต้องหรือไม่  
            // เรียกใช้งานฟังก์ชั่น updateFriend ใน myFriend service เพื่ออัพเดทข้อมูล  
            // โดยจะมีการส่งค่า object ข้อมูล และ  Id ของข้อมูล เพื่ออ้างอิง ไปทำการแก้ไข ด้วย  
            mySch.updateApSn(objSch,$routeParams.Id).success(function(){  
                // เมื่อแก้ไขข้อมูลสำหรับ ล้างค่าตัวแปร object ที่เราสร้าง  
                $scope.data = null;  
//                ลิ้งค์ไปหน้า รายการที่เราแก้ไข เพื่อดูข้อมูลว่า แก้ไขเรียบร้อยถูกต้องไหม 
                    //$location.path("#/uso_view/"+$routeParams.Id);
            });  
        } 
        
    };      
  
    // ในหน้าแก้ไขข้อมูล จะพบว่า เรามีปุ่มลบ ปุ่มนี้จะแสดงเมื่อมีการแก้ไขข้อมูล หรือมีการส่งค่า  
    // Id ข้อมูลที่ต้องการแก้ไข เข้าไปด้วย การลบข้อมูลไม่มีอะไร เหมือนกับ การลข้อมูลในหน้า  
    // ลิสรายการ ตามโค้ดด้านบน ที่เคยอธิบายแล้ว บรรทัดส่วนนี้ขอไม่่อธิบายเพิ่ม  

      
}])  



//////////////////////////    E-Class  ////////////////////////////////////////      
.controller("EcrListCtrl",["$scope","$location","mySch",  
function($scope,$location,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    
    mySch.setLoading('loading');
    
    $scope.ecr = {}; // กำหนด ตัวแปร object ที่เราจะไปเรียกใช้ ในหน้า list.html  
    // พอแสดงหน้า list.html ให้ เรียกใช้งาน ฟังก์ชั่น ใน myFriend service ที่เราสร้าง  
    mySch.viewEcr('').success(function(result){ // ดึงข้อมูลสำเร็จ ส่งกลับมา   << USO
        $scope.ecr = result;  // เอาค่าข้อมูลที่ได้ กำหนดให้กับ ตัวแปร object  
    });  
      
    $scope.predicate = "ecr_smis";  // อันนี้กำหนดค่า สำหรับการเรียงข้อมูลเริ่มต้น ในตารางไฟล์ list.html  
    // เรียงข้อมูลจาก id  
   
    // กำหนดฟังก์ชัน ลบข้อมูล จากที่เรียกใช้ในหน้า template list.html  
    $scope.deleteData = function(Id){ // ส่ง Id เข้ามา  
        if(confirm("Confirm delete?")){ // ขึ้นแจ้งยืนยันการลบก่อน  
            // ถ้ายืนยันการลบข้อมูลแล้ว ให้เรยกใช้งาน mySch service ที่เราสร้าง เพื่อลบข้อมูล  
            mySch.deleteUso(Id).success(function(){ // ถ้า ok ลบข้อมูล  
               $location.path("#/"); // ลบแล้วให้รีเฟรส  
            });       
        }  
    };      
      
}])  

.controller("EcrViewCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object สำหรับไว้ส่งค่าไปแสดงในหน้า view.html  
    $scope.ecr = {};  
    
    // เรียกใช้งาน ฟังก์ชั่น viewSch โดยส่งค่า Id ของข้อมูลไปด้วย  
    // ฟังก์ชั่นนี้ เราไม่ต้องสร้างเพิ่ม ใช้ตัวเดียวกันกับ ตอนลิสรายการ แต่กรณีนี้มีการส่ง Id ไปด้วย  
    mySch.viewEcr($routeParams.Id).success(function(result){  
        $scope.ecr = result;  // เมื่อมีกาาคืนค่า ก็ให้เขาข้อมูลที่ได้มาไว้ในตัวแปร object << USO
    }); 
            
    
    
    
}]) 

.controller("EcrEditCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object เพื่อใช้งานในหน้าแก้ไข ชื่อต้องเหมือนกับชื่อ instance อ้างอิงที่เราใช้งาน  
    $scope.data = {};  
   // เรียกใช้งาน ฟังก์ชั่น viewSch โดยส่งค่า Id ของข้อมูลไปด้วย  
    // ฟังก์ชั่นนี้ เราไม่ต้องสร้างเพิ่ม ใช้ตัวเดียวกันกับ ตอนลิสรายการ แต่กรณีนี้มีการส่ง Id ไปด้วย      
    mySch.viewEcr($routeParams.Id).success(function(result){  
        // เนื่องจากหน้า แก้ไขเราใช้ไฟล์ เดียวกับตอนเพิ่มข้อมูล  
        // ดังนั้นการส่งค่ากลับไปแบบ ใน ViewCtrl จะทำไม่ได้ เราจะใช้วิธี  
        // ส่งค่าแบบกำหนดค่า object แต่ละตัวแทนเอา โดยผลลัพธ์ของข้อมูล  
        // ที่ส่งกลับมาจะมี index id = 0 การเรียกใช้จึงเป็น result[0].id แบบนี้เป็นต้น  
        $scope.data.uso_smis = result[0].uso_smis; 
        
        $scope.data.uso_teacher = result[0].uso_teacher; 
        $scope.data.uso_tea_mobile = result[0].uso_tea_mobile; 
        
        $scope.data.uso_server = result[0].uso_server;  
        $scope.data.uso_server_mo = result[0].uso_server_mo;  
        $scope.data.uso_server_stat = result[0].uso_server_stat;  
        
        $scope.data.uso_pc0 = result[0].uso_pc0;  
        $scope.data.uso_pc0_mo = result[0].uso_pc0_mo;  
        $scope.data.uso_pc0_stat = result[0].uso_pc0_stat; 
        
        $scope.data.uso_pc1 = result[0].uso_pc1;  
        $scope.data.uso_pc1_mo = result[0].uso_pc1_mo;  
        $scope.data.uso_pc1_stat = result[0].uso_pc1_stat; 
        
        $scope.data.uso_pc2 = result[0].uso_pc2;  
        $scope.data.uso_pc2_mo = result[0].uso_pc2_mo;  
        $scope.data.uso_pc2_stat = result[0].uso_pc2_stat; 
        
        $scope.data.uso_pc3 = result[0].uso_pc3;  
        $scope.data.uso_pc3_mo = result[0].uso_pc3_mo;  
        $scope.data.uso_pc3_stat = result[0].uso_pc3_stat; 
        
        $scope.data.uso_pc4 = result[0].uso_pc4;  
        $scope.data.uso_pc4_mo = result[0].uso_pc4_mo;  
        $scope.data.uso_pc4_stat = result[0].uso_pc4_stat; 
        
        $scope.data.uso_pc5 = result[0].uso_pc5;  
        $scope.data.uso_pc5_mo = result[0].uso_pc5_mo;  
        $scope.data.uso_pc5_stat = result[0].uso_pc5_stat; 
        
        $scope.data.uso_pc6 = result[0].uso_pc6;  
        $scope.data.uso_pc6_mo = result[0].uso_pc6_mo;  
        $scope.data.uso_pc6_stat = result[0].uso_pc6_stat; 
        
        $scope.data.uso_pc7 = result[0].uso_pc7;  
        $scope.data.uso_pc7_mo = result[0].uso_pc7_mo;  
        $scope.data.uso_pc7_stat = result[0].uso_pc7_stat; 
        
        $scope.data.uso_pc8 = result[0].uso_pc8;  
        $scope.data.uso_pc8_mo = result[0].uso_pc8_mo;  
        $scope.data.uso_pc8_stat = result[0].uso_pc8_stat; 
        
        $scope.data.uso_pc9 = result[0].uso_pc9;  
        $scope.data.uso_pc9_mo = result[0].uso_pc9_mo;  
        $scope.data.uso_pc9_stat = result[0].uso_pc9_stat; 
        
        $scope.data.uso_pc10 = result[0].uso_pc10;  
        $scope.data.uso_pc10_mo = result[0].uso_pc10_mo;  
        $scope.data.uso_pc10_stat = result[0].uso_pc10_stat; 
        
        $scope.data.uso_ups1 = result[0].uso_ups1;  
        $scope.data.uso_ups1_stat = result[0].uso_ups1_stat; 
        
        $scope.data.uso_ups6 = result[0].uso_ups6;  
        $scope.data.uso_ups6_stat = result[0].uso_ups6_stat; 
        
        $scope.data.uso_printer = result[0].uso_printer;  
        $scope.data.uso_printer_stat = result[0].uso_printer_stat; 
        
        $scope.data.uso_projector = result[0].uso_projector;  
        $scope.data.uso_projector_stat = result[0].uso_projector_stat; 
        
        $scope.data.uso_dvd = result[0].uso_dvd;  
        $scope.data.uso_dvd_stat = result[0].uso_dvd_stat; 
        
        $scope.data.uso_lcd = result[0].uso_lcd;  
        $scope.data.uso_lcd_stat = result[0].uso_lcd_stat; 
        
        $scope.data.uso_rev = result[0].uso_rev;  
        $scope.data.uso_rev_stat = result[0].uso_rev_stat; 
        
        $scope.data.uso_air1 = result[0].uso_air1;  
        $scope.data.uso_air1_stat = result[0].uso_air1_stat; 
        
        $scope.data.uso_air2= result[0].uso_air2;  
        $scope.data.uso_air2_stat = result[0].uso_air2_stat; 
        
        $scope.data.uso_update = result[0].uso_update; 
        
 
        // เมื่อรับค่าจากการไปดึงข้อมูลส่วนที่ต้องการมาแก้ไข แล้ว ตัวแปรเหล่านี้  
        // ก็จะไปแสดงในหน้าแก้ไข  
          
    });  
  
//    สร้างฟังก์ชั่น รับค่าการบันทึกข้อมูล  
//    เมื่อคลิกที่ปุ่ม save โดยใช้ฟังก์ชั่น submitForm โดยส่งค่า object instance ข้อมูลฟอร์มเข้ามาด้วย  
    $scope.submitUsoForm = function(objSch){  
        if($scope.myUsoForm.$valid){  // ตรวจสอบข้อมูลฟอร์ม ถูกต้องหรือไม่  
            // เรียกใช้งานฟังก์ชั่น updateFriend ใน myFriend service เพื่ออัพเดทข้อมูล  
            // โดยจะมีการส่งค่า object ข้อมูล และ  Id ของข้อมูล เพื่ออ้างอิง ไปทำการแก้ไข ด้วย  
            mySch.updateUso(objSch,$routeParams.Id).success(function(){  
                // เมื่อแก้ไขข้อมูลสำหรับ ล้างค่าตัวแปร object ที่เราสร้าง  
                $scope.data = null;  
//                ลิ้งค์ไปหน้า รายการที่เราแก้ไข เพื่อดูข้อมูลว่า แก้ไขเรียบร้อยถูกต้องไหม 
                    //$location.path("#/uso_view/"+$routeParams.Id);
            });  
        } 
        
    };      
  
    // ในหน้าแก้ไขข้อมูล จะพบว่า เรามีปุ่มลบ ปุ่มนี้จะแสดงเมื่อมีการแก้ไขข้อมูล หรือมีการส่งค่า  
    // Id ข้อมูลที่ต้องการแก้ไข เข้าไปด้วย การลบข้อมูลไม่มีอะไร เหมือนกับ การลข้อมูลในหน้า  
    // ลิสรายการ ตามโค้ดด้านบน ที่เคยอธิบายแล้ว บรรทัดส่วนนี้ขอไม่่อธิบายเพิ่ม  
    $scope.deleteUsoData = function(Id){  
        if(confirm("Confirm delete?")){  
            mySch.deleteSch(Id).success(function(){  
                $scope.data = null;  
               $location.path("#/uso_view/"+$routeParams.Id);  
            });       
        }  
    };      
  
      
}])  


//////////////////////////    USO  ////////////////////////////////////////        
        
 .controller("UsoListCtrl",["$scope","$location","mySch",  
function($scope,$location,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
   

   
    $scope.uso = {}; // กำหนด ตัวแปร object ที่เราจะไปเรียกใช้ ในหน้า list.html  
    // พอแสดงหน้า list.html ให้ เรียกใช้งาน ฟังก์ชั่น ใน myFriend service ที่เราสร้าง  
    mySch.viewUso('').success(function(result){ // ดึงข้อมูลสำเร็จ ส่งกลับมา   << USO
        $scope.uso = result;  // เอาค่าข้อมูลที่ได้ กำหนดให้กับ ตัวแปร object  
    });  
      
    $scope.predicate = "uso_city";  // อันนี้กำหนดค่า สำหรับการเรียงข้อมูลเริ่มต้น ในตารางไฟล์ list.html  
    // เรียงข้อมูลจาก id  
    
    // กำหนดฟังก์ชัน ลบข้อมูล จากที่เรียกใช้ในหน้า template list.html  
    $scope.deleteData = function(Id){ // ส่ง Id เข้ามา  
        if(confirm("Confirm delete?")){ // ขึ้นแจ้งยืนยันการลบก่อน  
            // ถ้ายืนยันการลบข้อมูลแล้ว ให้เรยกใช้งาน mySch service ที่เราสร้าง เพื่อลบข้อมูล  
            mySch.deleteUso(Id).success(function(){ // ถ้า ok ลบข้อมูล  
               $location.path("#/"); // ลบแล้วให้รีเฟรส  
            });       
        }  
    };      
      
}])  

.controller("UsoViewCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object สำหรับไว้ส่งค่าไปแสดงในหน้า view.html  
    $scope.uso = {};  
    
    // เรียกใช้งาน ฟังก์ชั่น viewSch โดยส่งค่า Id ของข้อมูลไปด้วย  
    // ฟังก์ชั่นนี้ เราไม่ต้องสร้างเพิ่ม ใช้ตัวเดียวกันกับ ตอนลิสรายการ แต่กรณีนี้มีการส่ง Id ไปด้วย  
    mySch.viewUso($routeParams.Id).success(function(result){  
        $scope.uso = result;  // เมื่อมีกาาคืนค่า ก็ให้เขาข้อมูลที่ได้มาไว้ในตัวแปร object << USO
    }); 
            
    
    
    
}])  

.controller("UsoEditCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object เพื่อใช้งานในหน้าแก้ไข ชื่อต้องเหมือนกับชื่อ instance อ้างอิงที่เราใช้งาน  
    $scope.data = {};  
   // เรียกใช้งาน ฟังก์ชั่น viewUSO โดยส่งค่า Id ของข้อมูลไปด้วย  
    // ฟังก์ชั่นนี้ เราไม่ต้องสร้างเพิ่ม ใช้ตัวเดียวกันกับ ตอนลิสรายการ แต่กรณีนี้มีการส่ง Id ไปด้วย      
    mySch.viewUso($routeParams.Id).success(function(result){  
        // เนื่องจากหน้า แก้ไขเราใช้ไฟล์ เดียวกับตอนเพิ่มข้อมูล  
        // ดังนั้นการส่งค่ากลับไปแบบ ใน ViewCtrl จะทำไม่ได้ เราจะใช้วิธี  
        // ส่งค่าแบบกำหนดค่า object แต่ละตัวแทนเอา โดยผลลัพธ์ของข้อมูล  
        // ที่ส่งกลับมาจะมี index id = 0 การเรียกใช้จึงเป็น result[0].id แบบนี้เป็นต้น  
        $scope.data.uso_smis = result[0].uso_smis; 
        
        $scope.data.uso_teacher = result[0].uso_teacher; 
        $scope.data.uso_tea_mobile = result[0].uso_tea_mobile; 
        
        $scope.data.uso_server = result[0].uso_server;  
        $scope.data.uso_server_mo = result[0].uso_server_mo;  
        $scope.data.uso_server_stat = result[0].uso_server_stat;  
        
        $scope.data.uso_pc0 = result[0].uso_pc0;  
        $scope.data.uso_pc0_mo = result[0].uso_pc0_mo;  
        $scope.data.uso_pc0_stat = result[0].uso_pc0_stat; 
        
        $scope.data.uso_pc1 = result[0].uso_pc1;  
        $scope.data.uso_pc1_mo = result[0].uso_pc1_mo;  
        $scope.data.uso_pc1_stat = result[0].uso_pc1_stat; 
        
        $scope.data.uso_pc2 = result[0].uso_pc2;  
        $scope.data.uso_pc2_mo = result[0].uso_pc2_mo;  
        $scope.data.uso_pc2_stat = result[0].uso_pc2_stat; 
        
        $scope.data.uso_pc3 = result[0].uso_pc3;  
        $scope.data.uso_pc3_mo = result[0].uso_pc3_mo;  
        $scope.data.uso_pc3_stat = result[0].uso_pc3_stat; 
        
        $scope.data.uso_pc4 = result[0].uso_pc4;  
        $scope.data.uso_pc4_mo = result[0].uso_pc4_mo;  
        $scope.data.uso_pc4_stat = result[0].uso_pc4_stat; 
        
        $scope.data.uso_pc5 = result[0].uso_pc5;  
        $scope.data.uso_pc5_mo = result[0].uso_pc5_mo;  
        $scope.data.uso_pc5_stat = result[0].uso_pc5_stat; 
        
        $scope.data.uso_pc6 = result[0].uso_pc6;  
        $scope.data.uso_pc6_mo = result[0].uso_pc6_mo;  
        $scope.data.uso_pc6_stat = result[0].uso_pc6_stat; 
        
        $scope.data.uso_pc7 = result[0].uso_pc7;  
        $scope.data.uso_pc7_mo = result[0].uso_pc7_mo;  
        $scope.data.uso_pc7_stat = result[0].uso_pc7_stat; 
        
        $scope.data.uso_pc8 = result[0].uso_pc8;  
        $scope.data.uso_pc8_mo = result[0].uso_pc8_mo;  
        $scope.data.uso_pc8_stat = result[0].uso_pc8_stat; 
        
        $scope.data.uso_pc9 = result[0].uso_pc9;  
        $scope.data.uso_pc9_mo = result[0].uso_pc9_mo;  
        $scope.data.uso_pc9_stat = result[0].uso_pc9_stat; 
        
        $scope.data.uso_pc10 = result[0].uso_pc10;  
        $scope.data.uso_pc10_mo = result[0].uso_pc10_mo;  
        $scope.data.uso_pc10_stat = result[0].uso_pc10_stat; 
        
        $scope.data.uso_ups1 = result[0].uso_ups1;  
        $scope.data.uso_ups1_stat = result[0].uso_ups1_stat; 
        
        $scope.data.uso_ups6 = result[0].uso_ups6;  
        $scope.data.uso_ups6_stat = result[0].uso_ups6_stat; 
        
        $scope.data.uso_printer = result[0].uso_printer;  
        $scope.data.uso_printer_stat = result[0].uso_printer_stat; 
        
        $scope.data.uso_projector = result[0].uso_projector;  
        $scope.data.uso_projector_stat = result[0].uso_projector_stat; 
        
        $scope.data.uso_dvd = result[0].uso_dvd;  
        $scope.data.uso_dvd_stat = result[0].uso_dvd_stat; 
        
        $scope.data.uso_lcd = result[0].uso_lcd;  
        $scope.data.uso_lcd_stat = result[0].uso_lcd_stat; 
        
        $scope.data.uso_rev = result[0].uso_rev;  
        $scope.data.uso_rev_stat = result[0].uso_rev_stat; 
        
        $scope.data.uso_air1 = result[0].uso_air1;  
        $scope.data.uso_air1_stat = result[0].uso_air1_stat; 
        
        $scope.data.uso_air2= result[0].uso_air2;  
        $scope.data.uso_air2_stat = result[0].uso_air2_stat; 
        
        $scope.data.uso_update = result[0].uso_update; 
        
 
        // เมื่อรับค่าจากการไปดึงข้อมูลส่วนที่ต้องการมาแก้ไข แล้ว ตัวแปรเหล่านี้  
        // ก็จะไปแสดงในหน้าแก้ไข  
          
    });  
  
//    สร้างฟังก์ชั่น รับค่าการบันทึกข้อมูล  
//    เมื่อคลิกที่ปุ่ม save โดยใช้ฟังก์ชั่น submitForm โดยส่งค่า object instance ข้อมูลฟอร์มเข้ามาด้วย  
    $scope.submitUsoForm = function(objSch){  
        if($scope.myUsoForm.$valid){  // ตรวจสอบข้อมูลฟอร์ม ถูกต้องหรือไม่  
            // เรียกใช้งานฟังก์ชั่น updateFriend ใน myFriend service เพื่ออัพเดทข้อมูล  
            // โดยจะมีการส่งค่า object ข้อมูล และ  Id ของข้อมูล เพื่ออ้างอิง ไปทำการแก้ไข ด้วย  
            mySch.updateUso(objSch,$routeParams.Id).success(function(){  
                // เมื่อแก้ไขข้อมูลสำหรับ ล้างค่าตัวแปร object ที่เราสร้าง  
                $scope.data = null;  
//                ลิ้งค์ไปหน้า รายการที่เราแก้ไข เพื่อดูข้อมูลว่า แก้ไขเรียบร้อยถูกต้องไหม 
                    //$location.path("#/uso_view/"+$routeParams.Id);
            });  
        } 
        
    };      
  
    // ในหน้าแก้ไขข้อมูล จะพบว่า เรามีปุ่มลบ ปุ่มนี้จะแสดงเมื่อมีการแก้ไขข้อมูล หรือมีการส่งค่า  
    // Id ข้อมูลที่ต้องการแก้ไข เข้าไปด้วย การลบข้อมูลไม่มีอะไร เหมือนกับ การลข้อมูลในหน้า  
    // ลิสรายการ ตามโค้ดด้านบน ที่เคยอธิบายแล้ว บรรทัดส่วนนี้ขอไม่่อธิบายเพิ่ม  
    $scope.deleteUsoData = function(Id){  
        if(confirm("Confirm delete?")){  
            mySch.deleteSch(Id).success(function(){  
                $scope.data = null;  
               $location.path("#/uso_view/"+$routeParams.Id);  
            });       
        }  
    };      
  
      
}])  


//////////////////////////    SCH  ////////////////////////////////////////  
.controller("SchViewCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object สำหรับไว้ส่งค่าไปแสดงในหน้า view.html  
    $scope.sch = {};   //ข้อมูลโครงการ AP
    $scope.ap = {};   //ข้อมูลโครงการ AP
    $scope.uso = {};  //ข้อมูลโครงการ USO
    $scope.ecr = {};  //ข้อมูลโครงการ E-Classroom
    $scope.job = {};  //ข้อมูลโครงการ job
    
    
    mySch.viewSch($routeParams.Id).success(function(result){  
        $scope.sch = result;  // 
    }); 
    
    mySch.viewAp($routeParams.Id).success(function(result){  
        $scope.ap = result;  // 
    }); 
    
    mySch.viewEcr($routeParams.Id).success(function(result){  
        $scope.ecr = result;  // 
    }); 
    
    mySch.viewUso($routeParams.Id).success(function(result){  
        $scope.uso = result;  // 
    }); 
    
    mySch.viewJob($routeParams.Id).success(function(result){  
        $scope.job = result;  // 
    }); 
    $scope.predicate = "-job_date";    
    
    
    
}])  

//////////////////////////    JOB  ////////////////////////////////////////    
 .controller("JobListCtrl",["$scope","$location","mySch","$interval",
function($scope,$location,mySch,$interval){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
      
    $scope.job = {}; // กำหนด ตัวแปร object ที่เราจะไปเรียกใช้ ในหน้า list.html  
    $interval(autoUpdateJob, 1000); // กำหนดเวลา update mili Sec.
    // พอแสดงหน้า list.html ให้ เรียกใช้งาน ฟังก์ชั่น ใน myFriend service ที่เราสร้าง  
    
    function autoUpdateJob(){  // สั่งให้ Auto Update ตาราง Job
    mySch.viewJob('').success(function(result){ // 
        $scope.job = result;  // เอาค่าข้อมูลที่ได้ กำหนดให้กับ ตัวแปร object  
    });  
      
    $scope.predicate = "-job_date";  // อันนี้กำหนดค่า สำหรับการเรียงข้อมูลเริ่มต้น 
    }
  /// Auto Update  
 
    
  
    
      
}]) 

.controller("JobViewCtrl",["$scope","$location","$routeParams","mySch",  
function($scope,$location,$routeParams,mySch){ // กำหนดตรงนี้ด้วย แต่ไม่ต้องมี ""  
    // กำหนดตัวแปร object สำหรับไว้ส่งค่าไปแสดงในหน้า view.html  
    $scope.job = {};  //ข้อมูลโครงการ job
    
    
     mySch.viewJob($routeParams.Id).success(function(result){  
        $scope.job = result;  // เมื่อมีกาาคืนค่า ก็ให้เขาข้อมูลที่ได้มาไว้ในตัวแปร object << USO
    }); 
    

    
    
}])  



////////////////////////////// ENDING CODE ///////////////////////////////////


.controller("appController",["$scope",  
function($scope){  
  
}]);  








