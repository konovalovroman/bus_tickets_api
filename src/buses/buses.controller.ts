import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateUpdateBusDto } from './dto/create-update-bus.dto';
import { Bus } from './entities/bus.entity';

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Post()
  create(@Body() createBusDto: CreateUpdateBusDto): Promise<Bus> {
    return this.busesService.create(createBusDto);
  }

  @Get()
  findAll(): Promise<Bus[]> {
    return this.busesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Bus> {
    return this.busesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: Partial<CreateUpdateBusDto>): Promise<Bus> {
    return this.busesService.update(+id, updateBusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Bus> {
    return this.busesService.remove(+id);
  }
}
