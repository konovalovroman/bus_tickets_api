import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateTicketDto } from './dto/create-update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { TripsService } from 'src/trips/trips.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private readonly ticketsRepository: Repository<Ticket>,
    private readonly tripsService: TripsService,
  ) {}

  async create(createTicketDto: CreateUpdateTicketDto): Promise<Ticket> {
    const { departure_date, arrival_date, trip_id, price } = createTicketDto;
    const newTicket = new Ticket();
    newTicket.trip = await this.tripsService.findOne(trip_id);
    newTicket.departure_date = departure_date;
    newTicket.arrival_date = arrival_date;
    newTicket.price = price;
    return this.ticketsRepository.save(newTicket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      relations: [
        'trip'
      ],
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOne({
      where: {
        id,
      },
      relations: [
        'trip'
      ],
    })
    if (!ticket) throw new NotFoundException('There is no ticket with given id.');
    return ticket;
  }

  async update(id: number, updateTicketDto: Partial<CreateUpdateTicketDto>): Promise<Ticket> {
    const { trip_id, ...rest } = updateTicketDto;
    const ticket = await this.findOne(id);
    if (trip_id) {
      ticket.trip = await this.tripsService.findOne(trip_id);
    }
    Object.assign(ticket, rest);
    return this.ticketsRepository.save(ticket);
  }

  async remove(id: number): Promise<Ticket> {
    const ticket = await this.findOne(id);
    await this.ticketsRepository.delete(id);
    return ticket;
  }
}
