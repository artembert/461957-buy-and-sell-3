import {promises} from "fs";
import {Router, Request, Response} from "express";
import {MOCK_FILE_PATH} from "../../../../constants";
import type {Offer} from "../../../../types/offer";
// @ts-ignore
const offersRouter = new Router();

offersRouter.get(`/`, async (req: Request, res: Response) => {
  let offersContent;
  try {
    const rawOffers = await promises.readFile(MOCK_FILE_PATH, `utf8`);
    offersContent = JSON.parse(rawOffers) as Offer[];
  } catch (e) {
    offersContent = [];
  }

  res.json(offersContent);
});

export default offersRouter;
