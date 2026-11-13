# Quant strategy research prototype

This is an educational backtester, not a way to reproduce Jim Simons's or Renaissance Technologies' proprietary strategies. It uses a transparent long-or-cash moving-average crossover as a simple systematic baseline. It does not place live orders or connect to a broker.

## Input data

Provide a CSV with daily observations in ascending date order and these columns:

```csv
date,close
2024-01-02,100.25
2024-01-03,101.10
```

Dates must use `YYYY-MM-DD`; closing prices must be finite and positive.

## Run

Requires Python 3.10 or later. The CSV backtester uses only the standard library. The Yahoo Finance downloader and chart require the packages in `requirements.txt`:

```powershell
python -m pip install -r .\requirements.txt
```

```powershell
python .\quant_backtest.py .\prices.csv --fast 20 --slow 100 --fee-bps 5 --output .\results.csv
```

Double-click `Run_Backtest.bat` to download SPY's maximum available history from Yahoo Finance, save the prices, create an Excel workbook and chart, and open both. Install the downloader dependencies first. The batch launcher can use the Python launcher, a `python` command on PATH, or a Python installation managed by uv in the current user's roaming profile.

To download another ticker or run the downloader from a terminal:

```powershell
python .\download_and_plot.py --ticker QQQ --period max
```

By default, the script saves `<TICKER>_prices.csv`, `<TICKER>_backtest.xlsx`, and `<TICKER>_backtest.png` in the `explore` folder. Data is fetched using yfinance from Yahoo Finance, with adjusted daily closing prices. Yahoo Finance data availability and history limits may vary by ticker.

To create an Excel workbook from the command line:

```powershell
python .\quant_backtest.py .\prices.csv --output-xlsx .\results.xlsx
```

The strategy goes long when the fast simple moving average is above the slow one, otherwise it holds cash. Signals use only data available at the close and are applied to the following close-to-close return. Transaction costs are charged on position changes. `--fee-bps` estimates cost per entry or exit in basis points (5 basis points = 0.05%).

The summary reports total return, annualized return (only when at least 252 return observations are available), annualized volatility, a zero-risk-free-rate Sharpe ratio, and maximum drawdown. These are hypothetical historical results; they do not account for taxes, market impact, slippage beyond the configured fee, survivorship bias, or the possibility that the strategy will lose money. Moving-average parameters should not be tuned against the same period used to report performance.

## Tests

```powershell
python -m unittest .\test_quant_backtest.py
```
