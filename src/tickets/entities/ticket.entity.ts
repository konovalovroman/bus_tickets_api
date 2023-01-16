import { Trip } from "src/trips/entities/trip.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tickets', synchronize: false })
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    created_at: string;

    @Column({ type: 'timestamp' })
    departure_date: string;

    @Column({ type: 'timestamp' })
    arrival_date: string;

    @Column({ type: 'decimal' })
    price: number;

    @ManyToOne(() => Trip, (trip) => trip.id)
    @JoinColumn({ name: 'trip_id' })
    trip: Trip;
}
