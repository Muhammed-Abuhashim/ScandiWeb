<?php 
include_once("core.php");
include_once("DB.php");

abstract class AbstractDatabase extends DB {
    protected $database = "task";
    protected $conn;

    public function __construct()
    {
        parent::__construct("localhost", "root", "");
        $this->conn = new mysqli($this->getHost(), $this->getUsername(), $this->getPassword(), $this->database);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    abstract public function fetchProducts();

    abstract public function addItems($sku, $name, $price, $val);

    abstract public function deleteProducts($ids);

    public function closeConnection() {
        $this->conn->close();
    }
}

class Database extends AbstractDatabase {
    public function fetchProducts() {
        $sql = "SELECT * FROM products";
        $result = $this->conn->query($sql);
        $json_array = array();

        while ($row = $result->fetch_assoc()) {
            $json_array[] = $row;
        }

        return json_encode($json_array);
    }

    public function addItems($sku, $name, $price, $val) {
        $sql = "INSERT INTO products(sku, name, price, size) VALUES('$sku', '$name', '$price', '$val')";
        $result = $this->conn->query($sql);

        if ($result) {
            return "Success";
        } else {
            return "Duplicate Data!";
        }
    }

    public function deleteProducts($ids) {
        $ids_str = implode("','", $ids);
        $sql = "DELETE FROM products WHERE sku IN ('$ids_str')";
        $result = $this->conn->query($sql);

        if ($result) {
            return "Success";
        } else {
            return "Error";
        }
    }
}
?>