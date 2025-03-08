import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

export interface EmploymentLetterReportProps {
  name: string;
  startDate: string;
  position: string;
  hoursPerDay: number;
  workSchedule: string;
  employerName: string;
  employerCompany: string;
  employerPosition: string;
}

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    alignment: 'center',
    bold: true,
    margin: [0, 40, 0, 40], // L U R D
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 50],
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
};

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 80,
  margin: [30, 10, 0, 0],
};

const date: Content = {
  text: new Date().toLocaleDateString('es-ES', {
    day: 'numeric', // '2-digit' para obtenerlo en formato 05, en lugar de 5
    month: 'long',
    year: 'numeric',
  }),
  alignment: 'right',
  margin: [0, 20, 20, 0],
};

const footer: Content = {
  text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
  alignment: 'center',
  italics: true,
  fontSize: 10,
};

export const getEmploymentLetterReport = (
  props: EmploymentLetterReportProps,
): TDocumentDefinitions => {
  const today = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const dd: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: { columns: [logo, date] },
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${props.employerName}, en mi calidad de ${props.employerPosition} de ${props.employerCompany}, por medio de la presente certifico que ${props.name} ha sido empleado en nuestra empresa desde el ${props.startDate}.\n\nDurante su empleo, el Sr./Sra. ${props.name} ha desempeñado el cargo de ${props.position}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\nLa jornada laboral del Sr./ Sra. ${props.name} es de ${props.hoursPerDay} horas semanales, con un horario de ${props.workSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\nEsta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
        style: 'body',
      },
      {
        text: `Atentamente,\n${props.employerName}\n${props.employerPosition}\n${props.employerCompany}\n${today}`,
        style: `signature`,
      },
    ],
    footer: footer,
  };

  return dd;
};
