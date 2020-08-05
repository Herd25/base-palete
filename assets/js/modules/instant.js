"use strict";

var _Search = _interopRequireDefault(require("./Search.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @module instant search for wordpress module;
 * @import class
 * @author : Design&Programing
 */
var searchinput = document.querySelector("#searchform");
var results = new _Search["default"](searchinput, {
  search: new URL("./data-example.json", window.location.origin),
  queryargs: "s",
  response: function response(_response) {
    return _response.results;
  },
  templatefunction: function templatefunction(result) {
    return "\n        <div class=\"card card-body font-weight-bold mb-2\">\n            <div class=\"row\">\n                <div class=\"col-lg-7\">\n                    <a href=\"".concat(result.urlpost, "\">\n                        <h2 class=\"text-center my-4\">").concat(result.title, "</h2>\n                    </a>\n                </div>\n                \n                <div class=\"col-lg-5\">\n                    <nav aria-label=\"breadcrumb\">\n                        <ol class=\"breadcrumb\">\n                            <li class=\"breadcrumb-item\">\n                                <a href=\"/index.html\"><i class='fas fa-home'></i> Home</a>\n                            </li>\n                            <li class=\"breadcrumb-item\">\n                                <a href=\"templates/archive.html\"><i class=\"fas fa-sitemap\"></i> Library</a>\n                            </li>\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">\n                                <p><i class=\"fas fa-tags\"></i> Data</p>\n                            </li>\n                        </ol>\n                    </nav>\n                </div>\n                \n                <!-- results container -->\n                <div class=\"col-lg-12\">\n                    <div class=\"container-fluid\">\n                        <img src=\"").concat(result.href, "\" alt=\"imagen\" class=\"img-fluid mb-3\">\n                    </div>\n                    <div class=\"container-fluid\">\n                        <p>").concat(result.content, "</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ");
  }
});