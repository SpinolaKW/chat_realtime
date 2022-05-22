import { Column, CreateDateColumn} from 'typeorm';

export class Messages {

    @Column()
    message: string

    @Column()
    id_user: number

    @CreateDateColumn()
    submit_message: Date
}