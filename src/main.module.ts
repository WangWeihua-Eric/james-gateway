import { Module } from '@nestjs/common';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { ConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseInit from './database';
import { ConfigService } from './modules/config/config.service';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    /**
     * 配置加在永远放在第一个执行
     */
    ConfigModule,

    /**
     * 数据库连接
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseInit,
      inject: [ConfigService],
    }),

    /**
     * 加在各类 module
     */
    TestModule,

    /**
     * 监控检查永远放在最后执行
     */
    HealthCheckModule,
  ],
})
export class MainModule {}
