import { join } from 'path';
import { DataSource } from 'typeorm';
import { TYPEORM } from 'src/common/constants/global';

export default new DataSource({
  ...TYPEORM,
  type: 'postgres',
  entities: [join(__dirname, '..', '..', '**', '*.entity.{ts, js}')],
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
});
