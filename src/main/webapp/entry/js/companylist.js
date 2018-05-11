
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

var sessionId=arr[0];
console.log(sessionId);



$scope.companyDataShow=[];
$scope.companyData=[];


   $http({
        method : "GET",
        url : "/actnow-claims-1.0.0/actnow/companies"
    }).then(function mySuccess(response) {
      /*start of company success*/
        $scope.companyData=response.data;
        for(var i=0;i< $scope.numberOfPages();i++)
        {
         $scope.totalPageList.push(i);
        }

    //    console.log("Company Data is"+$scope.companyData );

   $http({
        method : "GET",
        url : "/actnow-claims-1.0.0/actnow/department"
    }).then(function mySuccess(response) {
      /*start of company success*/
        $scope.departmentData=response.data;
        console.log("Company Data is"+$scope.departmentData );

         $http({
        method : "GET",
        url : " /actnow-claims-1.0.0/actnow/businessunits"
    }).then(function mySuccess(response) {
       
/*Start of business unit*/

//console.log("Business Unit"+response.data);
 $scope.businessUnits=response.data;

     
        angular.forEach($scope.companyData,function(value,key){


             $scope.deptName=[];
           console.log(value);
            

            angular.forEach($scope.departmentData,function(depval,depkey){
           
           if(value.uniqueId==depval.uniqueId)
           {
               
             /*  $scope.dept={
                "name":depval.name,
                "uniqueId":depval.uniqueId
               };*/

               $scope.dept=depval.name;
            
$scope.deptName.push($scope.dept);
               // console.log(depval.name);
           }
        
        })/*End of 2nd loop*/

 $scope.busName=[];
           
            /*Start of 3rd loop*/
             angular.forEach($scope.businessUnits,function(busval,buskey){
 //console.log("unique_____"+JSON.stringify(busval, null, "\t"));
            //  console.log("all==="+busval.name);
           if(value.uniqueId==busval.uniqueId)
           {
               
              /* $scope.bus={
                "name":busval.name,
                "uniqueId":busval.uniqueId
               };
            */

            $scope.bus=busval.name;

$scope.busName.push($scope.bus);
//console.log("Buss"+$scope.busName);
               
           }
        
        })/*End of 3rd loop*/


           //  console.log("_____"+value.parentCompny+"____");
             if($scope.deptName.length==0)
              /*$scope.deptName[0]={
                "name":"NOT Avalabile"
              };*/

                $scope.deptName[0]="NOT Avalabile";

            if($scope.busName.length==0)
            /*  $scope.busName[0]={
                "name":"NOT Avalabile"
              };*/
               $scope.busName[0]="NOT Avalabile"
      
$scope.tempComObj={
              "id":value.id,
              "parentCompny":value.parentCompny+"",
              "company":value.company+"",
              "country":value.country+"",
              "state":value.state+"",
              "uniqueId":value.uniqueId+"",
              "department":$scope.deptName,
              "businessUnits":$scope.busName,
              "alias": value.alias+"",
       "leglEntity": value.leglEntity+"",
       "addressLin1": value.addressLin1+"",
       "addressLin2": value.addressLin2+"",
       "addressLin3": value.addressLin3+"",
       "postCode": value.postCode+"",
       "contact": value.contact+"",
       "fax": value.fax+"",
       "email": value.email+"",
       "website": value.website+"",
       "defaultCurrency": value.defaultCurrency+"",
       "defaultDateFormat": value.defaultDateFormat+"",
       "decimalPoint": value.decimalPoint+"",
       "decimalPosition":value.decimalPosition+"",
       "defaultTimeZone": value.defaultTimeZone+"",
       "ficalYrStart": value.ficalYrStart+""
            };

$scope.companyDataShow.push($scope.tempComObj);
//console.log(JSON.stringify($scope.tempComObj, null, "\t"));
        })


        /*End of 1st loop*/

/*End of business unit*/
    }, function myError(response) {
        console.log(response.data);
    });


    }, function myError(response) {
        console.log(response.data);
    });



    }, function myError(response) {
        console.log(response.data);
    });



/*Start of sorting*/

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

$scope.selection='parentCompny';
    $scope.sort=function(o){
      $scope.sortDepStatus="off";
      $scope.sortBool=!$scope.sortBool;

      $scope.selection=o;
    //  console.log($scope.selection)
   
    }


/*End of sorting*/

$scope.searchDataFilter=function(){

   $scope.totalPageList=[];

for(var i=0;i< $scope.numberOfPages();i++)
{
  $scope.totalPageList.push(i);
}

$scope.currentPage=0;
}




    /*Start of edit menu*/
$scope.editForm=function(x){

  console.log(JSON.stringify(x, null, "\t"));
  var framcomId=x;
console.log("FRAME KEY  "+framcomId.id);
var fin="/actnow-claims-1.0.0/entry/editcompany.html?session="+framcomId.id+"";
//var fin="http://localhost:8080/actnow-claims-1.0.0/entry/editemployee.html?session=36";
  $("#iframe").attr("src",fin);
  $("#myModalPage").modal();
                        window.parent.topScroll();
}

    /*End of edit menu*/



