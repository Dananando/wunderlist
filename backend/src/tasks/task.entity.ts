import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../lists/list.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortDescription: string;

  @Column({ nullable: true })
  longDescription: string;

  @Column({ nullable: true })
  dueDate: Date;

  @Column()
  listId: number;

  @ManyToOne(() => List, (list) => list.tasks)
  list: List;
}
