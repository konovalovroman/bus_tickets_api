import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'buses', synchronize: false })
export class Bus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    license: string;

    @Column({ type: 'integer' })
    number_of_seats: number;
}
