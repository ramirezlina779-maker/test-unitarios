const OrderService = require("../OrderService");

describe("OrderService", () => {
  let repo;
  let notification;
  let service;

  beforeEach(() => {
    repo = {
      getStock: jest.fn(),
      decreaseStock: jest.fn()
    };

    notification = {
      sendConfirmation: jest.fn()
    };

    service = new OrderService(repo, notification);
  });

  // 1. caso correcto
  test("placeOrder success", () => {
    repo.getStock.mockReturnValue(10);

    const result = service.placeOrder(1, 1, 2);

    expect(repo.decreaseStock).toHaveBeenCalledWith(1, 2);
    expect(notification.sendConfirmation).toHaveBeenCalledTimes(1);
    expect(result.status).toBe("confirmed");
  });

  // 2. stock insuficiente
  test("insufficient stock throws error", () => {
    repo.getStock.mockReturnValue(1);

    expect(() => service.placeOrder(1, 1, 5))
      .toThrow("Insufficient stock");

    expect(repo.decreaseStock).not.toHaveBeenCalled();
  });

  // 3. cantidad inválida
  test("invalid quantity throws error", () => {
    expect(() => service.placeOrder(1, 1, 0))
      .toThrow("Invalid quantity");
  });

  // 4. notificación llamada
  test("notification called once", () => {
    repo.getStock.mockReturnValue(10);

    service.placeOrder(1, 1, 2);

    expect(notification.sendConfirmation).toHaveBeenCalledTimes(1);
  });
});