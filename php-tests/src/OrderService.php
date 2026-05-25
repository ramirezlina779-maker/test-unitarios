<?php

class OrderService
{
    private $inventory;
    private $notification;

    public function __construct($inventory, $notification)
    {
        $this->inventory = $inventory;
        $this->notification = $notification;
    }

    public function placeOrder($userId, $productId, $quantity)
    {
        // 1. validar cantidad
        if ($quantity <= 0) {
            throw new Exception("Invalid quantity");
        }

        // 2. obtener stock
        $stock = $this->inventory->getStock($productId);

        // 3. validar stock
        if ($stock < $quantity) {
            throw new Exception("Insufficient stock");
        }

        // 4. descontar stock
        $this->inventory->decreaseStock($productId, $quantity);

        // 5. crear orden
        $orderId = 1;

        // 6. enviar notificación
        $this->notification->sendConfirmation($userId, $orderId);

        // 7. respuesta
        return [
            "orderId" => $orderId,
            "userId" => $userId,
            "productId" => $productId,
            "quantity" => $quantity,
            "status" => "confirmed"
        ];
    }
}