import ExpressAdapter from "./infra/api/ExpressAdapter";
import Router from "./infra/api/Router";
import machine from "./entity/Machine";

const httpServer = new ExpressAdapter();
const router = new Router(httpServer, machine);

router.init();

httpServer.listen(3000);
