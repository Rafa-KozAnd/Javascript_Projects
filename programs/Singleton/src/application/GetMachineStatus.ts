import IMachine from "../entity/IMachine";
import IOrder from "../entity/IOrder";

interface Input {
  machineInstance: IMachine;
  currentDate: Date;
}

interface Output {
  status: boolean;
  orderId: IOrder["id"];
  uptime: number;
  orderList: IOrder[];
}

export default function getMachineStatus(inputData: Input): Output {
  return {
    status: inputData.machineInstance.status,
    orderId: inputData.machineInstance.currentOrderId(),
    uptime:
      (inputData.currentDate.getTime() -
        inputData.machineInstance.getUptime()) /
      (1000 * 60),
    orderList: inputData.machineInstance.getOrders(),
  };
}
