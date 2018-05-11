function viewFile(button_id){
        var filename=document.getElementById("filename"+button_id).innerHTML;
      var folder=filename.split("_");
           var iframefile = document.getElementById("iframed");
           iframefile.data=url.fileShare+folder[0]+"_Actnow/"+filename;     
             $("#myModal").modal();
       
      }
      function viewReceipt(button_id){
        console.log(button_id);
        var filename=document.getElementById("fileName"+button_id).value;

         console.log(filename);
      var folder=filename.split("_");
           var iframefile = document.getElementById("iframed");
           iframefile.data=url.fileShare+folder[0]+"_travelrequest/"+filename;     
             $("#myModal").modal();
       
      }

           function viewFileInput(button_id){
        var filename=document.getElementById("filename"+button_id).value;
          var folder=filename.split("_");
           var iframefile = document.getElementById("iframed");
            iframefile.data=url.fileShare+folder[0]+"_Actnow/"+filename;    
             $("#myModal").modal();
     
      }

      function forDynamicFileUpload(fileid){
        if(prepareEventHandlers()){
          console.log("INDEX "+fileid);
     
    var file = document.getElementById("filedata"+fileid).files[0];
    var travelId=$("#trId").val();
    var amount=$("#amount"+fileid).val();
    var expenseType=$("#expenseType"+fileid).val();
    var paymantType=$("#paymantType"+fileid).val();


       var filename=travelId+"_"+file.name;
        console.log(filename+" "+amount);

      CreateFolder(travelId+"_travelrequest",function(data){
console.log("FIle NAme is"+data);
var folderName=data;

var formData = new FormData();
            formData.append('cmisaction', 'createDocument');            
            formData.append('propertyId[0]', 'cmis:objectTypeId');
            formData.append('propertyValue[0]', 'cmis:receipt');
            formData.append('propertyId[1]', 'cmis:name');
            formData.append('propertyValue[1]', filename);
             formData.append('propertyId[2]', 'cmis:amount');
              formData.append('propertyValue[2]', amount);
              formData.append('propertyId[3]', 'cmis:expenseType');
              formData.append('propertyValue[3]', expenseType);
              formData.append('propertyId[4]', 'cmis:payment');
              formData.append('propertyValue[4]', paymantType);
            formData.append('content', file);
            formData.append('succinct', true);
            formData.append('_charset_', 'UTF-8');
            var username ="test";
            var password = "test";

          
             $.ajax( {
                  type: 'POST',
                    url:"/pomfret/fileshare/browser/test/root/"+folderName+"",
                  data: formData,
                  contentType: false,
                  processData: false,
               
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
                 
                  }
                }).done(function(response) {
               
                 var butIcon= $(".fileuploadbutton");
               

                $(butIcon[fileid]).css("color","green");
                 
              
                 getReceiptData(travelId);
                  try{
                     window.parent.moveTop();
                  }
                  catch(err){
 console.log( err.message);
                  }
                     try{
                     window.parent.topScroll();
                  }
                  catch(err){
 console.log( err.message);
                  }
                 
                 
                 
                     $(".modal-body-result").html("<div class='alert alert-success'> <strong>File Upload successfully</div>");
                    $("#myModal3").modal();
                 
              
                }).fail(function(jqXHR) {
              
                   try{
                     window.parent.moveTop();
                  }
                  catch(err){
 console.log( err.message);
                  }
                  try{
                     window.parent.topScroll();
                  }
                  catch(err){
 console.log( err.message);
                  }
                  $(".modal-body-result").html("<div class='alert alert-danger'> <strong>File Upload Failed</div>");
                    $("#myModal3").modal();
                }); 


                });   
      /*End of call back*/
             }

  
      }
  
var file={};
             

 var knd=0;
