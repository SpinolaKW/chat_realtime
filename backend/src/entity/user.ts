import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserPerson {
    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    name_user: string

    @Column()
    room_user: string

    @CreateDateColumn()
    create_user_at: Date
}
