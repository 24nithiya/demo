$(".message").load("html/messageAlert.html");

var arr="";
var arrg="";
var taskAssign="myTask";




var order=1;
function get(i)
{
	
	$("#pla").text(i);
	}
function get1(i)
{
	
	
	$("#pla1").text(i);

	var sortCheck=$("#pla1").text();
	if(sortCheck=="Priority")
		{
		order=1;
			start();
			
		}
	else if(sortCheck=="Due")
	{
		order=2;
		start();
		
	}
	else if(sortCheck=="Follow Up")
	{order=3
		start();
	}
	}


function takeorder(order,sort,arr)
{
	if(sort==true)
		{
		if(order==1)
			{
			var dat=bubbleSortAec(arr);
			return dat;
			}
		else if(order==2)
			{
			 var dat=dueAccDate(arr);
			 return dat;
			}
		else if(order==3)
			{
			 var dat=followAccDate(arr);
			 return dat;
			}
			
		}
	else
	{
		if(order==1)
		{
		var dat=bubbleSortDec(arr);
		return dat;
		}
		else if(order==2)
		{
		 var dat=dueDccDate(arr);
		 return dat;
		}
		else if(order==3)
		{
		 var dat=followDccDate(arr);
		 return dat;
		}
		
	}
}




			
					$.ajax({
						url : '/actnow-claims-1.0.0/actnow/actnowtask?assignee='+sessionId+'', /*?assignee='+sessionId+'*/
						type : "GET",
						dataType : "json",
						async : false,
						success : function(data) {
							
							arr=data;
						}
					});


					$.ajax({
						url : '/engine-rest/task?candidateUser='+sessionId+'', /*?assignee='+sessionId+'*/
						type : "GET",
						dataType : "json",
						async : false,
						success : function(data) {
							
							arrg=data;
							//alert(arrg.length);
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


$("#myTask").click(function(){
	$(this).attr("class","active");
	$("#groupTask").attr("class","");
taskAssign="myTask";
start();
});
$("#groupTask").click(function(){
	$(this).attr("class","active");
	$("#myTask").attr("class","");
	taskAssign="groupTask";
	start();
});






var res="";
//res=arr.length;

//alert(res);

var taskRes=arr.length;
$("#taskRes").html(taskRes);

var groupRes=arrg.length;
$("#groupRes").html(groupRes)

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
function start(val){
	//alert($("#filter").val());
	//alert(sort);
	$("#new_tab").html("");
	var tab="";
	var count="";
	var dat=val;
	
		//console.log(arr[i]);	
	if($("#filter").val()=="")
	{
		 if(taskAssign=="myTask")
		 {
		 dat=takeorder(order,sort,arr);
		

		 //alert(dat);
	     	}
		else if(taskAssign=="groupTask")
		{
		 dat=takeorder(order,sort,arrg);
		
		// console.log(arrg);
	    }

	   // dat=takeorder(order,sort,arrg);

		res=dat.length;
		$("#result").html(res+" Result");
				$(dat).each(
						function(i) {
							var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
								  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
								];
							var dateFormat=new Date(dat[i].due);
							var followFormat=new Date(dat[i].followUp);
							var due=dateFormat.getFullYear()+"-"+monthNames[dateFormat.getMonth()]+"-"+dateFormat.getDate();
							var followUp=followFormat.getFullYear()+"-"+monthNames[followFormat.getMonth()]+"-"+followFormat.getDate();
							
									var from_key=dat[i].formKey;
									var task_id=dat[i].id;
											var key=dat[i].applicationId;
											var taskDef=dat[i].taskDefinitionKey;
										tab = ' <tr id="mod'+i+'" class="ui-widget-content ui-datatable-even" style="text-align: center; line-height: 3.667;" >'
										
												
												+'<td >'
										+ dat[i].name + '</td><td >'
												+ dat[i].created + '</td><td>'
												+ dat[i].due + '</td><td>'
												+ dat[i].followUp
												+ '</td><td>'
												+ dat[i].priority
												+ '</td><td class="mytaskOption"><img src="images/pop-up.png" height="25px" width="25px" /></td>'
												+'<td class="groupTaskOption" id="claimChange'+i+'" style="border:0px solid black;width:100px;padding-right:20px;padding-top:5px"><select class="form-control "id="selectVal'+i+'"><option value="">Action</option><option value="claim">Claim</option></select></td></tr>';
											
							   $('.selectpicker').selectpicker();

							$("#new_tab").append(tab);

							 if(taskAssign=="groupTask")
		 					{
		 						$(".mytaskOption").css("display","none");
		 						$(".groupTaskOption").css("display","block");
		 					}
		 					else if(taskAssign=="myTask")
		 					{
		 						$(".mytaskOption").css("display","block");
		 						$(".groupTaskOption").css("display","none");
		 					}
					
					$('#mod' + i + '').click(function() {
											//$("#myModal").modal();
											 if(taskAssign=="myTask")
		 										{
											var fin="/actnow-claims-1.0.0/"+split_key(from_key)+"?key="+key+"&task="+task_id+"&sessionId="+sessionId+"";
											$("#frame").attr("src",fin);
											
											$("#myModal").modal();
											$("body").scrollTop();
											 window.parent.topScroll();
											 
										}
										/*else if(taskAssign=="groupTask")
		 									{
		 										var claimJson={
		 											"taskId":"",
		 											"assignee":""
		 										};
		 										//alert(claimJson);
		 									}*/

										});

					$('#selectVal' + i + '').change(function() {
						
						var claimJson={};
						claimJson.taskId=task_id;
						claimJson.loginId=sessionId;
		 											/*"taskId":""+task_id+"",
		 											"loginId":""+sessionId+"",
		 										};*/
		 										//alert(claimJson);

var html=JSON.stringify(claimJson, null, "\t");
//alert(html);



 					$.ajax({		
                    url: '/actnow-claims-1.0.0/actnow/actnowtask/claimtask',
                    type: 'POST',
                    contentType:'application/json',
                    data: html,
                    success: function()  {
    					//alert("success full");
                           /* $(".modal-body-result").html("<div class='alert alert-success'> <strong> Submission successfully</strong></div>");
                            $("#myModal3").modal();
                            $(".modal-close").on("click",function(){
                                
                               })*/
                            location.reload();
                        },
                     error: function()  {
                    	 $(".modal-body-result").html("<div class='alert alert-danger'> <strong> Error in claim</div>");
                         $("#myModal3").modal();
                         $(".modal-close").on("click",function(){
                             location.reload();
                            })
                     }});
    					
    					});
					tab="";
							
						});
				
			 
			 
		}/*END OF MAIN IF*/
	else
	{//Search Part Start HEre
		var temp=[];

		$("#new_tab").html("");


		if(taskAssign=="myTask")
		 {
		 for(var i=0;i<arr.length;i++)
		{
		var val=$("#filter").val();
		var searchval=search(val.toString(),arr[i].name);
		if(searchval!="")
		{
			temp.push(arr[i]);		//Search Part puch into a temporary Array			
		}
		}/*End of forloop*/
	
	     	}
		else if(taskAssign=="groupTask")
		{
		for(var i=0;i<arrg.length;i++)
		{
		var val=$("#filter").val();
		var searchval=search(val.toString(),arrg[i].name);
		if(searchval!="")
		{
			temp.push(arrg[i]);		//Search Part puch into a temporary Array			
		}
		}/*End of forloop*/
	
	    }

		
		

		var dat=takeorder(order,sort,temp);
		res=dat.length;
		$("#result").html(res+" Result");
		if(dat.length>0)
			{
		
			
			$(dat).each(
						function(i) {
							var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
								  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
								];
							var dateFormat=new Date(dat[i].due);
							var followFormat=new Date(dat[i].followUp);
							var due=dateFormat.getFullYear()+"-"+monthNames[dateFormat.getMonth()]+"-"+dateFormat.getDate();
							var followUp=followFormat.getFullYear()+"-"+monthNames[followFormat.getMonth()]+"-"+followFormat.getDate();
							
									var from_key=dat[i].formKey;
									var task_id=dat[i].id;
											var key=dat[i].applicationId;
											var taskDef=dat[i].taskDefinitionKey;
										tab = ' <tr id="mod'+i+'" class="ui-widget-content ui-datatable-even" style="text-align: center; line-height: 3.667;" >'
										
												
												+'<td >'
										+ dat[i].name + '</td><td >'
												+ dat[i].created + '</td><td>'
												+ dat[i].due + '</td><td>'
												+ dat[i].followUp
												+ '</td><td>'
												+ dat[i].priority
												+ '</td><td class="mytaskOption"><img src="images/pop-up.png" height="25px" width="25px" /></td>'
												+'<td class="groupTaskOption" id="claimChange'+i+'" style="border:0px solid black;width:100px;padding-right:20px;padding-top:5px"><select class="form-control "id="selectVal'+i+'" style="margin-top:5px"><option value="">Action</option><option value="claim">Claim</option></select></td></tr>';
											
							   $('.selectpicker').selectpicker();

							$("#new_tab").append(tab);

							 if(taskAssign=="groupTask")
		 					{
		 						$(".mytaskOption").css("display","none");
		 						$(".groupTaskOption").css("display","block");
		 					}
		 					else if(taskAssign=="myTask")
		 					{
		 						$(".mytaskOption").css("display","block");
		 						$(".groupTaskOption").css("display","none");
		 					}
					
					$('#mod' + i + '').click(function() {
											//$("#myModal").modal();
											 if(taskAssign=="myTask")
		 										{
											var fin="/actnow-claims-1.0.0/"+split_key(from_key)+"?key="+key+"&task="+task_id+"&sessionId="+sessionId+"";
											$("#frame").attr("src",fin);
											
											$("#myModal").modal();
											$("body").scrollTop();
											 
										}
										/*else if(taskAssign=="groupTask")
		 									{
		 										var claimJson={
		 											"taskId":"",
		 											"assignee":""
		 										};
		 										//alert(claimJson);
		 									}*/

										});

					$('#selectVal' + i + '').change(function() {
						
						var claimJson={};
						claimJson.taskId=task_id;
						claimJson.loginId=sessionId;
		 											/*"taskId":""+task_id+"",
		 											"loginId":""+sessionId+"",
		 										};*/
		 										//alert(claimJson);

var html=JSON.stringify(claimJson, null, "\t");
//alert(html);



 					$.ajax({		
                    url: '/actnow-claims-1.0.0/actnow/actnowtask/claimtask',
                    type: 'POST',
                    contentType:'application/json',
                    data: html,
                    success: function()  {
					//alert("success full");
                        /*$(".modal-body-result").html("<div class='alert alert-success'> <strong> Submission successfully</strong></div>");
                        $("#myModal3").modal();
                        $(".modal-close").on("click",function(){
                           
                           })*/
                         location.reload();
                    },
                 error: function()  {
                	 $(".modal-body-result").html("<div class='alert alert-danger'> <strong> Error in cliam</div>");
                     $("#myModal3").modal();
                     $(".modal-close").on("click",function(){
                         location.reload();
                        })
                 }});
					
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
			console.log("DONE");
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
       if(arr[j-1].priority>arr[j].priority){
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
	       if(arr[j-1].priority<arr[j].priority){
	           var temp = arr[j-1];
	           arr[j-1] = arr[j];
	           arr[j] = temp;
	        }
	     }
	   }
	   return arr;
	}


	
	

function dueAccDate(arr)
{
	var dat=[];
	for(var i=0;i<arr.length;i++)
		{
		var get={};
		get=arr[i];
		get.due=new Date(arr[i].due);
		get.followUp=new Date(arr[i].followUp);
		dat.push(get);
		
		}
	dat.sort(function(a,b) { 
		return a.due - b.due;  
	});
	/*for (var i = 0; i < dat.length; i++) {
		  document.write( dat[i].due+"<br>" );
		}*/
	return dat;
}


function dueDccDate(arr)
{
	var dat=[];
	for(var i=0;i<arr.length;i++)
	{
	var get={};
	get=arr[i];
	get.due=new Date(arr[i].due);
	get.followUp=new Date(arr[i].followUp);
	dat.push(get);
	
	}
	dat.sort(function(a,b) { 
		return  b.due - a.due;  
	});
	/*for (var i = 0; i < dat.length; i++) {
		  document.write( dat[i].due+"<br>" );
		}*/
	return dat;
}








function followAccDate(arr)
{
	var dat=[];
	for(var i=0;i<arr.length;i++)
		{
		var get={};
		get=arr[i];
		get.due=new Date(arr[i].due);
		get.followUp=new Date(arr[i].followUp);
		dat.push(get);
		
		}
	dat.sort(function(a,b) { 
		return a.followUp - b.followUp;  
	});
	/*for (var i = 0; i < dat.length; i++) {
		  document.write( dat[i].due+"<br>" );
		}*/
	return dat;
}


function followDccDate(arr)
{
	var dat=[];
	for(var i=0;i<arr.length;i++)
	{
	var get={};
	get=arr[i];
	get.due=new Date(arr[i].due);
	get.followUp=new Date(arr[i].followUp);
	dat.push(get);
	
	}
	dat.sort(function(a,b) { 
		return  b.followUp - a.followUp;  
	});
	/*for (var i = 0; i < dat.length; i++) {
		  document.write( dat[i].due+"<br>" );
		}*/
	return dat;
}




