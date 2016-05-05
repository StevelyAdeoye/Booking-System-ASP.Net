
function over(id) {
    $("#" + id).attr('src', 'images/mine.gif');
}
function load1() {
    var session3 = sessionStorage.getItem("memcat")
    var session4 = sessionStorage.getItem("user")
  //  $('#salutation').html($('#username').val() + "'s Tickets<br><span id='userCat'>" + session4 + "</span>");
    if (session3 == "Premier") {
        // check the user type and return the price
        $("h3#price").text("All Tickets £29.75");
    }
    if (session3 == "friend") {
        $('.member').fadeIn("slow");
        $('#salutation').html( session4 + "'s Tickets<br><span id='userCat'>" + session3 + "</span>");
        // check the user type and return the price
        $("h3#price").text("All Tickets £31.50");
    }
    if (session3 == "Ordinary") { // check the user type and return the price
        $("h3#price").text("All Tickets £35.00");
    }
    if (session3 == "administrator") { // check the user type and return the price
        $("h3#price").text("All Tickets £00.00");
    }
}

function sold(id) {
    if ($("#" + id).attr('onmouseover') == "") {
        $("#" + id).attr('src', 'images/available.gif').attr('onmouseover', 'over(id)').attr('onmouseout', 'out(id)');
        $("#" + id).removeClass('sold');
        $("#" + id).draggable({
            cursor: 'move',
            helper: myHelper
        });

    } else {
        $("#" + id).addClass('sold');
        $("#" + id).attr('src', 'images/mine.gif').attr('onmouseover', "").attr('onmouseout', "").removeClass('available').attr('onclick', "");
        $("#" + id).draggable({ cancel: ".sold" });
        $("#mybillets").append('<span onclick=delClick(this.id) id="s' + id + '">' + id + ' </span>');
        $("#" + id).draggable({
            cursor: 'move',
            helper: myDelHelper
        });
        var session3 = sessionStorage.getItem("memcat")
        if (session3 == "friend") { // check the user type and return the price
            var totalcost = $('.sold').length * 31.50;
        }
        else if (session3 == "Premier") { // check the user type and return the price
            var totalcost = $('.sold').length * 29.75;
        }
        else if (session3 == "Ordinary") { // check the user type and return the price
            var totalcost = $('.sold').length * 35.00;
        }
        else if (session3 == "administrator") { // check the user type and return the price
            var totalcost = $('.sold').length * 00;
        }
        else var totalcost = $('.sold').length * 35.00;
        $("#cbutton").css("display", "block");
        $("#tickets").html("");
        $("#tickets").append('<br /><h3>The Total Cost is: &pound;' + totalcost + '</h3>');
        if (sessionStorage['tickets']) {
            sessionStorage['tickets'] += id + " ";
        } else {
            sessionStorage['tickets'] = id + " ";
        }
    }
}

function delClick(id) {
    var myId = id.substr(1);
    $('#' + myId).removeClass('sold').addClass("available").attr('src', 'images/available.gif')
	    .attr('onclick', 'sold("' + myId + '")').attr('onmouseover', 'over("' + myId + '")').attr('onmouseout', 'out("' + myId + '")');
    $("#" + id).remove();
    sessionStorage['tickets'] = "";
    $("#mybillets span").each(function (i) {
        sessionStorage['tickets'] += $(this).html();
    });
    
   var session3 = sessionStorage.getItem("memcat")
        if (session3 == "friend") { // check the user type and return the price
            var totalcost = $('.sold').length * 31.50;
        }
        else if (session3 == "Premier") { // check the user type and return the price
            var totalcost = $('.sold').length * 29.75;
        }
        else if (session3 == "Ordinary") { // check the user type and return the price
            var totalcost = $('.sold').length * 35.00;
        }
        else if (session3 == " administrator") { // check the user type and return the price
            var totalcost = $('.sold').length * 00;
        }
       
        else var totalcost = $('.sold').length * 35.00;
    $("#tickets").html("");
    $("#tickets").append('<br /><h3>The Total Cost is: &pound;' + totalcost + '</h3>');
    if ($('.sold').length == 0) {
        $("#tickets").html("");
        $("#cbutton").css('display', 'none');
    }
}
function out(id) {
    $("#" + id).attr('src', 'images/available.gif');
}

function myDelHelper(event) {
    return '<img id="draggableHelper" src="images/mine.gif" />';
}




