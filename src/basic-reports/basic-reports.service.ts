import { Injectable } from '@nestjs/common';
import { CountriesService } from 'src/countries/countries.service';
import { EmployeesService } from 'src/employees/employees.service';
import { PrinterService } from 'src/printer/printer.service';
import {
  getHelloReport,
  getEmploymentLetterReport,
  EmploymentLetterReportProps,
  CountriesReportProps,
  getCountriesReport,
} from 'src/reports';
import { getOrdersReport, OrdersReportProps } from 'src/reports/orders.report';

@Injectable()
export class BasicReportsService {
  constructor(
    private readonly printService: PrinterService,
    private readonly employeesService: EmployeesService,
    private readonly countriesService: CountriesService,
  ) {}

  async hello() {
    const docDefinition = getHelloReport({ name: 'John' });
    const doc = this.printService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetter(id: number) {
    const employee = await this.employeesService.findOne(id);

    const props: EmploymentLetterReportProps = {
      name: employee.name,
      startDate: employee.startDate,
      position: employee.position,
      hoursPerDay: employee.hoursPerDay,
      workSchedule: employee.workSchedule,
      employerCompany: 'Codie S.L.',
      employerName: 'Pepe Pérez',
      employerPosition: 'Gerente de RRHH',
    };

    const docDefinition = getEmploymentLetterReport(props);
    const doc = this.printService.createPdf(docDefinition);
    return doc;
  }

  async countriesReport() {
    const countries = await this.countriesService.findAll();

    const props: CountriesReportProps = {
      countries: countries,
    };

    const docDefinition = getCountriesReport(props);
    const doc = this.printService.createPdf(docDefinition);
    return doc;
  }

  async ordersReport(id: number) {
    const props: OrdersReportProps = {};

    const docDefinition = getOrdersReport(props);
    const doc = this.printService.createPdf(docDefinition);
    return doc;
  }
}
