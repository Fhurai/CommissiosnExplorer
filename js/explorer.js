/**********************************************************
 * Variables
 **********************************************************/

/** @var {Node} ex Main container */
var ex;

/** @var {Node} ba Back button */
var ba;

/** @var {Node} ab Artist button */
var ab;

/**********************************************************
 * Functions
 **********************************************************/

/**
 * Method to load folders/pictures from location
 * @param {string} location Current location in the explorer
 * @param {DOM Node} node 
 */
function loadPictures(location, node){
	/**
	 * Creation of location container
	 */
	let d = document.createElement('div');
	d.innerText = location;
	d.id = 'location';
	d.classList.add('hidden');
	/**
	 * Artist button method
	 */
	getWebsite(location, node);
	/**
	 * Stop window loading
	 */
	window.stop();
	/**
	 * Set data for back button
	 */
	ba.setAttribute('onclick', 'loadPictures(getPreviousLocation(`'+location+'`))');
	/**
	 * Emptying commissions explorer
	 */
	ex.innerHTML = '';
	ex.appendChild(d);
	/**
	 * Ajax call preparation
	 */
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		/**
		 * If ajax call success, management of response
		 */
		manageResponse(this, location);
	};
	xhr.open("POST", "./php/files.php",true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("location="+location);
}

/**
 * Method to manage json file got from ajax call
 * @param {*} response Response at ajax call
 * @param {string} location Current location for the commission explorer
 */
function manageResponse(response, location){
	/**
	 * If ajax call is successful and response if available
	 */
	if (response.readyState == 4 && response.status == 200) {
		/**
		 * Parsing into array from json response,
		 * Call to createElement method for each file in array
		 */
		let files = JSON.parse(response.response);
		for(const property in files){
			createElement(files[property], location);
		}
	}
}

/**
 * Method to create DOM <div> Node from data 
 * @param {array} fields Data to create the node
 * @param {string} location Current location for the commission explorer
 */
function createElement(fields, location){
	/**
	 * Initialization of variables
	 */
	let div = document.createElement('div');
	let link = location+'/'+fields[0];
	let picClass = 'display';
	/**
	 * Initialization of website variable if location is main commissions folder
	 */
	let website = null;
	if(location=='pictures'){
		website = 'this.parentElement.querySelector(`a`)';
	}
	/**
	 * Initialization of function variable to explorer folder,
	 * if current element is a picture then function is to open picture
	 */
	let func = 'onclick="loadPictures(`'+link+'`, '+website+')"';
	let elemClass = 'folder';
	if(link.charAt(link.length-4)==='.'){
		func = 'onclick="window.open(`'+link+'`)"';
		elemClass = 'picture';
	}
	/**
	 * Classes added to element with one class depending of the element type
	 */
	div.classList.add('element');
	div.classList.add(elemClass);
	div.classList.add('tooltip');
	/**
	 * Folder picture added to element if picture exists
	 */
	let picLink = (fields[2]=="/folder-icon.png") ? 'pictures'+fields[2] : link+fields[2];
	div.innerHTML = '<span '+func+' class="'+picClass+'"><img width="200" height="200" loading="lazy" src="'+picLink+'"></span><span class="name '+elemClass+'">'+fields[0]+'</span>';
	/**
	 * If settings data exists,
	 * Creation of link element to put at bottom of current node
	 */
	if(fields[1]!=""){
		let settings = JSON.parse(fields[1]);
		let array = settings.link.split('/');
		array = array[2].split('.');
		div.innerHTML += ' <a class="'+elemClass+'-inverse '+array[array.length-2]+'" target="_blank" href="'+settings.link+'/'+'">Go to artist !<span class="tooltiptext">'+getInstructions(settings.type)+'</span></a>';
	}
	/**
	 * Current node added to document commission explorer
	 */
	ex.appendChild(div);
}

/**
 * Method to get previous location
 * @param {string} location Current location 
 */
function getPreviousLocation(location){
	/**
	 * If current location is not home folder, creation of link for previous location
	 * Else return to home folder (reloading of explorer)
	 */
	if(location!="pictures"){
		let array = location.split('/');
		let result = "";
		/**
		 * 
		 */
		for(let i=0; i<array.length;i++){
			if(i!=array.length-1){
				result += array[i]+'/';
			}
		}
		result  = result.substring(0, result.length-1);
		return result;
	}else{
		return "pictures";
	}
}

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
		instructions = "Send the artist a direct message. They will answer you.";
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
function gotoLink(event){
	window.open(event.target.dataset.link) ;
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
		ab.parentElement.classList.remove('hidden');
		/**
		 * if node not null, then it contains data for artist button
		 */
		if(node != null){
			let array = node.href.split('/');
			array = array[2].split('.');
			ab.innerText = 'Go to \n'+node.parentElement.children[1].innerText;
			ab.dataset.link = node.href;
			ab.classList.add(array[array.length-2]);
		}
	}else{
		ab.classList = '';
		ab.parentElement.classList.add('hidden');
		ab.dataset.link = '';
	}
}

/**********************************************************
 * Execution in file loading
 **********************************************************/

document.addEventListener('DOMContentLoaded', function(){
	/**
	 * Main commission explorer container
	 */
	ex = document.createElement('div');
	ex.classList.add('explorer');
	document.body.appendChild(ex);
	/**
	 * Main buttons container
	 */
	let bu = document.createElement('div');
	bu.classList.add('buttons');
	document.body.appendChild(bu);
	/**
	 * Back button
	 */
	ba = document.createElement('span');
	ba.innerText = 'Back';
	bu.appendChild(ba);
	/**
	 * Home button
	 */
	let h = document.createElement('span');
	h.innerText = 'Home';
	h.addEventListener('click', function(){
		window.stop();
		window.location.reload();
	});
	bu.appendChild(h);
	/**
	 * Artist button + container
	 */
	abc = document.createElement('div');
	abc.classList.add('button-artist');
	abc.classList.add('tooltip');
	abc.classList.add('hidden');
	document.body.appendChild(abc);
	ab = document.createElement('span');
	ab.innerText = 'Go to artist';
	ab.addEventListener('click', gotoLink);
	abc.appendChild(ab);
	/**
	 * Loading of main commissions folder
	 */
	loadPictures('pictures', null);
});
