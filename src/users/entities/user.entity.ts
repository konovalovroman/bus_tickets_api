import { Column, Entity, PrimaryColumn } from "typeorm";


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
}
