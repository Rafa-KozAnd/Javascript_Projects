import HttpServer from "./HttpServer";
import Machine from "../../entity/IMachine";
import GetMachineStatus from "../../application/GetMachineStatus";
import SetProductionOrder from "../../application/SetProductionOrder";
import TurnOnOff from "../../application/TurnOnOff";

export default class Router {
  constructor (
    readonly httpServer: HttpServer,
    readonly machineInstance: Machine
  ) {}

  async init() {
    this.httpServer.on("get", "/getStatus", async (params: any, body: any) => {
      GetMachineStatus({
        machineInstance: this.machineInstance,
        currentDate: new Date(),
      });
    });

    this.httpServer.on(
      "post",
      "/setProductionOrder",
      async (params: any, body: any) => {
        
        const { CodItem, Item, ItemQuantity } = body;

        if (!CodItem || typeof CodItem !== "number") {
          return;
        }

        if (!Item || typeof Item !== "string") {
          return;
        }

        if (!ItemQuantity || typeof ItemQuantity !== "number") {
          return;
        }

        SetProductionOrder({
          machineInstance: this.machineInstance,
          newOrder: {
            amount: ItemQuantity,
            item: Item,
            id: CodItem,
          },
        });
      }
    );

    this.httpServer.on(
      "post",
      "/onoff/:code",
      async (params: any, body: any) => {
        TurnOnOff({
          machineInstance: this.machineInstance,
          onoff: params.code,
        });
      }
    );
  }
}
