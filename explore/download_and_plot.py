"""Download Yahoo Finance ETF history, backtest it, and save a chart."""

from __future__ import annotations

import argparse
import csv
import math
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")

import matplotlib.dates as mdates
import matplotlib.pyplot as plt
import yfinance as yf

from quant_backtest import BacktestRow, Price, backtest, load_prices, summarize, write_excel


def download_prices(ticker: str, period: str, csv_path: Path) -> list[Price]:
    history = yf.Ticker(ticker).history(period=period, auto_adjust=True)
    if history.empty or "Close" not in history:
        raise ValueError(f"Yahoo Finance returned no closing-price data for {ticker}.")

    prices = [
        Price(index.date(), float(close))
        for index, close in history["Close"].items()
        if not math.isnan(float(close)) and float(close) > 0
    ]
    if len(prices) < 2:
        raise ValueError(f"Yahoo Finance returned fewer than two valid prices for {ticker}.")
    prices.sort(key=lambda price: price.date)

    with csv_path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["date", "close"])
        writer.writerows((price.date.isoformat(), price.close) for price in prices)
    return load_prices(csv_path)


def create_chart(
    ticker: str,
    results: list[BacktestRow],
    output_path: Path,
) -> None:
    dates = [row.date for row in results]
    closes = [row.close for row in results]
    fast = [row.fast_average for row in results]
    slow = [row.slow_average for row in results]
    strategy_equity = [row.equity for row in results]
    buy_and_hold = [close / closes[0] for close in closes]

    figure, (price_axis, equity_axis) = plt.subplots(
        2, 1, figsize=(13, 9), sharex=True, gridspec_kw={"height_ratios": [2, 1]}
    )
    price_axis.plot(dates, closes, label=f"{ticker} adjusted close", linewidth=1)
    price_axis.plot(dates, fast, label="Fast moving average", linewidth=1)
    price_axis.plot(dates, slow, label="Slow moving average", linewidth=1)
    price_axis.set_title(f"{ticker}: historical prices and systematic strategy")
    price_axis.set_ylabel("Adjusted close (USD)")
    price_axis.legend(loc="upper left")
    price_axis.grid(True, alpha=0.25)

    equity_axis.plot(dates, strategy_equity, label="Moving-average strategy", linewidth=1.2)
    equity_axis.plot(dates, buy_and_hold, label="Buy and hold", linewidth=1.2)
    equity_axis.set_ylabel("Growth of $1")
    equity_axis.set_xlabel("Date")
    equity_axis.legend(loc="upper left")
    equity_axis.grid(True, alpha=0.25)
    equity_axis.xaxis.set_major_locator(mdates.AutoDateLocator())
    equity_axis.xaxis.set_major_formatter(mdates.ConciseDateFormatter(equity_axis.xaxis.get_major_locator()))

    figure.tight_layout()
    figure.savefig(output_path, dpi=150)
    plt.close(figure)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Download ETF history from Yahoo Finance and create a backtest chart."
    )
    parser.add_argument("--ticker", default="SPY", help="Yahoo Finance ticker (default: SPY)")
    parser.add_argument("--period", default="max", help="Yahoo Finance history period (default: max)")
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path(__file__).resolve().parent,
        help="folder for downloaded CSV, Excel workbook, and chart",
    )
    parser.add_argument("--fast", type=int, default=20, help="fast moving-average window")
    parser.add_argument("--slow", type=int, default=100, help="slow moving-average window")
    parser.add_argument("--fee-bps", type=float, default=5.0, help="transaction cost per position change")
    args = parser.parse_args(argv)
    ticker = args.ticker.strip().upper()
    if not ticker or not ticker.isascii() or not all(char.isalnum() or char in "-^=." for char in ticker):
        parser.error("ticker must contain only letters, numbers, '.', '^', '=', or '-'.")

    args.output_dir.mkdir(parents=True, exist_ok=True)
    csv_path = args.output_dir / f"{ticker}_prices.csv"
    excel_path = args.output_dir / f"{ticker}_backtest.xlsx"
    chart_path = args.output_dir / f"{ticker}_backtest.png"

    try:
        prices = download_prices(ticker, args.period, csv_path)
        results = backtest(
            prices,
            fast_window=args.fast,
            slow_window=args.slow,
            fee_bps=args.fee_bps,
        )
        write_excel(excel_path, results)
        create_chart(ticker, results, chart_path)
    except (OSError, ValueError, RuntimeError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 2

    metrics = summarize(results)
    print(f"Downloaded {len(prices)} daily prices for {ticker}: {prices[0].date} to {prices[-1].date}")
    print(f"Total strategy return: {metrics['total_return']:.2%}")
    if metrics["annualized_return"] is not None:
        print(f"Annualized strategy return: {metrics['annualized_return']:.2%}")
    print(f"Maximum drawdown: {metrics['max_drawdown']:.2%}")
    print(f"Price CSV: {csv_path}")
    print(f"Excel workbook: {excel_path}")
    print(f"Chart: {chart_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
