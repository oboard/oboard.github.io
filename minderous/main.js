
var level = 6;
var index = 0;
var rem = [];
var lastT;

window.onload = function () {
    level = request("level");
    if (level == 0) level = 3;
    show();
}
function tip() {
    var text = document.getElementById("text");
    if (text.style.visibility.endsWith("visible")) {
        text.style.visibility = "collapse";
    } else {
        text.style.visibility = "visible";
    }
}

function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

function r() {
    var box1 = document.getElementById("box1");
    var box2 = document.getElementById("box2");
    box1.style.backgroundColor = "transparent";
    box2.style.backgroundColor = "transparent";

    var text = document.getElementById("text");
    text.textContent = rem.toString();
}

function a() {
    var box1 = document.getElementById("box1");
    var box2 = document.getElementById("box2");
    box1.style.backgroundColor = "red";
    lastT = setTimeout("r()", "300");
}

function b() {
    var box1 = document.getElementById("box1");
    var box2 = document.getElementById("box2");
    box2.style.backgroundColor = "red";
    lastT = setTimeout("r()", "300");
}
function aa() {
    var box1 = document.getElementById("box1");
    var box2 = document.getElementById("box2");
    if (rem[0] == 0) {
        box1.style.backgroundColor = "green";
        rem.splice(0, 1);
    } else {
        box1.style.backgroundColor = "red";
        fail();
    }
    check();
}

function bb() {
    var box1 = document.getElementById("box1");
    var box2 = document.getElementById("box2");
    if (rem[0] == 1) {
        box2.style.backgroundColor = "green";
        rem.splice(0, 1);
    } else {
        box2.style.backgroundColor = "red";
        fail();
    }
    check();
}

function fail() {
    clearTimeout(lastT);
    showToast("失败!");
    level--;
    setTimeout(function () {
        top.location = "index.html?level=" + level;
        reload();
    }, 2000);

    // show();
}

function check() {
    if (rem.length == 0) {
        clearTimeout(lastT);
        showToast("厉害!")

        setTimeout(function () {
            top.location = "index.html?level=" + level;
            reload();
        }, 2000);

        // setTimeout("show()", "300");
    }
}

function show() {
    rem = [];
    var i = 0;
    for (i = 0; i < level; i++) {
        var j = Math.round(Math.random());
        rem.push(j);
        lastT = setTimeout("r();", 600 * i);
        if (!j) {
            lastT = setTimeout("a();", 600 * (i + 0.5));
        } else {
            lastT = setTimeout("b();", 600 * (i + 0.5));
        }
    }
    level++;
}

// function next() {
//     // if (index == 0) {
//     //     rem = [];
//     // }
//     index++;
//     var text = document.getElementById("text");
//     text.textContent = index.toString();
//     if (index / 2 == (index / 2).toFixed()) {
//         r();
//     } else {
//         var i = Math.round(Math.random());
//         rem.push(i);
//         if (i) {
//             a();
//         } else {
//             b();
//         }
//     }
//     if (index > level) {
//         setTimeout("index = 0;", "300");

//         level++;
//         level++;
//     } else {
//         setTimeout("next()", "300");
//     }
// }


function showToast(text) {
    var x = document.getElementById("snackbar")
    x.textContent = text;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}