<?php
 
    require_once('Config.php');
    require_once('ZZSql.php');
    
    // $TODO: we need to consider this attribuate later after understanding
    // how many requests against the same userId and how frequently we need 
    // to refresh book list. Ideally, we'd better put cache closer to users.
    header("Cache-Control: no-cache, must-revalidate");
        
    //get the userId parameter from URL
    $userId = $_REQUEST["userId"];   
    
    if (empty($userId))
    {
        return;
    }
    
    // $TODO: SQL injection detect
    $sql = "SELECT friend.id, friendId, USER.displayName
                FROM friend
                LEFT JOIN
                (
                    SELECT * from user
                )USER
                ON USER.id = friend.friendId
                WHERE friend.userId = '$userId'";

    $zzsql = new ZZSql();
    $data = $zzsql->getData($sql);
    $zzsql->close();
    
    echo json_encode($data);
?>
