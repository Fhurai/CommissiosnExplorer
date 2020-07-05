<?php
/**
 * Avoid directories not including pictures and files not being pictures from artists
 */
$forbidden = array('#recycle','.','..', '@eaDir','Thumbs.db', 'folder-icon.png', 'desktop.ini', 'settings.json','Export');

/**
 * Recuperation of location in explorer and scan of the location for folders and pictures
 */
$location = $_REQUEST['location'];
$files = \array_diff(scandir('../'.$location), $forbidden);

/**
 * Initialization of result array
 */
$result = array();
$i = 0;
foreach($files as $file){
	/**
	 * If current file has no extensionm scan of the folder to show first picture in it
	 * else the file is a picture
	 */
	$fileParts = pathinfo($file);
	if(!array_key_exists('extension', $fileParts)){
		$imgs = \array_diff(scandir('../'.$location.'/'.$file), $forbidden);
		$imgsParts = pathinfo(array_values($imgs)[0]);
		/**
		 * If no picture in folder or files with forbidden extension, show default folder picture,
		 * else recuperation picture link
		 */
		if(!array_key_exists('extension', $imgsParts) || is_numeric(array_search($imgsParts['extension'], array('ZTL', 'mp4', 'webm')))){
			$pic = '/folder-icon.png';
		}else{
			$pic = '/'.array_values($imgs)[0];
		}
	}else{
		$pic = "";
	}
	/**
	 * If file has not a forbidden extension
	 */
	if(!is_numeric(array_search($fileParts['extension'], array('ZTL', 'mp4','webm')))){
		/**
		 * If current file is a folder containing a settings file, data from settings files inserted in file array
		 * else, file array is name of file and picture link
		 */
		if(file_exists('../'.$location.'/'.$file.'/'.'settings.json')){
			array_push($result, array($file, file_get_contents('../'.$location.'/'.$file.'/'.'settings.json'), $pic));
		}else{
			array_push($result, array($file, '', $pic));
		}	
	}
}
/**
 * show json file
 */
echo json_encode($result);