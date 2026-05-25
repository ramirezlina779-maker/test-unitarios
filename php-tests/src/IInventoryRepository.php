<?php

interface IInventoryRepository {
    public function getStock($productId);
    public function decreaseStock($productId, $quantity);
}