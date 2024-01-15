<?php
include_once("core.php");

class DB {
    private $db;
    private $host;
    private $username;
    private $password;

    public function __construct($host, $username, $password)
    {
        $this->setConn($host, $username, $password);
        $this->db = mysqli_connect($this->host, $this->username, $this->password);
        (!$this->db) && die('Connection Failed !');
    }

    public function setConn($host, $username, $password)
    {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
    }

    public function getConn()
    {
        return $this->db;
    }

    // Add these getter methods
    public function getHost()
    {
        return $this->host;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getPassword()
    {
        return $this->password;
    }
}
?>
