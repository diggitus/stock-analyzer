import { StockAnalyzerPage } from './app.po';

describe('stock-analyzer App', () => {
  let page: StockAnalyzerPage;

  beforeEach(() => {
    page = new StockAnalyzerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
