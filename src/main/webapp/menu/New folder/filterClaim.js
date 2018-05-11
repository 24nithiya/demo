var arr="";

var order=2;
function get(i)
{
	
	$("#pla").text(i);
	}
function get1(i)
{
	
	
	$("#pla1").text(i);

	var sortCheck=$("#pla1").text();
	 if(sortCheck=="Request Date")
	{
		order=2;
		start();
		
	}
	else if(sortCheck=="Total Amount")
	{order=3
		start();
	}
	}


function takeorder(order,sort,arr)
{
	if(sort==true)
		{
		
		 if(order==2)
			{
			 var dat=AccDate(arr);
			 return dat;
			}
		else if(order==3)
			{
			var dat=bubbleSortAec(arr);
			 return dat;
			}
			
		}
	else
	{
		 if(order==2)
		{
		 var dat=DccDate(arr);
		 return dat;
		}
		else if(order==3)
		{
			var dat=bubbleSortDec(arr);
		 return dat;
		}
		
	}
}





			
					$.ajax({
						url : '/actnow-claims-1.0.0/actnow/expenseclaim/',
						type : "GET",
						dataType : "json",
						async : false,
						success : function(data) {
							
							arr=data;
						}
					});
			
		
						
			
			function split_key(key)
			{
				var arr=key.split(":");
				return arr[2];
			}
			
			
			

			window.closeModal = function(){
    $('#myModal').modal('hide');
    location.reload();
};







var res="";
//res=arr.length;

//alert(res);

var sort=true;

$("#sort").click(function()
		{
	var imgName=$("#sortImg").attr("src");
	//alert(imgName);
	//imgName==='images/alph-asc-icon.png'?''+$("#sortImg").attr("src","images/alph-dsc-icon.png")+'':''+$("#sortImg").attr("src","images/alph-asc-icon.png")+'';
	if(imgName==='images/alph-dsc-icon.png')
	{
		$("#sortImg").attr("src","images/alph-asc-icon.png");
		sort=true;
		start();
	}
	else if(imgName==='images/alph-asc-icon.png')
		{
		$("#sortImg").attr("src","images/alph-dsc-icon.png")
		sort=false;
		start();
		}
	})