/*Start delete part*/

$scope.deleteAlert=function(x){

$scope.comDelId=x.id;
$scope.deluniqueId=x.uniqueId;

$("#myModalDel").modal();
window.parent.topScroll();

}
$scope.deleteRecord=function(){
  console.log($scope.comDelId+" "+$scope.deluniqueId);
/*
  console.log($scope.departmentData);
    console.log($scope.businessUnits);*/
    /*Start of delete Bus units*/


    /*Start of 1st promises*/
    var busDef= $q.defer();
    function busDel (id){
      
console.log(" "+id);
    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/actnow-claims-1.0.0/actnow/businessunits/"+id+"",
  "method": "DELETE",
  "headers": {
    "cache-control": "no-cache",
  }
}

$.ajax(settings).done(function (jqXHR, textStatus, errorThrown) {
  console.log(jqXHR+"BUS DELETE");
  console.log(textStatus+"BUS DELETE");
  console.log(errorThrown+"BUS DELETE");
  busDef.resolve("Success");
}).fail(function(jqXHR, textStatus, errorThrown){
  console.log(jqXHR+"BUS DELETE");
  console.log(textStatus+"BUS DELETE"+textStatus);
  console.log(errorThrown+"BUS DELETE");
   $("#myModalDel").modal('hide');
      console.log(response);

       $(".modal-body-result").html("<div class='alert alert-danger'> <strong>Delete Record Failed</div>");
                    $("#myModal3").modal();
                       $(".modal-close").on("click",function(){
                        location.reload();
                       })
});
 return busDef.promise;
 }






 var promises = [];
   
/*Start of Delete Bus units*/

angular.forEach($scope.businessUnits,function(val,key){

  if(val.uniqueId==$scope.deluniqueId)
  {
    console.log("FIRST EXECUATION START "+val.id);
     promises.push(busDel(val.id));
  }

})
/*End of Delete Bus units*/
/*End of 1st promises*/

 var promisesData=[];

/*End of 2nd q all promiss call*/
 $q.all(promises).then(
        function() {
          console.log("Enter into 2nd promises");
         
/*Start of 2nd promises*/
var depDef= $q.defer();
 function depDel (id){
      
console.log(" "+id);
    var settings = {
  "async": true,
  "crossDomain": true,
  "url":  "/actnow-claims-1.0.0/actnow/department/"+id+"",
  "method": "DELETE",
  "headers": {
    "cache-control": "no-cache",
  }
}

$.ajax(settings).done(function (jqXHR, textStatus, errorThrown) {
  console.log(jqXHR+"Dep DELETE");
  console.log(textStatus+"Dep DELETE");
  console.log(errorThrown+"User ROles DELETE");
  depDef.resolve("Success");
}).fail(function(jqXHR, textStatus, errorThrown){
  console.log(jqXHR+"Dep DELETE");
  console.log(textStatus+"Dep DELETE"+textStatus);
  console.log(errorThrown+"Dep DELETE");
   $("#myModalDel").modal('hide');
      console.log(response);

       $(".modal-body-result").html("<div class='alert alert-danger'> <strong>Delete Record Failed</div>");
                    $("#myModal3").modal();
                       $(".modal-close").on("click",function(){
                        location.reload();
                       })

});
 return depDef.promise;
 }


/*Start of Delete Department*/
angular.forEach($scope.departmentData,function(val,key){
  if(val.uniqueId==$scope.deluniqueId)
  {
    console.log("SECOND EXECUATION START "+val.id);
     promisesData.push(depDel(val.id));
  }
})
/*End of Delete Department*/
/*End of 2nd promises*/
 })
 /*End of fir q all promiss call*/






/*Start  of 2nd $q promises call*/
$q.all(promisesData).then(
        function() {



 var id=$scope.comDelId;
 /*Start of id condition*/

                          if(id!="")
                          {

                          (function(id) {
                            
                            $http({              
        method : "DELETE",
         url: "/actnow-claims-1.0.0/actnow/companies/"+id+"",
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

                        }//*End of id condition



   })
/*End of 2nd $q promises call*/




}
/*End delete part*/






/*Start of paigination*/

     $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.companyData, $scope.searchData)
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
            if(value.propertyName.includes("companyColoum") )
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
            if(value.propertyName.includes("companyColoum") )
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
                                    
                                       "propertyName": "companyColoum",
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
            if(value.propertyName.includes("companyColoum") )
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





/*Start of get employee entry from*/
$scope.insertCompany=function(){
 var link="/actnow-claims-1.0.0/entry/company.html?sessionId="+$scope.sessionId+"";
 //alert(link);
  $("#frame").attr("src",link);
                      
                      $("#myModalEntry").modal();
                      $("body").scrollTop();
}
/*End of getting employee entry from*/







});

/*Filter for paigination*/
myApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

/*End of filter paigination*/

  