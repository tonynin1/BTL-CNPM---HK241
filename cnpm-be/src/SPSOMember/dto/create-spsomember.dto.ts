import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class createSPSOMember {


    spsoId?: number;
    
    @IsString()
    dob: string;
    
    @IsString()
    @IsOptional()
    address?: string;

}