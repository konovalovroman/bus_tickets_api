import { Logger } from "@nestjs/common";
import { Trip } from "src/trips/entities/trip.entity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Table } from "typeorm";

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

    @ManyToMany(() => User, (user) => user.tickets)
    @JoinTable({
        name: "users_and_tickets",
        joinColumn: {
            name: "ticket_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    user: User;
}
