<?php
include_once("main.php");

class ProductDeleteController {
    private $database;

    public function __construct() {
        $this->database = new Database();
    }

    public function deleteProductsAndClose() {
        // Get IDs to delete from the request
        $data = json_decode(file_get_contents("php://input"), true);
        $ids = $data['ids'];

        $result = $this->database->deleteProducts($ids);
        $this->database->closeConnection();

        return $result;
    }
}

$productDeleteController = new ProductDeleteController();
echo $productDeleteController->deleteProductsAndClose();

?>
