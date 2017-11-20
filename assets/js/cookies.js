function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$( document ).ready(function() {
    var cData = getCookie("chekov");
    var i=1;
    var habits=[];
    var cname;
    if (cData==""){
        cData = {
            sDate:Date.now(),
            hCount:2,
            h1:'r',
            h2:'a'
        }
        setCookie('chekov',JSON.stringify(cData),365);
        console.log("WELCOME NEWB");
    }
    h1data={
        n:'run',  //name
        s:'r',  //shortcode
        f:'d',  //frequency
        g:1,  //make vs break
        p:1,  //# per period
        a:1                 //active  
    }
    h2data={
        n:'abs',  //name
        s:'a',  //shortcode
        f:'d',  //frequency
        g:1,  //make vs break
        p:1,  //# per period
        a:1                 //active  
    }
    setCookie('h1',JSON.stringify(h1data),365);
    setCookie('h2',JSON.stringify(h2data),365);
    // console.log("WELCOME NEWB");
    console.log("pre"+cData);
    cData=JSON.stringify(cData);
    console.log("post"+cData);
    cDataParsed=JSON.parse(cData);
    console.log("parsed"+cDataParsed);
    //var hCount = Object.keys(cDataParsed).length-1;
    console.log(cDataParsed.hCount);

    while(i<=cDataParsed.hCount){
        cname='h'+i;
        console.log(cname);
        habits[i]=JSON.parse(getCookie(cname));
        drawHabitButtons(habits[i]);
        console.log(habits[i]);
        i++;
    }
    console.log(habits);

    function drawHabitButtons(habit){
        $("#habitButtons").append("<div><h3>"+habit.s+"</h3></div>");
    }

    $("#newHabit").submit(function( event ) {
        var fields = $( ":input" ).serializeArray();
        var fieldvals = {
        n:fields[0].value,  //name
        s:fields[1].value,  //shortcode
        f:fields[2].value,  //frequency
        g:fields[3].value,  //make vs break
        p:fields[4].value,  //# per period
        a:1                 //active
    }
    fieldJSON=JSON.stringify(fieldvals);
    console.log(fieldJSON);
    newCName='h'+(cDataParsed.hCount+1);
    setCookie(newCName, JSON.stringify(fieldvals), 365);
    // newCData=JSON.stringify(fieldvals)+
    // setCookie('cData', ,365);
    $('#newHabitModal').modal('toggle');
    location.reload();
    event.preventDefault();
});

});

function getCookieIndex(){}

