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

/**
 * Function to add event listener after each xhr call
 */
XMLHttpRequest.prototype.open = function () {
    this.addEventListener('readystatechange', onStateChange);
    oldOpen.apply(this, arguments);
}

/**
 * Initialisation of event for search bar
 */
document.getElementsByClassName('searchbar')[0].addEventListener('input', function (event) {
    searchArtist(event.target.value);
}, false);