/**
 * MAIN JS FILE
 */

/**
 * Variables
 */
var listenSearchBar = function(event){
	searchArtist(event.target.value);
}

var artistArray = [];

/**
 * Functions to run to page loading
 */
document.addEventListener('DOMContentLoaded', function(){
	/**
	 * Initialization classes with special actions
	 */
	let specClasses = ['others', 'reset'];
	/**
	 * Loading of main commissions folder
	 */
	loadPictures('pictures', null);
	/**
	 * Filter buttons
	 */
	Array.prototype.forEach.call(document.getElementsByClassName('buttons-reverse')[0].children, function(filter){
		filter.addEventListener('click', function(el){
			searchInit();
			if(!specClasses.includes(el.target.classList[0])){
				filterWebsite(el.target.classList[0])
			}else{
				if(el.target.classList[0]=='others'){
					showOthers();
				}else{
					showElements('element');
				}
			}
		});
	});
	/**
	 * Search bar
	 */
	document.getElementsByClassName('searchbar')[0].addEventListener('input', listenSearchBar, false);
});

/**
 * Method to get the tooltip the show to user
 * @param {string} type Type of contact to have with artist
 */
function getInstructions(type){
	let instructions = "";
	/**
	 * Case of type, different instruction for each type of contact
	 */
	switch(type){
		/**
		 * Case of request : automatic system exist. You have to fill boxes with description, and references if needed.
		 * Check options too if needed
		 */
		case "request":
		instructions = "Automatic system to request the artist. Be short, descriptive and bring some nice references.";
		break;
		/**
		 * Case of contact : Message the artist directly when you want. Be nice, be polite. Be patient also.
		 */
		case "contact":
		instructions = "Send the artist a direct message. They don't bite !";
		break;
		/**
		 * Case of announcement : Message the artist only when they announce they take commission. If they have a formatted message to ask a commission, be sure to ask it
		 */
		case "announcement":
		instructions = "You have to wait for the artist to post an announcement they take commission. And be fast then, because they have few slots to take";
		break;
	}
	return instructions;
}

/**
 * Method to open link in node
 * @param {DOM Node} node Node containing link to artist page
 */
function gotoLink(node){
	window.open(node.dataset.link) ;
}

/**
 * Method to put link in artist button node
 * @param {string} location Location of the commission explorer
 * @param {DOM Node} node Folder node containing the link to artist page
 */
function getWebsite(location, node){
	/**
	 * If location is not pictures, then artist button visible,
	 * else, explorer is on homepage, also button hidden and data unset
	 */
	if(location!="pictures"){
		document.getElementById('artist').parentElement.classList.remove('hidden');
		/**
		 * if node not null, then it contains data for artist button
		 */
		if(node != null){
			let array = node.href.split('/');
			array = array[2].split('.');
			document.getElementById('artist').dataset.link = node.href;
			document.getElementById('artist').classList.add(array[array.length-2]);
		}
	}else{
		document.getElementById('artist').classList = '';
		document.getElementById('artist').parentElement.classList.add('hidden');
		document.getElementById('artist').dataset.link = '';
	}
}