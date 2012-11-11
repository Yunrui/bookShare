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
	// $TODO: 3 LEFT JOIN is crazy, which search type are all ALL. We must do performance tuning here!!!!!
    // $TODO: what kind of information is enough? do we need to return owner name and/or reader name?
    // And, if a book has been registered twice by my different friends, what should we do here? 
    // display duplicated or only display those which are available?
    $sql = "                
                SELECT bookOwn.bookId,myFriend.friendId, myFriend.displayName, book.bookName,book.img,book.author,book.isbn,book.pages,book.publisher,book.price,book.description from bookOwn
                INNER JOIN
                (
					SELECT friend.friendId, user.displayName from friend
					LEFT JOIN
					(
						SELECT * from user
					) user
					On friend.friendId = user.id
                    WHERE userId = '$userId'
                ) myFriend
                On myFriend.friendId = bookOwn.ownerId
				INNER JOIN
				(
					SELECT * from book
				) book
				On bookOwn.bookId = book.id
            ";

    $zzsql = new ZZSql();
    $data = $zzsql->getData($sql);
    $zzsql->close();
    
    echo json_encode($data);
?>
