import { Controller, Post, Body, UnauthorizedException, Get } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService) { }

    @Post('register')
    async register(@Body() body: any) {
        const { username, password } = body;

        // Solo permitir crear el usuario root si no existe
        const existing = await this.usersService.findByUsername(username);
        if (existing) {
            throw new UnauthorizedException('Usuario ya existe');
        }

        const isRoot = username === 'root' && password === 'root';

        if (!isRoot) {
            throw new UnauthorizedException('Solo se puede registrar el usuario root');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create({ username, password: hashedPassword });

        return {
            message: 'Usuario root creado correctamente',
            user,
        };
    }
    @Post('login')
    async login(@Body() body: any) {
        const { username, password } = body;

        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { sub: user._id, username: user.username, role: user.role };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
            user: {
                username: user.username,
                role: user.role,
            },
        };
    }
    @Get()
    async findAll() {
        const users = await this.usersService.findAll(); // Necesitas crear este método si no existe
        return users;
    }
}
