/**
 * @author seto
 */
var jQT = $.jQTouch({
     icon: 'kilo.png',
     statusBar: 'black'
});

$(document).ready(function(){
	if (typeof(PhoneGap) != 'undefined') {
		$('body > *').css({minHeight: '460px !important'});
	}
	$('#city1').val(localStorage.city1);
	$('#city2').val(localStorage.city2);
	$('#city3').val(localStorage.city3);
	$('#dstsettings #settingdone').click(saveSettings);
	$('#more #dstsettingspage').click(loadSettings);
	$('#home #refreshtime').click(initialize);
	$('#home #city1').change(initialize);
	$('#home #city2').change(initialize);
	$('#home #city3').change(initialize);
	initialize();
});

function saveSettings() {
	var cknadst = $('#nadst').is(':checked');
	localStorage.nadst = $('#nadst').is(':checked');
	localStorage.eudst = $('#eudst').is(':checked');
	localStorage.sadst = $('#sadst').is(':checked');
    jQT.goBack();
    return false;
}

function loadSettings() {
	var cknadst = localStorage.nadst;
	$('#nadst').attr('checked',false);
	$('#eudst').attr('checked',false);
	$('#sadst').attr('checked',false);
	if (localStorage.nadst == 'true')
		$('#nadst').attr('checked',true);
	if (localStorage.eudst == 'true')
		$('#eudst').attr('checked',true);
	if (localStorage.sadst == 'true')
		$('#sadst').attr('checked',true);
	cknadst = $('#nadst').is(':checked');
	cknadst = $('#eudst').is(':checked');
	cknadst = $('#sadst').is(':checked');
}

function saveLastCities() {
	localStorage.city1 = $('#city1 option:selected').val();
	localStorage.city2 = $('#city2 option:selected').val();
	localStorage.city3 = $('#city3 option:selected').val();
}

var gDST = "";

function worldClock(zone, region){
var dst = 0
if (dst==0) gDST="";
var time = new Date()
var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000)
var gmtTime = new Date(gmtMS)
var day = gmtTime.getDate()
var month = gmtTime.getMonth()
var year = gmtTime.getYear()
if(year < 1000){
year += 1900
}
var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", 
				"September", "October", "November", "December")
var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
if (year%4 == 0){
monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
}
if(year%100 == 0 && year%400 != 0){
monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
}

var hr = gmtTime.getHours() + zone
var min = gmtTime.getMinutes()
var sec = gmtTime.getSeconds()

if (hr >= 24){
hr = hr-24
day -= -1
}
if (hr < 0){
hr -= -24
day -= 1
}
if (hr < 10){
hr = " " + hr
}
if (min < 10){
min = "0" + min
}
if (sec < 10){
sec = "0" + sec
}
if (day <= 0){
if (month == 0){
	month = 11
	year -= 1
	}
	else{
	month = month -1
	}
day = monthDays[month]
}
if(day > monthDays[month]){
	day = 1
	if(month == 11){
	month = 0
	year -= -1
	}
	else{
	month -= -1
	}
}
if (region == "NAmerica"){
	if (localStorage.nadst == 'true') {
		dst = 1;
	}
}
if (region == "Europe"){
	if (localStorage.eudst == 'true') {
		dst = 1;
	}
}

if (region == "SAmerica"){
	if (localStorage.sadst == 'true') {
		dst = 1;
	}
}
if (region == "Cairo"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(3)
	startDST.setHours(0)
	startDST.setDate(30)
	var dayDST = startDST.getDay()
	if (dayDST < 5){
		startDST.setDate(28-dayDST)
		}
		else {
		startDST.setDate(35-dayDST)
		}
	endDST.setMonth(8)
	endDST.setHours(11)
	endDST.setDate(30)
	dayDST = endDST.getDay()
	if (dayDST < 4){
		endDST.setDate(27-dayDST)
		}
		else{
		endDST.setDate(34-dayDST)
		}
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST && currentTime < endDST){
		dst = 1
		}
}
if (region == "Israel"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(3)
	startDST.setHours(2)
	startDST.setDate(1)
	endDST.setMonth(8)
	endDST.setHours(2)
	endDST.setDate(25)
	dayDST = endDST.getDay()
	if (dayDST != 0){
	endDST.setDate(32-dayDST)
	}
	else{
	endDST.setDate(1)
	endDST.setMonth(9)
	}
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST && currentTime < endDST){
		dst = 1
		}
}
if (region == "Beirut"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(2)
	startDST.setHours(0)
	startDST.setDate(31)
	var dayDST = startDST.getDay()
	startDST.setDate(31-dayDST)
	endDST.setMonth(9)
	endDST.setHours(11)
	endDST.setDate(31)
	dayDST = endDST.getDay()
	endDST.setDate(30-dayDST)
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST && currentTime < endDST){
		dst = 1
		}
}
if (region == "Baghdad"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(3)
	startDST.setHours(3)
	startDST.setDate(1)
	endDST.setMonth(9)
	endDST.setHours(3)
	endDST.setDate(1)
	dayDST = endDST.getDay()
		var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST && currentTime < endDST){
		dst = 1
		}
}
if (region == "Australia"){
	var startDST = new Date()
	var endDST = new Date()
	startDST.setMonth(9)
	startDST.setHours(2)
	startDST.setDate(31)
	var dayDST = startDST.getDay()
	startDST.setDate(31-dayDST)
	endDST.setMonth(2)
	endDST.setHours(2)
	endDST.setDate(31)
	dayDST = endDST.getDay()
	endDST.setDate(31-dayDST)
	var currentTime = new Date()
	currentTime.setMonth(month)
	currentTime.setYear(year)
	currentTime.setDate(day)
	currentTime.setHours(hr)
	if(currentTime >= startDST || currentTime < endDST){
		dst = 1
		}
}


