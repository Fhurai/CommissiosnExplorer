/**
 * Method to hide all elements in commissions explorer
 */
function hideElements() {
	/**
	 * Filters buttons are all changed to unselected
	 */
	document.getElementsByClassName("buttons-reverse")[0].classList.add('choice');
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
	document.getElementsByClassName("buttons-reverse")[0].classList.remove('choice');
	/**
	 * Removing chosen class from all filter buttons
	 */
	let elements = document.getElementsByClassName("buttons-reverse")[0].children;
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
		/**
		 * Search bar
		 */
		if(document.getElementsByName('search')[0].value != null){
			if(el.parentNode.children[1].innerText.toLowerCase().includes(document.getElementsByName('search')[0].value)){
				el.parentNode.classList.remove('hidden');
			}else{
				el.parentNode.classList.add('hidden');
			}
		}else{
			el.parentNode.classList.remove('hidden');
		}
	});
}

/**
 * Method returning if commissions explorer is filtered
 */
function isFiltered() {
	if (document.getElementsByClassName("buttons-reverse")[0].classList.contains('choice')) {
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
		document.getElementsByClassName("buttons-reverse")[0].querySelector('[class="' + website + '"]').classList.add('chosen');
		/**
		 * Filter commissions explorer files
		 */
		showParentElements('folder-inverse ' + website);
	} else {
		showElements('element');
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
	if (document.getElementsByClassName("buttons-reverse")[0].querySelector('[class="others chosen"]') == null) {
		removeFilter();
		/**
	 	 * Adding class impending all filters
	 	 */
		document.getElementsByClassName("buttons-reverse")[0].classList.add('choice');
		/**
		 * Adding class to current filter
		 */
		document.getElementsByClassName("buttons-reverse")[0].querySelector('[class="others"]').classList.add('chosen');
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
		document.getElementsByClassName("buttons-reverse")[0].querySelector('[class="others chosen"]').classList.remove('chosen')
	}
}