import { Controller, Get, Post, Put, Request, Response } from '@decorators/express';
import { ExpressRequest, ExpressResponse } from '@interfaces/express.interface';
import { Authenticated } from '@middlewares/authentication.middleware';
import { Logger } from '@providers/logger.provider';
import { CreatePutSignedURLDto } from '@servers/web-api/uploads/uploads.dto';
import { services } from '@services/index.service';
import { validate } from '@utils/validate';

@Controller('/uploads', [Authenticated])
export class UploadsController {
  private readonly logger = Logger('Uploads Controller');

  @Put('/')
  async createPutSignedURL(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse
  ) {
    const body = await validate(CreatePutSignedURLDto, request.body);
    console.log(body, request.body);
    const signedUrl = await services.s3.createPutSignedUrl(request);
    return response.status(200).json(signedUrl);
  }

  // getSignedPutURL = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const signedUrl = await services.s3.createPutSignedUrl(req);
  //     return res.status(200).json(signedUrl);
  //   } catch (error) {
  //     this.logger.fatal(error);
  //     next(error);
  //   }
  // };
}
