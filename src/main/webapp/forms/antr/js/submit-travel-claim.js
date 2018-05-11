$(".document").load("html/document.html");
$(".notes").load("html/notes.html");
$(".history").load("html/history.html");
$(".message").load("html/messageAlert.html");

//Aditional Data



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
//alert(sessionId);

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
            var ticketStatus="";
            var hotelStatus="";
            var carRentStatus="";
            var managerId="";
            var employeeId="";


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
  function todayDate() {
    var today = new Date(); // get the current date
    var dd = today.getDate(); //get the day from today.
    var mm = today.getMonth()+1; //get the month from today +1 because january is 0!
    var yyyy = today.getFullYear(); //get the year from today
    //if day is below 10, add a zero before (ex: 9 -> 09)
    if(dd<10) {
        dd='0'+dd
    }
    //like the day, do the same to month (3->03)
    if(mm<10) {
        mm='0'+mm
    }
    //finally join yyyy mm and dd with a "-" between then
    return yyyy+'-'+mm+'-'+dd;
}

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
  //End of aditioal data




    function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          }

          var uuid=uuidv4();




  //Start Dynamic advance add or remove
    var i=1;
 $(document).on('click', '.add', function(){
        var button_id=$(this).attr("id");
    var advance_add='<div id="adv_col'+i+'"><div class="col-sm-5" ><label class="">Currency</label><select class="form-control bfh-currencies cur" data-currency="EUR" id="adv'+i+'"><option>Select Currency</option><option value=""></option><option value="AED">United Arab Emirates dirham</option><option value="AFN">Afghan afghani</option><option value="ALL">Albanian lek</option><option value="AMD">Armenian dram</option><option value="AOA">Angolan kwanza</option><option value="ARS">Argentine peso</option><option value="AUD">Australian dollar</option><option value="AWG">Aruban florin</option><option value="AZN">Azerbaijani manat</option><option value="BAM">Bosnia and Herzegovina convertible mark</option><option value="BBD">Barbadian dollar</option><option value="BDT">Bangladeshi taka</option><option value="BGN">Bulgarian lev</option><option value="BHD">Bahraini dinar</option><option value="BIF">Burundian franc</option><option value="BMD">Bermudian dollar</option><option value="BND">Brunei dollar</option><option value="BOB">Bolivian boliviano</option><option value="BRL">Brazilian real</option><option value="BSD">Bahamian dollar</option><option value="BTN">Bhutanese ngultrum</option><option value="BWP">Botswana pula</option><option value="BYR">Belarusian ruble</option><option value="BZD">Belize dollar</option><option value="CAD">Canadian dollar</option><option value="CDF">Congolese franc</option><option value="CHF">Swiss franc</option><option value="CLP">Chilean peso</option><option value="CNY">Chinese yuan</option><option value="COP">Colombian peso</option><option value="CRC">Costa Rican colón</option><option value="CUP">Cuban convertible peso</option><option value="CVE">Cape Verdean escudo</option><option value="CZK">Czech koruna</option><option value="DJF">Djiboutian franc</option><option value="DKK">Danish krone</option><option value="DOP">Dominican peso</option><option value="DZD">Algerian dinar</option><option value="EGP">Egyptian pound</option><option value="ERN">Eritrean nakfa</option><option value="ETB">Ethiopian birr</option><option value="EUR">Euro</option><option value="FJD">Fijian dollar</option><option value="FKP">Falkland Islands pound</option><option value="GBP">British pound</option><option value="GEL">Georgian lari</option><option value="GHS">Ghana cedi</option><option value="GMD">Gambian dalasi</option><option value="GNF">Guinean franc</option><option value="GTQ">Guatemalan quetzal</option><option value="GYD">Guyanese dollar</option><option value="HKD">Hong Kong dollar</option><option value="HNL">Honduran lempira</option><option value="HRK">Croatian kuna</option><option value="HTG">Haitian gourde</option><option value="HUF">Hungarian forint</option><option value="IDR">Indonesian rupiah</option><option value="ILS">Israeli new shekel</option><option value="IMP">Manx pound</option><option value="INR">Indian rupee</option><option value="IQD">Iraqi dinar</option><option value="IRR">Iranian rial</option><option value="ISK">Icelandic króna</option><option value="JEP">Jersey pound</option><option value="JMD">Jamaican dollar</option><option value="JOD">Jordanian dinar</option><option value="JPY">Japanese yen</option><option value="KES">Kenyan shilling</option><option value="KGS">Kyrgyzstani som</option><option value="KHR">Cambodian riel</option><option value="KMF">Comorian franc</option><option value="KPW">North Korean won</option><option value="KRW">South Korean won</option><option value="KWD">Kuwaiti dinar</option><option value="KYD">Cayman Islands dollar</option><option value="KZT">Kazakhstani tenge</option><option value="LAK">Lao kip</option><option value="LBP">Lebanese pound</option><option value="LKR">Sri Lankan rupee</option><option value="LRD">Liberian dollar</option><option value="LSL">Lesotho loti</option><option value="LTL">Lithuanian litas</option><option value="LVL">Latvian lats</option><option value="LYD">Libyan dinar</option><option value="MAD">Moroccan dirham</option><option value="MDL">Moldovan leu</option><option value="MGA">Malagasy ariary</option><option value="MKD">Macedonian denar</option><option value="MMK">Burmese kyat</option><option value="MNT">Mongolian tögrög</option><option value="MOP">Macanese pataca</option><option value="MRO">Mauritanian ouguiya</option><option value="MUR">Mauritian rupee</option><option value="MVR">Maldivian rufiyaa</option><option value="MWK">Malawian kwacha</option><option value="MXN">Mexican peso</option><option value="MYR">Malaysian ringgit</option><option value="MZN">Mozambican metical</option><option value="NAD">Namibian dollar</option><option value="NGN">Nigerian naira</option><option value="NIO">Nicaraguan córdoba</option><option value="NOK">Norwegian krone</option><option value="NPR">Nepalese rupee</option><option value="NZD">New Zealand dollar</option><option value="OMR">Omani rial</option><option value="PAB">Panamanian balboa</option><option value="PEN">Peruvian nuevo sol</option><option value="PGK">Papua New Guinean kina</option><option value="PHP">Philippine peso</option><option value="PKR">Pakistani rupee</option><option value="PLN">Polish złoty</option><option value="PRB">Transnistrian ruble</option><option value="PYG">Paraguayan guaraní</option><option value="QAR">Qatari riyal</option><option value="RON">Romanian leu</option><option value="RSD">Serbian dinar</option><option value="RUB">Russian ruble</option><option value="RWF">Rwandan franc</option><option value="SAR">Saudi riyal</option><option value="SBD">Solomon Islands dollar</option><option value="SCR">Seychellois rupee</option><option value="SDG">Singapore dollar</option><option value="SEK">Swedish krona</option><option value="SGD">Singapore dollar</option><option value="SHP">Saint Helena pound</option><option value="SLL">Sierra Leonean leone</option><option value="SOS">Somali shilling</option><option value="SRD">Surinamese dollar</option><option value="SSP">South Sudanese pound</option><option value="STD">São Tomé and Príncipe dobra</option><option value="SVC">Salvadoran colón</option><option value="SYP">Syrian pound</option><option value="SZL">Swazi lilangeni</option><option value="THB">Thai baht</option><option value="TJS">Tajikistani somoni</option><option value="TMT">Turkmenistan manat</option><option value="TND">Tunisian dinar</option><option value="TOP">Tongan paʻanga</option><option value="TRY">Turkish lira</option><option value="TTD">Trinidad and Tobago dollar</option><option value="TWD">New Taiwan dollar</option><option value="TZS">Tanzanian shilling</option><option value="UAH">Ukrainian hryvnia</option><option value="UGX">Ugandan shilling</option><option value="USD">United States dollar</option><option value="UYU">Uruguayan peso</option><option value="UZS">Uzbekistani som</option><option value="VEF">Venezuelan bolívar</option><option value="VND">Vietnamese đồng</option><option value="VUV">Vanuatu vatu</option><option value="WST">Samoan tālā</option><option value="XAF">Central African CFA franc</option><option value="XCD">East Caribbean dollar</option><option value="XOF">West African CFA franc</option><option value="XPF">CFP franc</option><option value="YER">Yemeni rial</option><option value="ZAR">South African rand</option><option value="ZMW">Zambian kwacha</option><option value="ZWL">Zimbabwean dollar</option></select></div>'+

    ' <div class="col-sm-5"> <label class="">Amount</label> <input class="form-control amount" placeholder="enter your Amount" type="text" Id="" name=""/></div><div class="col-sm-1"> <button type="button" class="btn btn-primary add" id="add'+i+'" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" id="'+i+'" style="margin-top: 25px;margin-left: 1px" class="btn btn-warning remove" >X</button> </div></div>';
$("#adv").append(advance_add);

 i++;
               
  });
  
 $(document).on("click",".remove",function(){
 var id=$(this).attr("id");
// alert($(this).attr("id"));
$("#adv_col"+id+"").remove();

});
$("#adv_check").click(function(){

 if( $(this).prop("checked"))
 {
  $("#adv").css("display","block");

 }
 else{
  $("#adv").css("display","none");
 }
 
})


