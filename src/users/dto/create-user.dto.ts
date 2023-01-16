import { IsEmail, IsPhoneNumber, IsString } from "class-validator";


export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsPhoneNumber('UA')
    phone: string;

    @IsString()
    password: string;
}
