<html>

<head>
	<title>Commissions explorer</title>
	<link rel="stylesheet" href="index.css">
</head>

<body>
	<noscript>
		Javascript required for website usage
	</noscript>
	<!-- Explorer part -->
	<!-- Content will be replaced with files from ajax call -->
	<div id="content" class="content"></div>
	<!-- Motion buttons -->
	<div class="buttons">
		<span id="back">Back</span>
		<span onclick="home()">Home</span>
	</div>
	<!-- Button to go to current artist page -->
	<!-- Replace the button under artist folder on main page -->
	<div class="button-artist tooltip hidden">
		<span id="artist" onclick="gotoLink(this)">Go to artist</span>
	</div>
	<!-- Filters -->
	<div class="buttons-reverse">
		<span class="artistsnclients">Artists&Clients</span>
		<span class="deviantart">Deviantart</span>
		<span class="fanbox">Fanbox</span>
		<span class="hentai-foundry">Hentai-foundry</span>
		<span class="patreon">Patreon</span>
		<span class="picarto">Picarto</span>
		<span class="skeb">Skeb</span>
		<span class="twitter">Twitter</span>
		<span class="empty">&nbsp;</span>
		<span class="others">Others</span>
		<span class="empty">&nbsp;</span>
		<span class="reset">Reset</span>
	</div>
</body>
<!-- Imports -->
<script src="js/index.js"></script>
<script src="js/move.js"></script>
<script src="js/filter.js"></script>

<?php
$modules = file_get_contents("modules.json");
$jsonIterator = new RecursiveIteratorIterator(
	new RecursiveArrayIterator(json_decode($modules, TRUE)),
	RecursiveIteratorIterator::SELF_FIRST
);
?>
<?php foreach($jsonIterator as $key => $val): ?>
	<?php if($val==true): ?>
		<script src="js/<?= $key ?>.js"></script>
	<?php endif; ?>
<?php endforeach; ?>
</html>