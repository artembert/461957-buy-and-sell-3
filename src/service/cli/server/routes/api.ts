const offersRouter = require(`./offers`);
import {Router} from "express";

// @ts-ignore
const apiRouter = new Router();
apiRouter.use(`/offers`, offersRouter);

export default apiRouter;