function deleteMe(id) {
    var myId = id.substr(1);
    $('#' + myId).removeClass('sold').addClass("available").attr('src', 'images/available.gif')
	    .attr('onclick', 'sold("' + myId + '")').attr('onmouseover', 'over("' + myId + '")').attr('onmouseout', 'out("' + myId + '")');
    $('#' + myId).draggable({
        cursor: 'move',
        helper: myDelHelper
    });
    $("#" + id).remove();
    sessionStorage['tickets'] = "";
    $("#mybillets span").each(function (i) {
        sessionStorage['tickets'] += $(this).html();
    });
    var totalcost = $('.sold').length * 35 + '.00';
    $("#tickets").html("");
    $("#tickets").append('<br /><h3>The Total Cost is: &pound;' + totalcost + '</h3>');
    if ($('.sold').length == 0) {
        $("#tickets").html("");
        $("#cbutton").css('display', 'none');
    }
}

function showLogForm() {
    $('#logform').fadeIn(2000);
}

function checkSeats() {
    $.ajax({
        url: "seats/getseats",
        dataType: "JSON",
        type: "GET",
        success: function (taken) {
            for (var i = 0; i < taken.length; i++) {
                $("#" + taken[i].seatnum).attr('src', '../../images/taken.gif').attr('onmouseover', "").attr('onmouseout', "")
                    .attr('onclick', "").removeClass("available");
            }
        }
    });
}

function cancel() {
    if (!sessionStorage['tickets']) { alert('There is nothing seat to cancel'); }
    else {
        sessionStorage.removeItem('tickets');
        window.location = '/';
    }
}


function confirm() {
    if (!sessionStorage['user']) {
        alert('You Must First Sign In or Register!');
    } else if (!sessionStorage['tickets']) { alert('The Basket is empty, Add a seat to the Basket'); }

    else {

        $.ajax({
            type: "get",
            url: "seats/checkout",
            data: { "tickets": $.trim(sessionStorage['tickets']) },
            success: function (data) {
                window.location.href = '/Home/Thanx';
            }
        });
    }
}

function amountOfSeats() {
    var ret = 0;
    $("img.seat.mine").each(function () {
        ret++;
    });
    return ret;
}

function loguserIn() {

    $.ajax({
        type: "GET",
        dataType: 'json',
        url: "member/logUserIn?username=" + $("#username").val() + "&password=" + $("#password").val(),
        success: function (user) {
             

                $('.anonymous').fadeOut("slow", function () {
                    $('.member').fadeIn("slow");
                    sessionStorage.setItem("user", user[0].username);
                    sessionStorage.setItem("memcat", user[0].memcat);
                    sessionStorage.setItem("fname", user[0].fname);
                    sessionStorage.setItem("lname", user[0].lname);
                    var session1 = sessionStorage.getItem("user")
                    var session2 = sessionStorage.getItem("memcat")
               
                    $('#salutation').html($('#username').val() + "'s Tickets<br><span id='userCat'>" + session2 + "</span>");
                    if (session2 == "Premier") { // check the user type and return the price
                        $("h3#price").text("All Tickets £29.75");
                    }
                    if (session2 == "friend") { // check the user type and return the price
                        $("h3#price").text("All Tickets £31.50");
                    }
                    if (session2 == "Ordinary") { // check the user type and return the price
                        $("h3#price").text("All Tickets £35.00");
                    }
                    if (session2 == "administrator") { // check the user type and return the price
                        $("h3#price").text("All Tickets £00.00");
                    }
                    $('#logform').fadeOut("slow");

                }
            );;
            }

        });
}

function logMeOut()
{
                   sessionStorage.clear()
                    window.location="/";
                
}

Array.prototype.naturalSort = function () {
    var a, b, a1, b1, rx = /(\d+)|(\D+)/g, rd = /\d+/;
    return this.sort(function (as, bs) {
        a = String(as).toLowerCase().match(rx);
        b = String(bs).toLowerCase().match(rx);
        while (a.length && b.length) {
            a1 = a.shift();
            b1 = b.shift();
            if (rd.test(a1) || rd.test(b1)) {
                if (!rd.test(a1)) return 1;
                if (!rd.test(b1)) return -1;
                if (a1 != b1) return a1 - b1;
            }
            else if (a1 != b1) return a1 > b1 ? 1 : -1;
        }
        return a.length - b.length;
    });
}

var sorted = $.makeArray($('#myTickets')).sort(function (a, b) {
    return ($(a).text() < $(b).text()) ? -1 : 1;
});

function cancelBooking() {
    $.ajax({
        type: "get",
        url: "seats/cancelBookings",
        data: { "tickets": $.trim(sessionStorage['tickets']) },
        success: function (result) {
            alert(result.message);
            window.location = "/Home/Index";
        }
    });
}

function openadmin() {
    var session5 = sessionStorage.getItem("memcat")
    if (session5 !== "administrator") {
        alert(" Please Log In as An Adminstrator ");
    }
    else if (session5 == "administrator") {
            window.location.href = '~/Admin/Index';
        }
}

