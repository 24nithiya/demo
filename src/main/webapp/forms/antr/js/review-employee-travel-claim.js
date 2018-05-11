$(".document").load("html/document.html");
$(".notes").load("html/notes.html");
$(".history").load("html/history.html");
$(".message").load("html/messageAlert.html");

//Aditional Data

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

//alert(sessionId);
//alert("key="+key+" "+"task_id="+task_id);
/*alert(arr[2]);*/








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
             var ind=0;
            var knd=0;
            var ticketStatus="";
            var hotelStatus="";
            var carRentStatus="";

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
  //End of aditioal data






  //Start Dynamic advance add or remove
    var i=1;
 $(document).on('click', '.add', function(){
        var button_id=$(this).attr("id");
    var advance_add='<div id="adv_col'+i+'"><div class="col-sm-5" ><label class="">Currency</label><select class="form-control bfh-currencies cur" data-currency="EUR" id="adv'+i+'"><option>Select Currency</option><option value=""></option><option value="AED">United Arab Emirates dirham</option><option value="AFN">Afghan afghani</option><option value="ALL">Albanian lek</option><option value="AMD">Armenian dram</option><option value="AOA">Angolan kwanza</option><option value="ARS">Argentine peso</option><option value="AUD">Australian dollar</option><option value="AWG">Aruban florin</option><option value="AZN">Azerbaijani manat</option><option value="BAM">Bosnia and Herzegovina convertible mark</option><option value="BBD">Barbadian dollar</option><option value="BDT">Bangladeshi taka</option><option value="BGN">Bulgarian lev</option><option value="BHD">Bahraini dinar</option><option value="BIF">Burundian franc</option><option value="BMD">Bermudian dollar</option><option value="BND">Brunei dollar</option><option value="BOB">Bolivian boliviano</option><option value="BRL">Brazilian real</option><option value="BSD">Bahamian dollar</option><option value="BTN">Bhutanese ngultrum</option><option value="BWP">Botswana pula</option><option value="BYR">Belarusian ruble</option><option value="BZD">Belize dollar</option><option value="CAD">Canadian dollar</option><option value="CDF">Congolese franc</option><option value="CHF">Swiss franc</option><option value="CLP">Chilean peso</option><option value="CNY">Chinese yuan</option><option value="COP">Colombian peso</option><option value="CRC">Costa Rican colón</option><option value="CUP">Cuban convertible peso</option><option value="CVE">Cape Verdean escudo</option><option value="CZK">Czech koruna</option><option value="DJF">Djiboutian franc</option><option value="DKK">Danish krone</option><option value="DOP">Dominican peso</option><option value="DZD">Algerian dinar</option><option value="EGP">Egyptian pound</option><option value="ERN">Eritrean nakfa</option><option value="ETB">Ethiopian birr</option><option value="EUR">Euro</option><option value="FJD">Fijian dollar</option><option value="FKP">Falkland Islands pound</option><option value="GBP">British pound</option><option value="GEL">Georgian lari</option><option value="GHS">Ghana cedi</option><option value="GMD">Gambian dalasi</option><option value="GNF">Guinean franc</option><option value="GTQ">Guatemalan quetzal</option><option value="GYD">Guyanese dollar</option><option value="HKD">Hong Kong dollar</option><option value="HNL">Honduran lempira</option><option value="HRK">Croatian kuna</option><option value="HTG">Haitian gourde</option><option value="HUF">Hungarian forint</option><option value="IDR">Indonesian rupiah</option><option value="ILS">Israeli new shekel</option><option value="IMP">Manx pound</option><option value="INR">Indian rupee</option><option value="IQD">Iraqi dinar</option><option value="IRR">Iranian rial</option><option value="ISK">Icelandic króna</option><option value="JEP">Jersey pound</option><option value="JMD">Jamaican dollar</option><option value="JOD">Jordanian dinar</option><option value="JPY">Japanese yen</option><option value="KES">Kenyan shilling</option><option value="KGS">Kyrgyzstani som</option><option value="KHR">Cambodian riel</option><option value="KMF">Comorian franc</option><option value="KPW">North Korean won</option><option value="KRW">South Korean won</option><option value="KWD">Kuwaiti dinar</option><option value="KYD">Cayman Islands dollar</option><option value="KZT">Kazakhstani tenge</option><option value="LAK">Lao kip</option><option value="LBP">Lebanese pound</option><option value="LKR">Sri Lankan rupee</option><option value="LRD">Liberian dollar</option><option value="LSL">Lesotho loti</option><option value="LTL">Lithuanian litas</option><option value="LVL">Latvian lats</option><option value="LYD">Libyan dinar</option><option value="MAD">Moroccan dirham</option><option value="MDL">Moldovan leu</option><option value="MGA">Malagasy ariary</option><option value="MKD">Macedonian denar</option><option value="MMK">Burmese kyat</option><option value="MNT">Mongolian tögrög</option><option value="MOP">Macanese pataca</option><option value="MRO">Mauritanian ouguiya</option><option value="MUR">Mauritian rupee</option><option value="MVR">Maldivian rufiyaa</option><option value="MWK">Malawian kwacha</option><option value="MXN">Mexican peso</option><option value="MYR">Malaysian ringgit</option><option value="MZN">Mozambican metical</option><option value="NAD">Namibian dollar</option><option value="NGN">Nigerian naira</option><option value="NIO">Nicaraguan córdoba</option><option value="NOK">Norwegian krone</option><option value="NPR">Nepalese rupee</option><option value="NZD">New Zealand dollar</option><option value="OMR">Omani rial</option><option value="PAB">Panamanian balboa</option><option value="PEN">Peruvian nuevo sol</option><option value="PGK">Papua New Guinean kina</option><option value="PHP">Philippine peso</option><option value="PKR">Pakistani rupee</option><option value="PLN">Polish złoty</option><option value="PRB">Transnistrian ruble</option><option value="PYG">Paraguayan guaraní</option><option value="QAR">Qatari riyal</option><option value="RON">Romanian leu</option><option value="RSD">Serbian dinar</option><option value="RUB">Russian ruble</option><option value="RWF">Rwandan franc</option><option value="SAR">Saudi riyal</option><option value="SBD">Solomon Islands dollar</option><option value="SCR">Seychellois rupee</option><option value="SDG">Singapore dollar</option><option value="SEK">Swedish krona</option><option value="SGD">Singapore dollar</option><option value="SHP">Saint Helena pound</option><option value="SLL">Sierra Leonean leone</option><option value="SOS">Somali shilling</option><option value="SRD">Surinamese dollar</option><option value="SSP">South Sudanese pound</option><option value="STD">São Tomé and Príncipe dobra</option><option value="SVC">Salvadoran colón</option><option value="SYP">Syrian pound</option><option value="SZL">Swazi lilangeni</option><option value="THB">Thai baht</option><option value="TJS">Tajikistani somoni</option><option value="TMT">Turkmenistan manat</option><option value="TND">Tunisian dinar</option><option value="TOP">Tongan paʻanga</option><option value="TRY">Turkish lira</option><option value="TTD">Trinidad and Tobago dollar</option><option value="TWD">New Taiwan dollar</option><option value="TZS">Tanzanian shilling</option><option value="UAH">Ukrainian hryvnia</option><option value="UGX">Ugandan shilling</option><option value="USD">United States dollar</option><option value="UYU">Uruguayan peso</option><option value="UZS">Uzbekistani som</option><option value="VEF">Venezuelan bolívar</option><option value="VND">Vietnamese đồng</option><option value="VUV">Vanuatu vatu</option><option value="WST">Samoan tālā</option><option value="XAF">Central African CFA franc</option><option value="XCD">East Caribbean dollar</option><option value="XOF">West African CFA franc</option><option value="XPF">CFP franc</option><option value="YER">Yemeni rial</option><option value="ZAR">South African rand</option><option value="ZMW">Zambian kwacha</option><option value="ZWL">Zimbabwean dollar</option></select></div>'+

    '<div class="col-sm-5"> <label class="">Amount</label> <input class="form-control amount" placeholder="enter your Amount" type="text" Id="" name=""/></div><div class="col-sm-1"> <button type="button" class="btn btn-primary add" id="add'+i+'" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" id="'+i+'" style="margin-top: 25px;margin-left: 1px" class="btn btn-warning remove" >X</button> </div></div>';
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
  var add=' <div  id="ticket_add'+j+'"><div class="col-sm-4"><label class="">Mode Of Travell</label><select class="form-control  mode_travell" placeholder="Enter Travell Mode " type="text" Id="" name="ticket"> <option>Select Mode of travel</option><option>Flight</option><option>Bus</option><option>Train</option><option>Car</option><option>Ship</option></select></div><div class="col-sm-4"><label class="">Travelling From</label><input class="form-control travell_from" placeholder="Enter Travelling from" type="text" Id="adv0" name="ticket"/></div><div class="col-sm-4"><label class="">Travelling To</label><input class="form-control travell_to " placeholder="Enter Travelling To" type="text" Id="adv0" name="ticket"/></div><div class="col-sm-4"><label class="">Departure Date</label> <input class="form-control dep_date" type="date" placeholder="Checkin Date"  Id="startdate" name="ticket"/></div><div class="col-sm-4"><label class="">Return Date</label><input class="form-control return ret_date" placeholder="Enter Travelling To" type="date" Id="adv0" name="ticket"/></div> <div class="col-sm-2"></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_ticket " id="add'+j+'" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" style="margin-top: 25px;margin-left: 0px" class="btn btn-warning remove_ticket " id="'+j+'">X</button></div></div></br>';
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

var k=0;
$(document).on("click",".add_hotel",function(){
  var add='<div id="hotel_add'+k+'"><div class="col-sm-5"><label class="">Slect Hotel type</label> <select class="form-control hotel_type" name="hotel"><option selected="true" disabled="disabled">Select Hotel</option><option>Any Prefered Hotel</option><option>Specifc Hotel</option></select></div><div class="col-sm-5"><div class="form-group"><label for="comment">Address</label><textarea class="form-control hotel_add" rows="2" id="comment" name="hotel"></textarea></div>  </div><div class="col-sm-5"><label class="">Checkin Date</label><input class="form-control check_in" type="date" placeholder="Checkin Date"  Id="startdate" name="hotel"/></div><div class="col-sm-5"><label class="">Checkout Date</label><input class="form-control check_out" type="date" placeholder="CheckOut Date" Id="startdate" name="hotel"/></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_hotel " id="add'+k+'" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" style="margin-top: 25px;margin-left:0px" class="btn btn-warning remove_hotel " id="'+k+'">X</button></div></div>';
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




var   managerLoginId="";





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
   $("#queueName").val("Travel_Employee_review");
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
                 managerLoginId=data.loginId;
              document.getElementById("manager").value=managerName;
            },
             error: function(jqXHR, textStatus, errorThrown)  {
                
                    //  alert(jqXHR.status+' '+jqXHR.textStatus);  
              } 
            });
      },
       error: function(jqXHR, textStatus, errorThrown)  {
          
             //   alert(jqXHR.status+' '+jqXHR.textStatus);  
        } 
      });


