import { join } from 'path';
import { DataSource } from 'typeorm';
import { TYPEORM } from '../../src/common/constants/global';

export default new DataSource({
  ...TYPEORM,
  type: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  autoLoadEntities: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepConnectionAlive: true,
  logging: true,
  cli: {
    migrationDir: join(__dirname, '..', '..', 'database', 'migrations'),
  },
});
