import { join } from 'path';
import { TYPEORM } from '../../src/common/constants/global';

export default {
  ...TYPEORM,
  type: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  seeds: ['dist/database/seeds/*.js'],
  factories: ['dist/database/factories/*.js'],
  synchronize: false,
  autoLoadEntities: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepConnectionAlive: true,
  logging: true,
  cli: {
    migrationDir: join(__dirname, '..', '..', 'database', 'migrations'),
  },
};
