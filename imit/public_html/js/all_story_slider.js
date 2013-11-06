$(document).ready(function(){
    $("#story_1").css('cursor', 'pointer');
    $("#story_2").css('cursor', 'pointer');
    $("#story_3").css('cursor', 'pointer');
    $("#story_4").css('cursor', 'pointer');
    $("#story_5").css('cursor', 'pointer');
    $("#story_6").css('cursor', 'pointer');
    $("#story_7").css('cursor', 'pointer');
    $("#story_8").css('cursor', 'pointer');
    $("#story_9").css('cursor', 'pointer');
    $("#story_10").css('cursor', 'pointer');
    $("#story_11").css('cursor', 'pointer');
    $("#story_12").css('cursor', 'pointer');
    hideAllStories();
    $('#story_1').click(function (e) {
        if($("#all-story_1").css('display') =="none") {
            hideAllStories();
            $("#all-story_1").css('display', 'block');
            $("#triangle_1").css('display', 'block');
        } else {
            $("#all-story_1").hide();
            $("#triangle_1").hide();
        }
    });
    $('#story_2').click(function (e) {
      if($("#all-story_2").css('display') == "none") {
            hideAllStories();
            $("#all-story_2").css('display', 'inline-block');
            $("#triangle_2").css('display', 'block');
        } else {
            $("#all-story_2").hide();
            $("#triangle_2").hide();
        }
    });
    $('#story_3').click(function (e) {
      if($("#all-story_3").css('display') =="none") {
            hideAllStories();
            $("#all-story_3").css('display', 'inline-block');
            $("#triangle_3").css('display', 'block');
        } else {
            $("#all-story_3").hide();
            $("#triangle_3").hide();
        }
    });
    $('#story_4').click(function (e) {
      if($("#all-story_4").css('display') =="none") {
            hideAllStories();
            $("#all-story_4").css('display', 'inline-block');
            $("#triangle_4").css('display', 'block');
        } else {
            $("#all-story_4").hide();
            $("#triangle_4").hide();
        }
    });
    $('#story_5').click(function (e) {
      if($("#all-story_5").css('display') =="none") {
            hideAllStories();
            $("#all-story_5").css('display', 'inline-block');
            $("#triangle_5").css('display', 'block');;
        } else {
            $("#all-story_5").hide();
            $("#triangle_5").hide();
        }
    });
    $('#story_6').click(function (e) {
      if($("#all-story_6").css('display') =="none") {
            hideAllStories();
            $("#all-story_6").css('display', 'inline-block');
            $("#triangle_6").css('display', 'block');
        } else {
            $("#all-story_6").hide();
            $("#triangle_6").hide();
        }
    });
    $('#story_7').click(function (e) {
      if($("#all-story_7").css('display') =="none") {
            hideAllStories();
            $("#all-story_7").css('display', 'inline-block');
            $("#triangle_7").css('display', 'block');
        } else {
            $("#all-story_7").hide();
            $("#triangle_7").hide();
        }
    });
    $('#story_8').click(function (e) {
      if($("#all-story_8").css('display') =="none") {
            hideAllStories();
            $("#all-story_8").css('display', 'inline-block');
            $("#triangle_8").css('display', 'block');
        } else {
            $("#all-story_8").hide();
            $("#triangle_8").hide();
        }
    });
    $('#story_9').click(function (e) {
      if($("#all-story_9").css('display') =="none") {
            hideAllStories();
            $("#all-story_9").css('display', 'inline-block');
            $("#triangle_9").css('display', 'block');
        } else {
            $("#all-story_9").hide();
            $("#triangle_9").hide();
        }
    });
    $('#story_10').click(function (e) {
      if($("#all-story_10").css('display') =="none") {
            hideAllStories();
            $("#all-story_10").css('display', 'inline-block');
            $("#triangle_10").css('display', 'block');
        } else {
            $("#all-story_10").hide();
            $("#triangle_10").hide();
        }
    });
    $('#story_11').click(function (e) {
      if($("#all-story_11").css('display') =="none") {
            hideAllStories();
            $("#all-story_11").css('display', 'inline-block');
            $("#triangle_11").css('display', 'block');
        } else {
            $("#all-story_11").hide();
            $("#triangle_11").hide();
        }
    });
    $('#story_12').click(function (e) {
      if($("#all-story_12").css('display') =="none") {
            hideAllStories();
            $("#all-story_12").css('display', 'inline-block');
            $("#triangle_12").css('display', 'block');
        } else {
            $("#all-story_12").hide();
            $("#triangle_12").hide();
        }
    });
});

function hideAllStories() {
    $("#all-story_1").css('display', 'none');
    $("#all-story_2").css('display', 'none');
    $("#all-story_3").css('display', 'none');
    $("#all-story_4").css('display', 'none');
    $("#all-story_5").css('display', 'none');
    $("#all-story_6").css('display', 'none');
    $("#all-story_7").css('display', 'none');
    $("#all-story_8").css('display', 'none');
    $("#all-story_9").css('display', 'none');
    $("#all-story_10").css('display', 'none');
    $("#all-story_11").css('display', 'none');
    $("#all-story_12").css('display', 'none');
    
    $("#triangle_1").css('display', 'none');
    $("#triangle_2").css('display', 'none');
    $("#triangle_3").css('display', 'none');
    $("#triangle_4").css('display', 'none');
    $("#triangle_5").css('display', 'none');
    $("#triangle_6").css('display', 'none');
    $("#triangle_7").css('display', 'none');
    $("#triangle_8").css('display', 'none');
    $("#triangle_9").css('display', 'none');
    $("#triangle_10").css('display', 'none');
    $("#triangle_11").css('display', 'none');
    $("#triangle_12").css('display', 'none');
    
}