$('#newCookieBtn').on('click', function() {
    setCookie('NewHabit1111', 'TEST', 30);
    console.log("YAY");
});
function checkStatus(modNumber, numReqReading) {
    var cookieName = 'clicklogmod' + modNumber;
    let clicked = getCookie(cookieName);
    if (clicked) {
        clicked = JSON.parse(clicked);
        if (Object.keys(clicked).length == numReqReading) {
            $('#launchModule' + modNumber).removeClass('disabled');
        }
        if (clicked[1]) {
            $("#m" + modNumber + "r1Thumb").attr('src', 'newFiles/images/completeModule.png');
            $("#m" + modNumber + "r1Thumb").css('opacity', '1');
            $("#m" + modNumber + "r1Thumb").siblings('.imgOverlay').remove();
        }
        if (clicked[2]) {
            $("#m" + modNumber + "r2Thumb").attr('src', 'newFiles/images/completeModule.png');
            $("#m" + modNumber + "r2Thumb").css('opacity', '1');
            $("#m" + modNumber + "r2Thumb").siblings('.imgOverlay').remove();
        }
        if (clicked[3]) {
            $("#m" + modNumber + "r3Thumb").attr('src', 'newFiles/images/completeModule.png');
            $("#m" + modNumber + "r3Thumb").css('opacity', '1');
            $("#m" + modNumber + "r3Thumb").siblings('.imgOverlay').remove();
        }
        if (clicked[4]) {
            $("#m" + modNumber + "r4Thumb").attr('src', 'newFiles/images/completeModule.png');
            $("#m" + modNumber + "r4Thumb").css('opacity', '1');
            $("#m" + modNumber + "r4Thumb").siblings('.imgOverlay').remove();
        }
        if (clicked[5]) {
            $("#m" + modNumber + "r5Thumb").attr('src', 'newFiles/images/completeModule.png');
            $("#m" + modNumber + "r5Thumb").css('opacity', '1');
            $("#m" + modNumber + "r5Thumb").siblings('.imgOverlay').remove();
        }
        if (clicked[6]) {
            $("#m" + modNumber + "r6Thumb").attr('src', 'newFiles/images/completeModule.png');
            $("#m" + modNumber + "r6Thumb").css('opacity', '1');
            $("#m" + modNumber + "r6Thumb").siblings('.imgOverlay').remove();
        }
    }
    let clicked2 = getCookie('clicklog');
    if (clicked2) {
        clicked2 = JSON.parse(clicked2);
        if (Object.keys(clicked2).length >= modNumber) {
            modStatus[modNumber - 1] = 2;
        }
    }
}
var modStatus = [0, 0, 0, 0];
$('a.reading-link.module1').on('click', function() {
    let clicked = getCookie('clicklogmod1');
    if (!clicked) {
        clicked = {};
    } else {
        clicked = JSON.parse(clicked);
    }
    let reading = parseInt($(this).data('reading'));
    clicked[reading] = true;
    setCookie('clicklogmod1', JSON.stringify(clicked), 30);
    console.log(clicked);
});
$('a.reading-link.module2').on('click', function() {
    let clicked = getCookie('clicklogmod2');
    if (!clicked) {
        clicked = {};
    } else {
        clicked = JSON.parse(clicked);
    }
    let reading = parseInt($(this).data('reading'));
    clicked[reading] = true;
    setCookie('clicklogmod2', JSON.stringify(clicked), 30);
    console.log(clicked);
});
$('a.reading-link.module3').on('click', function() {
    let clicked = getCookie('clicklogmod3');
    if (!clicked) {
        clicked = {};
    } else {
        clicked = JSON.parse(clicked);
    }
    let reading = parseInt($(this).data('reading'));
    clicked[reading] = true;
    setCookie('clicklogmod3', JSON.stringify(clicked), 30);
    console.log(clicked);
});
$('a.reading-link.module4').on('click', function() {
    let clicked = getCookie('clicklogmod4');
    if (!clicked) {
        clicked = {};
    } else {
        clicked = JSON.parse(clicked);
    }
    let reading = parseInt($(this).data('reading'));
    clicked[reading] = true;
    setCookie('clicklogmod4', JSON.stringify(clicked), 30);
    console.log(clicked);
});
$('a.module-link').on('click', function(e) {
    let clicked = getCookie('clicklog');
    if (!clicked) {
        clicked = {};
    } else {
        clicked = JSON.parse(clicked);
    }
    let module = parseInt($(this).data('module'));
    clicked[module] = true;
    console.log(clicked);
    setCookie('clicklog', JSON.stringify(clicked), 30);
});
$(document).ready(function() {
    statusUpdate();
    $(document).click(statusUpdate);
    $('.reading-link').click(modThumbUpdate);
    $("#modal1button").click(function() {
        $("#module1Modal").css("display", "block");
        $("body").addClass("stop-scrolling");
    });
    $("#modal2button").click(function() {
        $("#module2Modal").css("display", "block");
        $("body").addClass("stop-scrolling");
    });
    $("#modal3button").click(function() {
        $("#module3Modal").css("display", "block");
        $("body").addClass("stop-scrolling");
    });
    $("#modal4button").click(function() {
        $("#module4Modal").css("display", "block");
        $("body").addClass("stop-scrolling");
    });
    $(".close").click(function() {
        $(this).parents("div.modal").css("display", "none");
        $("body").removeClass("stop-scrolling");
    });
    function modThumbUpdate() {
        $("#" + this.id + "Thumb").attr('src', 'newFiles/images/completeModule.png');
        $("#" + this.id + "Thumb").css('opacity', '1');
        $("#" + this.id + "Thumb").siblings('.imgOverlay').remove();
    }
});
function modStatusUpdate() {
    if (modStatus[0] != 2) {
        $('#module2Block').addClass('module-locked');
        $('#module2Block>.locked-image').css("display", "inline-block");
    } else if (modStatus[0] == 2) {
        $('#mod1-stat').empty();
        $('#mod1-stat').html('<i class="fa fa-check-circle fa-lg"></i>Module Complete');
        $('#mod1-stat').addClass('module-complete');
        $('#module2Block').removeClass('module-locked');
        $('#module2Block > div.locked-image').remove();
    }
    if (modStatus[1] != 2) {
        $('#module3Block').addClass('module-locked');
        $('#module3Block>.locked-image').css("display", "inline-block");
    } else if (modStatus[1] == 2) {
        $('#mod2-stat').empty();
        $('#mod2-stat').html('<i class="fa fa-check-circle fa-lg"></i>Module Complete');
        $('#mod2-stat').addClass('module-complete');
        $('#module3Block').removeClass('module-locked');
        $('#module3Block > div.locked-image').remove();
    }
    if (modStatus[2] != 2) {
        $('#module4Block').addClass('module-locked');
        $('#module4Block>.locked-image').css("display", "inline-block");
    } else if (modStatus[2] == 2) {
        $('#mod3-stat').empty();
        $('#mod3-stat').html('<i class="fa fa-check-circle fa-lg"></i>Module Complete');
        $('#mod3-stat').addClass('module-complete');
        $('#module4Block').removeClass('module-locked');
        $('#module4Block > div.locked-image').remove();
    }
    if (modStatus[3] == 2) {
        $('#mod4-stat').empty();
        $('#mod4-stat').html('<i class="fa fa-check-circle fa-lg"></i>Module Complete');
        $('#mod4-stat').addClass('module-complete');
        $('#takeQuiz > div').addClass('active');
    }
}
function statusUpdate() {
    checkStatus(1, 3);
    checkStatus(2, 6);
    checkStatus(3, 1);
    checkStatus(4, 3);
    modStatusUpdate();
}
