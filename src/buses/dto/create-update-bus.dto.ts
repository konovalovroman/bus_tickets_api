import { IsNumber, IsString } from "class-validator";

export class CreateUpdateBusDto {
    @IsString()
    brand: string;

    @IsString()
    model: string;

    @IsString()
    license: string;

    @IsNumber()
    number_of_seats: number;
}
