import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cities', synchronize: false })
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'real' })
    lat: number;

    @Column({ type: 'real' })
    lng: number;
}
