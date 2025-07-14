// src/users/user.service.ts
import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) { }

    async findByUsername(username: string) {
        return this.userModel.findOne({ username });
    }

    async create(userData: any) {
        const createdUser = new this.userModel(userData);
        return createdUser.save();
    }

    async onModuleInit() {
        const root = await this.userModel.findOne({ username: 'root' });
        if (!root) {
            const hashed = await bcrypt.hash('root', 10);
            await this.userModel.create({ username: 'root', password: hashed, role: 'admin' });
            console.log('Root user created');
        }
    }

    async validateUser(username: string, password: string): Promise<string> {
        const user = await this.userModel.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.jwtService.sign({ username, role: user.role });
    }

    async createUser(username: string, password: string, creator: any) {
        if (creator.role !== 'admin') {
            throw new UnauthorizedException('Only root can create users');
        }
        const hashed = await bcrypt.hash(password, 10);
        return this.userModel.create({ username, password: hashed });
    }

    async findUser(username: string) {
        return this.userModel.findOne({ username });
    }

    async findAll() {
        return this.userModel.find();
    }
}