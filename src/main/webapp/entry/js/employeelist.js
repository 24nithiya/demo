

$(".message").load("html/messageAlert.html");

 var myApp= angular.module('myApp', [])
  myApp.controller('myControl', function($scope,$http,$filter,$q) {

function split_key(key)
{
  var arr=[];
  var temp=key.split("&");
  for(var i=0;i<temp.length;i++)
    {
     var key=temp[i].split("=");
     arr.push(key[1]);
    }
 
  return arr;
}
var url_loc=decodeURIComponent(window.location.search);
var arr=split_key(url_loc);

$scope.sessionId=arr[0];
console.log($scope.sessionId);


/*Start of getting data*/
$scope.empData=[];
    $scope.tempEmpSet=[];
       $http({
        method : "GET",
        url : " /actnow-claims-1.0.0/actnow/employees/"
    }).then(function mySuccess(response) {
       
       /*STart empdata success*/
       $scope.empData=response.data;
       $scope.totalPageList=[];

for(var i=0;i< $scope.numberOfPages();i++)
{
  $scope.totalPageList.push(i);
}

 $http({
        method : "GET",
        url : "/actnow-claims-1.0.0/actnow/department"
    }).then(function mySuccess(response) {
      /*Start dep data success*/
      
        $scope.depData=response.data;


           $http({
        method : "GET",
        url : "/actnow-claims-1.0.0/actnow/businessunits"
    }).then(function mySuccess(response) {
        /*Start of businessunit success*/
        $scope.busData=response.data;

         $http({
        method : "GET",
        url : "/actnow-claims-1.0.0/actnow/companies"
    }).then(function mySuccess(response) {
      /*start of company success*/
        $scope.companyData=response.data;
     


              /*Start of  temp emp set data*/

         //     console.log("Employee Data is"+$scope.empData);
         // console.log("Employee Data is"+JSON.stringify($scope.empData, null, "\t"));



              angular.forEach($scope.empData,function(value,key){

                // console.log("Employee Data is"+JSON.stringify(value, null, "\t"));



                    angular.forEach($scope.depData,function(depval,depkey){
                        if(value.deptId==depval.id)
                        {
                          $scope.deptName=depval.name;
                        }
                    })

                    angular.forEach($scope.busData,function(busval,buskey){
                        if(value.buId==busval.id)
                        {
                          $scope.buName=busval.name;
                        }
                    })

                    angular.forEach($scope.companyData,function(comval,comkey){
                        if(value.cmpnyId==comval.id)
                        {
                          $scope.compName=comval.company;
                        }
                    })

                     angular.forEach($scope.empData,function(empval,empkey){
                    //  console.log(empval)
                        if(value.reportTo==empval.employeeId)
                        {
                          $scope.reportTo=empval.firstName;
                        }
                    })




                  var tempData={
        "empId":value.employeeId,
       "firstName": value.firstName,
       "middleName":value.middleName+"",
       "lastName": value.lastName,
       "dateOfJoining": value.dateOfJoining,
       "dateOfBirth":value.dateOfBirth,
       "status": value.status,
       "cmpnyId": $scope.compName,
       "buId": $scope.buName,
       "deptId": $scope.deptName,
       "designation": value.designation,
       "reportTo": $scope.reportTo,
       "emailId": value.emailId,
       "loginId":value.loginId
   };
   $scope.tempEmpSet.push(tempData);

              })

              /*End of set emp data*/



        /*End of company success*/
       // console.log("Company Data is"+$scope.tempEmpSet);
    }, function myError(response) {
        console.log(response.data);
    });

        /*End of business unit success*/
    }, function myError(response) {
        console.log(response.data);
    });

        /*End dep Data success*/
    }, function myError(response) {
        console.log(response.data);
    });

       /*End emp data success*/
    }, function myError(response) {
        console.log(response.data);
    });


 

/*End of getting data*/



$scope.searchDataFilter=function(){

   $scope.totalPageList=[];

for(var i=0;i< $scope.numberOfPages();i++)
{
  $scope.totalPageList.push(i);
}

$scope.currentPage=0;
}






$scope.sortBool=false;
  $scope.currentPage = 0;
  $scope.pageSize=10;





  $scope.changePageSize=function(i){

//console.log(i);
$scope.pageSize=parseInt(i);
$scope.totalPageList=[];
for(var i=0;i< $scope.numberOfPages();i++)
{
  $scope.totalPageList.push(i);
}
  }




$scope.selection='firstName';
    $scope.sort=function(o){
      $scope.sortDepStatus="off";
      $scope.sortBool=!$scope.sortBool;

      $scope.selection=o;
    //  console.log($scope.selection)
   
    }



    /*Start of edit menu*/
$scope.editForm=function(x){

 // console.log(JSON.stringify(x, null, "\t"));
  var framempId=x.empId;
console.log("FRAME KEY  "+framempId);
var fin="/actnow-claims-1.0.0/entry/editemployee.html?session="+framempId+"";
//var fin="http://localhost:8080/actnow-claims-1.0.0/entry/editemployee.html?session=36";
  $("#iframe").attr("src",fin);
  $("#myModalPage").modal();
   window.parent.topScroll();
                      
}

    /*End of edit menu*/


/*Start delete part*/

$scope.deleteAlert=function(x){

$scope.empDelId=x.empId;
//console.log(JSON.stringify(x, null, "\t"));
$scope.loginId=x.loginId;

$("#myModalDel").modal();
 window.parent.topScroll();

}

/*Start of delete record*/
$scope.deleteRecord=function(){
  console.log($scope.empDelId);
 var id=$scope.loginId;
console.log($scope.loginId);

/*Start operation for roles delete*/


/*Start of getting user roles*/

/*Start of 1st promises*/
  var deferred = $q.defer();

  function call(){
    $http({
        method : "GET",
        url : "/actnow-claims-1.0.0/actnow/employees/rolesOfUsers/"+ $scope.loginId+""
    }).then(function mySuccess(response) {
        $scope.databaseRoles=response.data.groups;
        console.log("ROlLES FOR DELETE"+response.data);

            /*Start of getting process roles*/
     $http({
        method : "GET",
        url : "/actnow-claims-1.0.0/actnow/employees/processRoles"
    }).then(function mySuccess(response) {
        
          console.log("PROcess Roles are GET "+response.data);
          $scope.processRoles=response.data;
          console.log( $scope.processRoles);

            /*Start of getting user roles*/
    $http({
        method : "GET",
        url : "/actnow-claims-1.0.0/actnow/employees/roles"
    }).then(function mySuccess(response) {
        
          console.log(" USER Roles are GET "+response.data);
          $scope.userRoles=response.data;
         // console.log($scope.userRoles);

            $scope.processRolesDel=[];
            $scope.userRolesDel=[];
            angular.forEach($scope.databaseRoles,function(val,key){
                angular.forEach($scope.processRoles,function(pval,pkey){
                    if(val.id==pval.id)
                    {
                      $scope.processRolesDel.push(val);
                    }
                })
                angular.forEach($scope.userRoles,function(uval,ukey){
                    if(val.id==uval.id)
                    {
                       $scope.userRolesDel.push(val);
                    }
                })
            })

            var dat={
              "userRolesDel":$scope.userRolesDel,

              "processRolesDel":$scope.processRolesDel
            }
deferred.resolve(dat);

console.log("BEFORE EXECUET");


          }, function myError(response) {
        console.log(response.data);
    });
  /*End of geting user roles*/

         }, function myError(response) {
        console.log(response.data);
    });
/*End of getting process roles*/

      }, function myError(response) {
        console.log(response.data);
    });
    /*End of getting roles*/
return deferred.promise;
}



var prom=call();/*call 1st promises*/
prom.then(function(greeting) {
  console.log("Now execute");
/*  console.log(greeting.processRolesDel);
    console.log(greeting.userRolesDel);*/

/*Start of user delete part using promises*/
/*Start 2nd nner promises*/

/*Start of delete user roles*/
    function userDel (rolesName,userId){
      var userDef= $q.defer();
console.log(rolesName+" "+userId);
    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/actnow-claims-1.0.0/actnow/employees/userRoles/"+rolesName+"/"+userId+"",
  "method": "DELETE",
  "headers": {
    "cache-control": "no-cache",
  }
}

$.ajax(settings).done(function (jqXHR, textStatus, errorThrown) {
  console.log(jqXHR+"User ROles DELETE");
  console.log(textStatus+"User ROles DELETE");
  console.log(errorThrown+"User ROles DELETE");
  userDef.resolve("Success");
}).fail(function(jqXHR, textStatus, errorThrown){
  console.log(jqXHR+"User ROles DELETE");
  console.log(textStatus+"User ROles DELETE"+textStatus);
  console.log(errorThrown+"User ROles DELETE");
});
 return userDef.promise;
 }



 var promises = [];
   
/*Start of Delete User roless*/

if($scope.userRolesDel.length>0)
{
  console.log($scope.userRolesDel);
  
  angular.forEach($scope.userRolesDel,function(val,key){

  var rolesName=val.id;
  var userId=$scope.loginId;
   promises.push(userDel(rolesName,userId));
  /*Stat of http post*/
})/*End of loop*/
}
/*End of Delete User roles*/




  

/*here call all loop promises for the user and process roles*/
  $q.all(promises).then(
        function() { 
            console.log("Medium DONE");

           
/*Start of delete process roles*/
  function processDel (rolesName,userId){
      var processDef= $q.defer();
console.log(rolesName+" "+userId);
    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/actnow-claims-1.0.0/actnow/employees/processRoles/"+rolesName+"/"+userId+"",
  "method": "DELETE",
  "headers": {
    "cache-control": "no-cache",
  }
}

$.ajax(settings).done(function (jqXHR, textStatus, errorThrown) {
  console.log(jqXHR+"Process ROles DELETE");
  console.log(textStatus+"Process ROles DELETE");
  console.log(errorThrown+"Process ROles DELETE");
   processDef.resolve("Success");
}).fail(function(jqXHR, textStatus, errorThrown){
  console.log(jqXHR+"Process ROles DELETE");
  console.log(textStatus+"Process ROles DELETE");
  console.log(errorThrown+"Process ROles DELETE");
});
 return processDef.promise;
 }



/*Start of process roles DElet*/
var promisesData = [];
   

if($scope.processRolesDel.length>0)
{
  console.log($scope.processRolesDel);
  angular.forEach($scope.processRolesDel,function(val,key){
  var rolesName=val.id;
  var userId=$scope.loginId;
promisesData.push(processDel(rolesName,userId));

})/*End of loop*/
}

/*End of process roles DElet*/

$q.all(promisesData).then(
        function() { 
            console.log("FINAL DONE");

              /*Start of delete employee*/




 if(id!="")/*Start of id condition*/
                          {

                              console.log("USER ID FOR DELETE"+id);
                          (function(id) {
                            
                            $http({              
        method : "DELETE",
         url: "/actnow-claims-1.0.0/actnow/employees/"+id+"",
   }).then(function mySuccess(response) {
       $("#myModalDel").modal('hide');
       console.log(response);

                 //   delStatus=true;
                  $(".modal-body-result").html("<div class='alert alert-success'> <strong>Record Deleted successfully</strong></div>");
                    $("#myModal3").modal();
                       $(".modal-close").on("click",function(){
                        location.reload();
                       })

    },   
       /*maIN SUCCESS END HERE*/
     function myError(response) {
       $("#myModalDel").modal('hide');
      console.log(response);

       $(".modal-body-result").html("<div class='alert alert-danger'> <strong>Delete Record Failed</div>");
                    $("#myModal3").modal();
                       $(".modal-close").on("click",function(){
                        location.reload();
                       })
     // delStatus=false;
    });     


                          })(id)

                        }/*End of id condition*/

              /*End of delete employee*/


          })/*End of 3rd promises*/

        });/*End of 2nd promises*/

})/*End od 1st promises*/



}
/*End of delete record*/

