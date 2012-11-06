<?php
 
    require_once('Config.php');
    require_once('ZZSql.php');
    
    header("Cache-Control: no-cache, must-revalidate");
        
    //get the userId parameter from URL  
    $bookId = $_REQUEST["bookId"];   
    $userId = $_REQUEST["userId"];           
    
    if (empty($bookId) or empty($userId))
    {
        // $TODO: we need more accurate error message in this case;
        return;
    }
    
    $zzsql = new ZZSql();

    // $TODO: SQL injection detect
    $sql = "DELETE FROM bookOwn
                WHERE ownerId = '$userId' AND bookId = '$bookId'";

    $zzsql->run($sql);
    
    $zzsql->close();
?>
