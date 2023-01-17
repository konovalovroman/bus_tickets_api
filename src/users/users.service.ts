import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TicketsService } from 'src/tickets/tickets.service';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User) private readonly usersRepository: Repository<User>,
      private readonly ticketsService: TicketsService,
    ) {}

    async create(createUserDto: CreateUserDto) {
      const newUser = await this.usersRepository.create({
        ...createUserDto,
        admin: false,
        tickets: []
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

    async buyTicket(userId: number, ticketId: number) { //temp method
      const user = await this.findOne(userId);
      const ticket = await this.ticketsService.findOne(ticketId);
      user.addTicket(ticket);
      return this.usersRepository.save(user);
      // return user;
    } 
}
