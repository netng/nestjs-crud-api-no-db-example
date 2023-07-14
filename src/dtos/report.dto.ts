import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ReportType } from "src/data";

export class CreateReportDto {
    @IsNumber({maxDecimalPlaces: 1}, {message: 'amount harus angka'})
    amount: number;

    @IsString({message: 'source harus string'})
    @IsNotEmpty()
    source: string;
}

export class UpdateReportDto {
    @IsOptional()
    @IsNumber({maxDecimalPlaces: 1}, {message: 'amount harus angka'})
    amount: number;

    @IsOptional()
    @IsString({message: 'source harus string'})
    @IsNotEmpty()
    source: string;
}

export class ReportResponseDto {
    id: string;
    source: string;
    amount: number;

    @Expose({name: 'createdAt'})
    transformCreatedAt() {
        return this.created_at
    }
        
    @Exclude()
    
    created_at: Date;
    @Exclude()
    updated_at: Date; 

    type: ReportType;

    constructor(partial: Partial<ReportResponseDto>) {
        Object.assign(this, partial);
    }


}