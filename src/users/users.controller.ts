import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post(':id/setAdmin')
  giveAdmin(@Param('id') id: string) {
    return this.usersService.giveAdmin(+id);
  }

  @Post(':id/removeAdmin')
  removeAdmin(@Param('id') id: string) {
    return this.usersService.removeAdmin(+id);
  }

  @Post('buy_ticket/:userId/:ticketId') // temp route
  buyTicket(@Param('userId') userId: string, @Param('ticketId') ticketId: string) {
    return this.usersService.buyTicket(+userId, +ticketId);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<UpdateUserDto>) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
