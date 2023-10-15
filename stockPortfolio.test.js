import Portfolio from './stockPortfolio.js';

// 2.1 Test
test('Portfolio should be empty when created', () => {
  const expected = {"stocks": []};
  const portfolio = new Portfolio();;
  expect(portfolio).toEqual(expected);
});

// 2.2 Test
test('The stock portfolio shall answer whether it is empty (no shares owned)', () => {
  const portfolio = new Portfolio();
  const isPortfolioEmpty = portfolio.isPortfolioEmpty();
  expect(isPortfolioEmpty).toBe(true); // Expect the portfolio to be empty
});

// 2.3 Test
test('Count unique ticker symbols in the portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.stocks.push({ symbol: 'AAPL', shares: 10 });
  portfolio.stocks.push({ symbol: 'GOOGL', shares: 5 });
  portfolio.stocks.push({ symbol: 'AAPL', shares: 15 });

  const uniqueCount = portfolio.countUniqueTickerSymbols();
  expect(uniqueCount).toBe(2);
});

test('Count unique ticker symbols in an empty portfolio', () => {
  const portfolio = new Portfolio();
  const uniqueCount = portfolio.countUniqueTickerSymbols();
  expect(uniqueCount).toBe(0);
});

// 2.4 Test
test('Make a purchase in the portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.makePurchase('AAPL', 5);
  const stocks = portfolio.stocks;
  expect(stocks).toEqual([{ symbol: 'AAPL', shares: 5 }]);
  portfolio.makePurchase('AAPL', 10);
  const updatedStocks = portfolio.stocks;
  expect(updatedStocks).toEqual([{ symbol: 'AAPL', shares: 15 }]);
});

test('Attempt to purchase 0 shares', () => {
  const portfolio = new Portfolio();
  const attemptToPurchase = () => portfolio.makePurchase('AAPL', 0);
  expect(attemptToPurchase).toThrow('Number of shares must be greater than 0.');
});

test('Attempt to purchase negative shares', () => {
  const portfolio = new Portfolio();
  const attemptToPurchase = () => portfolio.makePurchase('AAPL', -5);
  expect(attemptToPurchase).toThrow('Number of shares must be greater than 0.');
});

// 2.5 Test
test('Make a sale in the portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.stocks.push({ symbol: 'AAPL', shares: 20 });
  portfolio.makeSale('AAPL', 10);
  const updatedStocks = portfolio.stocks;
  expect(updatedStocks).toEqual([{ symbol: 'AAPL', shares: 10 }]);
});

test('Attempt to sell more shares than owned in the portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.stocks.push({ symbol: 'AAPL', shares: 20 });
  const attemptToSell = () => portfolio.makeSale('AAPL', 30);
  expect(attemptToSell).toThrow('Insufficient shares to sell.');
});

test('Attempt to sell shares of a non-existent stock', () => {
  const portfolio = new Portfolio();
  portfolio.stocks.push({ symbol: 'AAPL', shares: 20 });
  const attemptToSell = () => portfolio.makeSale('TSLA', 10);
  expect(attemptToSell).toThrow('Stock not found in the portfolio.');
});

// 2.6 Test
test('Get the number of shares for a given symbol', () => {
  const portfolio = new Portfolio();
  portfolio.makePurchase('AAPL', 15);
  portfolio.makePurchase('MSFT', 20);
  const sharesAAPL = portfolio.getSharesForSymbol('AAPL');
  expect(sharesAAPL).toBe(15);
  const sharesMSFT = portfolio.getSharesForSymbol('MSFT');
  expect(sharesMSFT).toBe(20);
  const sharesNonExistent = portfolio.getSharesForSymbol('TSLA');
  expect(sharesNonExistent).toBe(0);
});

// 2.7 Test
test('Cleanup an empty portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.cleanupPortfolio();
  expect(portfolio.stocks).toEqual([]);
});

test('Cleanup a portfolio with stocks, some with zero shares', () => {
  const portfolio = new Portfolio();
  portfolio.makePurchase('AAPL', 10);
  portfolio.makePurchase('GOOGL', 5);
  portfolio.makePurchase('TSLA', 15);
  portfolio.cleanupPortfolio();
  expect(portfolio.stocks).toEqual([{ symbol: 'AAPL', shares: 10 }, { symbol: 'GOOGL', shares: 5 }, { symbol: 'TSLA', shares: 15 }]);
});


test('Cleanup a portfolio with all stocks having zero shares', () => {
  const portfolio = new Portfolio();
  portfolio.makePurchase('AAPL', 10); 
  portfolio.makePurchase('GOOGL', 10);
  portfolio.makeSale('AAPL', 10);
  portfolio.cleanupPortfolio();
  expect(portfolio.stocks).toEqual([{ symbol: 'GOOGL', shares: 10 }]);
});

// 2.8 Test
test('Attempt to sell more shares than owned in the portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.makePurchase('AAPL', 20);
  const attemptToSell = () => portfolio.makeSale('AAPL', 30);
  expect(attemptToSell).toThrow('Insufficient shares to sell.');
});

test('Attempt to sell shares of a non-existent stock', () => {
  const portfolio = new Portfolio();
  const attemptToSell = () => portfolio.makeSale('AAPL', 10);
  expect(attemptToSell).toThrow(Error);
  expect(attemptToSell).toThrow('Stock not found in the portfolio.');
});