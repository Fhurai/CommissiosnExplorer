/**********************************************************
 * Variables
 **********************************************************/
/** @var array array of artists */
var artistArray = "";

/**********************************************************
 * Functions
 **********************************************************/

 /**
  * Modal creation function
  */
function createModal() {
    /**
     * Whole modal with black screen
     */
    let parent = document.createElement('div');
    parent.classList.add('modal');
    document.getElementsByTagName('body')[0].appendChild(parent);
    /**
     * Content of the modal
     */
    let content = document.createElement('div');
    content.classList.add('modal-content');
    parent.appendChild(content);
    /**
     * Header Modal
     */
    let header = document.createElement('div');
    header.classList.add('modal-header');
    content.appendChild(header);
    /**
     * Elements header
     */
    let span = document.createElement('span');
    span.classList.add('close');
    span.innerHTML = '&times;';
    header.appendChild(span);
    span.addEventListener('click', function () {
        parent.style.display = 'none';
    });
    let title = document.createElement('h2');
    title.innerText = 'Stats commissions explorer';
    header.appendChild(title);
    /**
     * Body Modal
     */
    let bodyM = document.createElement('div');
    bodyM.classList.add('modal-body');
    /**
     * Main stats go to a first container
     */
    let ms = document.createElement('div');
    ms.classList.add('main');
    bodyM.appendChild(ms);
    countArtworks(ms);
    let hr = document.createElement('hr');
    bodyM.appendChild(hr);
    content.appendChild(bodyM);
    countArtists(ms);
    return parent;
}

/**
 * Function shows the admin menu on click event
 * @param {Event} event 
 */
function showAdminMenu(event) {
    /**
     * Get all buttons in admin menu
     */
    let children = event.target.parentNode.children;
    /**
     * Toggle hidden class for all butttons
     */
    Array.prototype.forEach.call(children, function (el) {
        el.classList.toggle('hidden');
    });
}

/**
 * Function counting artist folders
 * @param {Node} node container where to place artists stats
 */
function countArtists(node) {
    /**
     * @var {XMLHttpRequest} xhr ajax call object
     */
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            /**
             * Parse the ajax response into array of artists
             */
            artistArray = JSON.parse(this.response);
            /**
             * Span for number of artist stat
             */
            let span = document.createElement('span');
            span.innerHTML = "Number of artists : <b>" + artistArray.length + "</b>";
            node.appendChild(span);
            /**
             * Container for artworks by artist stat
             */
            let stats = document.createElement('div');
            node.parentElement.appendChild(stats);
            /**
             * For each artist in array, creation of number of artwork by artist stat
             */
            Array.prototype.forEach.call(artistArray, function (ar) {
                statsByArtist(ar, stats);
            });
        }
    };
    xhr.open("POST", "./php/files.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("location=pictures");
}

/**
 * Function to create artwork stat
 * Stat is put into node
 * @param {Node} node 
 */
function countArtworks(node) {
    /**
     * @var {XMLHttpRequest} xhr ajax call object
     */
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            /**
             * Span for total artworks count
             */
            let span = document.createElement('span');
            span.innerHTML = "Number of artworks : <b>" + JSON.parse(this.response) + "</b>";
            node.appendChild(span);
        }
    };
    xhr.open("POST", "./php/artworksCount.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("location=pictures");
}

/**
 * FUnciton to create artwork by artist stat
 * @param {Array} artist artist informations
 * @param {Node} node node to put stat into
 */
function statsByArtist(artist, node) {
    /**
     * @var {XMLHttpRequest} xhr ajax call object
     */
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            /**
             * Span for stat
             */
            let span = document.createElement('span');
            span.innerHTML = "Artworks by " + artist[0] + " : <b>" + JSON.parse(this.response) + "</b>";
            node.appendChild(span);
        }
    };
    xhr.open("POST", "./php/artworksCount.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("location=pictures/" + artist[0]);
}

/**********************************************************
 * Execution in file loading
 **********************************************************/

document.addEventListener('DOMContentLoaded', function(){
    /**
     * Admin menu container
     */
    let d = document.createElement('div');
    d.classList.add('button-admin');
    document.body.appendChild(d);
    /**
     * Add show menu button
     */
    let show = document.createElement('span');
    show.innerText = "Admin";
    show.addEventListener('click', showAdminMenu);
    d.appendChild(show);
    /**
     * Add stats button
     */
    let stats = document.createElement('span');
    stats.innerText = "Stats";
    stats.classList.add("hidden");
    d.appendChild(stats);
    /**
     * Stats modal
     */
    let modal = createModal();
    stats.addEventListener('click', function () {
        modal.style.display = 'block';
    });
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    /**
     * Add hide menu button
     */
    let hide = document.createElement('span');
    hide.innerText = "Hide menu";
    hide.classList.add("hidden");
    hide.addEventListener('click', showAdminMenu);
    d.appendChild(hide);
});