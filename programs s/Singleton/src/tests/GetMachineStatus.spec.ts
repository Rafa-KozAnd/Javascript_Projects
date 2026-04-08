import GetMachineStatus from "../application/GetMachineStatus";
import machine from "../entity/Machine";

it("should get the machine status", () => {
  const currentDate = new Date();

  const machineStatus = GetMachineStatus({
    machineInstance: machine,
    currentDate,
  });

  expect(machineStatus.status).toBe(false);
  expect(machineStatus.orderList).toStrictEqual([]);
  expect(machineStatus.orderId).toBe(undefined);
  expect(machineStatus.uptime).toBe(
    (currentDate.getTime() - machine.getUptime()) / (1000 * 60)
  );
});
