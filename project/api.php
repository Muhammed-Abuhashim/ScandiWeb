<?php
include_once("core.php");
include_once("main.php");

class ProductController extends Database {
    public function fetchAndClose() {
        $data = $this->fetchProducts();
        $this->closeConnection();
        return $data;
    }
}

$productController = new ProductController();
echo $productController->fetchAndClose();


?>
