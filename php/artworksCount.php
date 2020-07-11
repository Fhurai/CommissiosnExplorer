<?php


function ScanArtorks($location)
{
    /**
     * Avoid directories not including pictures and files not being pictures from artists
     */
    $forbidden = array('#recycle', '.', '..', '@eaDir', 'Thumbs.db', 'folder-icon.png', 'desktop.ini', 'settings.json', 'Export');

    $files = \array_diff(scandir('../' . $location), $forbidden);

    $count = 0;
    foreach ($files as $file) {
        $array = explode('.', $file);
        if (count($array) > 1) {
            $count++;
        } else {
            $count = $count + ScanArtorks($location . '/' . $file);
        }
    }

    return $count;
}

/**
 * Recuperation of location in explorer and scan of the location for folders and pictures
 */
$location = $_REQUEST['location'];

$result = ScanArtorks($location);

/**
 * show json file
 */
echo json_encode($result);
