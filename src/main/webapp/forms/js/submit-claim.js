

$(".document").load("html/document.html");

$(".history").load("html/history.html");
$(".message").load("html/messageAlert.html");
  

var travelType=[
{
  "mode":"Flight",
  "class":["Economic","Business","FirstClass","Premium"]
},
{
  "mode":"Bus",
  "class":["AcSeater","NonAcSeater","AcSlepper","NonAcSlepper"]
},
{
  "mode":"Train",
  "class":["AcSeater","NonAcSeater","AcSlepper","NonAcSlepper"]
},
{
  "mode":"Car",
  "class":["Micro","Mini","Prime","Luxury"]
},
{
  "mode":"Ship",
  "class":["First","Second","Bunk","VIP"]
}
];


$.each(travelType,function(key,val){
  var temp="<option value="+JSON.stringify(val)+" >"+val.mode+"</option>";
  console.log(temp);
  $("#modeoftravel").append(temp);
})

function getClass(){
$("#classOfTravel").html("");
  var ind=$("#modeoftravel").val();
  var data=JSON.parse(ind);

  $.each(data.class,function(key,val){
    var temp="<option disabled='disabled' >Select travel class</option>"
      temp="<option value="+val+" >"+val+"</option>";
  console.log(temp);
  $("#classOfTravel").append(temp);
  })

}



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


var emp_id;
var bank_data=" ";



  //SCRIPT FOR BBANK ACCOUNT OPEN
$("#bank_sub").click(function(){



  emp_id=$("#emp_id").val();
  var acc_name=$("#acc_name").val();
  var acc_no=$("#acc_no").val();
  var bank_name=$("#bank_name").val();
  var branch_code=$("#branch_code").val();
  var  branch_name=$("#branch_name").val();
  var ifsc_code=$("#ifsc_code").val();
  var address=$("#address").val();
 


if(emp_id=="" || acc_name=="" || bank_name=="" || branch_code=="" || branch_name=="" || ifsc_code=="" || address=="")
{
  //alert("fill all field");
     $(".modal-body-result").html("<h2 style='color:red'>Fill All The Field</h2>");
                    $("#myModal3").modal();
}
else
{
 //  alert(emp_id+" "+acc_name+" "+acc_no+" "+bank_name+" "+branch_code+" "+branch_name+" "+ifsc_code+" "+address);

var bank_dom;
   var bank={};
   
   bank.empId=emp_id;
   bank.accountName=acc_name;
   bank.accountNumber=acc_no;
   bank.bankName=bank_name;
   bank.branchName=branch_name;
   bank.branchCode=branch_code;
   bank.swiftIfsc=ifsc_code;
   bank.address=address;
   
   //bank_dat.push(bank);
   bank_dom=JSON.stringify(bank, null, "\t");
   console.log(bank_dom);



   $.ajax({
    url: url.bankAccount,
    type: "POST",
   // dataType: "json",
    async: true,
    contentType:'application/json',
    data: bank_dom,
    success: function()  {
     // alert("Bank added");
        $(".modal-body-result").html("<div class='alert alert-success'> <strong>Data Submission successfully</div>");
                    $("#myModal3").modal();
      get_Bank();
      $("#emp_id").val("");
  $("#acc_name").val("");
  $("#acc_no").val("");
  $("#bank_name").val("");
  $("#branch_code").val("");
  $("#branch_name").val("");
  $("#ifsc_code").val("");
 $("#address").val("");
    },
     error: function(jqXHR, textStatus, errorThrown)  {
       $(".modal-body-result").html("<div class='alert alert-danger'> <strong>Data Stored Failed</div>");
                    $("#myModal3").modal();
     // alert("error storing data: "+jqXHR.status+' '+jqXHR.textStatus);  
      } 
    });


}


  });
 var receiptData=[];



