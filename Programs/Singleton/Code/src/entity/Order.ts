import IOrder from "./IOrder";

export default class Order implements IOrder {
  constructor (
    readonly id: number,
    readonly item: string,
    readonly amount: number
  ) {}
}