/*End delete part*/





/*Start of paigination*/

     $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.empData, $scope.searchData)
     /* 
       // manual filter
       // if u used this, remove the filter from html, remove above line and replace data with getData()
       
        var arr = [];
        if($scope.q == '') {
            arr = $scope.data;
        } else {
            for(var ea in $scope.data) {
                if($scope.data[ea].indexOf($scope.q) > -1) {
                    arr.push( $scope.data[ea] );
                }
            }
        }
        return arr;
       */
    }

    $scope.result= $scope.getData().length;

     $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }
 console.log("Result is"+ $scope.numberOfPages());


$scope.totalPageList=[];

for(var i=0;i< $scope.numberOfPages();i++)
{
  $scope.totalPageList.push(i);
}




$scope.customPage=function(i){
  $scope.currentPage=i;
}


/*End of paigination*/






/*Start of getting property set*/

$scope.fetchProp=function(){

  $http({
        method : "GET",
        url : "/actnow-claims-1.0.0/actnow/propertysets"
    }).then(function mySuccess(response) {
      
        $scope.propertySets=response.data;
        $scope.propertyValue=[];

        angular.forEach($scope.propertySets,function(value,key){

            //console.log(value);
              if(value.country=="INDIA")
              {
            if(value.propertyName.includes("employeeColoum") )
            {
             // console.log("value is "+value.propertyValue);
              $scope.ch[value.propertyValue]=true;
              $scope.propertyValue.push(value.propertyValue);
           // $scope.ch={};
            }
              }
           
        });

        
    }, function myError(response) {
        console.log(response.data);
    });
    }
  $scope.fetchProp();

