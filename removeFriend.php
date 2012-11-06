<?php
 
    require_once('Config.php');
    require_once('ZZSql.php');
    
    header("Cache-Control: no-cache, must-revalidate");
        
    // $TODO: later we should consider whether just id of the table directly for performance reason or build combination index.
    $friendId = $_REQUEST["friendId"];   
    $userId = $_REQUEST["userId"];           
    
    if (empty($friendId) or empty($userId))
    {
        // $TODO: we need more accurate error message in this case;
        return;
    }
    
    $zzsql = new ZZSql();

    // $TODO: SQL injection detect
    $sql = "DELETE FROM friend
                WHERE userId = '$userId' AND friendId = '$friendId'";

    $zzsql->run($sql);
    
    $zzsql->close();
?>
