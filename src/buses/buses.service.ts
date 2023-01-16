import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateBusDto } from './dto/create-update-bus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus) private readonly busesRepository: Repository<Bus>,
  ) {}

  async create(createBusDto: CreateUpdateBusDto) {
    const newBus = await this.busesRepository.create(createBusDto);
    return this.busesRepository.save(newBus);
  }

  async findAll() {
    return await this.busesRepository.find();
  }

  async findOne(id: number) {
    const bus = await this.busesRepository.findOne({
      where: {
        id,
      }
    })
    if (!bus) throw new NotFoundException('There is no bus with given id');
    return bus;
  }

  async update(id: number, updateBusDto: Partial<CreateUpdateBusDto>) {
    const bus = await this.findOne(id);
    Object.assign(bus, updateBusDto);
    return await this.busesRepository.save(bus); 
  }

  async remove(id: number) {
    const bus = await this.findOne(id);
    await this.busesRepository.delete(id);
    return bus;
  }
}
