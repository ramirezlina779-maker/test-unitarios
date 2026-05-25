class OrderService {
  constructor(inventoryRepo, notificationService) {
    this.inventoryRepo = inventoryRepo;
    this.notificationService = notificationService;
  }

  placeOrder(userId, productId, quantity) {
    if (quantity <= 0) {
      throw new Error("Invalid quantity");
    }

    const stock = this.inventoryRepo.getStock(productId);

    if (stock < quantity) {
      throw new Error("Insufficient stock");
    }

    this.inventoryRepo.decreaseStock(productId, quantity);

    const orderId = 1;

    this.notificationService.sendConfirmation(userId, orderId);

    return {
      orderId,
      userId,
      productId,
      quantity,
      status: "confirmed"
    };
  }
}

module.exports = OrderService;