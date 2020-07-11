/**********************************************************
 * Variables
 **********************************************************/

/** @var Array Search artist array */
var artistArray = [];

/** @var function Old open function to keep */
var oldOpen = XMLHttpRequest.prototype.open;

/**********************************************************
 * Functions
 **********************************************************/

/**
 * Function to update array of artist to each call from xhr
 * @param {Event} event ReadyStateChange
 */
function onStateChange(event) {
    if (event.target.readyState == 4) {
        /**
         * Empty the search bar before reinitialisation of folders
         */
        if (document.getElementsByName('search').length > 0) {
            document.getElementsByName('search')[0].value = "";
        }
        /**
         * 
         */
        if (isNaN(event.target.response) && typeof event.target.response == 'string') {
            if (document.getElementById('location').innerText!=='pictures') {
                document.getElementsByClassName('searchBar')[0].classList.add('hidden');
            } else {
                document.getElementsByClassName('searchBar')[0].classList.remove('hidden');
                removeFilter();
            }
        }
        /**
         * Recuperation of all folders
         */
        let elements = document.getElementsByClassName('element');
        /**
         * For each folder, name is got and put in search artist array
         */
        Array.prototype.forEach.call(elements, function (el) {
            let str = el.children[1].innerText;
            artistArray[str.toLowerCase().split(' ').join('')] = el;
        });
    }
}

/**
 * Function to hide and show elements per the value of the search bar
 * @param {string} text The value searched for artist
 */
function searchArtist(text) {
    /**
     * For each artist in search artist array
     */
    for (key in artistArray) {
        /**
         * if value in search bar can be found in key, then the folder is shown
         * Else, the folder is hidden
         * (If folder is already in state it should be, no action is done)
         */
        if (key.includes(text.toLowerCase().split(' ').join(''))) {
            if (artistArray[key].style.display == 'none') {
                artistArray[key].style.display = 'inline-block';
            }
        } else {
            if (artistArray[key].style.display != 'none') {
                artistArray[key].style.display = 'none';
            }
        }
    }
}

/**********************************************************
 * Execution in file loading
 **********************************************************/

/**
 * Function to add event listener after each xhr call
 */
XMLHttpRequest.prototype.open = function () {
    this.addEventListener('readystatechange', onStateChange);
    oldOpen.apply(this, arguments);
}

/**
 * Function to create DOM nodes at the page loading
 * Addind the event on the nodes created
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Creation
     */
    let i = document.createElement('input');
    i.type = 'text';
    i.placeholder = 'Your artist search here...';
    /**
     * Initialisation of event for search bar
     */
    i.addEventListener('input', function (event) {
        searchArtist(event.target.value);
    }, false);
    /**
     * Creation of search bar container
     */
    let d = document.createElement('div');
    d.classList.add('searchbar');
    d.appendChild(i);
    /**
     * Adding the container in the page body
     */
    document.body.appendChild(d);
});