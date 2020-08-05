/**
 * Define class
 * @typedef {Object} InstantSearchOptions object formulario query
 * @property {URL} search the url search will query results
 * @property {String} queryargs the query param for result
 * @property {Function} response the response consult for query 
 * @property {Function} templatefunction takes instant search result in HTML format
 */
class Search
{
    /**
     * Define class variable a instance classs construct method
     * @param {HTMLElement} search search input element
     * @param {InstantSearchOptions} options A list options for configuration
     */
    constructor(search, options)
    {
        this.options = options;
        this.elememts = {
            main : search,
            input : search.querySelector("#s"),
            content : document.createElement("div")
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
    listener() 
    {
        let delay;

        this.elememts.input.addEventListener("input", () => {
            clearTimeout(delay);
            const query = this.elememts.input.value;
            delay = setTimeout(() => {
                if (query.length < 3) {
                    this.results([]);
                    return;
                }
                this.preform(query).then(result => {
                    this.results(result);
                });
            }, 300);
        });

        this.elememts.input.addEventListener("focus", () => {
            this.elememts.content.classList.add("card");
            this.elememts.content.classList.add("my-3");
        });

        this.elememts.input.addEventListener("blur", () => {
            this.elememts.content.classList.remove("card");
            this.elememts.content.classList.remove("my-3");
        });
    }

    /**
     * Make a request at the search url
     * @param {String} query search query
     * @returns {Promise<Object[]>}
     */
    preform(query)
    {
        const url = new URL(this.options.search.toString());
        url.searchParams.set(this.options.queryargs, query);
        this.setLoading(true);
        return fetch(url, {
            method : "get"
        }).then(resp => {
            if ( resp.status !== 200 )
            {
                throw new Error("Someting went wrong with the search!");
            }
            return resp.json();
        }).then(data => {
            console.log(data);
            return this.options.response(data);
        }).catch(error => {
            console.error(error);
            return [];
        }).finally(result => {
            this.setLoading(false);
            return result;
        });
    }

    /**
     * Show or hides the loading indicator for searching bar 
     * 
     * @param {boolean} bool True will show the loading indicator
     */
    setLoading(bool)
    {
        this.elememts.main.classList.toggle("progress-bar.progress-bar-striped.progress-bar-animated");
    }

    /**
     * Update HTML to display each result
     * @param {Object[]} result 
     */
    results(result)
    {
        // Clear all existing results
        while ( this.elememts.content.firstChild )
        {
            this.elememts.content.removeChild(this.elememts.content.firstChild);
        }
        // Update or result list 
        for ( const res of result )
        {
            this.elememts.content.appendChild(this.createHTML(res));
        }
    }

    /**
     * Create HTML response object
     * @param {Object} object An instant search result
     * @returns {HTMLAnchorElement} 
     */
    createHTML(object)
    {
        const anchor = document.createElement("a");
        anchor.insertAdjacentHTML("afterbegin", this.options.templatefunction(object));

        // If provider, add a link for the result
        if ( "href" in object )
        {
            anchor.setAttribute("href", object.urlpost)
        }

        return anchor;
    }
}

export default Search;