import { config } from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';

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
  entities: [
    resolve(__dirname, '../src/common/users/user.entity'),
    resolve(__dirname, '../src/lists/list.entity'),
    resolve(__dirname, '../src/tasks/task.entity'),
  ],
  migrations: [resolve(__dirname, 'migrations/*.ts')],
  subscribers: [resolve(__dirname, '../src/subscribers/**/*.ts')],
});
