import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUpdateTripDto } from './dto/create-update-trip.dto';
import { Trip } from './entities/trip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitiesService } from 'src/cities/cities.service';
import { BusesService } from 'src/buses/buses.service';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private readonly tripsRepository: Repository<Trip>,
    private readonly citiesService: CitiesService,
    private readonly busesService: BusesService,
  ) {}

  async create(createTripDto: CreateUpdateTripDto): Promise<Trip> {
    const { from_city_id, to_city_id, bus_id } = createTripDto;
    if (from_city_id === to_city_id) throw new UnprocessableEntityException('From_city can not be equal to To_city');
    const newTrip = new Trip();
    newTrip.from_city = await this.citiesService.findOne(from_city_id);
    newTrip.to_city = await this.citiesService.findOne(to_city_id);
    newTrip.bus = await this.busesService.findOne(bus_id);
    return await this.tripsRepository.save(newTrip);
  }

  async findAll(): Promise<Trip[]> {
    return this.tripsRepository.find({
      relations: [
        'from_city',
        'to_city',
        'bus',
      ],
    });
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({
      where: {
        id,
      },
      relations: [
        'from_city',
        'to_city',
        'bus',
      ]
    });
    if (!trip) throw new NotFoundException('There is no trip with given id');
    return trip;
  }

  async update(id: number, updateTripDto: Partial<CreateUpdateTripDto>): Promise<Trip> {
    const {from_city_id, to_city_id, bus_id} = updateTripDto;
    const trip = await this.findOne(id);
    if (from_city_id && to_city_id && from_city_id === to_city_id) {
      throw new UnprocessableEntityException('From_city can not be equal to To_city');
    }
    if (from_city_id) {
      trip.from_city = await this.citiesService.findOne(from_city_id);
    }
    if (to_city_id) {
      trip.to_city = await this.citiesService.findOne(to_city_id);
    }
    if (bus_id) {
      trip.bus = await this.busesService.findOne(bus_id);
    }
    return await this.tripsRepository.save(trip);
  }

  async remove(id: number): Promise<Trip> {
    const trip = await this.findOne(id);
    await this.tripsRepository.delete(id);
    return trip;
  }
}
