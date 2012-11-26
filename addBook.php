<?php
 
    require_once('Config.php');
    require_once('ZZSql.php');
    
    header("Cache-Control: no-cache, must-revalidate");
        
    $zzsql = new ZZSql();

    //get the userId parameter from URL  
    $bookId = $zzsql->escapeInput($_REQUEST["bookId"]);   
    $bookName = $zzsql->escapeInput($_REQUEST["bookName"]);    
    $img = $zzsql->escapeInput($_REQUEST["img"]);    
    $author = $zzsql->escapeInput($_REQUEST["author"]);    
    $isbn = $zzsql->escapeInput($_REQUEST["isbn"]);    
    $pages = $zzsql->escapeInput($_REQUEST["pages"]);    
    $publisher = $zzsql->escapeInput($_REQUEST["publisher"]);    
    $price = $zzsql->escapeInput($_REQUEST["price"]);    
    $description = $zzsql->escapeInput($_REQUEST["description"]);  
    $userId = $zzsql->escapeInput($_REQUEST["userId"]);     
    
    if (empty($bookId) or empty($bookName) or empty($userId))
    {
        // $TODO: we need more accurate error message in this case;
		// Consider structured Result Contract, with error state
        return;
    }
                  
    if($zzsql->notExist("SELECT * FROM book WHERE id = '$bookId'"))
    {
        $addBook = "INSERT INTO book (
                    id,
                    bookName,
					img,
					author,
					isbn,
					pages,
					publisher,
					price,
					description
                )
                VALUES (
                    '$bookId',
                    '$bookName',
                    '$img',
                    '$author',
                    '$isbn',
                    '$pages',
                    '$publisher',
                    '$price',
                    '$description'
                )";

        $zzsql->run($addBook);
    }

	// Add BookOwn Table		            
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
