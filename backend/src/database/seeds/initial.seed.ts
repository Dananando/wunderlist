import { DataSource } from 'typeorm';
import { PasswordService } from '../../auth/password.service';
import { List } from '../../lists/list.entity';
import { Task } from '../../tasks/task.entity';
import { User } from '../../users/user.entity';

export async function seed(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const listRepository = dataSource.getRepository(List);
  const taskRepository = dataSource.getRepository(Task);
  const passwordService = new PasswordService();

  // Create user
  const hashedPassword = await passwordService.hashPassword('password');
  const user = await userRepository.save({
    email: 'batman@libheros.com',
    hashedPassword,
    firstname: 'Batman',
    lastname: 'Libheros',
  });

  // Create lists
  const lists = await Promise.all([
    listRepository.save({
      name: 'Work',
      userId: user.id,
    }),
    listRepository.save({
      name: 'Personal',
      userId: user.id,
    }),
    listRepository.save({
      name: 'Shopping',
      userId: user.id,
    }),
  ]);

  // Create tasks
  const tasks = [
    {
      shortDescription: 'Complete project documentation',
      longDescription:
        'Write comprehensive documentation for the current project',
      dueDate: new Date('2024-03-20'),
      listId: lists[0].id,
    },
    {
      shortDescription: 'Review pull requests',
      longDescription: 'Review and merge pending pull requests',
      dueDate: new Date('2024-03-19'),
      listId: lists[0].id,
    },
    {
      shortDescription: 'Team meeting',
      longDescription: 'Weekly team sync meeting',
      dueDate: new Date('2024-03-18'),
      listId: lists[0].id,
    },
    {
      shortDescription: 'Deploy to production',
      longDescription: 'Deploy the latest changes to production environment',
      dueDate: new Date('2024-03-21'),
      listId: lists[0].id,
    },

    {
      shortDescription: 'Gym workout',
      longDescription: '1 hour cardio and strength training',
      dueDate: new Date('2024-03-19'),
      listId: lists[1].id,
    },
    {
      shortDescription: 'Read book',
      longDescription: 'Read chapter 5 of the current book',
      dueDate: new Date('2024-03-20'),
      listId: lists[1].id,
    },
    {
      shortDescription: 'Meditation',
      longDescription: '15 minutes morning meditation',
      dueDate: new Date('2024-03-18'),
      listId: lists[1].id,
    },

    // Shopping tasks
    {
      shortDescription: 'Buy groceries',
      longDescription: 'Get weekly groceries from the supermarket',
      dueDate: new Date('2024-03-19'),
      listId: lists[2].id,
    },
    {
      shortDescription: 'Order new shoes',
      longDescription: 'Order new running shoes online',
      dueDate: new Date('2024-03-22'),
      listId: lists[2].id,
    },
    {
      shortDescription: 'Get birthday gift',
      longDescription: 'Buy birthday gift for friend',
      dueDate: new Date('2024-03-23'),
      listId: lists[2].id,
    },
  ];

  await taskRepository.save(tasks);

  console.log('Database seeded successfully!');
  console.log('Demo user credentials:');
  console.log('Email: batman@libheros.com');
  console.log('Password: password');
}
