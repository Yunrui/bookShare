<?php
 
    require_once('Config.php');
    require_once('ZZSql.php');
    
    // $TODO: we need to consider this attribuate later after understanding
    // how many requests against the same userId and how frequently we need 
    // to refresh book list. Ideally, we'd better put cache closer to users.
    header("Cache-Control: no-cache, must-revalidate");
        
    //get the userId parameter from URL
    $userId = $_REQUEST["userId"];   
    $searchText = $_REQUEST["searchText"];   
    
    if (empty($userId))
    {
        return;
    }
    
    // $TODO: SQL injection detect
    // $TODO: what kind of information is enough? do we need to return owner name and/or reader name?
    // And, if a book has been registered twice by my different friends, what should we do here? 
    // display duplicated or only display those which are available?
    $sql = "                
                SELECT DISTINCT bookOwn.bookId from bookOwn
                LEFT JOIN
                (
                    SELECT * from friend
                    WHERE userId = '$userId'
                ) myFriend
                On myFriend.friendId = bookOwn.ownerId
            ";

    $zzsql = new ZZSql();
    $data = $zzsql->getData($sql);
    $zzsql->close();
    
    echo json_encode($data);
?>
