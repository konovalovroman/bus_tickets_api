import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/citite.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() createCityeDto: CreateCityDto): Promise<City> {
    return this.citiesService.create(createCityeDto);
  }

  @Get()
  findAll(): Promise<City[]> {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<City> {
    return this.citiesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<City> {
    return this.citiesService.remove(+id);
  }
}