//End of Dynamic advance add remove


//Start of Dynamic ticket add remove
var j=1;
$(document).on("click",".add_ticket",function(){
  var add=' <div  id="ticket_add'+j+'"><div class="col-sm-4"><label class="">Mode Of Travell</label><select class="form-control  mode_travell" placeholder="Enter Travell Mode " type="text" Id="" name="ticket"> <option>Select Mode of travel</option><option>Flight</option><option>Bus</option><option>Train</option><option>Car</option><option>Ship</option></select></div><div class="col-sm-4"><label class="">Travelling From</label><input class="form-control travell_from" placeholder="Enter Travelling from" type="text" Id="adv0" name="ticket"/></div><div class="col-sm-4"><label class="">Travelling To</label><input class="form-control travell_to " placeholder="Enter Travelling To" type="text" Id="adv0" name="ticket"/></div><div class="col-sm-4"><label class="">Departure Date</label> <input class="form-control dep_date" type="date" placeholder="Checkin Date"  Id="startdate" name="ticket"/></div><div class="col-sm-4"><label class="">Return Date</label><input class="form-control return ret_date" placeholder="Enter Travelling To" type="date" Id="adv0" name="ticket"/></div> <div class="col-sm-2"></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_ticket " id="add'+j+'" style="margin-top: 25px">+</button></div><div class="col-xs-1"><button  type="button" style="margin-top: 25px;margin-left: 0px" class="btn btn-warning remove_ticket " id="'+j+'">X</button></div></br>';
  $("#ticket_add").append(add);
  j++;
  startSetDate();
});



