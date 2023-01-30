import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('local/signin')
    signinLocal(@Body() authDto: AuthDto): Promise<any> {
        return this.authService.signInLocal(authDto);
    }

    @Post('local/signup')
    signUpLocal(@Body() authDto: AuthDto): Promise<any> {
        return this.authService.signUpLocal(authDto);
    }
}
