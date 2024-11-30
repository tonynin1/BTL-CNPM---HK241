import { IsInt } from 'class-validator';

export class FileUploadDto {
  @IsInt()
  userId: number;
}
