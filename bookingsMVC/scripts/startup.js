var myjson = [];
var mytable = [];


function getTheMessages(qstring, qcode) {
    sessionStorage['qdesc'] = "Name Like: " + qstring;
    sessionStorage['qstring'] = qstring;
    sessionStorage['qcode'] = qcode;
    window.location = "member/Letter";

}

function getTheTown() {
    var town = $('#myTown').val();
    sessionStorage['qdesc'] = "Town=: " + town;
    sessionStorage['qstring'] = town;
    sessionStorage['qcode'] = '3';
    getTheMessages(town, '3')
}
function getMessages() {
    $.getJSON('/Admin/bystring/' + sessionStorage['qstring'] + '/?qcode=' + sessionStorage['qcode'], function (messages) {
        var j = 1;
        $.each(messages, function (i) {
            $("#resultstable").append('<tr id="' + i + '" class="trow" onclick="fixColor()" onmouseover="setColor(this.id)">' +
                      '<td class="ids" id="z' + i + '">' + j + '</td>' +
                      '<td class="users" id="username' + i + '">' + messages[i].username + '</td>' +
                      '<td id="contact' + i + '">' + messages[i].fname + ' ' + messages[i].lname + '</td>' +
                      '<td id="memcat' + i + '">' + messages[i].memcat + '</td>' +
                      '<td id="mytown' + i + '">' + messages[i].town + '</td>' +
                     '</tr>');
            j++;
        });
        $("#username").val(messages[0].username);
        $("#fname").val(messages[0].fname);
        $("#lname").val(messages[0].lname);
        $("#address1").val(messages[0].address1);
        $("#address2").val(messages[0].address2);
        $("#town").val(messages[0].town);
        $("#postcode").val(messages[0].postcode);
        $("#phone").val(messages[0].phone);
        $("#email").val(messages[0].email);
        $("#memcat").val(messages[0].memcat);
        $("#rec").html("1");
        $("#tot").html(messages.length);
        myjson = messages;

    });

}
function cancelMe() {
    mytable = $('#resultstable').tableToJSON();
    alert(mytable[0].USERNAME); // checkout html5 custom data attributes

}
function showSome(rec, pos) {
    $("#rec").html(rec);
    $('#username').val(myjson[pos].username);
    $('#fname').val(myjson[pos].fname);
    $('#lname').val(myjson[pos].lname);
    $('#address1').val(myjson[pos].address1);
    $('#address2').val(myjson[pos].address2);
    $('#town').val(myjson[pos].town);
    $('#postcode').val(myjson[pos].postcode);
    $('#phone').val(myjson[pos].phone);
    $('#email').val(myjson[pos].email);
    $('#memcat').val(myjson[pos].memcat);
}
function setColor(id) {
    $(".trow").css("background-color", "#F4FAFF");
    $("#" + id).css("background-color", "#ACB699");
    showSome(parseInt(id) + 1, parseInt(id));
}
function fixColor() {
    if ($("#r0").attr("onmouseover") == "") {
        $(".trow").each(function (i) {
            $("#r" + i).attr("onmouseover", "setColor(this.id)");
        });
        $(".textEntry").attr("disabled", true);
    } else {
        $(".trow").attr("onmouseover", "");
        doEdits();
    }
}



function doEdits() {
    $(".textEntry").attr("disabled", false).keyup(function () {
        var pos = parseInt($('#rec').html() - 1);
        var idstring = $.trim(eval("myjson[pos]." + this.id));
        if ($.trim($(this).val()) == idstring) {
            $(this).css("color", "black");
            $(".textEntry").attr("disabled", true);
            fixColor();
        } else {
            $(this).css("color", "red");
        }
        getReds() ? $(".rbuttons").attr("disabled", false) : $(".rbuttons").attr("disabled", true);
    });
}


function getReds() {
    var reds = false;
    $(".textEntry").each(function (i) {
        if (this.style.color == "red") {
            reds = true;;
        }
    });
    return reds;
}
function updateMe() {
    confirm("Confirm Account Update For:\n\n" + $('#username').val()) ? doUpdate() : cancelMe();
}

