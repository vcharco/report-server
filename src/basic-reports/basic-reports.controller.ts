import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly service: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response) {
    response.setHeader('Content-Type', 'Application/pdf');

    const pdfDoc = await this.service.hello();
    pdfDoc.info.Title = 'HelloWorld.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:id')
  async employmentLetter(
    @Res() response: Response,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    response.setHeader('Content-Type', 'Application/pdf');

    const pdfDoc = await this.service.employmentLetter(id);
    pdfDoc.info.Title = 'EmploymentLetter.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async countriesReport(@Res() response: Response) {
    response.setHeader('Content-Type', 'Application/pdf');

    const pdfDoc = await this.service.countriesReport();
    pdfDoc.info.Title = 'Countries.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('orders/:id')
  async ordersReport(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    response.setHeader('Content-Type', 'Application/pdf');

    const pdfDoc = await this.service.ordersReport(id);
    pdfDoc.info.Title = 'Orders.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('chart')
  async chartReport(@Res() response: Response) {
    response.setHeader('Content-Type', 'Application/pdf');

    const pdfDoc = await this.service.chartReport();
    pdfDoc.info.Title = 'Chart.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
