$(document).ready(function(){
    hideAllChairs();
    $('#chair-link-1').click(function (e) {
        if($("#chair-1").css('display') =="none") {
            hideAllChairs();
            $("#chair-1").css('display', 'block');
            $("#cheir-triangle-1").css('border-bottom', '0px');
            $("#cheir-triangle-1").css('border-top', '10px solid #d8b37e');      
        } else {
            $("#chair-1").hide();
            $("#cheir-triangle-1").css('border-bottom', '10px solid #d8b37e');
            $("#cheir-triangle-1").css('border-top', '0px');
        }
    });
});

function hideAllChairs() {
    $("#chair-1").css('display', 'none');
    $("#cheir-triangle-1").css('border-bottom', '10px solid #d8b37e');
    
    
}