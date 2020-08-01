/**
 * function animate scrollpath
 */

let progress = document.getElementById("progressbar");
let totalpath = document.body.scrollHeight - window.innerHeight;

window.onscroll = function() {
    let progressHeigth = (window.pageYOffset / totalpath) * 100;
    progress.style.height = progressHeigth + "%";
}