import { Content, ContextPageSize, DynamicContent } from 'pdfmake/interfaces';

const footer = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  return {
    text: 'Página' + currentPage + ' de ' + pageCount,
    alignment: 'right',
    margin: [0, 40, 40, 0],
  };
};

export const ReportFooter = (): DynamicContent => {
  return footer;
};
