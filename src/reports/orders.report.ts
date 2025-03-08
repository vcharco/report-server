import { TDocumentDefinitions } from 'pdfmake/interfaces';

export interface OrdersReportProps {}

export const getOrdersReport =
  ({}: OrdersReportProps): TDocumentDefinitions => {
    const dd: TDocumentDefinitions = {
      content: [{ text: 'Hello que hay' }],
    };

    return dd;
  };