$(document).on("click",".remove_ticket",function(){
 var id=$(this).attr("id");
// alert($(this).attr("id"));
$("#ticket_add"+id+"").remove();

});

$("#ticket_check").click(function(){

 if( $(this).prop("checked"))
 {
  $("#ticket").css("display","block");
 
 }
 else{
  $("#ticket").css("display","none");
  
 }
 
});



//END of Dynamic ticket add remove


//Start of Dynamic hotel add remove

var k=1;
$(document).on("click",".add_hotel",function(){
  var add='<div id="hotel_add'+k+'"><div class="col-sm-5"><label class="">Slect Hotel type</label> <select class="form-control hotel_type" name="hotel"><option selected="true" disabled="disabled">Select Hotel</option><option>Any Prefered Hotel</option><option>Specifc Hotel</option></select></div><div class="col-sm-5"><div class="form-group"><label for="comment">Address</label><textarea class="form-control hotel_add" rows="2" id="comment" name="hotel"></textarea></div>  </div><div class="col-sm-5"><label class="">Checkin Date</label><input class="form-control check_in" type="date" placeholder="Checkin Date"  Id="startdate" name="hotel"/></div><div class="col-sm-5"><label class="">Checkout Date</label><input class="form-control check_out" type="date" placeholder="CheckOut Date" Id="startdate" name="hotel"/></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_hotel " id="add'+k+'" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" style="margin-top: 25px;margin-left:0px" class="btn btn-warning remove_hotel " id="'+k+'">X</button></div></div> ';
  $("#hotel_add").append(add);
  k++;
  startSetDate();
});


$(document).on("click",".remove_hotel",function(){
 var id=$(this).attr("id");
// alert($(this).attr("id"));
$("#hotel_add"+id+"").remove();

});

