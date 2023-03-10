import { IsPhoneNumber, IsString } from "class-validator";


export class UpdateUserDto {
    @IsString()
    firstName√•: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsPhoneNumber('UA')
    phone: string;

    @IsString()
    password: string;
}
