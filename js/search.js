function searchInit() {
    let elements = document.getElementsByClassName('element');
    Array.prototype.forEach.call(elements, function (el) {
        let str = el.children[1].innerText;
        artistArray[str.toLowerCase().split(' ').join('')] = el;
    });
}

function searchArtist(text) {
    for (key in artistArray) {
        if(key.includes(text.toLowerCase().split(' ').join(''))){
            if(artistArray[key].style.display == 'none'){
                artistArray[key].style.display = 'inline-block';
            }
        }else{
            if(artistArray[key].style.display != 'none'){
                artistArray[key].style.display = 'none';
            }
        }
    }
}