$("#hotel_check").click(function(){

 if( $(this).prop("checked"))
 {
  $("#hotel").css("display","block");
 // hotelStatus="REQUESTED"
 }
 else{
  $("#hotel").css("display","none");
 //  hotelStatus="NOTREQUESTED";
 }
 
});


//END of Dynamic hotel add remove

//Start car add





var m=1;
$(document).on("click",".add_car",function(){
  
var add='<div id="car_add'+m+'"><div class="col-sm-5"><label class="">Start Date</label><input class="form-control start_dat"  placeholder="Start Date" type="date" Id="startdate" name="car"/></div><div class="col-sm-5"><label class="">End Date</label><input class="form-control end_dat"  placeholder="End Date" type="date" Id="startdate" name="car"/></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_car " id="add'+m+'" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" style="margin-top: 25px;margin-left: 0px" class="btn btn-warning remove_car " id="'+m+'">X</button></div></div>';

  $("#car_add").append(add);
  m++;
  startSetDate();
});

$(document).on("click",".remove_car",function(){
 var id=$(this).attr("id");
// alert($(this).attr("id"));
$("#car_add"+id+"").remove();

});


$("#car_check").click(function(){

 if( $(this).prop("checked"))
 {
  $("#car").css("display","block");
 
 }
 else{
  $("#car").css("display","none");
  
 }
 
});



//End of car


/*Start of date set Operation*/

function setDate(startdate,enddate){
  

$(startdate).attr("min",todayDate());
$(startdate).change(function(){

  var sdate=$(this).val();
  if(sdate<todayDate()){
    $(this).val(todayDate());
  }
  console.log("njdsjdh"+sdate);
  $(enddate).attr("min",sdate);
})
$(enddate).change(function(){

  var sdate=$(this).val();
  console.log("njdsjdh"+sdate);
  $(startdate).attr("max",sdate);
   $(startdate).attr("min",todayDate());
})
  
}

function startSetDate(){


var mode_travell_length=$(".mode_travell").length;
for(var j=0;j<mode_travell_length;j++)
{
  console.log("Enterr into date set ticket");
  var dep_date=$(".dep_date");
  var ret_date=$(".ret_date");
    setDate(dep_date[j],ret_date[j]);
}

var hotel_type_length=$(".hotel_type").length;
for(var k=0;k<hotel_type_length;k++)
{
  var check_in=$(".check_in");
  var check_out=$(".check_out");
  setDate(check_in[k],check_out[k]);
}
var car_start_length=$(".start_dat").length;
for(var p=0;p<car_start_length;p++)
{
  var rent={};
  var start_dat=$(".start_dat");
  var end_date=$(".end_dat");
  setDate(start_dat[p],end_date[p]); 
}


}
startSetDate();
/*End of date set opration*/



