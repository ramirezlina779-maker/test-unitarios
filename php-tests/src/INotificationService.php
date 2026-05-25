<?php

interface INotificationService {
    public function sendConfirmation($userId, $orderId);
}