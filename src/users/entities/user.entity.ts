import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";


@Entity({name: 'users', synchronize: false})
export class User {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'timestamp' })
    created_at: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column({ type: 'boolean' })
    admin: boolean;

    @ManyToMany(() => Ticket, (ticket) => ticket.user, {
        cascade: true,
    })
    @JoinTable({
        name: "users_and_tickets",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "ticket_id",
            referencedColumnName: "id"

        }
    })
    tickets: Ticket[];

    addTicket(ticket: Ticket) {
        if (!this.tickets) {
            this.tickets = new Array<Ticket>();
        }
        this.tickets.push(ticket);
    }
}
