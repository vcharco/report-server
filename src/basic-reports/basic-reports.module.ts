import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { EmployeesModule } from 'src/employees/employees.module';
import { PrinterModule } from 'src/printer/printer.module';
import { CountriesModule } from 'src/countries/countries.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [PrinterModule, EmployeesModule, CountriesModule, OrdersModule],
  providers: [BasicReportsService],
  controllers: [BasicReportsController],
})
export class BasicReportsModule {}
