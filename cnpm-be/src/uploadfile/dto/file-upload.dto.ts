// file-upload.dto.ts
import { IsInt, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class FileUploadDto {
  @ApiProperty({
    description: 'Number of copies',
    example: '10',
  })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  docQuantity: number;

  @ApiProperty({
    description: 'ID of the print',
    example: '1',
  })
  @IsInt()
  @IsPositive()
  printerId: number;

  @ApiProperty({
    description: 'attribute of document',
    example: 'A4',
  })
  
  attribute: string;

  @ApiProperty({
    description: 'ID of customer',
    example: '1',
  })
  @IsInt()
  @IsPositive()
  customerId: number;

  @ApiProperty({
    description: 'The files to be uploaded',
    type: 'string',
    format: 'binary',
    isArray: true, 
  })
  files: any[];

}