/*Start of upload*/
function forStaticFileUpload(){

var file = document.getElementById("file_doc").files[0];
var filename=uuid+"_"+"Claim_Document_"+file.name;
CreateFolder(uuid+"_Actnow",function(data){
console.log("FIle NAme is"+data);
var folderName=data;

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
            var username ="test";
            var password = "test";
             $.ajax( {
                  type: 'POST',
                  url:"/pomfret/fileshare/browser/test/root/"+folderName+"",
                  data: formData,
                  contentType: false,
                  processData: false,
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
                  }
                }).done(function(response) {
                  filelist(filename);
                  try{
                     window.parent.moveTop();
                  }
                  catch(err){
 console.log( err.message);
                  }
                     try{
                     window.parent.topScroll();
                  }
                  catch(err){
 console.log( err.message);
                  }
                 
                 
                 
                     $(".modal-body-result").html("<div class='alert alert-success'> <strong>File Upload successfully</div>");
                    $("#myModal3").modal();
                 
                 
                }).fail(function(jqXHR) {
                try{
                     window.parent.moveTop();
                  }
                  catch(err){
 console.log( err.message);
                  }
                  try{
                     window.parent.topScroll();
                  }
                  catch(err){
 console.log( err.message);
                  }
                  $(".modal-body-result").html("<div class='alert alert-danger'> <strong>File Upload Failed</div>");
                    $("#myModal3").modal();
                });    


})

}
/*End of uploaad*/





 /*Start of check folder exist fun*/

      function checkAllReceiptFolder(){
        var cnt=0;
         $.ajax({
        url: "/pomfret/fileshare/browser/test/root/",
        type: "GET",
        async: true,
        username: "test", 
        password: "test",
        success: function(data)  {
        
         console.log(data);

        
          $.each(data.objects, function(i, f) {

              var dat=f.object.properties['cmis:name'].value;
            if(dat.includes("_travelrequest"))
            {
                var temp=dat.split("_");
                  var opt="<option value='"+temp[0]+"'>"+temp[0]+"</option>"
                  $("#travelGetId").append(opt);
            }     
            });
         
           
      },
       error: function(data)  {
        
          
        }
    }); 
        
    }   
    checkAllReceiptFolder();
    /*End of check folder exist fun*/

function preperData(){

  var temp=$("#travelGetId").val();
  console.log(temp);
  $("#trId").val(temp);
  getReceiptData(temp);
}







/*Start of get receipt*/

