<html>

<head>
	<title>Commissions explorer</title>
	<link rel="stylesheet" href="index.css">
</head>

<body>
	<noscript>Javascript required for website usage</noscript>
</body>
<?php
/**
 * Get all modules informations
 */
$modules = file_get_contents("modules.json");
$jsonIterator = new RecursiveIteratorIterator(
	new RecursiveArrayIterator(json_decode($modules, TRUE)),
	RecursiveIteratorIterator::SELF_FIRST
);
$scripts = 0;
?>
<?php foreach($jsonIterator as $key => $val): ?>
	<?php if($val==true): ?>
		<?php $scripts++ ?>
		<script src="js/<?= $key ?>.js"></script>
	<?php endif; ?>
<?php endforeach; ?>

<?php if($scripts==0): ?>
	<script>throw new Error('No module activated. Please refer to modules.json file')</script>
<?php endif; ?>
</html>