var advance=data.application.advance;

      $(advance).each(function(i){
        var currency=advance[i].currency;
        var amount=advance[i].amount;

var advance_add='<div id=""><div class="col-sm-5" ><label class="">Currency</label><input  class="form-control currency " value="'+currency+'" type="text" Id="adv0" name=""/></div>'+
'<div class="col-sm-5"> <label class="">Amount</label> <input  class="form-control amount " value="'+amount+'" placeholder="enter your Amount" type="text" Id="adv0" name=""/></div><div class="col-sm-1"> <button type="button" class="btn btn-primary add" id="add0" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" id="remove0" style="margin-top: 25px;margin-left: 1px" class="btn btn-warning remove" >X</button> </div></div>';
$("#adv").prepend(advance_add);
        console.log(currency+" "+amount);
        $("#adv_check").prop("checked","true");
        $("#adv").css("display","block");

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
          $("#ticket").css("display","none");
           var add=' <div  id=""><div class="col-sm-4"><label class="">Mode Of Travell</label><input class="form-control  mode_travell" placeholder="Enter Travell Mode " type="text" Id="" name="ticket"/></div><div class="col-sm-4"><label class="">Travelling From</label><input class="form-control travell_from" placeholder="Enter Travelling from" type="text" Id="adv0" name="ticket"/></div><div class="col-sm-4"><label class="">Travelling To</label><input class="form-control travell_to " placeholder="Enter Travelling To" type="text" Id="adv0" name="ticket"/></div><div class="col-sm-4"><label class="">Departure Date</label> <input class="form-control dep_date" type="date" placeholder="Checkin Date"  Id="startdate" name="ticket"/></div><div class="col-sm-4"><label class="">Return Date</label><input class="form-control return ret_date" placeholder="Enter Travelling To" type="date" Id="adv0" name="ticket"/></div> <div class="col-sm-2"></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_ticket " id="add_ticket0" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" style="margin-top: 25px;margin-left: 0px" class="btn btn-warning remove_ticket " id="remove_ticket0">X</button></div></div></br>';
  $("#ticket_add").append(add);
        }
        else{

          var add=' <div  id=""><div class="col-sm-4"><label class="">Mode Of Travell</label><input class="form-control  mode_travell" placeholder="Enter Travell Mode" value="'+modeOfTravell+'" type="text" Id="" name="ticket"/></div><div class="col-sm-4"><label class="">Travelling From</label><input class="form-control travell_from" placeholder="Enter Travelling from" type="text" value="'+travellingFrom+'" Id="adv0" name="ticket"/></div><div class="col-sm-4"><label class="">Travelling To</label><input class="form-control travell_to " placeholder="Enter Travelling To" type="text" value="'+travellingTo+'" Id="adv0" name="ticket"/></div><div class="col-sm-4"><label class="">Departure Date</label> <input class="form-control dep_date" type="date" placeholder="Checkin Date" value="'+departureDate+'" Id="startdate" name="ticket"/></div><div class="col-sm-4"><label class="">Return Date</label><input class="form-control return ret_date" placeholder="Enter Travelling To" type="date" value="'+returnDate+'" Id="adv0" name="ticket"/></div> <div class="col-sm-2"></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_ticket " id="add_ticket0" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" style="margin-top: 25px;margin-left: 0px" class="btn btn-warning remove_ticket " id="remove_ticket0">X</button></div></div></br>';
  $("#ticket_add").prepend(add);
   $("#ticket_check").prop("checked","true");
        $("#ticket").css("display","block");

        }
       
        
      });




      var hotel=data.application.hotel;



      $(hotel).each(function(i){

          var hotelType=hotel[i].hotelType;
          var address=hotel[i].address;
          var checkInDate=hotel[i].checkInDate;
          var checkoutDate=hotel[i].checkoutDate;

          console.log(hotelType+" "+address+" "+checkInDate+" "+checkoutDate);
         if(address=="" )
        {
          var add='<div id=""><div class="col-sm-5"><label class="">Slect Hotel type</label> <select class="form-control hotel_type" name="hotel"><option selected="true" disabled="disabled">Select Hotel</option><option>Any Prefered Hotel</option><option>Specifc Hotel</option></select></div><div class="col-sm-5"><div class="form-group"><label for="comment">Address</label><textarea class="form-control hotel_add" rows="2" id="comment" name="hotel"></textarea></div>  </div><div class="col-sm-5"><label class="">Checkin Date</label><input class="form-control check_in" type="date" placeholder="Checkin Date"  Id="startdate" name="hotel"/></div><div class="col-sm-5"><label class="">Checkout Date</label><input class="form-control check_out" type="date" placeholder="CheckOut Date" Id="startdate" name="hotel"/></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_hotel " id="" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" style="margin-top: 25px;margin-left:0px" class="btn btn-warning remove_hotel " id="0">X</button></div></div>';
  $("#hotel_add").append(add);
          
        }
        else{
      var add='<div id=""><div class="col-sm-5"><label class="">Slect Hotel type</label><input type="text" value="'+hotelType+'" class="form-control hotel_type"></div><div class="col-sm-5"><div class="form-group"><label for="comment">Address</label><input type="text" class="form-control hotel_add"  id="comment" value="'+address+'" name="hotel"/></div> </div><div class="col-sm-5"><label class="">Checkin Date</label><input class="form-control check_in" type="date" placeholder="Checkin Date" value="'+checkInDate+'" Id="startdate" name="hotel"/></div><div class="col-sm-5"><label class="">Checkout Date</label><input class="form-control check_out" type="date" placeholder="CheckOut Date" value="'+checkoutDate+'" Id="startdate" name="hotel"/></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_hotel " id="" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" style="margin-top: 25px;margin-left:0px" class="btn btn-warning remove_hotel " id="0">X</button></div></div>';
  $("#hotel_add").append(add);
$("#hotel").css("display","block");
$("#hotel_check").prop("checked","true");
        }
      
      });





  var rentCar=data.application.rentCar;
      $(rentCar).each(function(i){
        var startDate=rentCar[i].startDate;
        var endDate=rentCar[i].endDate;

      
        if(startDate=="")
        {
          var add='<div id=""><div class="col-sm-5"><label class="">Start Date</label><input class="form-control start_dat"  placeholder="Start Date" type="date" Id="startdate" name="car"/></div><div class="col-sm-5"><label class="">End Date</label><input class="form-control end_dat"  placeholder="End Date" type="date" Id="startdate" name="car"/></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_car " id="" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" style="margin-top: 25px;margin-left: 0px" class="btn btn-warning remove_car " id="remove_car0">X</button></div></div>';
  $("#car_add").append(add);
          
        }
else{

  var add='<div id=""><div class="col-sm-5"><label class="">Start Date</label><input class="form-control start_dat"  placeholder="Start Date" type="date"  value="'+startDate+'" Id="startdate" name="car"/></div><div class="col-sm-5"><label class="">End Date</label><input class="form-control end_dat"  placeholder="End Date" type="date" value="'+endDate+'" Id="startdate" name="car"/></div><div class="col-sm-1"><button type="button" class="btn btn-primary add_car " id="" style="margin-top: 25px">+</button></div><div class="col-sm-1"><button  type="button" style="margin-top: 25px;margin-left: 0px" class="btn btn-warning remove_car " id="remove_car0">X</button></div></div>';
   $("#car_add").append(add);
        console.log(startDate+" "+endDate);
         $("#car").css("display","block");
         $("#car_check").prop("checked","true");

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

   }/*End of main success*/
      });/*End of ftching data*/














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

      //handling the form submit event
      function prepareEventHandlers(){
         
         var temp=true;
          trid=document.getElementById("trId").value;
          
          
          if(trid === ""){
            document.getElementById("errormsg").innerHTML="Enter Travel id";
            temp=false;
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
            return false;
           }            
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
          return false;
         }            
        } 

          if($("#ticket_check").prop("checked"))
        {
          var cnt=0;
          var text=$("input[name^='ticket']");

  
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
          return false;
         }            
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
          
        var act_id=$("#sel1").val();