if (dst == 1){
	gDST = " DST";
	hr -= -1
	if (hr >= 24){
	hr = hr-24
	day -= -1
	}
	if (hr < 10){
	hr = " " + hr
	}
	if(day > monthDays[month]){
	day = 1
	if(month == 11){
	month = 0
	year -= -1
	}
	else{
	month -= -1
	}
	}
return hr;
}
else{
return hr;
}
}

var cityArray = new Array("GMT","Vancouver","SanFrancisco","Seattle","LosAngeles","Denver","MexicoCity","Houston","Minneapolis","NewOrleans","Chicago","HongKong","Beijing","Helsinki","London","Madrid","Barcelona");
var cityresultArray = new Array(11);
var cityDstArray = new Array(11);

function worldClockZone(){
cityresultArray[0] = worldClock(0, "Greenwich");
cityDstArray[0] = gDST;
cityresultArray[1] = worldClock(-8, "NAmerica");
cityDstArray[1] = gDST;
cityresultArray[2] = worldClock(-8, "NAmerica");
cityDstArray[2] = gDST;
cityresultArray[3] = worldClock(-8, "NAmerica");
cityDstArray[3] = gDST;
cityresultArray[4] = worldClock(-8, "NAmerica");
cityDstArray[4] = gDST;
cityresultArray[5] = worldClock(-7, "NAmerica");
cityDstArray[5] = gDST;
cityresultArray[6] = worldClock(-6, "NAmerica");
cityDstArray[6] = gDST;
cityresultArray[7] = worldClock(-6, "NAmerica");
cityDstArray[7] = gDST;
cityresultArray[8] = worldClock(-6, "NAmerica");
cityDstArray[8] = gDST;
cityresultArray[9] = worldClock(-6, "NAmerica");
cityDstArray[9] = gDST;
cityresultArray[10] = worldClock(-6, "NAmerica");
cityDstArray[10] = gDST;
cityresultArray[11] = worldClock(8, "HongKong");
cityDstArray[11] = gDST;
cityresultArray[12] = worldClock(8, "Beijing");
cityDstArray[12] = gDST;
cityresultArray[13] = worldClock(2, "Europe");
cityDstArray[13] = gDST;
cityresultArray[14] = worldClock(0, "Europe");
cityDstArray[14] = gDST;
cityresultArray[15] = worldClock(1, "Europe");
cityDstArray[15] = gDST;
cityresultArray[16] = worldClock(1, "Europe");
cityDstArray[16] = gDST;

}

function checkhr(hr){
	if (hr>=24)
		hr = hr-24;
	return hr;
}

function initialize(){
	$('body').append('<div id="progress">Loading...</div>');
	worldClockZone()
	var city1 = document.getElementById("city1").value;
	var city2 = document.getElementById("city2").value;
	var city3 = document.getElementById("city3").value;
	var city1hr = cityresultArray[city1];
	var city2hr = cityresultArray[city2];
	var city3hr = cityresultArray[city3];
	document.getElementById("city1title").innerHTML = cityArray[city1];
	document.getElementById("city2title").innerHTML = cityArray[city2];
	document.getElementById("city3title").innerHTML = cityArray[city3];

	document.getElementById("city11time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city12time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city13time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city21time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city22time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city23time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city31time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city32time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city33time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city41time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city42time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city43time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city51time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city52time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city53time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city61time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city62time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city63time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city71time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city72time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city73time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city81time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city82time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city83time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city91time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city92time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city93time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city101time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city102time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city103time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city111time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city112time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city113time").innerHTML = city3hr+":00"+cityDstArray[city3];
	city1hr = checkhr(++city1hr);
	city2hr = checkhr(++city2hr);
	city3hr = checkhr(++city3hr);
	document.getElementById("city121time").innerHTML = city1hr+":00"+cityDstArray[city1];
	document.getElementById("city122time").innerHTML = city2hr+":00"+cityDstArray[city2];
	document.getElementById("city123time").innerHTML = city3hr+":00"+cityDstArray[city3];
	saveLastCities();
	$('#progress').remove();
}
