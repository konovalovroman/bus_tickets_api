import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto) {
      const newUser = await this.usersRepository.create({
        ...createUserDto,
        admin: false
      });
      return this.usersRepository.save(newUser);
    }

    async findAll() {
      return await this.usersRepository.find();
    }

    async findOne(id: number) {
      const user = await this.usersRepository.findOne({
        where: {
          id,
        }
      });
      if (!user) throw new NotFoundException('There is no user with given id.');
      return user;
    }

    async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
      const user = await this.findOne(id);
      Object.assign(user, updateUserDto);
      return this.usersRepository.save(user);
    }

    async remove(id: number) {
      const user = await this.findOne(id);
      await this.usersRepository.delete(id);
      return user;
    }

    async giveAdmin(id: number) {
      const user = await this.findOne(id);
      return this.usersRepository.save({...user, admin: true});
    }

    async removeAdmin(id: number) {
      const user = await this.findOne(id);
      return this.usersRepository.save({...user, admin: false});
    }
}
