<?php

	require_once('Config.php');
	require_once('WebServiceContract.php');

	// $TODO: if passed from weibo, we need look up userId from database first and then set this cookie
	$userId = $_COOKIE["userId"];
	
	if (empty($userId)) {
		// each web service must go into this check first,
		// so we have to detect whether caller is index.php or ajax
		// and if it's ajax, we have to return WebServiceContract to let 
		// javascript do redirect
		if($_SERVER['HTTP_X_REQUESTED_WITH'] === "XMLHttpRequest")
		{
			$ret = new WSC();
			die($ret->wrapError(2, "login.php"));
		}
		else
		{
			header("Location: login.php", false, 302);
			exit;
		}
	}
?>