var file={
              "name":[],
              "date":[],
              "createdBy":[],
              "lastModificationDate":[],
              "lastModifiedBy":[]
            };
            var claim_file={
              "cname":[],
              "cdate":[],
              "ccreatedBy":[],
              "clastModificationDate":[],
              "clastModifiedBy":[]
            };
             var ind=0;
            var knd=0;
    var travelRequestId;

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
  function openPopUpMenu() {
  popupDiv.style.display = "block";
  event.preventDefault();
  }
          
  function closePopUpMenu() {
  popupDiv.style.display = "none";
  }
  
  $('#myItem').change(function(){
        popupDiv.style.display = "block";
    event.preventDefault();
     
  })

  /*var popupDiv1 = document.getElementById("popup_bg2");
  function openPopUpMenu() {
  popupDiv1.style.display = "block";
  event.preventDefault();
  }
          
  function closePopUpMenu() {
  popupDiv1.style.display = "none";
  }
  
  $('#myItem1').change(function(){
        popupDiv1.style.display = "block";
    event.preventDefault();
     
  })
*/







 function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          }


          var uuid=uuidv4();
         // alert(uuid);





    var i=1;
      $(document).on('click', '.btn_addtable', function(){
        var button_id=$(this).attr("id");
        
        $('.apnd').append('<p><div class="row mapp" id="del'+i+'" style="padding-left:15px; padding-right:15px;"><div class="col-xs-2"><select class="form-control" name="expenseType[]"><option>Select</option><option>Ticket</option><option>Rent a Car</option><option>Lodging/Stay</option><option>Food Expense</option><option>Entertainment</option></select></div><div class="col-xs-2"><select class="form-control" name="paymantType[]"><option>Select</option><option>Credit Card</option><option>Debit Card</option><option>Cash</option></select></div><div class="col-xs-2"><input class="form-control" type="number" name="amount[]" value="cal"></div><div class="col-xs-2"><input class="form-control fileupload" type="file" id="filedata'+i+'" name="files[]"></div><div class="col-xs-4"><button type="button" style="color:red" class="btn btn-xs btn-default fileuploadbutton" id="'+i+'" onclick="forDynamicFileUpload(this.id)" style=" "><span class="glyphicon glyphicon-cloud-upload"></span></button>&nbsp;<button name="" type="button" class="btn btn-info btn_addtable" >+</button>&nbsp;<button name="" id="'+i+'" class="btn btn-warning delete">x</button></div></div></p>');
          i++;
          event.preventDefault();
        });

      //code snippet to remove element dynamically
      $(document).on('click', '.delete', function(){
        var button_id=$(this).attr("id");
        $('#del'+button_id+'').remove();
        if (button_id=="firstDelBut") {
  $('#del0').remove();
        //  $('.apnd').append('<p><div class="row mapp" id="del0" style="padding-left:15px; padding-right:15px;"><div class="col-xs-2"><select class="form-control" name="expenseType[]"><option>Select</option><option>Ticket</option><option>Rent a Car</option><option>Lodging/Stay</option><option>Food Expense</option><option>Entertainment</option></select></div><div class="col-xs-2"><select class="form-control" name="paymantType[]"><option>Select</option><option>Credit Card</option><option>Debit Card</option><option>Cash</option></select></div><div class="col-xs-2"><input class="form-control" type="number" name="amount[]" value="cal"></div><div class="col-xs-2"><input class="form-control fileupload" type="file" id="filedata0" name="files[]"></div><div class="col-xs-3"><button type="button" class="btn btn-xs btn-success fileuploadbutton" id="0" onclick="forDynamicFileUpload(this.id)" style="height:32px; font-size: 16px;"><span class="glyphicon glyphicon-cloud-upload"></span></button>&nbsp;<button name="" type="button" class="btn btn-info btn_addtable" >+</button>&nbsp;<button name="" id="0" class="btn btn-warning delete">x</button></div></div></p>');
          
        }
        var calculated = 0;
                $("input[value=cal]").each(function () {
            if ($.isNumeric($(this).val())) {
            calculated = calculated + parseInt($(this).val());
            }                   
            });
            $("input[value=total]").val(calculated);
        });

      /* $("body").on("click", ".delete", function() {
        $(this).closest(".well").remove();
       });*/
      
      
      //code snippet to calculate sum of the input fields
        $(document).on('keyup', '.amount', function(){
          var calculated = 0;
                $(".amount").each(function () {
            if ($.isNumeric($(this).val())) {
            calculated = calculated + parseInt($(this).val());
            }                   
            });
                $("#totalAmount").val(calculated);

              
          });

        function getTotal(){
          var calculated = 0;
                $(".amount").each(function () {
            if ($.isNumeric($(this).val())) {
            calculated = calculated + parseInt($(this).val());
            }                   
            });
                $("#totalAmount").val(calculated);
        }



