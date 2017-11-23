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

    // This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.net/how-to/javascript

// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
    - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function() {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}

function getDateNumber(){
    var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

dateString = Number(dateObj.getFullYear() + ('0' + (dateObj.getMonth()+1)).slice(-2) + ('0' + dateObj.getDate()).slice(-2));
return dateString;
}

cToday = getDateNumber();

var cData = getCookie("chekov");
var i=1;
var habits=[];
var cname;

    //checks if cookie exsists, if not creates it
    if (cData==""){
        cDataNew = {
            sDate:cToday,
            hCount:0, // set to 0 after testing
            // h1:'r', // remove after testing
            // h2:'a' // remove after testing
        }
        setCookie('chekov',JSON.stringify(cDataNew),365);
        cData = getCookie("chekov");
        console.log("WELCOME NEWB");

    //        // remove after testing
    //        h1data={
    //     n:'run',  //name
    //     s:'r',  //shortcode
    //     f:'y',  //frequency
    //     g:1,  //make vs break
    //     p:6,  //# per period
    //     a:1,                 //active 
    //     c:1511331301444, 
    //     d:[20171122,20171122,20171123,20171123] 
    // }
    // // remove after testing
    // h2data={
    //     n:'abs',  //name
    //     s:'a',  //shortcode
    //     f:'d',  //frequency
    //     g:1,  //make vs break
    //     p:1,  //# per period
    //     a:0,  //active
    //     c:1511331301444,   
    //     d:[20171122] 
    // }
    // setCookie('h1',JSON.stringify(h1data),365); // remove after testing
    // setCookie('h2',JSON.stringify(h2data),365); // remove after testing
}



cDataParsed=JSON.parse(cData);

while(i<=cDataParsed.hCount && cDataParsed.hCount>0){
    cname='h'+i;
    habits[i]=JSON.parse(getCookie(cname));
    if(habits[i].a){
        drawHabitButtons(habits[i].s, i);
        switch (habits[i].f) {
            case 'd':
            console.log("day");
            checkHabitGoalAchievedDay(habits[i], i);
            break; 
            case 'w':
            console.log("weekly");
            checkHabitGoalAchievedWeek(habits[i], i);
            break; 
            case 'm':
            console.log("monthly");
            checkHabitGoalAchievedMonth(habits[i], i);
            break;
            case 'y':
            console.log("yearly");
            checkHabitGoalAchievedYear(habits[i], i);
            break;  
        }
    }
    i++;
}
    //h1=JSON.parse(getCookie('h1')); ///remove after testing...maybe?
    function drawHabitButtons(habit, i){ 
        $("#habitButtons").append('<button type="button" class="btn btn-secondary btn-habit" id="h'+i+'">'+habit+'</button>');
    }

    //change button colour
    function checkHabitGoalAchievedDay(habit, i){
        var count;
        if(habit.ct){
            count=habit.ct;
        }
        else{
            count=0;
        }

        for(var x = 0; x < habit.d.length; ++x){
            if(habit.d[x] == cToday){
                count++;
                habit.ct=count;
            }
        }
        if(count>=habit.p){
            $('#h'+i).addClass("btn-success");
        }
        console.log("day Count: "+habit.ct);
    }

    function checkHabitGoalAchievedWeek(habit, i){
        var count;
        if(habit.ct){
            count=habit.ct;
        }
        else{
            count=0;
        }
        var curWeekNumber = convertDateToISOFormat(cToday).getWeek();
        for(var x = 0; x < habit.d.length; ++x){
            if(convertDateToISOFormat(habit.d[x]).getWeek() == curWeekNumber){
                count++;
                habit.ct=count;
            }
        }
        if(count>=habit.p){
            $('#h'+i).addClass("btn-success");
        }
        console.log("Weekly Count: "+habit.ct);
    }

    function checkHabitGoalAchievedMonth(habit, i){
        var count;
        if(habit.ct){
            count=habit.ct;
        }
        else{
            count=0;
        }
        var curMonthNumber = convertDateToISOFormat(cToday).getMonth();
        for(var x = 0; x < habit.d.length; ++x){
            if(convertDateToISOFormat(habit.d[x]).getMonth() == curMonthNumber){
                count++;
                habit.ct=count;
            }
        }
        if(count>=habit.p){
            $('#h'+i).addClass("btn-success");
        }
        console.log("Weekly Count: "+habit.ct);
    }

    function checkHabitGoalAchievedYear(habit, i){
        var count;
        if(habit.ct){
            count=habit.ct;
        }
        else{
            count=0;
        }
        var curYear = convertDateToISOFormat(cToday).getFullYear();
        for(var x = 0; x < habit.d.length; ++x){
            if(convertDateToISOFormat(habit.d[x]).getFullYear() == curYear){
                count++;
                habit.ct=count;
            }
        }
        if(count>=habit.p){
            $('#h'+i).addClass("btn-success");
        }
        console.log("Weekly Count: "+habit.ct);
    }


    function convertDateToISOFormat(dateNum){
        var  hDate = String(dateNum);
        hDate = [hDate.slice(0, 4), '-', hDate.slice(4,6), '-', hDate.slice(6)].join('');
        return new Date(hDate);
    }


    //function to create new habit cookies
    $("#newHabit").submit(function( event ) {
        var fields = $( ":input" ).serializeArray();
        var fieldvals = {
        n:fields[0].value,  //name
        s:fields[1].value,  //shortcode
        f:fields[2].value,  //frequency
        g:fields[3].value,  //make vs break
        p:fields[4].value,  //# per period
        a:1,                //active
        c:cToday,       //date created
        d:[]     }               

        cDataParsed.hCount+=1;
        newCName='h'+(cDataParsed.hCount);
        setCookie(newCName, JSON.stringify(fieldvals), 365); //creates new habit cookie
        cData=JSON.stringify(cDataParsed); //clean up next few lines to remove unness stringification
        cDataUpdate=cData.substring(0, cData.length - 1) + ',"' + newCName + '":"' + fieldvals.s + '"}';
        setCookie('chekov', cDataUpdate, 365); //updates primary index cookie
        $('#newHabitModal').modal('toggle');
        location.reload();
        event.preventDefault();
    });

    //function to update habit with new date data
    $(".btn-habit").click(function() { 
        hId = $(this).attr('id');
        hData = JSON.parse(getCookie(hId));
        hData.d.push(cToday);
        setCookie(hId, JSON.stringify(hData), 365);
        habit=JSON.parse(getCookie(hId));
      switch (habit.f) {
        case 'd':
        console.log("day");
        checkHabitGoalAchievedDay(habit, hId.substr(1));
        break; 
        case 'w':
        console.log("weekly");
        checkHabitGoalAchievedWeek(habit, hId.substr(1));
        break; 
        case 'm':
        console.log("monthly");
        checkHabitGoalAchievedMonth(habit, hId.substr(1));
        break;
        case 'y':
        console.log("yearly");
        checkHabitGoalAchievedYear(habit, hId.substr(1));
        break;  
    }
});

});




function getCookieIndex(){}

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
