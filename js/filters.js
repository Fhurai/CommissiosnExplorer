/**********************************************************
 * Variables
 **********************************************************/

/** @var {Array} websiteArray Array of website who are used for links */
var websiteArray = ['Artists&Clients', 'Deviantart', 'Fanbox', 'Hentai-foundry', 'Patreon', 'Picarto', 'Skeb', 'Twitter'];

/** @var {Array} specClasses */
let specClasses = ['Others', 'Reset'];

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
		 * If not home page commissions explorer, hide filter buttons
		 * Else show them but disabled
		 */
		if (isNaN(event.target.response) && typeof event.target.response == 'string') {
			if (document.getElementById('location').innerText !== 'pictures') {
				document.getElementsByClassName('buttons-filters')[0].style.display = 'none';
			} else {
				document.getElementsByClassName('buttons-filters')[0].style.display = 'block';
				removeFilter();
			}
		}
	}
}

/**
 * Method to hide all elements in commissions explorer
 */
function hideElements() {
	/**
	 * Filters buttons are all changed to unselected
	 */
	document.getElementsByClassName("buttons-filters")[0].classList.add('choice');
	/**
	 * Hiding all elements from commissions explorer
	 */
	elements = document.getElementsByClassName('element folder');
	Array.prototype.forEach.call(elements, function (el) {
		el.classList.add('hidden');
	});
}

/**
 * Remove class impending filter usage
 */
function removeFilter() {
	/**
	 * Removing filter class impending filter buttons
	 */
	document.getElementsByClassName("buttons-filters")[0].classList.remove('choice');
	/**
	 * Removing chosen class from all filter buttons
	 */
	let elements = document.getElementsByClassName("buttons-filters")[0].children;
	Array.prototype.forEach.call(elements, function (el) {
		el.classList.remove('chosen');
	});
}

/**
 * Method to show elements in commissions explorer with classes given in argument
 * Mostly use for reset filters
 * @param {string} classes Classes for elements to show
 */
function showElements(classes) {
	/**
	 * All elements having class given in argument are displayed
	 */
	let elements = document.getElementsByClassName(classes);
	Array.prototype.forEach.call(elements, function (el) {
		el.classList.remove('hidden');
	});
}

/**
 * Method to show elements in commissions explorer with classes given in argument
 * Mostly use for filters usage
 * @param {string} classes Classes for elements to show
 */
function showParentElements(classes) {
	/**
	 * All elements having class given in argument are displayed
	 */
	let elements = document.getElementsByClassName(classes);
	Array.prototype.forEach.call(elements, function (el) {
		el.parentNode.classList.remove('hidden');
	});
}

/**
 * Method returning if commissions explorer is filtered
 */
function isFiltered() {
	if (document.getElementsByClassName("buttons-filters")[0].classList.contains('choice')) {
		return true;
	}
	return false;
}

/**
 * Method to filter commissions explorer by website given
 * @param {string} $website Website the user wants elements displayed
 */
function filterWebsite(website) {
	/**
	 * If commissions explorer not filtered or current filter is not the same as previous, 
	 */
	if (!isFiltered() || (isFiltered() && document.getElementsByClassName(website + ' chosen').length == 0)) {
		/**
		 * Remove current filter
		 */
		removeFilter();
		/**
		 * Hide elements for filter
		 */
		hideElements();
		/**
		 * Add class to show filter used
		 */
		document.getElementsByClassName("buttons-filters")[0].querySelector('[class="' + website + '"]').classList.add('chosen');
		/**
		 * Filter commissions explorer files
		 */
		showParentElements('folder-inverse ' + website);
		/**
		 * Return to top of page
		 */
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	} else {
		resetFilter();
	}
}

/**
 * Method showing only elements not in specifics filters
 */
function showOthers() {
	/**
	 * Show all elements from commissions explorer
	 */
	showElements('element');
	/**
	 * If filter Others not clicked already
	 */
	if (document.getElementsByClassName("buttons-filters")[0].querySelector('[class="others chosen"]') == null) {
		removeFilter();
		/**
	 	 * Adding class impending all filters
	 	 */
		document.getElementsByClassName("buttons-filters")[0].classList.add('choice');
		/**
		 * Adding class to current filter
		 */
		document.getElementsByClassName("buttons-filters")[0].querySelector('[class="others"]').classList.add('chosen');
		/**
		 * For all specifics filters, recuperation of all elements having same class
		 */
		let classes = ['artistsnclients', 'deviantart', 'fanbox', 'hentai-foundry', 'patreon', 'picarto', 'pixiv', 'skeb', 'twitter'];
		Array.prototype.forEach.call(classes, function (cl) {
			/**
			 * Hide all elements with class given in parameter
			 */
			elements = document.getElementsByClassName('folder-inverse ' + cl);

			Array.prototype.forEach.call(elements, function (el) {
				el.parentNode.classList.add('hidden');
			});
		});
	} else {
		removeFilter();
		document.getElementsByClassName("buttons-filters")[0].querySelector('[class="others chosen"]').classList.remove('chosen')
	}
}

/**
 * Function to reset filter
 */
function resetFilter() {
	/**
	 * Remove filter
	 */
	removeFilter();
	/**
	 * Show every folder
	 */
	showElements('element');
}

/**********************************************************
 * Execution in file loading
 **********************************************************/

document.addEventListener('DOMContentLoaded', function () {
	/**
	 * Filter container
	 */
	let c = document.createElement('div');
	c.classList.add('buttons-filters');
	document.body.appendChild(c);
	/**
	 * Filter buttons
	 */
	Array.prototype.forEach.call(websiteArray, function (web) {
		/**
		 * Button creation
		 */
		let f = document.createElement('span');
		f.innerText = web;
		/**
		 * Special case : replace & by n for A&C
		 */
		if (web == "Artists&Clients") {
			f.classList.add(web.toLowerCase().replace('&', 'n'));
		} else {
			f.classList.add(web.toLowerCase());
		}
		/**
		 * Click event listener
		 */
		f.addEventListener('click', function (filter) {
			filterWebsite(filter.target.classList[0]);
		});
		/**
		 * Filter button put into filters container
		 */
		c.appendChild(f);
	});
	/**
	 * Buttons for special cases
	 */
	Array.prototype.forEach.call(specClasses, function (web) {
		let e = document.createElement('span');
		e.classList.add('empty');
		e.innerText = '&nbsp;';
		c.appendChild(e);
		let f = document.createElement('span');
		f.classList.add(web.toLowerCase());
		f.innerText = web;
		f.addEventListener('click', function () {
			if (web == 'Others') {
				showOthers();
			} else {
				resetFilter();
			}
		});
		c.appendChild(f);
	});
});