var k=1;
 $(document).on("click",".btnAdd",function(){

  var tab='<tr class="newRow"><td> <select class="form-control"  name="expenseType[]" id="expenseType'+k+'"><option selected="true" disabled="disabled">Select</option><option>Ticket</option><option>Rent a Car</option><option>Lodging/Stay</option><option>Food Expense</option><option>Entertainment</option></select></td>'+
                          '<td> <select class="form-control"   name="paymantType[]" id="paymantType'+k+'"><option selected="true" disabled="disabled">Select</option><option>Credit Card</option><option>Debit Card</option><option>Cash</option></select></td>'+
                          '<td><input class="form-control amount"  type="number" placeholder="expense amount" name="amount[]" value="cal" id="amount'+k+'"> </td>'+
                          '<td><input class="form-control fileupload" type="file" name="files[]" id="filedata'+k+'"></td>'+
                          '<td><button type="button" class="btn btn-default btn-xs fileuploadbutton" id="'+k+'" onclick="forDynamicFileUpload(this.id)" style="color: red" style="border: 0px solid black"><span class="glyphicon glyphicon-cloud-upload" ></span></button></td>'+
                          '<td><button name="" type="button" class="btn btn-info btnAdd" style="border: 0px solid black">+</button></td>'+
                          '<td> <button name="" type="button" class="btn btn-warning btnDelete" id="firstDelBut"  style="border: 0px solid black">x</button></td></tr>';
 
$("#showReceiptData").append(tab);
k++;
 })

$(document).on("click",".btnDelete",function(){ 
  var ind=$(this).parent().parent().index();
  console.log(ind);
var rem=$(".newRow");
var tn=$(".btnDelete");
console.log(tn.length);
if(tn.length!=1){
$(rem[ind]).remove();
}


})
       





var hist=[];


//Fectching data from claim_request table for gettinng History



/*$.ajax({
              url: '/actnow-claims-1.0.0/actnow/expenseclaim/1234',//need to make generic using login id,should get employeeId and then using empId call employeedetails
              type: "GET",
              dataType: "json",
              async: false,
              success: function(data)  {
                get_data=data;
                var emp_id_bank="114";
                $("#emp_id").val(emp_id_bank);

      
               
               $(data.application.history).each(function(i){

                    var histobj={};

                    histobj.eventId=data.application.history[i].eventId;
                    histobj.createdBy=data.application.history[i].createdBy;
                    histobj.createdAt=data.application.history[i].createdAt;
                    histobj.isAlarm=data.application.history[i].isAlarm;
                    histobj.eventDescritption=data.application.history[i].eventDescritption;
                    histobj.remarks=data.application.history[i].remarks;
                    hist.push(histobj); 
                    var histable="<tr><td>"+histobj.eventId+" </td><td>"+histobj.createdBy+"</td><td>"+histobj.createdAt+"</td><td>"+histobj.eventDescritption+"</td><td>"+histobj.remarks+"</td></tr>";

                    $("#history tbody").append(histable);

console.log(hist);

               });

              },
               error: function(jqXHR, textStatus, errorThrown)  {
                        console.log(jqXHR.status+' '+jqXHR.textStatus);  
                } 
              });




*/










var managerLoginId="";


   //fetching employee data from db
      
      $.ajax({
      url: url.empData+sessionId,//need to make generic using login id,should get employeeId and then using empId call employeedetails
      type: "GET",
      dataType: "json",
      async: true,
      success: function(data)  {
        //alert("success");
        var fsname=data.firstName;
        emp_id=data.employeeId;

        
        document.getElementById("fname").value=fsname;
        document.getElementById("number").value=emp_id;
         
         $("#emp_id").val(emp_id);
         $(".notes").load("html/notes.html",function(){
  $("#queueName").val("Submit Claim");
  //$("#userId").val(sessionId);
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

        /*$.each(data, function(i, f) {
            var tblRow = "<tr>" +  
             "<td>" + data.firstName + "</td>" +
             "<td>" + data.lastName + "</td>" +
             "</tr>"
             $(tblRow).appendTo("#userdata tbody");
        });*/

        //assigning employee details not from form but directly from employee db table


        //employee.id=data.id;
        get_Bank();


          //for getting manager
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
              var managerName=data.firstName;
              managerLoginId=data.loginId;

              document.getElementById("manager").value=managerName;
            },
             error: function(jqXHR, textStatus, errorThrown)  {
                
                   //   alert(jqXHR.status+' '+jqXHR.textStatus);  
              } 
            });
      },
       error: function(jqXHR, textStatus, errorThrown)  {
          
               // alert(jqXHR.status+' '+jqXHR.textStatus);  
        } 
      });
      },
       error: function(jqXHR, textStatus, errorThrown)  {
          
               // alert(jqXHR.status+' '+jqXHR.textStatus);  
        } 
      });
               
     




