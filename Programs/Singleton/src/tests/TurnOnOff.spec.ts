import TurnOnOff from "../application/TurnOnOff";
import machineInstance from "../entity/Machine";

it("should be able to turn on the machine", () => {
  TurnOnOff({ machineInstance, onoff: true });
  expect(machineInstance.status).toBe(true);
});

it("should be able to turn off the machine", () => {
  TurnOnOff({ machineInstance, onoff: false });
  expect(machineInstance.status).toBe(false);
});

