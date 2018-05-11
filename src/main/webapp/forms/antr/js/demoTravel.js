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
//alert("key="+key+" "+"task_id="+task_id);
/*alert(arr[2]);*/


$("#adv_check").click(function(){

	 if( $(this).prop("checked"))
	 {
		 $("#adv").css("display","none");
	  
	 }
	 else{
		 $("#adv").css("display","block");
	 }
	 
	})
	
	$("#ticket_check").click(function(){

 if( $(this).prop("checked"))
 {
 
  $("#ticket").css("display","none");
 }
 else{
	 $("#ticket").css("display","block");
 }
 
});
$("#hotel_check").click(function(){

	 if( $(this).prop("checked"))
	 {
	
	  $("#hotel").css("display","none");
	 }
	 else{
		  $("#hotel").css("display","block");
	 }
	 
	});

$("#car_check").click(function(){

	 if( $(this).prop("checked"))
	 {
	  
	  $("#car").css("display","none");
	 }
	 else{
		 $("#car").css("display","block");
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

function deleteFile(button_id){
          //alert("button_id : "+button_id);
          var filename=document.getElementById("filename"+button_id+"").innerHTML;
        //  alert(filename);
          var formData = new FormData();
          var username ="test";
          var password = "test";
         formData.append('cmisaction', 'delete');
          $.ajax( {
                  type: 'POST',
                  url: url.fileShare+filename,
                  data: formData,
                  contentType: false,
                  processData: false,
                 // dataType: "jsonp",
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
                   // xhr.setRequestHeader('Authorization', "Basic dGVzdDp0ZXN0");
                  }
                }).done(function(response) {
                 // alert("file deleted successfully");
                 //console.log("New File ID: " + response.properties["cmis:objectId"].value);
                   window.parent.moveTop();
                    $(".modal-body-result").html("<div class='alert alert-success'> <strong>File Delete successfully</div>");
                    $("#myModal3").modal();
                }).fail(function(jqXHR) {
                 // alert("error deleting file");
                 // console.log(jqXHR.responseJSON.message);
                   window.parent.moveTop();
                    $(".modal-body-result").html("<div class='alert alert-danger'> <strong>File Delete Failed</div>");
                    $("#myModal3").modal();
                }); 
                $('#del'+button_id+'').remove();
    }

     function viewFile(button_id){
        var filename=document.getElementById("filename"+button_id).innerHTML;
       // alert(filename);
        /*if(filename.endsWith(".jpg") || filename.endsWith(".jpeg") || filename.endsWith(".png")){
           var image = document.getElementById("images");
               image.src = "/pomfret/fileshare/browser/test/root/tmp/claims/"+filename;
               openPopUpMenu();*/
        //}else{
           var iframefile = document.getElementById("iframed");
            iframefile.src=url.fileShare+filename;
            //window.open("/pomfret/fileshare/browser/test/root/tmp/claims/"+filename);
             $("#myModal").modal();
       // } 
      }

           function viewFileInput(button_id){
        var filename=document.getElementById("filename"+button_id).value;
        alert(filename);
        /*if(filename.endsWith(".jpg") || filename.endsWith(".jpeg") || filename.endsWith(".png")){
           var image = document.getElementById("images");
               image.src = "/pomfret/fileshare/browser/test/root/tmp/claims/"+filename;
               openPopUpMenu();*/
        //}else{
           var iframefile = document.getElementById("iframed");
            iframefile.src=url.fileShare+filename;
            //window.open("/pomfret/fileshare/browser/test/root/tmp/claims/"+filename);
             $("#myModal").modal();
       // } 
      }

  
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














                           $("#queueName").val("Travel_review");
 $("#userName").val(name);

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
                
                     // alert(jqXHR.status+' '+jqXHR.textStatus);  
              } 
            });
      },
       error: function(jqXHR, textStatus, errorThrown)  {
          
               // alert(jqXHR.status+' '+jqXHR.textStatus);  
        } 
      });


var advance=data.application.advance;

      $(advance).each(function(i){
        var currency=advance[i].currency;
        var amount=advance[i].amount;


        var add='<tr><td><input readonly class="form-control currency " value="'+currency+'" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+amount+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td></tr>';
        $(".advance").append(add);
        console.log(currency+" "+amount);
      });


      var ticket=data.application.ticket;

      $(ticket).each(function(i){
        
        var modeOfTravell=ticket[i].modeOfTravell;
        var travellingFrom=ticket[i].travellingFrom;
        var travellingTo=ticket[i].travellingTo;
        var departureDate=ticket[i].departureDate;
        var returnDate=ticket[i].returnDate;

           if(travellingFrom=="" )
        {
          $(".ticketMain").css("display","none");
        }

        var add='<tr><td><input readonly class="form-control currency " value="'+modeOfTravell+'" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+travellingFrom+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+travellingTo+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+departureDate+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+returnDate+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td></tr>';
         $(".ticket").append(add);
        console.log(modeOfTravell+" "+travellingFrom+" "+travellingTo+" "+departureDate+" "+returnDate);
      });

      var hotel=data.application.hotel;



      $(hotel).each(function(i){

          var hotelType=hotel[i].hotelType;
          var address=hotel[i].address;
          var checkInDate=hotel[i].checkInDate;
          var checkoutDate=hotel[i].checkoutDate;

        var add='<tr><td><input readonly class="form-control currency " value="'+hotelType+'" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+address+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+checkInDate+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+checkoutDate+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td></tr>';
        $(".hotel").append(add);

          console.log(hotelType+" "+address+" "+checkInDate+" "+checkoutDate);
            if(address=="" )
        {
          console.log("empty")
          $(".hotelMain").css("display","none");
        }



      });

      var rentCar=data.application.rentCar;
      $(rentCar).each(function(i){
        var startDate=rentCar[i].startDate;
        var endDate=rentCar[i].endDate;

        var add='<tr><td><input readonly class="form-control currency " value="'+startDate+'" type="text" Id="adv0" name=""/></td><td><input readonly class="form-control amount " value="'+endDate+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></td></tr>';
        $(".car").append(add);
        console.log(startDate+" "+endDate);

         if(startDate=="")
        {
          $(".carRentMain").css("display","none");
        }
      });


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