var remarks=$("#comment").val();

//alert(act_id+"gcdg "+remarks);
var actions=[];

    var res={};
    res.selectAction=act_id;
    res.remarks=remarks;
    res.userId="12354";
    res.queueName="Employee review ";

    actions.push(res);
    



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
his.eventDescritption="Employee_review_tavel";
his.remarks="<b>"+ act_id+"</b> -by-<b>"+actionHolderFirstName+"</b><br><b>Remarks:-</b>"+remarks+"" ;
history_arr.push(his);
console.log(his);








    json.history=history_arr;

var action={};

action.applicationStatus=act_id;
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
                        $(".modal-body-result").html("<div class='alert alert-success'> <strong> Submission successfully</strong></div>");
                    $("#myModal3").modal();

                       $(".clo-message").on("click",function(){
                         window.parent.closeModal();
                       })
                       
                    },
                     error: function(jqXHR, textStatus, errorThrown)  {
                      $("#loading").css("display","none");

                        window.parent.moveTop();
                      //alert("error storing data: "+jqXHR.status+' '+jqXHR.textStatus);  
                      $(".modal-body-result").html("<div class='alert alert-danger'> <strong> Submission Failed</div>");
                    $("#myModal3").modal();
                     $(".clo-message").on("click",function(){
                         window.parent.closeModal();
                       })
                      } 
                    });
          

          }
      });