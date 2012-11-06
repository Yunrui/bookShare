<?php
 
    require_once('Config.php');
    require_once('ZZSql.php');
    
    header("Cache-Control: no-cache, must-revalidate");
        
    //get the userId parameter from URL  
    $bookId = $_REQUEST["bookId"];   
    $bookName = $_REQUEST["bookName"];           
    
    if (empty($bookId) or empty($bookName))
    {
        // $TODO: we need more accurate error message in this case;
        return;
    }
    
    // $TODO: SQL injection detect
    $exist = "SELECT * FROM book WHERE id = '$bookId'";
    
    $zzsql = new ZZSql();
    $data = $zzsql->getData($exist);
                
    if(!count($data))
    {
        $addBook = "INSERT INTO book (
                    id,
                    bookName
                )
                VALUES (
                    '$bookId',
                    '$bookName'
                )";

        $zzsql->run($addBook);
    }
    
    $zzsql->close();
?>
