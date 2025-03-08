import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ReportHeader } from './layout/header.report';
import { ReportFooter } from './layout/footer.report';

export interface OrdersReportProps {
  tax?: number;
  order: number;
  orderDate: string;
  payBeforeDate: string;
  customerName: string;
  contactName: string;
  customerAddress: string;
  products: OrdersReportProductProp[];
}

export interface OrdersReportProductProp {
  productId: string;
  description: string;
  quantity: number;
  price: number;
}

export const getOrdersReport = (
  props: OrdersReportProps,
): TDocumentDefinitions => {
  const subtotal = props.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  const total = subtotal * (props.tax || 1.21);

  const dd: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 100],
    header: ReportHeader('Recibo de compra'),
    content: [
      {
        columns: [
          {
            bold: true,
            stack: [
              { text: 'Tucan Code' },
              { text: ' ' },
              { text: '15 Montgomery Str, Suite 100, ' },
              { text: 'Ottawa ON K2Y 9X1, CANADA' },
              { text: 'BN: 12783671823' },
              {
                text: 'https://devtalles.com',
                link: 'https://devtalles.com',
                bold: true,
              },
            ],
          },
          {
            alignment: 'right',
            stack: [
              { text: ' ' },
              { text: `Recibo No#: ${props.order}` },
              { text: `Fecha del recibo: ${props.orderDate}` },
              { text: `Pagar antes de: ${props.payBeforeDate}` },
            ],
          },
        ],
      },
      {
        qr: 'https://devtalles.com',
        fit: 80,
        marginTop: 5,
        alignment: 'right',
      },
      {
        text: 'Cobrar a:',
        bold: true,
        marginTop: 10,
      },
      {
        margin: [0, 5, 0, 10],
        fontSize: 10,
        stack: [
          { text: `Razón Social: ${props.customerName}` },
          { text: props.contactName },
          { text: props.customerAddress },
        ],
      },
      {
        layout: 'emptyWithHeaderSeparator',
        table: {
          headerRows: 1,
          widths: [60, '*', 50, 50, 60],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            ...props.products.map((product) => [
              product.productId,
              product.description,
              product.quantity,
              `$${product.price}`,
              {
                text: `$${product.quantity * product.price}`,
                alignment: 'right',
              },
            ]),
          ],
        },
      },
      {
        layout: 'noBorders',
        alignment: 'right',
        margin: [0, 40, 0, 0],
        table: {
          headerRows: 0,
          widths: ['*', 80, 100],
          body: [
            [
              '',
              'Subtotal',
              { text: `$${subtotal}`, alignment: 'left', bold: true },
            ],
            [
              '',
              'TOTAL',
              {
                text: `$${total}`,
                alignment: 'left',
                bold: true,
                fontSize: 16,
              },
            ],
          ],
        },
      },
    ],
    footer: ReportFooter(),
  };

  return dd;
};
