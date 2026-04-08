import IOrder from "./IOrder";

export default interface IMachine {
  status: boolean;
  startDate: Date;
  currentOrderId(): IOrder["id"];
  getUptime(): number;
  insertProductionOrder(order: IOrder): void;
  getOrders(): IOrder[];
  turnOn(): void;
  turnOff(): void;
}
