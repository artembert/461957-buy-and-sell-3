import { Request, Response, Router } from "express";
import OffersService from "../services/offers.service";
import {HttpCodes} from "../../../../shared/http-codes";
import {Offer} from "../../../../types/offer";
import {ValidationError} from "../errors/validation-error";

const offersRouter: Router = Router();
const offersService: OffersService = new OffersService();

offersRouter.get(`/`, async (req: Request, res: Response) => {
  res.json(await offersService.getOffers());
});
offersRouter.get(`/:id`, async (req: Request, res: Response) => {
  const offerId = req.params.id;
  try {
    const offer = await offersService.getOfferById(offerId.toString());
    if (offer !== null) {
      res.json(offer);
    } else {
      res.status(HttpCodes.NOT_FOUND).send();
    }
  } catch (e) {
    console.log(e);
    res.status(HttpCodes.BAD_REQUEST).send();
  }
});
offersRouter.post(`/`, async (req: Request, res: Response) => {
  const offer = req.body as Offer;
  try {
    res.send(await offersService.addOffer(offer));
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(HttpCodes.BAD_REQUEST).send(e.message);
    }
    res.status(HttpCodes.BAD_REQUEST).send();
  }
});

export default offersRouter;
