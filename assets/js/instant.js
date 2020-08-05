/**
 * @module instant search for wordpress module;
 * @import class
 * @author : Design&Programing
 */

import Search from "./Search.js";

const searchinput = document.querySelector("#searchform");
const results = new Search(searchinput, {
    search : new URL("./data-example.json", window.location.origin),
    queryargs : "s",
    response : (response) => { return response.results; },
    templatefunction : (result) => {
        return `
        <div class="card card-body font-weight-bold mb-2">
            <div class="row">
                <div class="col-lg-7">
                    <a href="${result.urlpost}">
                        <h2 class="text-center my-4">${result.title}</h2>
                    </a>
                </div>
                
                <div class="col-lg-5">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="/index.html"><i class='fas fa-home'></i> Home</a>
                            </li>
                            <li class="breadcrumb-item">
                                <a href="templates/archive.html"><i class="fas fa-sitemap"></i> Library</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <p><i class="fas fa-tags"></i> Data</p>
                            </li>
                        </ol>
                    </nav>
                </div>
                
                <!-- results container -->
                <div class="col-lg-12">
                    <div class="container-fluid">
                        <img src="${result.href}" alt="imagen" class="img-fluid mb-3">
                    </div>
                    <div class="container-fluid">
                        <p>${result.content}</p>
                    </div>
                </div>
            </div>
        </div>
        `
    }
});

console.log(results);