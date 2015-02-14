$(function() {
	var workarray = [];
	var currentwork;

	// Disable caching of AJAX responses
	 // $.ajaxSetup ({  
  //    cache: false }); 

	if(window.innerWidth > 550){
		$("#namelink").css("display", "none");
	}

	//The text
	$(".ntl").mouseenter(function(){
		var el = $(this);
		if(el.hasClass("red")){
			$(this).removeClass("red blue").addClass("grey");
		}else if(el.hasClass("blue")){
			$(this).removeClass("grey blue").addClass("red");
		}else{
			$(this).removeClass("red grey").addClass("blue");
		}
	});

	//Page scroll
	$(".nav_link").click(function(){
		var a = $(this).attr('href');
		scrollTo(a);
	});

	//on window resize reset position to hash location
	//timeout fixes the problem that event fires 10000 times.
	var doner;
	if(!navigator.userAgent.match(/Android/i)){
		$(window).on('resize', function(){
				clearTimeout(doner);
				doner = setTimeout(function(){
					scrollToEl(location);
				}, 100);
		});
	}

	function scrollTo(id){
    	var targetEl = $(""+id+"");
    	$('html,body').animate({scrollTop: targetEl.offset().top},'slow');
	}

	function scrollToEl(){
		console.log("autoscroll");
		var targetEl = $(""+window.location.hash+"");
		$('html,body').animate({scrollTop: targetEl.offset().top},'slow');
	}

	//nametext test
	var namepos = $("#namewrapper").offset();

	$(window).bind('scroll', function() {
		if($(window).scrollTop() > namepos.top){
			$("#namelink").css("display", "block");
		}else{
			if(window.innerWidth > 550){
				$("#namelink").css("display", "none");
			}
		}
	});

	//worksection
	//jotain fiksiä siihen kun työ avataan ja halutaan backillä sulkea se? hashellä?
	$("#worksection").on("click", ".singlework", function(){
		var name = $(this).data("workname");
		loadWork(name);
		//set current work index
		currentwork = workarray.indexOf(name);
	});

	function loadWork(name){
		$.get("works/"+name+".html", function (data){
			$("#worksection").html(data);
		});
	}

	$("#worksection").on("click", "#closework", function(){
		$.get("works/list.html", function (data){
			$("#worksection").html(data);
		});
	});

	$(".singlework").each(function (){
		var a = $(this).data("workname");
		workarray.push(a);
	});


	$("#worksection").on("click", "#nextwork", function(){
		var nwindex = ++currentwork;
		if(nwindex > workarray.length-1){
			nwindex = 0;
			currentwork = 0;
		}
		var nw = workarray[nwindex];
		loadWork(nw);
	});

	$("#worksection").on("click", "#previouswork", function(){
		var nwindex = --currentwork;
		if(nwindex < 0){
			nwindex = workarray.length -1;
			currentwork = workarray.length-1;
		}
		var nw = workarray[nwindex];
		loadWork(nw);
	});




});