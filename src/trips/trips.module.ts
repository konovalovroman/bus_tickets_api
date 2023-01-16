import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { CitiesModule } from 'src/cities/cities.module';
import { BusesModule } from 'src/buses/buses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    CitiesModule,
    BusesModule,
  ],
  controllers: [TripsController],
  providers: [
    TripsService,
  ],
  exports: [TripsService]
})
export class TripsModule {}
