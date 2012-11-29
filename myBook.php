<?php
 
    require_once('Config.php');
    require_once('ZZSql.php');
    require_once('Authentication.php');
    
    // $TODO: we need to consider this attribuate later after understanding
    // how many requests against the same userId and how frequently we need 
    // to refresh book list. Ideally, we'd better put cache closer to users.
    header("Cache-Control: no-cache, must-revalidate");

    $zzsql = new ZZSql();
    $ret = new WSC();
    
    $sql = "SELECT bookOwn.id, bookOwn.bookId, book.bookName,book.img,book.author,book.isbn,book.pages,book.publisher,book.price,book.description
                FROM bookOwn
				INNER JOIN
				(
					SELECT * from book
				) book
				ON bookOwn.bookId = book.Id
                WHERE bookOwn.ownerId = '$userId'";

    $data = $zzsql->getData($sql);
    $zzsql->close();
    
    echo $ret->setOutput ($data);
?>
