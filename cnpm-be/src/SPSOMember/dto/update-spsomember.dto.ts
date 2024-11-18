import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class updateSPSOMember {

    @IsString()
    @IsOptional()
    dob?: string;
    
    @IsString()
    @IsOptional()
    address?: string;

}