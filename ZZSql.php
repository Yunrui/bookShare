<?php

require_once('Config.php');

class ZZSql
{
    private $slaveConnection;
    private $masterConnection;
    private $error;
    private $errno;
 
    
    public function getData($sql)
    {
        $mysql_s = $this->openSlave();
        
        $data = mysqli_query($mysql_s, $sql) or die('ERROR: querying database - ' . mysqli_error($mysql_s));
    
        $all = Array();
        $i = 0;
        while($array = mysqli_fetch_array($data, MYSQL_ASSOC))
        {
            $all[$i++] = $array;
        }

        mysqli_free_result($data);
        
        return $all;
    }
    
    public function run($sql)
    {
        $mysql = $this->openMaster();        
        mysqli_query($mysql, $sql) or die('ERROR: updating database - ' . mysqli_error($mysql));
    }
    
    public function close()
    {
        if(!empty($this->slaveConnection))
        {
            mysqli_close($this->slaveConnection);
            $this->slaveConnection = NULL;
        }
        
        if(!empty($this->masterConnection))
        {
            mysqli_close($this->masterConnection);
            $this->masterConnection = NULL;
        }
    }

	public function escapeInput($value)
	{
		// If it's true, PHP automatically add slash for special charactor
		if (get_magic_quotes_gpc())
		{
			$value = stripslashes($value);
		}

		// 如果不是数字则加引号
		if (!is_numeric($value))
		{
			$value = mysql_escape_string($value);
		}
		return $value;
	}

	public function notExist($sql)
	{	
		$data = $this->getData($sql);
		return !count($data);
	}

    
    private function openSlave()
    {
        // $TODO: do we need to cache connection cross session?
        if (empty($this->slaveConnection))
        {
            $this->slaveConnection = mysqli_connect(DB_HOST_S, DB_USER, DB_PASSWORD, DB_NAME) or die('ERROR: connecting to MySQL server - ' . mysqli_connect_errno());
        }
        
        return $this->slaveConnection;
    }
    
    private function openMaster()
    {
        if (empty($this->masterConnection))
        {
            $this->masterConnection = mysqli_connect(DB_HOST_M, DB_USER, DB_PASSWORD, DB_NAME) or die('ERROR: connecting to MySQL server - ' . mysqli_connect_errno());
        }
        
        return $this->masterConnection;
    }  
}

?>
