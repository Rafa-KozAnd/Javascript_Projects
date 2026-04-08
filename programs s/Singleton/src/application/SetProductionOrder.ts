import IMachine from "../entity/IMachine";
import IOrder from "../entity/IOrder";

interface Input {
  machineInstance: IMachine;
  newOrder: IOrder;
}

export default function setProductionOrder(inputData: Input): void {
  const { machineInstance, newOrder } = inputData;

  machineInstance.insertProductionOrder(newOrder);
}

