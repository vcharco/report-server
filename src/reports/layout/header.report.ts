import { Content } from 'pdfmake/interfaces';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  margin: [40, 60, 0, 0],
};

export const ReportHeader = (title: string): Content => {
  return logo;
};
