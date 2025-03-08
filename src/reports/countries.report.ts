import type {
  Content,
  ContextPageSize,
  StyleDictionary,
  TableCell,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { Country } from 'src/countries/entities/contry.model';

export interface CountriesReportProps {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

const styles: StyleDictionary = {};

const headerDate: Content = {
  text: new Date().toLocaleDateString('es-Es'),
  alignment: 'right',
};

// Título con subtítulo debajo. Usamos stack (es como un div)
const headerTitle = (title: string, subtitle: string): Content => {
  return {
    alignment: 'left',
    stack: [
      { text: title, fontSize: 18, marginBottom: 4 },
      { text: subtitle, fontSize: 10 },
    ],
  };
};

// Footer con número de páginas (usamos dynamicContent)
const footer = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  return {
    text: currentPage + ' de ' + pageCount,
    alignment: 'center',
    marginTop: 14,
  };
};

export const getCountriesReport = (
  props: CountriesReportProps,
): TDocumentDefinitions => {
  const {
    title = 'Countries',
    subtitle = 'Professional report',
    countries,
  } = props;

  const filterCountries = countries.filter((c) => c.continent && c.localName);

  const dd: TDocumentDefinitions = {
    pageOrientation: 'landscape',
    pageMargins: [60, 100, 60, 70],
    header: {
      columns: [headerTitle(title, subtitle), headerDate],
      margin: [60, 30, 60, 0],
    },
    content: [
      {
        layout: 'customTableLayout01',
        table: {
          headerRows: 1,
          // auto: se ajusta a contenido, *: reparto equitativo
          widths: ['auto', 'auto', 'auto', '*', 'auto', '*'],
          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...(filterCountries.map((c) => [
              c.id,
              c.iso2,
              c.iso3,
              c.name,
              c.continent,
              c.localName,
            ]) as TableCell[][]),
            ['', '', '', '', '', ''], // Esto lo hacemos para conseguir doble línea
            ['', '', '', '', 'Total', `${filterCountries.length} países`],
          ],
        },
      },
    ],
    footer: footer,
  };
  return dd;
};