function filelist(nam)
    {
 
       $.ajax({
        url: url.fileShare,
        type: "GET",
        //dataType: "jsonp",
        async: true,
        username: "test", // remove username and password if it doesn't works.
        password: "test",
       // jsonpCallback: "localJsonpCallback",
        success: function(data)  {
      
           // alert(data.objects.length);
            //catchlength=data.objects.length;
           

       $.each(data.objects, function(i, f) {

          if(f.object.properties['cmis:name'].value.includes(nam))
          {
            
          var tblRow = "<tr id="+'del'+i+">" +  

           "<td style ='word-break:break-all; text-align:left;'><span id="+'filename'+i+">" + f.object.properties['cmis:name'].value + "</span></td>"+
           "<td style ='word-break:break-all;'>" + f.object.properties['cmis:creationDate'].value + "</td>" +
           "<td style ='word-break:break-all;'>" + f.object.properties['cmis:createdBy'].value + "</td>" +
           "<td style ='word-break:break-all;'>" + f.object.properties['cmis:lastModificationDate'].value + "</td>" +
           "<td style ='word-break:break-all;'>" + f.object.properties['cmis:lastModifiedBy'].value + "</td>" +
          /* "<td style ='word-break:break-all;'>" + f.object.properties['cmis:objectId'].value + "</td>" +*/
           '<td><button type="button" style="margin-left:0px" class="btn btn-info viewFile" id="'+ i +'" onclick="viewFile(this.id)">View</button></td>'+
            '<td><button type="button" style=" width:40px; height:px; margin-top:px; margin-left:0px;  padding:px px px px; font-size:px;" class="btn btn-danger deleteFile" id="'+i+'" onclick="deleteFile(this.id)">Delete</button></td>'+
           "</tr>"
           $(tblRow).appendTo("#userdata tbody"); 


              if(nam.includes("Claim_Document_"))
              {
                 claim_file.cname.push( f.object.properties['cmis:name'].value);
           claim_file.cdate.push(f.object.properties['cmis:creationDate'].value);
           claim_file.ccreatedBy.push(f.object.properties['cmis:createdBy'].value);
           claim_file.clastModificationDate.push(f.object.properties['cmis:lastModificationDate'].value);
           claim_file.clastModifiedBy.push(f.object.properties['cmis:lastModifiedBy'].value);
           console.log("      CLAIM REQUEST DATA        "+claim_file.cname.length);
          

              }
              

            }
         
          });    
        },
        error: function(jqXHR, textStatus, errorThrown)  {
         // alert(jqXHR.status+' '+jqXHR.textStatus); 
            $(".modal-body-result").html("<div class='alert alert-danger'> <strong>File Getting Failed</div>");
                    $("#myModal3").modal();
        }
    });    
  }
 
 
    //End of file get









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





function forStaticFileUpload()
     {
        travelRequestId=get_data.application.applicationId; 
          // $(".fileuploadbutton").on("click", function () {          
      // alert("hai");
      // alert(travelRequestId);
       
 uuid=get_data.application.applicationUuid;
var file = document.getElementById("file_doc").files[0];
      // alert("bye :"+file.name);
       var filename=uuid+"_"+"Claim_Document_"+file.name;
      
      
        //var parentFolderId = "L2NsYWltcy9wb21mcmV0";
        var formData = new FormData();
           // formData.append('objectId', parentFolderId);
            formData.append('cmisaction', 'createDocument');            
            formData.append('propertyId[0]', 'cmis:objectTypeId');
            formData.append('propertyValue[0]', 'cmis:document');
            formData.append('propertyId[1]', 'cmis:name');
            formData.append('propertyValue[1]', filename);
            formData.append('content', file);
            formData.append('succinct', true);
            formData.append('_charset_', 'UTF-8');
            

            var rootFolder=url.fileShare;
            var username ="test";
            var password = "test";
            // $.ajax(rootFolder, {
              $("#loading").css("display","block");

             $.ajax( {
                  type: 'POST',
                  url: url.fileShare,
                  data: formData,
                  contentType: false,
                  processData: false,
                 // dataType: "jsonp",
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
                   // xhr.setRequestHeader('Authorization', "Basic dGVzdDp0ZXN0");
                  }
                }).done(function(response) {
                 // alert("file uploaded successfully");   
                 $("#loading").css("display","none");

                   window.parent.moveTop();
                    $(".modal-body-result").html("<div class='alert alert-success'> <strong>File Upload successfully</div>");
                    $("#myModal3").modal();
                  filelist(filename);
                 //console.log("New File ID: " + response.properties["cmis:objectId"].value);
                 //callBack();
                }).fail(function(jqXHR) {
                  $("#loading").css("display","none");

                    window.parent.moveTop();
                    $(".modal-body-result").html("<div class='alert alert-danger'> <strong>Data Upload Failed</div>");
                    $("#myModal3").modal();
                });    
        //  });
      }




$("input[type=text]").css("background","white");
$("input[type=text]").css("color","black");






$("#sub").click(function(e) {
        e.preventDefault();

window.parent.closeModal();

      });