function getReceiptData(data){
  var travelRequestId=data;
   $("#showReceiptData").html("");
  /* $("#showReceiptData tr").each(function(key,val){
    if($(val).attr("class")=="showRow"){

      //console.log($(val).attr("class"));
      $(this).remove();
    }
   })*/
           

//var travelRequestId=$("#trId").val();
  var folderName=travelRequestId+"_travelrequest";

 checkFolderExist(folderName,function(res){
  console.log(res);
var tab;
receiptData=[];
   $.ajax({
        url: "/pomfret/fileshare/browser/test/root/"+folderName+"",
        type: "GET",
        async: true,
        username: "test", 
        password: "test",
        success: function(data)  {
         console.log(data);

/*Start of loop*/
            $.each(data.objects, function(i, f) {
               tab='<tr class="newRow"><td> <input type="text" class="form-control" name="expenseType[]" value="'+f.object.properties['cmis:expenseType'].value+'"></td>'+
                          '<td> <input type="text" class="form-control" name="paymantType[]" value="'+f.object.properties['cmis:payment'].value+'"></td>'+
                          '<td><input type="text" class="form-control amount" value="'+f.object.properties['cmis:amount'].value+'" name="amount[]"></td>'+
                          '<td><input type="text" class="form-control" value="'+f.object.properties['cmis:name'].value+'" id="fileName'+i+'"></td>'+
                          '<td><button type="button" id="'+i+'" class="btn btn-info" onclick="viewReceipt(this.id)">View</button></td></tr>'
           
$("#showReceiptData").append(tab);



var temp={
            "expenseType" : f.object.properties['cmis:expenseType'].value,
            "paymentType" : f.object.properties['cmis:payment'].value,
            "amount" :f.object.properties['cmis:amount'].value,
            "receipt" : {
                    "locationUri" : f.object.properties['cmis:name'].value,
                    "applicationNo" : f.object.properties['cmis:creationDate'].value,
                    "createdBy" : f.object.properties['cmis:createdBy'].value,
                    "modifiedBy" : f.object.properties['cmis:lastModifiedBy'].value,
                    "approvedBy" : "somePerson",
                    "approvedOn" : "Jun 11, 2017 12:00:00 AM"
                  }
          }
          receiptData.push(temp);




            });
            /*End of loop*/
            var tab1='<tr class="newRow"><td> <select class="form-control"  name="expenseType[]" id="expenseType0"><option selected="true">Select</option><option>Ticket</option><option>Rent a Car</option><option>Lodging/Stay</option><option>Food Expense</option><option>Entertainment</option></select></td>'+
                          '<td> <select class="form-control"   name="paymantType[]" id="paymantType0"><option selected="true" >Select</option><option>Credit Card</option><option>Debit Card</option><option>Cash</option></select></td>'+
                          '<td><input class="form-control amount"  type="number" placeholder="expense amount" name="amount[]"  id="amount0"> </td>'+
                          '<td><input class="form-control fileupload" type="file" name="files[]" id="filedata0"></td>'+
                          '<td><button type="button" class="btn btn-default btn-xs fileuploadbutton" id="0" onclick="forDynamicFileUpload(this.id)" style="color: red" style="border: 0px solid black"><span class="glyphicon glyphicon-cloud-upload" ></span></button></td>'+
                          '<td><button name="" type="button" class="btn btn-info btnAdd" style="border: 0px solid black">+</button></td>'+
                          '<td> <button name="" type="button" class="btn btn-warning btnDelete" id="firstDelBut"  style="border: 0px solid black">x</button></td></tr>';
  $("#showReceiptData").append(tab1);
           getTotal();
         
      },
       error: function(data)  {
         console.log(data);
        }
    }); 


 })
/*End of checkfolder exist*/

}
/*End of get receipt*/






      function CreateFolder(foldername,result){
       
       /*Start of check older exist*/
       var name=foldername;
       checkFolderExist(name,function(res){

        console.log(res);
        /*Start of condition*/
        if(res){
          console.log(" Present");
          result(name);
        }
        else{
          console.log("File Not Present");
  var formData = new FormData();
      
            formData.append('cmisaction', 'createFolder');            
            formData.append('propertyId[0]', 'cmis:objectTypeId');
            formData.append('propertyValue[0]', 'cmis:folder');
            formData.append('propertyId[1]', 'cmis:name');
            formData.append('propertyValue[1]', name);
            formData.append('succinct', true);   
            var username ="test";
            var password = "test";
             $.ajax( {
                  type: 'POST',
                  url: "/pomfret/fileshare/browser/test/root/",
                  data: formData,
                  contentType: false,
                  processData: false,
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
                    
                  }
                }).done(function(response) {
                 console.log(response);   
                 result(name);                      
                }).fail(function(response) {               
                 console.log(response); 
                  result(name);       
                });    



        }
        /*End of condition*/
       })
 /*End of check folder exist*/
   }
      /*End of create folder*/

      /*Start of check folder exist fun*/

      function checkFolderExist(name,temp){
        var cnt=0;
         $.ajax({
        url: "/pomfret/fileshare/browser/test/root/"+name+"",
        type: "GET",
        async: true,
        username: "test", 
        password: "test",
        success: function(data)  {
         temp(true);
      },
       error: function(data)  {
         temp(false);
        }
    }); 
        
    }   
    /*End of check folder exist fun*/

            var claim_file={
              "cname":[],
              "cdate":[],
              "ccreatedBy":[],
              "clastModificationDate":[],
              "clastModifiedBy":[]
            };
             var ind=0;
           
    var travelRequestId;

  
 function filelist(nam)
    {

     
  var uuidData=nam.split("_");
  var folderName=uuidData[0]+"_Actnow";
  //alert("Calling "+nam);
       $.ajax({
        url: url.fileShare+folderName,
        type: "GET",
      
        async: true,
        username: "test", // remove username and password if it doesn't works.
        password: "test",
        success: function(data)  {
      

           

       $.each(data.objects, function(i, f) {

          if(f.object.properties['cmis:name'].value.includes(nam))
          {
           // alert("file present"+travelRequestId);
          var tblRow = "<tr id="+'delRow'+i+">" +  

           "<td style ='word-break:break-all; text-align:left;'><span id="+'filename'+i+">" + f.object.properties['cmis:name'].value + "</span></td>"+
           "<td style ='word-break:break-all;'>" + f.object.properties['cmis:creationDate'].value + "</td>" +
           "<td style ='word-break:break-all;'>" + f.object.properties['cmis:createdBy'].value + "</td>" +
           "<td style ='word-break:break-all;'>" + f.object.properties['cmis:lastModificationDate'].value + "</td>" +
           "<td style ='word-break:break-all;'>" + f.object.properties['cmis:lastModifiedBy'].value + "</td>" +
          /* "<td style ='word-break:break-all;'>" + f.object.properties['cmis:objectId'].value + "</td>" +*/
           '<td><button type="button" style="margin-left:0px" class="btn btn-info viewFile" id="'+ i +'" onclick="viewFile(this.id)">View</button></td>'+
            '<td><button type="button" style=" width:40px; height:px; margin-top:px; margin-left:0px;  padding:px px px px; font-size:px;" class="btn btn-warning deleteFile" id="'+i+'" onclick="deleteFile(this.id)">Delete</button></td>'+
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
              else{

           file.name[knd]= f.object.properties['cmis:name'].value;
           file.date[knd]=f.object.properties['cmis:creationDate'].value;
           file.createdBy[knd]=f.object.properties['cmis:createdBy'].value;
           file.lastModificationDate[knd]=f.object.properties['cmis:lastModificationDate'].value;
           file.lastModifiedBy[knd]=f.object.properties['cmis:lastModifiedBy'].value;
           console.log(file.name[knd]+" "+file.date[knd]+file.createdBy[knd]+file.lastModificationDate[knd]+file.lastModifiedBy[knd]+"    RECEIPT DATA  "+file.name.length);
           knd=knd+1;

              }
            }
         
          });    
        },
        error: function(jqXHR, textStatus, errorThrown)  {
         // alert(jqXHR.status+' '+jqXHR.textStatus); 
         $(".modal-body-result").html("<div class='alert alert-danger'> <strong>Error Geting Data</div>");
                    $("#myModal3").modal();
        }
    });    
  }
 

