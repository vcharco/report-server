import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfiguration } from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [AppConfiguration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('dbHost', 'localhost'),
        port: configService.get<number>('dbPort', 5432),
        database: configService.get<string>('dbName', 'postgres'),
        username: configService.get<string>('dbUser', 'postgres'),
        password: configService.get<string>('dbPass', 'postgres'),
        autoLoadEntities: false,
        synchronize: false,
      }),
    }),
    EmployeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
