import { Bus } from "src/buses/entities/bus.entity";
import { City } from "src/cities/entities/citite.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'trips', synchronize: false })
export class Trip {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => City, (city) => city.id)
    @JoinColumn({ name: 'from_city_id' })
    from_city: City;

    @ManyToOne(() => City, (city) => city.id)
    @JoinColumn({ name: 'to_city_id' })
    to_city: City;

    @ManyToOne(() => Bus, (bus) => bus.id)
    @JoinColumn({ name: 'bus_id' })
    bus: Bus;
}
