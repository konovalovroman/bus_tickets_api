import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateUpdateTripDto } from './dto/create-update-trip.dto';
import { Trip } from './entities/trip.entity';
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: CreateUpdateTripDto): Promise<Trip> {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll(): Promise<Trip[]> {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: Partial<CreateUpdateTripDto>): Promise<Trip> {
    return this.tripsService.update(+id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.remove(+id);
  }
}