function doUpdate() {
    var num = parseInt($("#rec").html()) - 1;
    $.ajax({
        type: 'Post',
        contentType: 'application/json',
        url: "Edit/" + $.trim($('#username').val()),
        dataType: "json",
        data: formToJSON(),
        success: function (themessage) {
            myjson[num].fname = themessage.fname;
            myjson[num].lname = themessage.lname;
            myjson[num].address1 = themessage.address1;
            myjson[num].address2 = themessage.address2;
            myjson[num].town = themessage.town;
            myjson[num].postcode = themessage.postcode;

            myjson[num].phone = themessage.phone;
            myjson[num].email = themessage.email;
            myjson[num].memcat = themessage.memcat;
            $("#contact" + (num)).html(themessage.fname + ' ' + themessage.lname);
            $("#mytown" + (num)).html(themessage.town);
            $("#memcat" + (num)).html(themessage.memcat);
            $('.textEntry').css("color", "black");
            $('.rbuttons').attr("disabled", true);

        },
        
        }

    

    );
    window.location = "/member/Letter";
}
function cancelMe() {
    var pos = parseInt($('#rec').html() - 1);
    $(".textEntry").css("color", "black");
    $('#username').val(myjson[pos].username);
    $('#fname').val(myjson[pos].fname);
    $('#lname').val(myjson[pos].lname);
    $('#address1').val(myjson[pos].address1);
    $('#town').val(myjson[pos].town);
    $('#postcode').val(myjson[pos].postcode);
    $('#phone').val(myjson[pos].phone);
    $('#email').val(myjson[pos].email);
    $('#memcat').val(myjson[pos].memcat);
    (myjson[pos].memcat == "Friend") ? $("#friend1").attr("checked", "true") : (myjson[pos].status == "Ordinary") ? $("#oridinary1").attr("checked", "true") : $("#suspended1").attr("checked", "true");
    $(".rbuttons").attr("disabled", true)
}
function formToJSON() {
    var num = parseInt($("#rec").html()) - 1;
    return JSON.stringify({
        "ID": myjson[num].ID,
        "username": $('#username').val(),
        "fname": $('#fname').val(),
        "lname": $('#lname').val(),
        "address1": $('#address1').val(),
        "address2": $('#address2').val(),
        "town": $('#town').val(),
        "postcode": $('#postcode').val(),
        "phone": $('#phone').val(),
        "email": $('#email').val(),
        "memcat": $('#memcat').val(),

    });
}

function radio(pos, value) {
    $("#memcat").val(value);
    if (($("#hits").is(':visible') == true)) {
        myjson[pos].status = value;
        if ($("#memcat").val() == [myjson[pos].ID].status) {
            $("#memcat").css("color", "black");
        } else {
            $("#memcat").css("color", "red");
        }
        $("#udbutton").unbind('click').click(updateMe);
        ifReds();
    }
}

function checkRadios(pos) {
    $("input[name=mymemcat][value=" + myjson[pos].memcat + "]").prop('checked', true);
    if ($("#memcat").val() == "deleted") {
        $(".delete").attr("title", "Reinstate this Member");
        $("#d1").html("Reinstate");
        $("#fs input").attr("checked", false);
        $("#fs span").css("color", "grey");
        $("#d1").css("color", "black");
        $("#username").css("color", "#F80000");
        $("#deleted1").unbind().on("click", "", reinstateMe);
        $(".textEntry").attr("disabled", true).css("color", "#F80000");
    } else {
        $(".delete").attr("title", "Delete this Member");
        $("#d1").html("Delete");
        $("#fs span").css("color", "black");
        $("#fs input").attr("disabled", false);
        $("#deleted1").unbind().on("click", "", deleted);
        $(".textEntry").attr("disabled", false).css("color", "black");
        $("#memcat").attr("disabled", true);
    }
}


function deleted(pos) {
    if ($("#memcat").val() != "deleted") {
        $("#memcat").val("deleted");
        if ($("#memcat").val() == myjson[pos].memcat) {
            $("#memcat").css("color", "black");
        } else {
            $("#memcat").css("color", "red");
        }
        $("#udbutton").unbind('click').click(deleteMe);
        $(".udbutton").attr("disabled", false);
    }
}

function deleteMe() {
    posArray = parseInt($('#rec').html() - 1);
    if (confirm("Confirm Account Delete For:\n\n" + $('#username').val())) {
        myjson[pos].originalmemcat = myjson[pos].memcat;
        $.ajax({
            type: "Post",
            url: "Delete/" + myjson[pos].ID,
        });
        dataobject.myjson[pos].memcat = 'deleted';
        checkRadios(pos);
        $("#d1").css("color", "black");
        $('#memcat' + myjson[pos].ID).html('deleted');
        $(".trow" + myjson[pos].ID).css("color", "#F80000");
        $(".udbutton").attr("disabled", false);
        $(".mfd").show();
        members[myjson[pos].ID] = clone(myjson[pos]);
        if ($("#deletion").html() == "") {
            $("#deletion").html("1");
            window.onbeforeunload = function () {
                return "Warning! " + $("#deletion").html() + " record(s) is marked for deletion!";
            };
        }
        else
            $("#deletion").html(parseInt($("#deletion").html()) + 1);
    } else
        cancel(pos);
}


function getReds() {
    var reds = false;
    $(".textEntry").each(function (i) {
        if (this.style.color == "red")
            reds = true;
    });
    return reds;
}

function ifReds() {
    if (getReds())
        $(".rbuttons").attr("disabled", false);
    else
        $(".rbuttons").attr("disabled", true);
}

