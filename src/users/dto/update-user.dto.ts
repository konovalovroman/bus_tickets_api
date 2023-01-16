import { IsPhoneNumber, IsString } from "class-validator";


export class UpdateUserDto {
    @IsString()
    firstNameå: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsPhoneNumber('UA')
    phone: string;

    @IsString()
    password: string;
}
