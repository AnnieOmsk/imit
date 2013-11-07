$(document).ready(function(){
    $("#myController").jFlow({
        controller: ".jFlowControl", // must be class, use . sign
	slideWrapper : "#jFlowSlider", // must be id, use # sign
	slides: "#slider",  // the div where all your sliding divs are nested in
	selectedWrapper: "jFlowSelected",  // just pure text, no sign
	width: "820px",  // this is the width for the content-slider
	height: "513px",  // this is the height for the content-slider
	duration: 400,  // time in miliseconds to transition one slide
	prev: ".left-slide", // must be class, use . sign
	next: ".right-slide", // must be class, use . sign
	auto: false	
    });
});

