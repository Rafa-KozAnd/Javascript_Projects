import IMachine from "./IMachine";
import IOrder from "./IOrder";

class Machine implements IMachine {

  orders: IOrder[] = [];

  constructor(readonly startDate: Date, public status: boolean = false) {}

  currentOrderId(): number {
    return this.orders[0]?.id;
  }

  getUptime(): number {
    return this.startDate.getTime();
  }

  insertProductionOrder(order: IOrder): void {
    this.orders.push(order);
  }

  getOrders(): IOrder[] {
    return this.orders;
  }

  turnOn(): void {
    this.status = true;
  }
  
  turnOff(): void {
    this.status = false;
  }
}

export default new Machine(new Date());
