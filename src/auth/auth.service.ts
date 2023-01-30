import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signInLocal(authDto: AuthDto): Promise<any> {
        const user = await this.usersService.findOneByEmail(authDto.email);
        if (!user) throw new UnauthorizedException('Credentials incorrect');
        if (user.password !== authDto.password) throw new UnauthorizedException('Credentials incorrect');
        return this.signUser(user.id, user.email, user.admin);
    }

    async signUpLocal(authDto: AuthDto): Promise<any> {}

    signUser(userId: number, email: string, admin: boolean): string {
        return this.jwtService.sign({
            sub: userId,
            email,
            admin
        });
    }
}