function seatIds() {

    var ids = ["A", "B", "C", "D", "E", "F", "G"];

    $('#mytable tr').each(function (x) {

        $(this).attr("id", ids[x]);

    });

    $('tr').each(function (y) {
        i = 0;
        $(this).find("img").each(function (i) {
            i = i + 1;

            $(this).attr("id", ids[y] + i);

        });
    });
}



function hid() {
    
    $('.anonymous').hide();
        $('.member').show();

}

function hidlog() {
    if (sessionStorage.length !== 0) {
        $('.anonymous').hide();
        $('.member').show();

    }
}
    
    



























































/*
    //Function To Log User in 
function logUserIn(){  
 var poststr = $("#logform").serialize();
 $.ajax({
    type:"POST",
    url: "php/login",
    data: poststr,
    dataType: 'JSON',
    success: function(str){
    if (str == 0){
        alert("Wrong login Details")
        $('#username').focus();
}
else{
    alert(" Welcome back "+$('#username').val());  
        $('.anonymous').fadeOut("slow", function(){
            $('.member').fadeIn("slow");
            $('#logform').fadeOut("slow");
});
          $('#salutation').html(str.user+"'s Tickets<br><span id='userCat'>"+str.memcat+"</span>");
        if (str.memcat == "Premier"){ // check the user type and return the price
          $("h3#price").text("All Tickets ?29.75");
}
        if (str.memcat == "Friend"){ // check the user type and return the price
          $("h3#price").text("All Tickets ?31.50");
}
        calculateTotal();
}
}
}); 
}
    //Function to log user Out 
    function logUserOut(){
        $.ajax({
            url: "php/logout",
            success: function(status){
                if (status == 1){
                    $('#salutation').html("My Tickets");
                    $('#userCat').html("");
                    $('.member').fadeOut("slow", function(){
                        $('.anonymous').fadeIn("slow");
                    });
                    cancelSeats(true);
                    sessionStorage.clear();
                    $("h3#price").text("All Tickets ?35.00");
                }
                else{ //aller the user if the user details are wrong 
                    alert("Logout failed");
                }
            }
        });
    }

function getUsers(){  //check if user is logged in already
    $.ajax({
        type: 'GET',
       
        dataType: 'JSON',
        success: function(data){
            if (data != 0){
                $('#salutation').html(data.user+"'s Tickets<br><span id='userCat'>"+data.memcat+"</span>");
                $('.anonymous').hide();
                $('.member').fadeIn("slow");
                if (data.memcat == "Premier"){ // check the user type and return the price
                    $("h3#price").text("All Tickets ?29.75");
                }
                else if (data.memcat == "Friend"){  // check the user type and return the price
                    $("h3#price").text("All Tickets ?31.50");
                }
                calculateTotal(); 
            }
        }
    });
}
// show the login form 
$('#showlogin').click(function(){
    $('#logform').fadeIn("slow");
    $('#username').focus();
});

//funtion to get all seats back from the database 
function checkSeats(){
    $.ajax({
        url: "php/getseatdetails",
        type: "GET",
        dataType: "JSON",
        success: function(seatDetails){
            $("img.seat").each(function(i){
                $(this).attr("title", seatDetails[i].seatnum) 
                if (seatDetails[i].status == 0){
                    $(this).removeClass("available");
                    $(this).addClass("taken");
                    $(this).attr("draggable","false");
                }else if(seatDetails[i].status == 1){
                    $(this).removeClass("taken");
                    $(this).addClass("available");
                    $(this).attr("draggable","true");
                    $(this).attr("ondragstart","event.dataTransfer.setData('text/plain', this.title)");
                }
            });
        }
    });
}


$(".seat").on("click", function(e){
    if (!$(this).hasClass("taken")){
        $(this).toggleClass("available mine");
        this.draggable = !this.draggable;
        addToBasket();
    }
    e.preventDefault();
});
// funtion to calculate the ticket price
function calculateTotal(){
    var total=0;
    if ($("#userCat").length != 0){
        if (amountOfSeats()>0){
            if ($("#userCat").text() == "Premier"){
                total=(35*amountOfSeats())*0.85;
            }
            else if ($("#userCat").text() == "Friend"){
                total=(35*amountOfSeats())*0.90;
            }
            else if ($("#userCat").text() == "Ordinary"){
                total=(35*amountOfSeats());
            }
            $("h3#totalprice").text("?"+total.toFixed(2));
        }
        else{
            $("h3#totalprice").text("No seats selected");
        }
    }
    else{
        $("h3#totalprice").text("?"+(35*amountOfSeats()).toFixed(2));
    }
}


function amountOfSeats(){
    var ret = 0;
    $("img.seat.mine").each(function(){
        ret++;
    });
    return ret;
}
//function to add seat to basket 
function addToBasket(){
    var cart = [];
    $("img.seat.mine").each(function(){
        var seat = $(this).attr("title");
        cart.push(seat);
    });
    $('#cart').html("");
    for (var item=0;item<cart.length;item++){
        if ((item)>0){
            $('#cart').append(', <span draggable="true" ondragstart="event.dataTransfer.setData('+"'text/plain'"+', this.id)" id="'+cart[item]+'" class="cartItem" onClick="remove(this)">'+cart[item]+'</span>');
        }
        else{
            $('#cart').append('<span draggable="true" ondragstart="event.dataTransfer.setData('+"'text/plain'"+', this.id)" id="'+cart[item]+'" class="cartItem" onClick="remove(this)">'+cart[item]+'</span>');
        }
    }
    calculateTotal();
}
//function to remove seat from basket 
function remove(element){
    var seat = $(element).attr("id");
    $("img.seat.mine").each(function(){
        if ($(this).attr("title") == seat){
            $(this).removeClass("mine");
            $(this).addClass("available");
            $(this).attr("draggable","true");
        }
    });
    element.remove();
    addToBasket();
}
// function to cancel seats
function cancelSeats(isLoggingOut){
    if (amountOfSeats()>0){
        $("img.seat.mine").each(function(){
            $(this).removeClass("mine");
            $(this).addClass("available");
            $(this).attr("draggable","true");
        });
        $('#cart').html("");
        $("h3#totalprice").text("No seats selected");
    }
    else{
        if (isLoggingOut != true){
            alert("No seats were selected!");
        }
    }
}
// funtion to checkout seats added into the basket
function checkout(){
    if (amountOfSeats() > 0){
        if($("#userCat").text().length > 0){
            var seats = $("#cart").text();
            var r = confirm("Confirm Seats");
            if (r){
                $.ajax({
                    url: "php/updateseats",
                    data: "seats="+$("#cart").text(),
                    type: "post",
                    success: function(success){
                        getSeats();
                        window.location = "thanks.html";
                    }
                });
            }
        }
        else{
            alert("Please log in before purchasing seats");
        }
    }
    else{
        alert("You didn't select any seats");
    }
}

// function to reset the database 
function reset(){
    var r = confirm();
    if (r == true){
        $.ajax({
            url: "php/reset",
            type: "DELETE",
            success: function(flag){
                if (flag.error){      
                    alert(flag.error);
                }
                else{
                    alert("Database reset.");
                    logUserOut();
                    getSeats();
                }
            }
        });
    }
}
// sort funtions
Array.prototype.naturalSort = function(){
    var a, b, a1, b1, rx=/(\d+)|(\D+)/g, rd=/\d+/;
    return this.sort(function(as, bs){
        a= String(as).toLowerCase().match(rx);
        b= String(bs).toLowerCase().match(rx);
        while(a.length && b.length){
            a1= a.shift();
            b1= b.shift();
            if(rd.test(a1) || rd.test(b1)){
                if(!rd.test(a1)) return 1;
                if(!rd.test(b1)) return -1;
                if(a1!= b1) return a1-b1;
            }
            else if(a1!= b1) return a1> b1? 1: -1;
        }
        return a.length- b.length;
    });
}

function populate(){
    $.ajax({
        url: "php/getuserdetails",
        type: "GET",
        dataType: "JSON",
        success: function(details){
            console.log(details);
            $('#name').html(details.user);
            var seats = details.seats;
            seats = seats.naturalSort();
            for (var seat in seats){
                if (seats.hasOwnProperty(seat))
                    $('#seats').append(" "+seats[seat]);
            }
        }
    });
}
// function to cancel the selected seats 
function cancelBooking(){
    $.ajax({
        url: "php/cancelbooking",
        dataType: "JSON",
        type: "GET",
        success: function(result){
            alert(result.message);
            window.location = "index.html";
        }
    });
}

function checkDrag(event){
    if (event.target.id == "left" || $.contains(document.getElementById("left"), event.target)){
        event.preventDefault();
    }
}
function dropSeat(event){
    event.preventDefault();
    var seat = event.dataTransfer.getData("text/plain");
  
    $('[title="'+seat+'"]').removeClass("available").addClass("mine").attr("draggable","false");
    addToBasket();
}

// funtion to drag seat away from the checkout basket
function Drag(event){
    if ($.contains(document.getElementById("body"),event.target) && (event.target.id != "left") && ($.contains(document.getElementById("left"), event.target) == false)){
        event.preventDefault();
    }
}
// funtion to drop seat into the checkout basket
function drop(event){
    if($.contains(document.getElementById("body"),event.target) && (event.target.id != "left") && ($.contains(document.getElementById("left"), event.target) == false)){ //check if in body and NOT left/child of left
        event.preventDefault();
        var removeID = event.dataTransfer.getData("text/plain");
        $('[title="'+removeID+'"]').removeClass("mine").addClass("available").attr("draggable","true");
        console.log(removeID);
        addToBasket();
    }
}
*/



