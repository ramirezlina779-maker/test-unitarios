<?php

namespace Tests;

use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/../src/IInventoryRepository.php';
require_once __DIR__ . '/../src/INotificationService.php';
require_once __DIR__ . '/../src/OrderService.php';

class OrderServiceTest extends TestCase
{
    public function testValidOrder()
    {
        $inventory = $this->createMock(\IInventoryRepository::class);
        $notification = $this->createMock(\INotificationService::class);

        $inventory->method('getStock')->willReturn(10);

        $inventory->expects($this->once())
                  ->method('decreaseStock');

        $notification->expects($this->once())
                     ->method('sendConfirmation');

        $service = new \OrderService($inventory, $notification);

        $result = $service->placeOrder(1, 1, 2);

        $this->assertEquals("confirmed", $result["status"]);
    }
}