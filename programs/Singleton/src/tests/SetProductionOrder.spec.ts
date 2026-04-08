import SetProductionOrder from "../application/SetProductionOrder";
import machineInstance from "../entity/Machine";

it("should set a new production order", () => {
  const newOrder = {
    id: 1,
    item: "banana",
    amount: 999,
  };
  SetProductionOrder({ machineInstance, newOrder });

  expect(machineInstance.getOrders()).toStrictEqual([newOrder]);
  expect(machineInstance.currentOrderId()).toBe(newOrder.id);
});
