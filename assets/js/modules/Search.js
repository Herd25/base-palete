"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Define class
 * @typedef {Object} InstantSearchOptions object formulario query
 * @property {URL} search the url search will query results
 * @property {String} queryargs the query param for result
 * @property {Function} response the response consult for query 
 * @property {Function} templatefunction takes instant search result in HTML format
 */
var Search = /*#__PURE__*/function () {
  /**
   * Define class variable a instance classs construct method
   * @param {HTMLElement} search search input element
   * @param {InstantSearchOptions} options A list options for configuration
   */
  function Search(search, options) {
    _classCallCheck(this, Search);

    this.options = options;
    this.elememts = {
      main: search,
      input: search.querySelector("#s"),
      content: document.createElement("div")
    };
    this.elememts.content.classList.add("container");
    this.elememts.content.classList.add("container-fluid");
    this.elememts.content.classList.add("my-4");
    this.elememts.content.classList.add("p-4");
    this.elememts.main.appendChild(this.elememts.content);
    this.listener();
  }
  /**
   * Add event listener for elements
   */


  _createClass(Search, [{
    key: "listener",
    value: function listener() {
      var _this = this;

      var delay;
      this.elememts.input.addEventListener("input", function () {
        clearTimeout(delay);
        var query = _this.elememts.input.value;
        delay = setTimeout(function () {
          if (query.length < 3) {
            _this.results([]);

            return;
          }

          _this.preform(query).then(function (result) {
            _this.results(result);
          });
        }, 300);
      });
      this.elememts.input.addEventListener("focus", function () {
        _this.elememts.content.classList.add("card");

        _this.elememts.content.classList.add("my-3");
      });
      this.elememts.input.addEventListener("blur", function () {
        _this.elememts.content.classList.remove("card");

        _this.elememts.content.classList.remove("my-3");
      });
    }
    /**
     * Make a request at the search url
     * @param {String} query search query
     * @returns {Promise<Object[]>}
     */

  }, {
    key: "preform",
    value: function preform(query) {
      var _this2 = this;

      var url = new URL(this.options.search.toString());
      url.searchParams.set(this.options.queryargs, query);
      this.setLoading(true);
      return fetch(url, {
        method: "get"
      }).then(function (resp) {
        if (resp.status !== 200) {
          throw new Error("Someting went wrong with the search!");
        }

        return resp.json();
      }).then(function (data) {
        console.log(data);
        return _this2.options.response(data);
      })["catch"](function (error) {
        console.error(error);
        return [];
      })["finally"](function (result) {
        _this2.setLoading(false);

        return result;
      });
    }
    /**
     * Show or hides the loading indicator for searching bar 
     * 
     * @param {boolean} bool True will show the loading indicator
     */

  }, {
    key: "setLoading",
    value: function setLoading(bool) {
      this.elememts.main.classList.toggle("progress-bar.progress-bar-striped.progress-bar-animated");
    }
    /**
     * Update HTML to display each result
     * @param {Object[]} result 
     */

  }, {
    key: "results",
    value: function results(result) {
      // Clear all existing results
      while (this.elememts.content.firstChild) {
        this.elememts.content.removeChild(this.elememts.content.firstChild);
      } // Update or result list 


      var _iterator = _createForOfIteratorHelper(result),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var res = _step.value;
          this.elememts.content.appendChild(this.createHTML(res));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * Create HTML response object
     * @param {Object} object An instant search result
     * @returns {HTMLAnchorElement} 
     */

  }, {
    key: "createHTML",
    value: function createHTML(object) {
      var anchor = document.createElement("a");
      anchor.insertAdjacentHTML("afterbegin", this.options.templatefunction(object)); // If provider, add a link for the result

      if ("href" in object) {
        anchor.setAttribute("href", object.urlpost);
      }

      return anchor;
    }
  }]);

  return Search;
}();

var _default = Search;
exports["default"] = _default;