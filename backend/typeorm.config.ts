import { config } from 'dotenv';
import { List } from 'src/list/list.entity';
import { Task } from 'src/task/task.entity';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'wunderlist',
  entities: [Task, List],
  migrations: ['src/migrations/**/*.ts'],
});
