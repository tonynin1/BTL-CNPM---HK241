import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString } from 'class-validator';

export class UpdatePrintRequestDto {
  @IsString()
  @IsOptional()
  attributes?: string; 
  @IsOptional()
  startTime?: string; // Thời gian bắt đầu in

  @IsDateString()
  @IsOptional()
  endTime?: string; // Thời gian kết thúc in

  @IsString()
  @IsOptional()
  poStatus?: string; // Trạng thái yêu cầu (VD: "Pending", "Completed")

  @IsInt()
  @IsOptional()
  numCopies?: number; // Số lượng bản in
}
