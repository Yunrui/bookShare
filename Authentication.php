<?php

	require_once('Config.php');

	if (RunningMode != 'Local')
	{
		// $TODO: if passed from weibo, we need look up userId from database first and then set this cookie
		$userId = $_COOKIE["userId"];
	
		if (empty($userId)) {
			header("Location: login.php", false, 302);
			exit(0);
		}
	}
?>
