import { IsDate, IsDateString, IsDecimal, IsInt, IsNumber, IsString } from "class-validator";

export class CreateUpdateTicketDto {
    @IsDateString()
    departure_date: string;

    @IsDateString()
    arrival_date: string;

    @IsInt()
    trip_id: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;
}