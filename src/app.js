/**
 * function animate scrollpath
 */

let progress = document.getElementById("progressbar");
let totalpath = document.body.scrollHeight - window.innerHeight;
// up botton
let btnscroll = document.getElementById("btnup");

window.onscroll = function() {
    let progressHeigth = (window.pageYOffset / totalpath) * 100;
    progress.style.height = progressHeigth + "%";
    if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) 
    {
        btnscroll.style.display = "block";
        btnscroll.onclick = function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    } else {
        btnscroll.style.display = "none";
    }
}

// resize token
let pagecontent = document.getElementById("MediaContainer");
let page = document.getElementById('MediaPage');

const resize = () => {
    if (innerWidth < 730)
    {
        pagecontent.classList.remove("container");
        page.classList.remove("container-fluid");
    } else {
        pagecontent.classList.add("container");
        page.classList.add("container-fluid");
    }
}

// loader token
let loader = document.querySelector(".loader");

const change = () => {
    loader.className += " hidden";
}

addEventListener('resize', resize);
addEventListener('DOMContentLoaded', resize);
addEventListener('load', change);


// navbar action
let locationpage = location.href;
let link = document.querySelectorAll('a');
let navgroup = document.querySelectorAll(".nav-item");

//console.log(navgroup);
console.log(navgroup);
// validation current location
for ( let i; i < locationpage; i++ ) 
{
    if ( link[i].href === locationpage ) 
    {
        console.log('yes')
    }
}
