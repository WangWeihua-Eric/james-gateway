import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../modules/config/config.service';

export default function databaseInit(
  configService: ConfigService,
): TypeOrmModuleOptions {
  const databaseConfig = configService.get('database');
  return {
    type: 'mysql',
    autoLoadEntities: true,
    synchronize: false,
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
  };
}
