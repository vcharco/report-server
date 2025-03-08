import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}

export const getHelloReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { name } = options;

  const dd: TDocumentDefinitions = {
    content: [`Hola ${name}`],
  };

  return dd;
};