function get_Bank(){

        var bank_emp_id=$("#number").val();
       // alert(bank_emp_id);

$.ajax({
              url: url.bankAccount+bank_emp_id,//need to make generic using login id,should get employeeId and then using empId call employeedetails
              type: "GET",
              dataType: "json",
              async: false,
              success: function(data)  {
                bank_data=data;
                  

                    

$(".bank_op").html(function(){
  //alert("inside");
var mer="<option readonly>Select Bank</option>";


$(bank_data).each(function(i){

      var id=bank_data[i].id;
      var name=bank_data[i].bankName;
      mer+="<option id='"+ id+"' value='"+id+"'>"+name+"</option>";
  });
  return mer;
});


//alert($(".bank_op").html());


                  }
                });


}











      $( document ).ready(function() {
          var myTxtArea = document.getElementById('remarks');
          myTxtArea.value = myTxtArea.value.replace(/^\s*|\s*$/g,'');
      });


        //for adding notes in json array
    var myObj1, p, r = "";

      myObj1 = {
        "userIds": [],
        "userNames": [],
        "queueNames": [],
        "descriptions": [],
        "remarks": []
      }



     




      function addNotes() {
        

       // alert("got");

         var userId = $('#userId').val();
         var userName = $('#userName').val();
         var queueName = $('#queueName').val();
         var description = $('#description').val();
         var remarks = $('#remarks').val();

         if(userId==="" && userName==="" && queueName==="" && description==="" && remarks===""){

         myObj1.userIds.push("");
        myObj1.userNames.push("");
        myObj1.queueNames.push("");
        myObj1.descriptions.push("");
        myObj1.remarks.push("");
       }
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
         // document.getElementById("queueName").value = '';
          document.getElementById("description").value = '';
          document.getElementById("remarks").value = '';

          prependNotes(myObj1);

         // return myObj1;

         



      }





$("input[type=text]").css("background","white");
$("input[type=text]").css("color","black");






       var noOfNotes = 0;
