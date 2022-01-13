import SportsReportWidget from './SportsReportWidget';

const eventSourceUrl = 'https://ahj-8-1.herokuapp.com/sse';

const report = new SportsReportWidget(
  document.getElementById('container'),
  eventSourceUrl,
);
report.bindToDOM();
