<?php
 
    require_once('Config.php');
    require_once('ZZSql.php');
    
    header("Cache-Control: no-cache, must-revalidate");

    $zzsql = new ZZSql();        

    //get the userId parameter from URL  
    $bookId = $zzsql->escapeInput($_REQUEST["bookId"]);   
    $userId = $zzsql->escapeInput($_REQUEST["userId"]);           
    
    if (empty($bookId) or empty($userId))
    {
        // $TODO: we need more accurate error message in this case;
        return;
    }
                
	if($zzsql->notExist("SELECT * FROM bookOwn WHERE bookId = '$bookId' AND ownerId = '$userId'"))
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
