import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { List } from './lists/list.entity';
import { Task } from './tasks/task.entity';
import { User } from './users/user.entity';

config(); // Load environment variables

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'wunderlist',
  synchronize: process.env.NODE_ENV !== 'production', // Auto-sync database in development
  logging: process.env.NODE_ENV !== 'production',
  entities: [User, List, Task],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});