//START OF OPERATION
var managerLoginId="";




      
      $.ajax({
      url: url.empData+sessionId,//need to make generic using login id,should get employeeId and then using empId call employeedetails
      type: "GET",
      dataType: "json",
      async: true,
      success: function(data)  {
        //alert("success");
      
        var fsname=data.firstName;
        employeeId=data.employeeId;
       
        
        document.getElementById("fname").value=fsname;
        document.getElementById("number").value=employeeId;
        // document.getElementById("department").value=data.buId;
         document.getElementById("contactNo").value="NA";
  
         
        $("#queueName").val("Travel_Submit");
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





      //for getting manager
       $.ajax({

            url: url.managerId+employeeId,//need to make generic
            type: "GET",
            dataType: "json",
            async: true,
            success: function(data)  {
              //alert("success");
             
             managerId=data.managerId;
              

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


        }
       
      });
           /*End of getting emp id and manger id*/




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

       var noOfNotes = 0;
function prependNotes(myObj1){
  //alert("come");

       var content = "<tr><td>"+myObj1.userIds[noOfNotes]+"</td><td>"+myObj1.userNames[noOfNotes]+"</td><td>"+myObj1.queueNames[noOfNotes]+"</td><td>"+myObj1.descriptions[noOfNotes]+"</td><td>"+myObj1.remarks[noOfNotes]+"</td><td></td></tr>";
       //<td><button class='btn btn-warning'>X</button></td>
        //console.log("yako barthilla");
          $("#notes").append(content);
        //console.log("yako bandhe");
        noOfNotes += 1;
        console.log(myObj1);
      }

      //handling the form submit event
      function prepareEventHandlers(){
         
         var temp=true;
          trid=document.getElementById("trId").value;
          
          
          if(trid === ""){
            document.getElementById("errormsg").innerHTML="Enter Travel id";
            temp=false;
            return false;
          }
          else{
            temp=true;
          }
        
          
        if($("#car_check").prop("checked"))
          {
            var cnt=0;
            var text=$("input[name^='car']");

    
           $.each(text,function(i){
           var ch=$(text[i]).val();
             if(ch==="")
              {
                cnt++;
              }                
             });
           if(cnt>0)
           {

             document.getElementById("errormsg").innerHTML="Enter car details";
             temp=false;
            return false;
           } else{
            temp=true;
          }     


           var start_dat=$(".start_dat");
  var end_date=$(".end_dat");
 
           $.each(start_dat,function(i,v){

              var startDate=$(start_dat[i]).val();
  var endDate=$(end_date[i]).val();
  if(startDate>endDate){

             document.getElementById("errormsg").innerHTML="Enter correct date in car details";
             temp=false;
            return false;
  } else{
            temp=true;
          }

           })



          } 
        
        if($("#hotel_check").prop("checked"))
        {
          var cnt=0;
          var text=$("input[name^='hotel']");

  
         $.each(text,function(i){
         var ch=$(text[i]).val();
           if(ch==="")
            {
              cnt++;
            }                
           });
         if(cnt>0)
         {

           document.getElementById("errormsg").innerHTML="Enter hotel details";
           temp=false;
          return false;
         }  else{
            temp=true;
          }         

            var check_in=$(".check_in");
            var check_out=$(".check_out");
          
            $.each(check_in,function(i,v){
                 var checkInDate=$(check_in[i]).val();
           var checkoutDate=$(check_out[i]).val();

           if(checkInDate>checkoutDate){
               document.getElementById("errormsg").innerHTML="Enter Correct date in hotel details";
               temp=false;
               return false;
           } else{
            temp=true;
          }
            })


        } 

          if($("#ticket_check").prop("checked"))
        {
          var cnt=0;
          var text=$("input[name^='ticket']");
         var dep_date=$(".dep_date");
          var ret_date=$(".ret_date");

  
         $.each(text,function(i){
         var ch=$(text[i]).val();
           if(ch==="")
            {
              cnt++;
            }                
           });
         if(cnt>0)
         {

           document.getElementById("errormsg").innerHTML="Enter Ticket details";
           temp=false;
          return false;
         }   else{
            temp=true;
          }     


         $.each(dep_date,function(index,value){

          var depDate=$(dep_date[index]).val();
          var retDate=$(ret_date[index]).val();
           console.log("DEP DATE IS"+depDate);

           if(depDate>retDate){

               document.getElementById("errormsg").innerHTML="Enter Correct date of travel in Ticket details";
               temp=false;
          return false;

           } else{
            temp=true;
          }

         })     
        }
          


          if (temp) 
          {
            document.getElementById("errormsg").innerHTML="";
            return true;
          }
          else{
        	  
            return false;
          }

      }



$("input[type=text]").css("background","white");
$("input[type=text]").css("color","black");



$("#sub").click(function(){


if($("#hotel_check").prop("checked"))
{
   hotelStatus="REQUESTED";
   
}
else{
  hotelStatus="NOTREQUESTED";
}

if($("#ticket_check").prop("checked"))
{
   ticketStatus="REQUESTED";
}
else{
  ticketStatus="NOTREQUESTED";
}

if($("#car_check").prop("checked"))
{
   carRentStatus="REQUESTED";
}
else{
  carRentStatus="NOTREQUESTED";
}

 if(prepareEventHandlers()){
        var json = {};
           var employee = {};
               
               $.ajax({
              url: url.empData+employeeId,//need to make generic using login id,should get employeeId and then using empId call employeedetails
              type: "GET",
              dataType: "json",
              async: false,
              success: function(data)  {
      
                employee.id=data.id; //from employee table
                employee.firstName= $("[name=firstName]").val();//from form
                employee.lastName=data.lastName;//from employee table 
                employee.emailId=data.emailId;
                employee.mobile=$("#contactNo").val();
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

                json.applicationId = parseInt($("[name=trId]").val());
                json.taskId="";
                json.applicationStatus = "NEEDAPPROVAL";
                json.createdAt = dat;
                json.modifiedAt = dat;
                json.currency = "US Dollar";
                



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
                        historyDetails.eventDescritption = "travel_Submit";
                        historyDetails.remarks="Pending application ";

                history.push(historyDetails);
                        json.history = history;




var action={};

action.applicationStatus="NEEDAPPROVAL";
action.ticketStatus=ticketStatus;
action.hotelStatus=hotelStatus;
action.carRentStatus=carRentStatus;

action.assignee=managerLoginId;

json.actnowInterval=action;





var advance=[];

var amount_len=$(".amount").length;

for(var i=0;i<amount_len;i++)
{
  var adv={};
  var amount=$(".amount");
  var currency=$(".cur");
adv.currency=$(currency[i]).val();
adv.amount=$(amount[i]).val();
advance.push(adv);

}

json.advance=advance;

var ticket=[];
var mode_travell_length=$(".mode_travell").length;
for(var j=0;j<mode_travell_length;j++)
{
  var tct={};
  var mode_travell=$(".mode_travell");
  var travell_from=$(".travell_from");
  var travell_to=$(".travell_to");
  var dep_date=$(".dep_date");
  var ret_date=$(".ret_date");
  tct.modeOfTravell=$(mode_travell[j]).val();
  tct.travellingFrom=$(travell_from[j]).val();
  tct.travellingTo=$(travell_to[j]).val();
  tct.departureDate=$(dep_date[j]).val();
  tct.returnDate=$(ret_date[j]).val();
  ticket.push(tct);
  

}

json.ticket=ticket;
var hotel=[];
var hotel_type_length=$(".hotel_type").length;
for(var k=0;k<hotel_type_length;k++)
{
  var hot={};
  var hotel_type=$(".hotel_type");
  var hotel_add=$(".hotel_add");
  var check_in=$(".check_in");
  var check_out=$(".check_out");

  hot.hotelType=$(hotel_type[k]).val();
  hot.address=$(hotel_add[k]).val();
  hot.checkInDate=$(check_in[k]).val();
  hot.checkoutDate=$(check_out[k]).val();
  hotel.push(hot);
}
json.hotel=hotel;

var rentCar=[];
var car_start_length=$(".start_dat").length;
for(var p=0;p<car_start_length;p++)
{
  var rent={};
  var start_dat=$(".start_dat");
  var end_date=$(".end_dat");
  rent.startDate=$(start_dat[p]).val();
  rent.endDate=$(end_date[p]).val();
  rentCar.push(rent);

}
json.rentCar=rentCar;

json.placeOfVisit=$("#place_visit").val();
json.purposeOfVisit=$("#purpose_visit").val();

 //console.log(JSON.stringify(json, null, "\t"));


              var html=JSON.stringify(json, null, "\t");
              console.log(html);
                //  document.getElementById('json').innerHTML=html;
$("#loading").css("display","block");
 $("#sub").attr("disabled","disabled");
                   //function to store data
              // $('#sub').on('click', function(){
                    $.ajax({
                    url: url.travelRequest,
                    type: "POST",
                    dataType: "json",
                    async: true,
                    contentType:'application/json',
                    data: html,
                    success: function()  {
                      /*alert("data successfully stored");
                       location.reload();*/
                       $("#loading").css("display","none");

                         window.parent.topScroll();

                        $(".modal-body-result").html("<div class='alert alert-success'> <strong> Submission successfully</strong></div>");
                    $("#myModal3").modal();
                       $(".modal-close").on("click",function(){
                        location.reload();
                       })
                    },
                     error: function(jqXHR, textStatus, errorThrown)  {
                      $("#loading").css("display","none");

                      //alert("error storing data: "+jqXHR.status+' '+jqXHR.textStatus);  
                       window.parent.topScroll();
                       $(".modal-body-result").html("<div class='alert alert-danger'> <strong> Submission Failed</div>");
                    $("#myModal3").modal();
                      } 
                    });
               //   });
 
}//end of error check preventevent

})
