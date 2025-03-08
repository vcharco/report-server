import { Injectable } from '@nestjs/common';
import { CountriesService } from 'src/countries/countries.service';
import { EmployeesService } from 'src/employees/employees.service';
import { OrdersService } from 'src/orders/orders.service';
import { PrinterService } from 'src/printer/printer.service';
import {
  getHelloReport,
  getEmploymentLetterReport,
  EmploymentLetterReportProps,
  CountriesReportProps,
  getCountriesReport,
} from 'src/reports';
import {
  getOrdersReport,
  OrdersReportProductProp,
  OrdersReportProps,
} from 'src/reports/orders.report';

@Injectable()
export class BasicReportsService {
  constructor(
    private readonly printService: PrinterService,
    private readonly employeesService: EmployeesService,
    private readonly countriesService: CountriesService,
    private readonly ordersService: OrdersService,
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
    const order = await this.ordersService.findOne(id);
    const orderDetails = order.orderDetails;

    const products = orderDetails.map((od) => ({
      productId: od.product.productId + '',
      description: od.product?.productName || '',
      quantity: od.quantity || 0,
      price: Number(od.product.price) ?? 0,
    }));

    const orderParsedDate = order.orderDate
      ? new Date(order.orderDate)
      : new Date();

    const orderDate = orderParsedDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const dueDate = new Date(orderParsedDate);
    dueDate.setDate(orderParsedDate.getDate() + 7);
    const payBeforeDate = dueDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const customerDetails = order.customer;

    const props: OrdersReportProps = {
      order: id,
      orderDate: orderDate,
      payBeforeDate: payBeforeDate,
      customerName: order.customer.customerName || '',
      contactName: order.customer.contactName || '',
      customerAddress: order.customer.address || '',
      products: products,
    };

    const docDefinition = getOrdersReport(props);
    const doc = this.printService.createPdf(docDefinition);
    return doc;
  }
}
