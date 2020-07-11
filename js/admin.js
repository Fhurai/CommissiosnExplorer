var listArtists = "";

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
    countArtworks(bodyM);
    countArtists(bodyM);
    content.appendChild(bodyM);
    return parent;
}

function showAdminMenu(event) {
    let children = event.target.parentNode.children;
    Array.prototype.forEach.call(children, function (el) {
        el.classList.toggle('hidden');
    });
}

function countArtists(node) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            listArtists = JSON.parse(this.response);
            let span = document.createElement('span');
            span.id = 'statsArtists';
            span.innerHTML = "Number of artists : <b>" + listArtists.length + "</b>";
            node.appendChild(span);
            let stats = document.createElement('div');
            node.appendChild(stats);
            Array.prototype.forEach.call(listArtists, function (ar) {
                statsByArtist(ar, stats);
            });
        }
    };
    xhr.open("POST", "./php/files.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("location=pictures");
}

function countArtworks(node) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let span = document.createElement('span');
            span.innerHTML = "Number of artworks : <b>" + JSON.parse(this.response) + "</b>";
            node.appendChild(span);
        }
    };
    xhr.open("POST", "./php/artworksCount.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("location=pictures");
}

function statsByArtist(artist, node) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let span = document.createElement('span');
            span.innerHTML = "Artworks by " + artist[0] + " : <b>" + JSON.parse(this.response) + "</b>";
            node.appendChild(span);
        }
    };
    xhr.open("POST", "./php/artworksCount.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("location=pictures/" + artist[0]);
}

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