import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../common/users/user.entity';
import { Task } from '../tasks/task.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Task, (task) => task.list)
  tasks: Task[];
}
