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
    
    // $TODO: SQL injection detect
    $exist = "SELECT * FROM bookOwn WHERE bookId = '$bookId' AND ownerId = '$userId'";
    
    $zzsql = new ZZSql();
    $data = $zzsql->getData($exist);
                
    if(!count($data))
    {
        $addBookOwn = "INSERT INTO bookOwn (
                    ownerId,
                    bookId,
                    waitingList
                )
                VALUES (
                    '$userId',
                    '$bookId',
                    0
                )";

        $zzsql->run($addBookOwn);
    }
    
    $zzsql->close();
?>
