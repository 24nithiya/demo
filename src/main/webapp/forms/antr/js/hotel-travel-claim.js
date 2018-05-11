$(".document").load("html/document.html");
$(".notes").load("html/notes.html");
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


$("#hotel_check").click(function(){

	 if( $(this).prop("checked"))
	 {
	
	  $("#hotel").css("display","none");
	 }
	 else{
		  $("#hotel").css("display","block");
	 }
	 
	});
$("input[type=text]").css("background","white");
$("input[type=text]").css("color","black");



var claim_file={
              "cname":[],
              "cdate":[],
              "ccreatedBy":[],
              "clastModificationDate":[],
              "clastModifiedBy":[]
            };

var tab="";  
var doc="";
var get_data="";
var managerName="";
var  travelRequestId="";


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



  

   $.ajax({
          
                      url: url.travelRequest+key,//need to make generic
                      type: "GET",
                     // dataType: "json",
                      async: true,
                      success: function(data)  {
                        //alert("success");
                       get_data=data;
                        console.log(data);
                        // console.log(data[0].id+"<br>"+bank_dat[1].id);
                      //   console.log(bank_dat[0].id);

                      var emp_id=data.application.employee.employeeId;
                      var name=data.application.employee.firstName;
                      var contactNo=data.application.employee.mobile;
                      var department=data.application.employee.buId;
                      var travell_id=data.application.applicationId;
                      var place_visit=data.application.placeOfVisit;
                      var purpose_visit=data.application.purposeOfVisit;
                     

                      $("#fname").val(name);
                      $("#number").val(emp_id);
                      $("#contactNo").val(contactNo);
                      $("#department").val(department);
                      $("#trId").val(travell_id);
                      $("#place_visit").val(place_visit);
                      $("#purpose_visit").val(purpose_visit);
                           $("#queueName").val("Travel_hotel");
 $("#userName").val(name);





  $.ajax({
      url: url.empData+emp_id,//need to make generic using login id,should get employeeId and then using empId call employeedetails
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



       }/*End of first success*/

 });/*End of get emp*/








 uuid=data.application.applicationUuid;
                      //Get Manager Name

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
              

              document.getElementById("manager").value=managerName;
            },
             error: function(jqXHR, textStatus, errorThrown)  {
                
                   //   alert(jqXHR.status+' '+jqXHR.textStatus);  
              } 
            });
      },
       error: function(jqXHR, textStatus, errorThrown)  {
          
              //  alert(jqXHR.status+' '+jqXHR.textStatus);  
        } 
      });

/*
var advance=data.application.advance;

      $(advance).each(function(i){
        var currency=advance[i].currency;
        var amount=advance[i].amount;


        var add='<tr><td> <label class="">Advance</label></td><td><input readonly class="form-control currency " value="'+currency+'" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+amount+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td></tr>';
        $(".advance").append(add);
        console.log(currency+" "+amount);
      });
*/

    /*  var ticket=data.application.ticket;

      $(ticket).each(function(i){
        
        var modeOfTravell=ticket[i].modeOfTravell;
        var travellingFrom=ticket[i].travellingFrom;
        var travellingTo=ticket[i].travellingTo;
        var departureDate=ticket[i].departureDate;
        var returnDate=ticket[i].returnDate;


        var add='<tr><td> <label class="">Ticket</label></td><td><input readonly class="form-control currency " value="'+modeOfTravell+'" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+travellingFrom+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+travellingTo+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+departureDate+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+returnDate+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td></tr>';
         $(".ticket").append(add);
        console.log(modeOfTravell+" "+travellingFrom+" "+travellingTo+" "+departureDate+" "+returnDate);
      });
*/
      var hotel=data.application.hotel;


      $(hotel).each(function(i){

          var hotelType=hotel[i].hotelType;
          var address=hotel[i].address;
          var checkInDate=hotel[i].checkInDate;
          var checkoutDate=hotel[i].checkoutDate;

        var add='<tr><td><input readonly class="form-control currency " value="'+hotelType+'" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+address+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+checkInDate+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+checkoutDate+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td></tr>';
        $(".hotel").append(add);

          console.log(hotelType+" "+address+" "+checkInDate+" "+checkoutDate);

      });

 /*     var rentCar=data.application.rentCar;
      $(rentCar).each(function(i){
        var startDate=rentCar[i].startDate;
        var endDate=rentCar[i].endDate;

        var add='<tr><td> <label class="">CarRent</td><td><input readonly class="form-control currency " value="'+startDate+'" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+endDate+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td></tr>';
        $(".car").append(add);
        console.log(startDate+" "+endDate);
      });
*/

$("input[type=text]").css("background","white");
$("input[type=text]").css("color","black");

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

                    $("#history").append(histable);



               });

                    }
                  });


//End of set and getting data










       var noOfNotes = 0;



      //handling the form submit event


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








$("input[type=text]").css("background","white");
$("input[type=text]").css("color","black");


 var actionHolderFirstName="";

 $.ajax({

            url: url.empData+sessionId,//need to make generic
            type: "GET",
            dataType: "json",
            async: true,
            success: function(data)  {

                 //   alert(data.firstName);
                    /*empLoginId=data.loginId;*/
                    actionHolderFirstName=data.firstName;
                   // alert(empLoginId);
                }
    
                });







$("#sub").click(function(e) {
        e.preventDefault();
        var act_id=$("#sel1").val();
var remarks=$("#comment").val();

//alert(act_id+"gcdg "+remarks);
var actions=[];

    var res={};
    res.selectAction=act_id;
    res.remarks=remarks;
    res.userId="12354";
    res.queueName="hotel_travel";

    actions.push(res);
    


var json={};
json.employee=get_data.application.employee;


    json.applicationUuid=get_data.application.applicationUuid;
json.applicationId=get_data.application.applicationId;
json.taskId=task_id;
json.applicationStatus=act_id;
json.createdAt=get_data.application.createdAt;
json.modifiedAt=get_data.application.modifiedAt;
json.claimTotalAmount=get_data.application.claimTotalAmount;
json.currency=get_data.application.currency;
json.claimType=get_data.application.claimType;

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



  var his={};

his.eventId=get_data.application.history[0].eventId;
his.createdBy=get_data.application.history[0].createdBy;
his.createdAt=get_data.application.history[0].createdAt;
his.isAlarm=get_data.application.history[0].isAlarm;
console.log(his.eventId+"   "+get_data.application.history[0].eventId);
his.eventDescritption="hotel_travel";
his.remarks="<b>"+ act_id+"</b> -by-<b>"+actionHolderFirstName+"</b><br><b>Remarks:-</b>"+remarks+"" ;
history_arr.push(his);
console.log(his);








    json.history=history_arr;


    json.actnowInterval=get_data.application.actnowInterval;
 json.actnowInterval.hotelStatus=act_id;
   
   
    json.advance=get_data.application.advance;
    json.ticket=get_data.application.ticket;
    json.hotel=get_data.application.hotel;
    json.rentCar=get_data.application.rentCar;
    json.placeOfVisit=get_data.application.placeOfVisit;
    json.purposeOfVisit=get_data.application.purposeOfVisit;

   var html=JSON.stringify(json, null, "\t");
   console.log(html);
$("#loading").css("display","block");
 $("#sub").attr("disabled","disabled");
 $.ajax({
                    url: url.travelRequest,
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