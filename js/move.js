/**
 * Method to load folders/pictures from location
 * @param {string} location Current location in the explorer
 * @param {DOM Node} node 
 */
function loadPictures(location, node){
	/**
	 * Search bar
	 */
	document.getElementsByName('search')[0].value = "";
	/**
	 * Artist button method
	 */
	getWebsite(location, node);
	/**
	 * If not home page commissions explorer, hide filter buttons
	 * Else show them but disabled
	 */
	if(location!='pictures'){
		document.getElementsByClassName('buttons-reverse')[0].style.display = 'none';
		document.getElementsByClassName('searchBar')[0].classList.add('hidden');
	}else{
		document.getElementsByClassName('buttons-reverse')[0].style.display = 'block';
		document.getElementsByClassName('searchBar')[0].classList.remove('hidden');
		removeFilter();
	}
	/**
	 * Stop window loading
	 */
	window.stop();
	/**
	 * Set data for back button
	 */
	document.getElementById('back').setAttribute('onclick', 'loadPictures(getPreviousLocation(`'+location+'`))');
	/**
	 * Emptying commissions explorer
	 */
	document.getElementById("content").innerHTML = '';
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
	document.getElementById("content").appendChild(div);
}

/**
 * Method to return to home folder for commission explorer
 */
function home(){
	window.stop();
	window.location.reload();
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