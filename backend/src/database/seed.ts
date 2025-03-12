import { AppDataSource } from '../data-source';
import { seed } from './seeds/initial.seed';

AppDataSource.initialize()
  .then(async () => {
    try {
      await seed(AppDataSource);
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1);
  });