function prependNotes(myObj1){

       var content = "<tr><td>"+myObj1.userIds[noOfNotes]+"</td><td>"+myObj1.userNames[noOfNotes]+"</td><td>"+myObj1.queueNames[noOfNotes]+"</td><td>"+myObj1.descriptions[noOfNotes]+"</td><td>"+myObj1.remarks[noOfNotes]+"</td><td></td></tr>";
      
          $("#notes").append(content);
        noOfNotes += 1;
        console.log(myObj1);
      }

      //handling the form submit event
      function prepareEventHandlers(){
          startdate = document.getElementById("startdate").value;
          enddate = document.getElementById("enddate").value;
          totalamount = document.getElementById("totalAmount").value;
          trid=document.getElementById("trId").value;
          

          if(startdate === ""){
            document.getElementById("errormsg").innerHTML="Select start date before submitting";
            return false;
          }else if(enddate === ""){
            document.getElementById("errormsg").innerHTML="Select end date before submitting";
            return false;
          }else if(totalamount<=0){
            document.getElementById("errormsg").innerHTML="Enter valid amount";
            return false;
          }
          else if(trid === ""){
            document.getElementById("errormsg").innerHTML="Enter Travel id";
            return false;
          }else if(startdate> enddate){
              document.getElementById("errormsg").innerHTML="Enter correct date for travel";
            return false;
          }
          else{
            document.getElementById("errormsg").innerHTML="";
            return true;
          }

      }




     //submit form function


      $("#form").submit(function(e) {
        e.preventDefault();
        if(prepareEventHandlers()){
        var json = {};
           var employee = {};
               
               $.ajax({
              url: url.empData+sessionId,//need to make generic using login id,should get employeeId and then using empId call employeedetails
              type: "GET",
              dataType: "json",
              async: false,
              success: function(data)  {
      
                employee.id=data.id; //from employee table
                employee.firstName= $("[name=firstName]").val();//from form
                employee.lastName=data.lastName;//from employee table 
                employee.emailId=data.emailId;
                employee.mobile=data.mobile;
                employee.telephone=data.telephone;
                employee.gender=data.gender;
                employee.dateOfBirth=data.dateOfBirth;
                employee.employeeId= $("[name=employeeId]").val();
                employee.dateOfJoining=data.dateOfJoining;
                employee.locationId=data.locationId;
                employee.buId=data.buId;
              },
               error: function(jqXHR, textStatus, errorThrown)  {
                        console.log(jqXHR.status+' '+jqXHR.textStatus);  
                } 
              });
                
           
                   json.employee = employee;



                json.applicationUuid = uuid;

                function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          }

                json.applicationId = "1234";
                json.taskId="";
                json.applicationStatus = "CLAIMAPPROVAL";
                json.createdAt = dat
                json.modifiedAt = dat
                json.claimTotalAmount = $("[name=total]").val();
                json.currency = "US Dollar";
                json.claimType = $("[name=claimType]").val();

           var travelActual = {};
                travelActual.travelRequestId = $("[name=trId]").val();

                var index=$("[name=modeoftravel]").val();
                var data=JSON.parse(index);

                travelActual.travelMode = data.mode;

                travelActual.travelClass = $("[name=classoftravel]").val();

                travelActual.startDate = $("[name=startdate]").val();
                travelActual.endDate = $("[name=endDate]").val();
                    travelActual.bankAcId=$( ".bank_op" ).val();
                   json.travelActual = travelActual;
                   

  
                json.expenses = receiptData;


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

                   // var notesObj = addNotes();
                   // console.log("in form submit function: "+notesObj);

                   var actions=[];

    var res={};
    res.selectAction="act_id";
    res.remarks="remarks";
    res.userId="12354";
    res.queueName="ClaimApprove";

    actions.push(res);
         json.action=actions;

 
         

                    var notes = [];
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

                        notes.push(notesDetails);
                        
                      }
                    
                      json.notes = notes;
                        console.log(JSON.stringify(notes))



                 var history = [];
                    var historyDetails = {};
                        historyDetails.eventId = "4456";
                        historyDetails.createdBy = $("[name=firstName]").val();;
                        historyDetails.createdAt = dat;
                        historyDetails.isAlarm = "true";
                        historyDetails.eventDescritption = "claim_Submit";
                        historyDetails.remarks="Pending application ";

                history.push(historyDetails);
                        json.history = history;

                          var interval={};
                          interval.assignee=managerLoginId;
                          json.actnowInterval=interval;

      
                 //need to call functions for getting datas

               

              var html=JSON.stringify(json, null, "\t");
              console.log(html);
               
                 $("#loading").css("display","block");
                 $("#sub").attr("disabled","disabled")
                    $.ajax({
                    url: url.expanseClaim,
                    type: "POST",
                    dataType: "json",
                    async: true,
                    contentType:'application/json',
                    data: html,
                    success: function()  {
                    
                      $("#loading").css("display","none");
                       $("#sub").attr("disabled","enabled")
                      window.parent.topScroll();
                      $(".modal-body-result").html("<div class='alert alert-success'> <strong>Data Submission successfully</strong></div>");
                    $("#myModal3").modal();
                    
                       $(".modal-close").on("click",function(){
                        location.reload();
                       })
                    },
                     error: function(jqXHR, textStatus, errorThrown)  {
                         $("#sub").attr("disabled","enabled")
                    
                     $("#loading").css("display","none");
                     window.parent.topScroll();
                    $(".modal-body-result").html("<div class='alert alert-danger'> <strong>Data Submission Failed</strong></div>");
                    $("#myModal3").modal();
                      } 
                    });
              
                }
              });//form submit function end

