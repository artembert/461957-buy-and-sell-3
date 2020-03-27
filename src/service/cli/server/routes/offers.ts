import { Request, Response, Router } from "express";
import OffersService from "../services/offers.service";
import { HttpCodes } from "../../../../shared/http-codes";
import { Offer } from "../../../../types/offer";
import { OfferValidationResponse, ValidationError } from "../../../../types/offer-validation-response";

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
  const validationResponse = getOfferValidationResponse(offer);
  if (validationResponse !== null) {
    res.status(HttpCodes.BAD_REQUEST).send(validationResponse);
  }
  try {
    res.send(await offersService.addOffer(offer));
  } catch (e) {
    res.status(HttpCodes.BAD_REQUEST).send();
  }
});

function getOfferValidationResponse(offer: Offer): OfferValidationResponse | null {
  const validationResponse: OfferValidationResponse = {};
  if (!offer.picture) {
    validationResponse.picture = ValidationError.INVALID;
  }
  if (!offer.title) {
    validationResponse.title = ValidationError.INVALID;
  }
  if (!offer.type) {
    validationResponse.type = ValidationError.INVALID;
  }
  if (!offer.description) {
    validationResponse.description = ValidationError.INVALID;
  }
  if (!offer.category.length) {
    validationResponse.category = ValidationError.INVALID;
  }
  if (!offer.sum) {
    validationResponse.sum = ValidationError.INVALID;
  }

  if (Object.keys(validationResponse).length) {
    return validationResponse;
  }
  return null;
}

export default offersRouter;
