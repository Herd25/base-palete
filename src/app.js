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
//let locationpage = location.href;
let link = document.querySelectorAll('.page_item a');
let icons = document.querySelectorAll('.page_item a i');

// validation current location

for (let index = 0; index < link.length; index++) {
    const element = link[index];
    console.log(element.innerText)
    if ( element.innerText == "Home" || element.innerText == "Inicio" )
    {
        icons[3].classList += " fa-home";
        console.log("yes is home text");
    }
    else if ( element.innerText == "About us" || element.innerText == "Acerca de" )
    {
        icons[0].classList += " fa-exclamation-circle";
        console.log("yes is about text");
    }
    else if ( element.innerText == "Contact" || element.innerText == "Contacto" )
    {
        icons[2].classList += " fa-envelope";
        console.log("yes is contact text");
    }
    else if ( element.innerText == "blog" || element.innerText == "Blog" )
    {
        icons[1].classList += " fa-copy";
        console.log("yes is blog text");
    }
    else
    {
        console.log("none");
    }
}

