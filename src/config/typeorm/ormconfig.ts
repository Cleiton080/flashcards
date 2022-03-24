import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { TYPEORM } from '../../common/constants/global';

export default {
  ...TYPEORM,
  type: 'postgres',
  entities: [join(__dirname, '..', '..', '*.entity.{ts, js}')],
  migrations: [join(__dirname, '..', '..', 'migrations', '*.{ts, js}')],
  synchronize: false,
  autoLoadEntities: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepConnectionAlive: true,
  logging: true,
  cli: {
    migrationDir: join(__dirname, '..', '..', 'migrations'),
  },
} as ConnectionOptions;
