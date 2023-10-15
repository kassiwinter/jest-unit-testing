class Stock {
  constructor(symbol, shares) {
    this.symbol = symbol;
    this.shares = shares;
  }
}

class ShareSaleException extends Error { // 2.8
  constructor(message) {
    super(message);
    this.name = 'ShareSaleException';
  }
}

// 2.1: Define the Portfolio class to manage a collection of stocks
class Portfolio {
  constructor() {
    this.stocks = [];
  }

// 2.2: The stock portfolio shall answer whether it is empty (no shares owned)
isPortfolioEmpty() {
  return this.stocks.length === 0;
}

// 2.3 Count the unique ticker symbols in the portfolio
countUniqueTickerSymbols() {
  const uniqueSymbols = new Set(this.stocks.map((stock) => stock.symbol));
  return uniqueSymbols.size;
}

// 2.4 Make a purchase by adding shares to a symbol in the portfolio
makePurchase(symbol, shares) {
  if (shares > 0) {
    const existingStock = this.stocks.find((stock) => stock.symbol === symbol);
    if (existingStock) {
      existingStock.shares += shares;
    } else {
      this.stocks.push(new Stock(symbol, shares));
    }
  } else {
    throw new Error("Number of shares must be greater than 0.");
  }
}

// 2.5 Make a sale by subtracting shares from a symbol in the portfolio
makeSale(symbol, shares) {
  if (shares > 0) {
    const existingStock = this.stocks.find((stock) => stock.symbol === symbol);
    if (existingStock) {
      if (existingStock.shares >= shares) {
        existingStock.shares -= shares;
        if (existingStock.shares === 0) {
          // If all shares have been sold, remove the stock from the portfolio
          this.stocks = this.stocks.filter((stock) => stock.symbol !== symbol);
        }
      } else {
        throw new ShareSaleException('Insufficient shares to sell.') ;// 2.8
      }
    } else {
      throw new Error("Stock not found in the portfolio.");
    }
  } else {
    throw new Error("Number of shares to sell must be greater than 0.");
  }
}

// 2.6 Get the number of shares for a given symbol
getSharesForSymbol(symbol) {
  const existingStock = this.stocks.find((stock) => stock.symbol === symbol);
  return existingStock ? existingStock.shares : 0;
}

// 2.7 Ensure that symbols with zero shares are removed from the portfolio
cleanupPortfolio() {
  this.stocks = this.stocks.filter((stock) => stock.shares > 0);
}



}
export default Portfolio;
