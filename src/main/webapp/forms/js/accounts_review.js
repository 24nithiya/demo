
$(".document").load("html/document.html");

$(".history").load("html/history.html");
$(".message").load("html/messageAlert.html");


var uuid;

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
var key=arr[0];
var task_id=arr[1];
var sessionId=arr[2];
//alert("key="+key+" "+"task_id="+task_id);
/*alert(arr[2]);*/


var act_id="";
$("#add_act").click(function(){
      $("#act_contain").html(function(){
        var temp="<div class='form-group' style='padding:20px;' id='act_contain'>"+
        "<label for='sel1'>Action</label>"+
  "<select class='form-control' id='sel1' name='action'>"+
    "<option selected='true' disabled='disabled'>Select</option>"+
    "<option>Approve</option>"+
    "<option>Send Back To Employee</option>"+
    "<option>Send Back toManager</option>"+
    "<option>Payment Completed</option></select></div>";
    return temp;
    act_id=$("#sel1").val();
   // alert(act_id);
      });

});






  var bank_change_id="";
$("#change_bank").click(function(){

//alert("changing");
$("#bank_change_add").html(function(){
 // alert("inside");

var mer=" <label>Bank Name</label><select class=' getBank form-control ' id='' ><option readonly>Select Bank</option>";

$(bank_dat).each(function(i){

      var id=bank_dat[i].id;
      var name=bank_dat[i].bankName;

      mer+="<option id='"+ id+"' value='"+id+"'>"+name+"</option>";

  

  });
  return mer+"</select>";
});

$(".getBank").on("change" , function(){
    //alert("try to change value");
    var post_id=$( "select option:selected" ).attr("id");
    $(".getBank").attr("id",post_id);
    bank_change_id=$(".getBank").attr("id");
    console.log($(".getBank").attr("id"));
  })


});








$(document).ready(function(){
    $("#flip").click(function(){
        $("#panel").slideToggle("slow");
           
    });

    $("#flip1").click(function(){
        $("#panel1").slideToggle("slow");
    });
     $("#flip3").click(function(){
        $("#panel3").slideToggle("slow");
    });

     $("#flip4").click(function(){
        $("#panel4").slideToggle("slow");
    });
});


var emp_id="";
var claim_file={
              "cname":[],
              "cdate":[],
              "ccreatedBy":[],
              "clastModificationDate":[],
              "clastModifiedBy":[]
            };
var total=0;
var tab="";  
var doc="";
var get_data="";
var managerName="";

  //alert("hey");


  var d = new Date();
 
 var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var date = new Date();