/*End of getting property set*/



/*Start of Coloum CURD operation*/

$scope.saveColoum=function(c){
  //console.log(c);
  

$scope.arrayForInsert=[];
$scope.arrayForDelet=[];
Object.getOwnPropertyNames(c).forEach(
  function (val, idx, array) {
    if(c[val]==true)
    {
  //  console.log(val + ' -> ' + c[val]);
 
    var insBool=0;
    var delBool=0;
      angular.forEach($scope.propertySets,function(value,key){
          if(value.country=="INDIA")
              {
            if(value.propertyName.includes("employeeColoum") )
            {
                  if (value.propertyValue==val)
                      {                
                      insBool++;                
                      }
            }
              }

      })/*End of 2nd loop*/
      console.log(insBool);
       if(insBool==0)
       {
        
         $scope.insertTemp={
                                    
                                       "propertyName": "employeeColoum",
                                       "propertyValue":val ,
                                       "country": "INDIA",
                                       "roles": "ADMIN"
                                            }
                                            $scope.arrayForInsert.push($scope.insertTemp);
                                              
                                             
       }
                      

    }/*End of 1st if condition*/
    else{
     

var delStatus=true;
       angular.forEach($scope.propertySets,function(value,key){
          if(value.country=="INDIA")
              {
            if(value.propertyName.includes("employeeColoum") )
            {
                  if (value.propertyValue==val)
                      {                
                        console.log(value.propertyValue); 

                        var id=value.id;

                          if(id!="")/*Start of id condition*/
                          {

                          (function(id) {
                            
                            $http({              
        method : "DELETE",
         url: "/actnow-claims-1.0.0/actnow/propertysets/"+id+"",
   }).then(function mySuccess(response) {
       
       console.log(response);

                    delStatus=true;

    },   
       /*maIN SUCCESS END HERE*/
     function myError(response) {
      console.log(response);
      delStatus=false;
    });     


                          })(id)

                        }/*End of id condition*/







                      }
            }
              }

      })/*End of 2nd loop*/


if(delStatus)
{

                        $(".modal-body-result").html("<div class='alert alert-success'> <strong>Coloum Data Submission successfully</strong></div>");
                    $("#myModal3").modal();
                       $(".modal-close").on("click",function(){
                        location.reload();
                       })
}
else{
   $(".modal-body-result").html("<div class='alert alert-danger'> <strong>Coloum Submission Failed</div>");
                    $("#myModal3").modal();
                       $(".modal-close").on("click",function(){
                        location.reload();
                       })
}

    }/*End of else part*/

  });/*End of 1st loop*/




// Start of instert new Propertydata into table
console.log("value for insert"+JSON.stringify($scope.arrayForInsert, null, "\t"));
if($scope.arrayForInsert.length>0)
{
  var insertpost=JSON.stringify($scope.arrayForInsert, null, "\t");
$http({              
        method : "POST",
         url: "/actnow-claims-1.0.0/actnow/propertysets/",
        data:insertpost,
 headers: { 'Content-Type': 'application/json'}
       
   }).then(function mySuccess(response) {
       
      
                        $(".modal-body-result").html("<div class='alert alert-success'> <strong>Coloum Submission successfully</strong></div>");
                    $("#myModal3").modal();
                       $(".modal-close").on("click",function(){
                        location.reload();
                       })
    },   
       /*maIN SUCCESS END HERE*/
     function myError(response) {
      console.log(response);
       $(".modal-body-result").html("<div class='alert alert-danger'> <strong>coloum saved Failed</div>");
                    $("#myModal3").modal();
                       $(".modal-close").on("click",function(){
                        location.reload();
                       })
    });     
 }
/*End of instert new Propertydata into table */

















}/*End of save coloum function*/
/*End of coloum CURD operation*/


$scope.bulkinsertEmployee=function(){

  var link="/actnow-claims-1.0.0/entry/bulkemployee.html";
 //alert(link);
  $("#frame").attr("src",link);
                      
                      $("#myModalEntry").modal();
                      $("body").scrollTop();

}



/*Start of get employee entry from*/
$scope.insertEmployee=function(){
 var link="/actnow-claims-1.0.0/entry/employee.html?sessionId="+$scope.sessionId+"";
 //alert(link);
  $("#frame").attr("src",link);
                      
                      $("#myModalEntry").modal();
                      $("body").scrollTop();
}
/*End of getting employee entry from*/



  });

  /*End of controller*/


/*Filter for paigination*/
myApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

/*End of filter paigination*/





/*Start of search filter with dept Name*/

/*End of sort department*/