import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Messages } from './message';

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id_room: number

    @Column(() => Messages)
    message: string

    @CreateDateColumn()
    submit_message: Date
}