date = monthNames[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();

console.log(date);


 var dat=date+" "+DisplayCurrentTime();
    
    console.log(dat);

  var popupDiv = document.getElementById("popup_bg1");

  function DisplayCurrentTime() {
        var date = new Date();
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
        return time;
    };


     




          //Start of getting data and set in the field
  $.ajax({
              url: url.expanseClaim+key,//need to make generic using login id,should get employeeId and then using empId call employeedetails
              type: "GET",
              dataType: "json",
              async: false,
              success: function(data)  {
                get_data=data;
      
               var tRequestId=data.application.travelActual.travelRequestId;
               var tStartDate=data.application.travelActual.startDate;
               var tEndDate=data.application.travelActual.endDate;
               var travelMode=data.application.travelActual.travelMode;
               var travelClass=data.application.travelActual.travelClass;
               var claimType=data.claimType;
                var getBank=data.application.travelActual.bankAcId;



              // alert(tRequestId+tStartDate+tEndDate+travelMode+travelClass+claimType);
                document.getElementById("travelId").value=tRequestId;
        document.getElementById("claimType").value=claimType;
         document.getElementById("modeTravel").value=travelMode;
         document.getElementById("startDate").value=tStartDate;
         document.getElementById("endDate").value=tEndDate;
         document.getElementById("classTravel").value=travelClass;


        emp_id=data.employeeId;




//START OF GET BANK FROM DATA BASE
var bank_dat="";
$.ajax({
 
             url: url.bankAccount+emp_id,//need to make generic
             type: "GET",
            // dataType: "json",
             async: true,
             success: function(data)  {
               //alert("success");
              
                bank_dat=data;
                //console.log(data[0].id+"<br>"+bank_dat[1].id);
               // console.log(bank_dat[0].id);
 
 
 
          $(bank_dat).each(function(i){
       var name="";
       var id=bank_dat[i].id;
      // alert(id +"bankid"+getBank);
       if(id==getBank)
       {
         console.log("yes");
 
       
         $(".getBank").val(bank_dat[i].bankName);
         $(".getBank").attr("id",id);
       }
       else{ console.log("NO");}
       
        });
 
             }});
             //END OF GET BANK FORM DATABASE




          //document.getElementById("getBank").value=getBank;
 
        // alert(emp_id);


         




          var expanse=data.application.expenses;
          console.log(expanse);
          
            //  
            	
            $(expanse).each(function(i){
              console.log(expanse[i].expenseType);
              console.log(expanse);


              tab="<tr><td><input type='text' class='form-control' style='background:white,color:black' value='"+expanse[i].expenseType+"' readonly></td><td><input type='text' class='form-control' style='background:white,color:black' value='"+expanse[i].paymentType+"' readonly></td><td><input type='text' class='form-control' style='background:white,color:black' value='"+expanse[i].amount+"' readonly></td><td><input type='text' class='form-control' style='background:white,color:black' id='fileName"+i+"' value='"+expanse[i].receipt.locationUri+"' readonly></td><td><button type='button' class='btn btn-primary' id='"+ i +"' onclick='viewReceipt(this.id)'>View</button></td></tr>";
                total+=parseInt(expanse[i].amount);
                                 
                $("#rows_tab").append(tab);
                $("#total").val(total);
            });

            $(data.application.notes).each(function(i){

              
                  getprependNotes(data.application.notes[i]);
                  

               
            });


                $(data.application.referenceDocuments).each(function(i){

              

                  filelist(data.application.referenceDocuments[i].locationUri);

               
            });
          



                  $(data.application.history).each(function(i){

                    var histobj={};

                    histobj.eventId=data.application.history[i].eventId;
                    histobj.createdBy=data.application.history[i].createdBy;
                    histobj.createdAt=data.application.history[i].createdAt;
                    histobj.isAlarm=data.application.history[i].isAlarm;
                    histobj.eventDescritption=data.application.history[i].eventDescritption;
                    histobj.remarks=data.application.history[i].remarks;
                     
                    var histable="<tr><td>"+histobj.eventId+" </td><td>"+histobj.createdBy+"</td><td>"+histobj.createdAt+"</td><td>"+histobj.eventDescritption+"</td><td>"+histobj.remarks+"</td></tr>";

                    $("#history tbody").append(histable);



               });



               var action_review=[];
               action_review=data.application.action;
               $(action_review).each(function(i){
                $("#sel1").val();
                
               });

              },
               error: function(jqXHR, textStatus, errorThrown)  {
                        console.log(jqXHR.status+' '+jqXHR.textStatus);  
                } 
              });
                //End of getting data and set in the field
           


var managerLoginId="";


   $.ajax({
      url: url.empData+emp_id,//need to make generic using login id,should get employeeId and then using empId call employeedetails
      type: "GET",
      dataType: "json",
      async: true,
      success: function(data)  {
        //alert("success");
        var fsname=data.firstName;
        var number=data.employeeId;
        var department=data.buId;

         document.getElementById("fsname").value=fsname;
        document.getElementById("number").value=number;
        // document.getElementById("department").value=data.buId;

$(".notes").load("html/notes.html",function(){
  $("#queueName").val("AccountReview");
  // $("#userId").val(sessionId);
   $("#userName").val(fsname);

 $.ajax({
      url : "/actnow-claims-1.0.0/actnow/department/"+data.deptId+"",//need to make generic using login id,should get employeeId and then using empId call employeedetails
      type: "GET",
      dataType: "json",
      async: true,
      success: function(data)  {

        console.log("DEPARTMENT DATA"+data.name);
        document.getElementById("department").value=data.name;

      }
    })
});
        
       
      },
       error: function(jqXHR, textStatus, errorThrown)  {
          
              //  alert(jqXHR.status+' '+jqXHR.textStatus);  
        } 
      });


   $.ajax({

            url: url.managerId+emp_id,//need to make generic
            type: "GET",
            dataType: "json",
            async: true,
            success: function(data)  {
              //alert("success");
             
              var managerId=data.managerId;
              

              $.ajax({
            url: url.empData+managerId,
            type: "GET",
            dataType: "json",
            async: true,
            success: function(data)  {
               managerName=data.firstName;
                managerLoginId=data.loginId;

              document.getElementById("manager").value=managerName;
            },
             error: function(jqXHR, textStatus, errorThrown)  {
                
                    //  alert(jqXHR.status+' '+jqXHR.textStatus);  
              } 
            });
      },
       error: function(jqXHR, textStatus, errorThrown)  {
          
              //  alert(jqXHR.status+' '+jqXHR.textStatus);  
        } 
      });














       var noOfNotes = 0;



      //handling the form submit event
      function prepareEventHandlers(){
          startdate = document.getElementById("startdate").value;
          enddate = document.getElementById("enddate").value;
          totalamount = document.getElementById("claimTotalAmount").value;
          if(startdate === ""){
            document.getElementById("errormsg").innerHTML="Select start date before submitting";
            return false;
          }else if(enddate === ""){
            document.getElementById("errormsg").innerHTML="Select end date before submitting";
            return false;
          }else if(totalamount<=0){
            document.getElementById("errormsg").innerHTML="Enter valid amount";
            return false;
          }else{
            document.getElementById("errormsg").innerHTML="";
            return true;
          }
      }


 var myObj1, p, r = "";

      myObj1 = {
        "userIds": [],
        "userNames": [],
        "queueNames": [],
        "descriptions": [],
        "remarks": []
      }





function addNotes() {
       
         var userId = $('#userId').val();
         var userName = $('#userName').val();
         var queueName = $('#queueName').val();
         var description = $('#description').val();
         var remarks = $('#remarks').val();


        myObj1.userIds.push(userId);
        myObj1.userNames.push(userName);
        myObj1.queueNames.push(queueName);
        myObj1.descriptions.push(description);
        myObj1.remarks.push(remarks);
       
          console.log(myObj1.userNames.length);

         /* for (p in myObj1.descriptions) {
              r += "<h2>" + myObj1.descriptions[p] + "</h2>";
          }*/


          //for resetting fields
          document.getElementById("userId").value = '';
          document.getElementById("userName").value = '';
        //  document.getElementById("queueName").value = '';
          document.getElementById("description").value = '';
          document.getElementById("remarks").value = '';

          prependNotes(myObj1);
           // return myObj1;
      }



      function prependNotes(myObj1){

       var content = "<tr><td>"+myObj1.userIds+"</td><td>"+myObj1.userNames+"</td><td>"+myObj1.queueNames+"</td><td>"+myObj1.descriptions+"</td><td>"+myObj1.remarks+"</td><td></td></tr>";
       //<td><button class='btn btn-danger'>X</button></td>
        //console.log("yako barthilla");
          $("#notes").append(content);
        //console.log("yako bandhe");
        noOfNotes += 1;
        console.log(myObj1);
      }
 function getprependNotes(myObj1){

       var content = "<tr><td>"+myObj1.userId+"</td><td>"+myObj1.userName+"</td><td>"+myObj1.queueName+"</td><td>"+myObj1.description+"</td><td>"+myObj1.remarks+"</td><td></td></tr>";
       //<td><button class='btn btn-danger'>X</button></td>
        //console.log("yako barthilla");
          $("#notes").append(content);
        //console.log("yako bandhe");
        noOfNotes += 1;
        console.log(myObj1);
      }




 uuid=get_data.application.applicationUuid;



$("input[type=text]").css("background","white");
$("input[type=text]").css("color","black");


var empLoginId="";
  $.ajax({

            url: url.empData+emp_id,//need to make generic
            type: "GET",
            dataType: "json",
            async: true,
            success: function(data)  {

                   // alert(data.loginId);
                    empLoginId=data.loginId;


                  
                  }});


  var actionHolderFirstName="";

 $.ajax({

            url: url.empData+sessionId,//need to make generic
            type: "GET",
            dataType: "json",
            async: true,
            success: function(data)  {

                  //  alert(data.firstName);
                    /*empLoginId=data.loginId;*/
                    actionHolderFirstName=data.firstName;
                   // alert(empLoginId);
                }
    
                });




$("#sub").click(function(e) {
        e.preventDefault();
         act_id=$("#sel1").val();
       //  alert(act_id+"   COMING HERE");
var remarks=$("#comment").val();

//alert(act_id+"gcdg "+remarks);


var actions=[];

    var res={};
    res.selectAction=act_id;
    res.remarks=remarks;
    res.userId="12354";
    res.queueName="AccountReview";

    actions.push(res);
    



/*
var actions=[];
var act=false;
var po;
actions=get_data.application.action;
console.log(actions);

$(actions).each(function(i){



//console.log(actions[i].queueName);
if(actions[i].queueName=="AccountReview")
{
  act=true;
  //actions[i].selectAction=act_id;
  po=i;
  console.log(i+"   "+actions[i].queueName+" "+actions[i].selectAction);
  return false;

}
else
{
  act=false;
}

});
if(act==true)
{
  actions[po].selectAction=act_id;
  console.log("ALREADY EXIST");
}
else{
  var res={};
    res.selectAction=act_id;
    res.remarks=remarks;
    res.userId="12354";
    res.queueName="AccountReview";

    actions.push(res);
}
  
   */ 


var json={};
json.employee=get_data.application.employee;
var emp_id=get_data.application.employee.employeeId;

    json.applicationUuid=get_data.application.applicationUuid;
json.applicationId=get_data.application.applicationId;
json.taskId=task_id;
json.applicationStatus=act_id;
json.createdAt=get_data.application.createdAt;
json.modifiedAt=get_data.application.modifiedAt;
json.claimTotalAmount=get_data.application.claimTotalAmount;
json.currency=get_data.application.currency;
json.claimType=get_data.application.claimType;



json.travelActual=get_data.application.travelActual;
console.log($(".getbank").val());
bank_change_id=$(".getBank").attr("id");
json.travelActual.bankAcId=bank_change_id;
json.expenses=get_data.application.expenses;



var referenceDocument = [];
                    
                    var clength=claim_file.cname.length;
                    console.log("CLAIM_LENGTH IS"+clength);
                    for(var p=0;p<clength;p++)
                    {
                        var documents = {};

                        documents.locationUri = claim_file.cname[p];
                        documents.applicationNo = claim_file.cdate[p];
                        documents.createdBy = claim_file.ccreatedBy[p];
                        documents.modifiedBy = claim_file.clastModifiedBy[p];
                        documents.approvedBy = "somePerson";
                        documents.approvedOn = dat;

                        referenceDocument.push(documents);
                      }

                        json.referenceDocuments = referenceDocument;




json.referenceDocuments=referenceDocument;

json.action=actions;



                    var myobjlen=myObj1.userNames.length;
                    for(var i=0;i<myobjlen;i++)
                     {

                    var notesDetails = {};
                        notesDetails.userId = myObj1.userIds[i];
                        notesDetails.userName = myObj1.userNames[i];
                        notesDetails.createdAt = dat;
                        notesDetails.queueName = myObj1.queueNames[i];
                        notesDetails.description = myObj1.descriptions[i];
                        notesDetails.remarks = myObj1.remarks[i];

                        get_data.application.notes.push(notesDetails);
                        
                        console.log(JSON.stringify(get_data.application.notes));
                      }




json.notes=get_data.application.notes;




var history_arr=[];
history_arr=get_data.application.history;
/*$(get_data.application.history).each(function(i){

                    var histobj={};

                    histobj.eventId=get_data.application.history[i].eventId;
                    histobj.createdBy=get_data.application.history[i].createdBy;
                    histobj.createdAt=get_data.application.history[i].createdAt;
                    histobj.isAlarm=get_data.application.history[i].isAlarm;
                    histobj.eventDescritption=get_data.application.history[i].eventDescritption;
                    histobj.remarks=get_data.application.history[i].remarks;
                   history_arr.push(histobj);
                   console.log(history_arr);

               });*/


  var his={};

his.eventId=get_data.application.history[0].eventId;
his.createdBy=get_data.application.history[0].createdBy;
his.createdAt=dat;
his.isAlarm=get_data.application.history[0].isAlarm;
console.log(his.eventId+"   "+get_data.application.history[0].eventId);
his.eventDescritption="Account_Review";
his.remarks="<b>"+ act_id+"</b> -by-<b>"+actionHolderFirstName+"</b><br><b>Remarks:-</b>"+remarks+"" ;
history_arr.push(his);
console.log(his);








    json.history=history_arr;

    
var ass="";


                           if(act_id=="EMPLOYEEREVIEW")
                          {
                             ass=empLoginId;
                          }
                          else if(act_id=="CLAIMAPPROVAL")
                          {
                            ass=managerLoginId;
                          }
                          else{
                            ass="";
                          }
                        /*  alert(empLoginId+"___"+managerLoginId);
                         alert(ass);*/
                         var interval={};
                         interval.assignee=ass;
                          json.actnowInterval=interval;






   var html=JSON.stringify(json, null, "\t");
   console.log(html);
    $("#loading").css("display","block");
 $("#sub").attr("disabled","disabled")
 $.ajax({
                    url: url.expanseClaim,
                    type: "PUT",
                    dataType: "json",
                    async: true,
                    contentType:'application/json',
                    data: html,
                    success: function()  {
                     // alert("data successfully stored");
                      $("#loading").css("display","none");
                      window.parent.moveTop();
                        $(".modal-body-result").html("<div class='alert alert-success'> <strong>Data Submission successfully</strong></div>");
                    $("#myModal3").modal();

                       $(".clo-message").on("click",function(){
                    	   window.parent.closeModal();
                       })
                       
                    },
                     error: function(jqXHR, textStatus, errorThrown)  {
                      //alert("error storing data: "+jqXHR.status+' '+jqXHR.textStatus); 
                       $("#loading").css("display","none"); 
                        window.parent.moveTop();
                      $(".modal-body-result").html("<div class='alert alert-danger'> <strong>Data Submission Failed</div>");
                    $("#myModal3").modal();
                     $(".clo-message").on("click",function(){
                         window.parent.closeModal();
                       })
                      } 
                    });

      });

