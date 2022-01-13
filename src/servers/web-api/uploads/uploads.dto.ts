import { IsDefined, IsIn } from 'class-validator';
export class CreatePutSignedURLDto {
  @IsDefined({
    message: 'Extension is required',
  })
  @IsIn(['image/png', 'image/jpg', 'image/jpeg'], {
    message: 'Mimetype is required',
  })
  type: string;
}
