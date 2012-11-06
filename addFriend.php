<?php
 
    require_once('Config.php');
    require_once('ZZSql.php');
    
    header("Cache-Control: no-cache, must-revalidate");
        
    //get the userId parameter from URL  
    $friendId = $_REQUEST["friendId"];   
    $userId = $_REQUEST["userId"];           
    
    if (empty($friendId) or empty($userId))
    {
        // $TODO: we need more accurate error message in this case;
        return;
    }
    
    // $TODO: SQL injection detect
    $exist = "SELECT * FROM friend WHERE friendId = '$friendId' AND userId = '$userId'";
    
    $zzsql = new ZZSql();
    $data = $zzsql->getData($exist);
                
    if(!count($data))
    {
        // $TODO: we don't have foreign key, so must check where userId friendId availability
        $addFriend = "INSERT INTO friend (
                    userId,
                    friendId
                )
                VALUES (
                    '$userId',
                    '$friendId'
                )";

        $zzsql->run($addFriend);
    }
    
    $zzsql->close();
?>
