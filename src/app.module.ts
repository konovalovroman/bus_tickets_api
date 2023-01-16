import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BusesModule } from './buses/buses.module';
import { CitiesModule } from './cities/cities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { City } from './cities/entities/citite.entity';
import { Bus } from './buses/entities/bus.entity';

@Module({
  imports: [
    UsersModule, 
    BusesModule, 
    CitiesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'bus_tickets',
      username: 'knvlvr',
      password: '',
      synchronize: false,
      entities: [
        User,
        City,
        Bus,
      ],
    })],
})

export class AppModule {}
