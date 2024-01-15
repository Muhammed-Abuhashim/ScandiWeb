<?php
include_once("main.php");

class ProductAddController {
    private $database;

    public function __construct() {
        $this->database = new Database();
    }

    public function addProductAndClose($postData) {
        $sku = $postData['sku'];
        $name = $postData['name'];
        $price = $postData['price'];
        $size = $postData['size'];
        $weight = $postData['weight'];
        $height = $postData['height'];
        $width = $postData['width'];
        $length = $postData['length'];

        $sku = str_replace("'", "", $sku);

        if ($size) {
            $val = 'Size: ' . $size . ' MB';
        } elseif ($weight) {
            $val = 'Weight: ' . $weight . 'KG';
        } elseif ($height && $width && $length) {
            $val = "Dimension: " . $height . 'x' . $width . 'x' . $length;
        }

        $result = $this->database->addItems($sku, $name, $price, $val);
        $this->database->closeConnection();

        return $result;
    }
}

$productAddController = new ProductAddController();

$postData = $_POST;

echo $productAddController->addProductAndClose($postData);

?>
