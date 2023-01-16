import { IsInt, IsNumber } from "class-validator";

export class CreateUpdateTripDto {
    @IsNumber()
    @IsInt()
    from_city_id: number;

    @IsNumber()
    @IsInt()
    to_city_id: number;

    @IsNumber()
    @IsInt()
    bus_id: number;
}