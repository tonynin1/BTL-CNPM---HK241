// file-upload.dto.ts
import { IsInt, IsArray, ArrayNotEmpty, IsPositive, IsOptional } from 'class-validator';

export class FileUploadDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  docQuantities: number[];

  @IsInt()
  @IsPositive()
  customerId: number;


  @IsInt()
  @IsPositive()
  printerId: number[];
}


