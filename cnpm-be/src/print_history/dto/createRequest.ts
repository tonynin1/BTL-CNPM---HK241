import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreatePrintRequestDto {
  @IsString()
  @IsNotEmpty()
  attributes: string; // Mô tả yêu cầu in (VD: "Color Print, A4")

  @IsDateString()
  @IsNotEmpty()
  startTime: string; // Thời gian bắt đầu in

  @IsDateString()
  @IsNotEmpty()
  endTime: string; // Thời gian kết thúc in

  @IsString()
  @IsOptional()
  poStatus?: string; // Trạng thái yêu cầu (VD: "Pending", "Completed")

  @IsInt()
  @IsNotEmpty()
  numCopies: number; // Số lượng bản in

  @IsInt()
  @IsNotEmpty()
  customerId: number; // ID khách hàng

  @IsInt()
  @IsNotEmpty()
  docId: number; // ID tài liệu

  @IsInt()
  @IsNotEmpty()
  printerId: number; // ID máy in
}