function deleteFile(button_id){
         var filename=document.getElementById("filename"+button_id).innerHTML;
      var folder=filename.split("_");
       $('#delRow'+button_id+'').remove();
          
          var src=url.fileShare+folder[0]+"_Actnow/"+filename; 
          var formData = new FormData();
          var username ="test";
          var password = "test";
         formData.append('cmisaction', 'delete');
          $.ajax( {
                  type: 'POST',
                  url: src,
                  data: formData,
                  contentType: false,
                  processData: false,
                
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
                  
                  }
                }).done(function(response) {
                 $('#delRow'+button_id+'').remove();
                  try{
                     window.parent.moveTop();
                  }
                  catch(err){
 console.log( err.message);
                  }
                 try{
                     window.parent.topScroll();
                  }
                  catch(err){
 console.log( err.message);
                  }
                     $(".modal-body-result").html("<div class='alert alert-success'> <strong>File Delete successfully</div>");
                    $("#myModal3").modal();
                 
                 
                }).fail(function(jqXHR) {
                 try{
                     window.parent.moveTop();
                  }
                  catch(err){
 console.log( err.message);
                  }
                 try{
                     window.parent.topScroll();
                  }
                  catch(err){
 console.log( err.message);
                  }
                  $(".modal-body-result").html("<div class='alert alert-danger'> <strong>File Delete Failed</div>");
                    $("#myModal3").modal();

                });    

               
    }