start();
function start(){
	//alert($("#filter").val());
	//alert(sort);
	$("#new_tab").html("");
	var tab="";
	var count="";
	
		//console.log(arr[i]);	
	if($("#filter").val()=="")
	{
		 
		var dat=takeorder(order,sort,arr);
		/*if(sort==true)
			{
			var dat=bubbleSortAec(arr);
			}
		else{
			var dat=bubbleSortDec(arr);
		}*/
		res=dat.length;
		$("#result").html(res+" Result");
				
						
											var tab = "";
											$(dat).each(
													function(i) {
														var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
															  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
															];
														var dateFormat=new Date(dat[i].dateCreated);
														
														var date=dateFormat.getFullYear()+"-"+monthNames[dateFormat.getMonth()]+"-"+dateFormat.getDate()+" T"+dateFormat.getHours()+":"+dateFormat.getMinutes();
															var key=dat[i].applicationId;
														tab = ' <tr id="mod'+i+'" class="ui-widget-content ui-datatable-even" style="text-align: center; line-height: 3.667;" >'
														
																
																+'<td >'
														+ date + '</td><td >'
																+ dat[i].application.travelActual.travelRequestId + '</td><td>'
																+ dat[i].application.applicationStatus + '</td><td>'
																+ dat[i].application.claimTotalAmount
																+ '</td>'
																+'<td><img src="images/pop-up.png" height="25px" width="25px" /></td></tr>'
																
																+ '<tr class="ui-widget-content ui-datatable-even"  style="text-align: center;display:none; line-height: 3.667;" id="del'+i+'" >'
																
																+'<td style="  visibility: hidden;"></td><td>'+ dat[i].description
																+ '</td></tr>';
														$("#new_tab").append(tab);
					
														$('#mod' + i + '').click(function() {
															//$("#myModal").modal();
															/* alert("got"); */
															var fin="/actnow-claims-1.0.0/actnow/expenseclaim/"+key;
															
															
															var url="/actnow-claims-1.0.0/forms/demo_claim_data.html?key="+key+"";
															//window.location = url;
															 $("#frame").attr("src",url);
															/* alert(fin); */
															$("#myModal").modal(); 
															$("body").scrollTop();
														});
														
					tab="";
							
						});
				
			 
			 
		}/*END OF MAIN IF*/
	else
	{//Search Part Start HEre
		var temp=[];
		$("#new_tab").html("");
		for(var i=0;i<arr.length;i++)
		{
		
			var val=$("#filter").val();
		var searchval=search(val.toString(),arr[i].application.applicationStatus);
		if(searchval!="")
		{
						
			temp.push(arr[i]);		//Search Part puch into a temporary Array	
			
			
		}
		
		
		
		}//END OF ELSE part 1st for lOOP 
		
		

		var dat=takeorder(order,sort,temp);
		res=dat.length;
		$("#result").html(res+" Result");
		if(dat.length>0)
			{
		
			
			var tab = "";
			$(dat).each(
					
					function(i) {
						var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
							  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
							];
						var dateFormat=new Date(dat[i].dateCreated);
						
						var date=dateFormat.getFullYear()+"-"+monthNames[dateFormat.getMonth()]+"-"+dateFormat.getDate()+" T"+dateFormat.getHours()+":"+dateFormat.getMinutes();
							var key=dat[i].applicationId;
							var key=dat[i].applicationId;
						tab = ' <tr id="mod'+i+'" class="ui-widget-content ui-datatable-even" style="text-align: center; line-height: 3.667;" >'
						
								
								+'<td >'
						+ date + '</td><td >'
								+ dat[i].application.travelActual.travelRequestId + '</td><td>'
								+ dat[i].application.applicationStatus + '</td><td>'
								+ dat[i].application.claimTotalAmount
								+ '</td>'
								+'<td><img src="images/pop-up.png" height="25px" width="25px" /></td></tr>'
								
								+ '<tr class="ui-widget-content ui-datatable-even"  style="text-align: center;display:none; line-height: 3.667;" id="del'+i+'" >'
								
								+'<td style="  visibility: hidden;"></td><td>'+ dat[i].description
								+ '</td></tr>';
						$("#new_tab").append(tab);

						$('#mod' + i + '').click(function() {
							//$("#myModal").modal();
							/* alert("got"); */
							var fin="/actnow-claims-1.0.0/actnow/expenseclaim/"+key;
							
							
							var url="/actnow-claims-1.0.0/forms/demo_claim_data.html?key="+key+"";
							//window.location = url;
							 $("#frame").attr("src",url);
							/* alert(fin); */
							$("#myModal").modal(); 
							$("body").scrollTop();
						});
						
					tab="";
							
						});				
			}
		else{
			$("#new_tab").html("Not found");
		}
	
	}//END OF MAIN ELSE PART

		
		
}//End of Start()





			function split_key(key)
			{
				var arr=key.split(":");
				return arr[2];
			}
			
			
			/* function go(){alert("got it");}
			$("#modal").click(function(){
				$("#myModal").modal();
			}); */

			window.closeModal = function(){
    $('#myModal').modal('hide');
    location.reload();
};

















function search(str,dat)
{
	var dat=dat.toLowerCase();
	var str=str.toLowerCase();
		if(dat.includes(str))
		{
			/*if(dat.indexOf(str)==0)
			return dat;
			else
				return ""	*/
			return dat;
		}
		else{
			//console.log(dat);
			return ""
		}
	
}

function bubbleSortAec(arr){
   var len = arr.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(parseInt(arr[j-1].application.claimTotalAmount)>parseInt(arr[j].application.claimTotalAmount)){
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;
        }
     }
   }
   return arr;
}
function bubbleSortDec(arr){
	   var len = arr.length;
	   for (var i = len-1; i>=0; i--){
	     for(var j = 1; j<=i; j++){
	    	 if(parseInt(arr[j-1].application.claimTotalAmount)<parseInt(arr[j].application.claimTotalAmount)){
	           var temp = arr[j-1];
	           arr[j-1] = arr[j];
	           arr[j] = temp;
	        }
	     }
	   }
	   return arr;
	}



function AccDate(arr)
{
	var dat=[];
	for(var i=0;i<arr.length;i++)
		{
		var get={};
		get=arr[i];
		get.dateCreated=new Date(arr[i].dateCreated);
		
		dat.push(get);
		
		}
	dat.sort(function(a,b) { 
		return a.dateCreated - b.dateCreated;  
	});
	/*for (var i = 0; i < dat.length; i++) {
		  document.write( dat[i].due+"<br>" );
		}*/
	return dat;
}


function DccDate(arr)
{
	var dat=[];
	for(var i=0;i<arr.length;i++)
	{
	var get={};
	get=arr[i];
	get.due=new Date(arr[i].dateCreated);
	
	dat.push(get);
	
	}
	dat.sort(function(a,b) { 
		return  b.dateCreated - a.dateCreated;  
	});
	/*for (var i = 0; i < dat.length; i++) {
		  document.write( dat[i].due+"<br>" );
		}*/
	return dat;
}


	




