<?php

    // User name and password for authentication
    $username = 'admin';
    $password = 'J$p1ter';
    
    if (!isset($_SERVER['PHP_AUTH_USER']) 
     || !isset($_SERVER['PHP_AUTH_PW'])
     || $_SERVER['PHP_AUTH_USER'] != $username
     || $_SERVER['PHP_AUTH_PW'] != $password)
    {
        header('HTTP/1.1 401 Unauthorized');
        header('WWW-Authenticate: Basic realm="Novel Reader"');
        exit('<h2>Novel Readers</h2>Sorry, you must enter a valid user name and password to access this page.');
    }
?>
