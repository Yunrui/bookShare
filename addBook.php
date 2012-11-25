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
    
    if (empty($bookId) or empty($bookName))
    {
        // $TODO: we need more accurate error message in this case;
        return;
    }
    
    $exist = "SELECT * FROM book WHERE id = '$bookId'";
    $data = $zzsql->getData($exist);
                
    if(!count($data))
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
    
    $zzsql->close();
?>
