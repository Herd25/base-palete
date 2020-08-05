"use strict";

/**
 * function animate scrollpath
 */
var progress = document.getElementById("progressbar");
var totalpath = document.body.scrollHeight - window.innerHeight; // up botton

var btnscroll = document.getElementById("btnup");

window.onscroll = function () {
  var progressHeigth = window.pageYOffset / totalpath * 100;
  progress.style.height = progressHeigth + "%";

  if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
    btnscroll.style.display = "block";

    btnscroll.onclick = function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
  } else {
    btnscroll.style.display = "none";
  }
}; // resize token


var pagecontent = document.getElementById("MediaContainer");
var page = document.getElementById('MediaPage');

var resize = function resize() {
  if (innerWidth < 730) {
    pagecontent.classList.remove("container");
    page.classList.remove("container-fluid");
  } else {
    pagecontent.classList.add("container");
    page.classList.add("container-fluid");
  }
}; // loader token


var loader = document.querySelector(".loader");

var change = function change() {
  loader.className += " hidden";
};

addEventListener('resize', resize);
addEventListener('DOMContentLoaded', resize);
addEventListener('load', change); // navbar action

var locationpage = location.href;
var link = document.querySelectorAll('a');
var navgroup = document.querySelectorAll(".nav-item"); //console.log(navgroup);

console.log(navgroup); // validation current location

for (var i; i < locationpage; i++) {
  if (link[i].href === locationpage) {
    console.log('yes');
  }
}