import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfiguration } from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';
import { CountriesModule } from './countries/countries.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';

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
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    EmployeesModule,
    BasicReportsModule,
    PrinterModule,
    CountriesModule,
    OrdersModule,
    ProductsModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
