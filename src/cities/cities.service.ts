import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { HttpService } from '@nestjs/axios';
import { City } from './entities/citite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private readonly citiesRepository: Repository<City>,
    private readonly httpService: HttpService,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const newCity = new City();
    await this.httpService.get(`https://api.api-ninjas.com/v1/geocoding?city=${createCityDto.name}&country=ukraine`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'gXOBWLE4XasnBlXg/8fprQ==T7RApdt0O99qEO8r',
      }
    }).toPromise().then((res) => {
      newCity.name = createCityDto.name;
      newCity.lat = res.data[0].latitude;
      newCity.lng = res.data[0].longitude;
    }).catch(() => {
      throw new NotFoundException('There is no city with given name');
    })
    return this.citiesRepository.save(newCity);
  }

  async findAll(): Promise<City[]> {
    return this.citiesRepository.find();
  }

  async findOne(id: number): Promise<City> {
    const city = await this.citiesRepository.findOne({
      where: {
        id,
      }
    });
    if (!city) throw new NotFoundException('There is no city with given id');
    return city;
  }

  async remove(id: number): Promise<City> {
    const city = await this.findOne(id);
    await this.citiesRepository.delete(id);
    return city;
  }
}
