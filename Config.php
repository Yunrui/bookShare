<?php
    // Modify this flag, then we can switch between Local and SAE;
    define('RunningMode', 'SAE');

    if (RunningMode == 'Local')
    {
        define('HOSTNAME', 'localhost');
        define('DB_HOST_M', 'localhost');
        define('DB_HOST_S', 'localhost');
        define('DB_NAME', 'app_letsshare');
        define('DB_USER', 'root');
        define('DB_PASSWORD', 'damnit');
        
        // TODO: enable memcache later
        // $memcache = memcache_connect('127.0.0.1', 11713);
    }
    else
    {
        define('HOSTNAME', $_SERVER['HTTP_APPNAME'] . '.sinaapp.com');
        define('DB_HOST_M', SAE_MYSQL_HOST_M . ':' . SAE_MYSQL_PORT);
        define('DB_HOST_S', SAE_MYSQL_HOST_S . ':' . SAE_MYSQL_PORT);
        define('DB_NAME', SAE_MYSQL_DB);
        define('DB_USER', SAE_MYSQL_USER);
        define('DB_PASSWORD', SAE_MYSQL_PASS);
        
        // TODO: enable memcache later
        // $memcache = memcache_init();
    }
?>
