import IMachine from "../entity/IMachine";

interface Input {
  machineInstance: IMachine;
  onoff: boolean;
}

export default function TurnOnOff(input: Input): void {
  const { machineInstance, onoff } = input;
  
  if (onoff) {
    machineInstance.turnOn();
  } else {
    machineInstance.turnOff();
  }
}
