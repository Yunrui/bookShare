<?php
	session_start();
	
	include_once('config.php');
	include_once('saetv2.ex.class.php');
	
	$c = new SaeTClientV2(WB_KEY, WB_SKY, $_SESSION['token']['access_token']);
	
	$uid_get = $c->get_uid();
	$uid = $uid_get['uid'];
	
	$page = 1;
	$count = 200;
	
	$friend = $c->bilateral($uid, $page, $count);
	
	$users = $friend['users'];
	
	$cursor = $friend['next_cursor'];
	
	while (true)
	{
		$page = $page + 1;
	
		$friend = $c->bilateral($uid, $page, $count);
		
		#if the query is out of boundary, the total_number will be 0
		if ($friend['total_number'] == 0)
		{
			break;
		}
		
		$users = array_merge($users, $friend['users']);
		
		$cursor = $friend['next_cursor'];
	}
	
	$user_message = $c->show_user_by_id($uid);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Bin's Demo</title>
</head>

<body>
	<p> Hello, <?=$user_message['screen_name']?> </p>
	
	<?php if ( $users ) :?>
		<?php foreach( $users as $item):?>
			<div style="padding:10px;margin:5px;border:1px solid $ ccc">
				<?=$item['screen_name'];?>
			</div>
		<?php endforeach; ?>
	<?php endif; ?>
	
</body>
</html>