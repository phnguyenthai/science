"""Backtest a simple, systematic moving-average strategy on daily closing prices."""

from __future__ import annotations

import argparse
import csv
import math
import sys
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from xml.sax.saxutils import escape
from zipfile import ZIP_DEFLATED, ZipFile

TRADING_DAYS_PER_YEAR = 252


@dataclass(frozen=True)
class Price:
    date: date
    close: float


@dataclass(frozen=True)
class BacktestRow:
    date: date
    close: float
    fast_average: float | None
    slow_average: float | None
    signal: int
    held_position: int
    gross_return: float
    transaction_cost: float
    net_return: float
    equity: float


def load_prices(path: Path) -> list[Price]:
    """Read ascending daily prices from a CSV with `date` and `close` columns."""
    prices: list[Price] = []
    with path.open("r", newline="", encoding="utf-8-sig") as file:
        reader = csv.DictReader(file)
        if reader.fieldnames is None or not {"date", "close"}.issubset(reader.fieldnames):
            raise ValueError("CSV must contain 'date' and 'close' columns.")

        for line_number, row in enumerate(reader, start=2):
            try:
                price_date = date.fromisoformat(row["date"].strip())
                close = float(row["close"])
            except (AttributeError, TypeError, ValueError) as error:
                raise ValueError(f"Invalid date or close on CSV line {line_number}.") from error
            if not math.isfinite(close) or close <= 0:
                raise ValueError(f"Close must be a finite positive number on CSV line {line_number}.")
            if prices and price_date <= prices[-1].date:
                raise ValueError("CSV dates must be unique and in ascending order.")
            prices.append(Price(price_date, close))

    if len(prices) < 2:
        raise ValueError("CSV must contain at least two rows of prices.")
    return prices


def backtest(
    prices: list[Price],
    fast_window: int = 20,
    slow_window: int = 100,
    fee_bps: float = 5.0,
) -> list[BacktestRow]:
    """Backtest long-or-cash moving-average signals, charging costs on position changes."""
    if fast_window < 1 or slow_window < 1 or fast_window >= slow_window:
        raise ValueError("Windows must satisfy 1 <= fast_window < slow_window.")
    if not math.isfinite(fee_bps) or fee_bps < 0:
        raise ValueError("fee_bps must be a finite, non-negative number.")
    if len(prices) < 2:
        raise ValueError("At least two prices are required.")

    closes = [price.close for price in prices]
    signals: list[int] = []
    fast_averages: list[float | None] = []
    slow_averages: list[float | None] = []

    for index in range(len(prices)):
        fast_average = (
            sum(closes[index - fast_window + 1 : index + 1]) / fast_window
            if index + 1 >= fast_window
            else None
        )
        slow_average = (
            sum(closes[index - slow_window + 1 : index + 1]) / slow_window
            if index + 1 >= slow_window
            else None
        )
        fast_averages.append(fast_average)
        slow_averages.append(slow_average)
        signals.append(
            int(fast_average is not None and slow_average is not None and fast_average > slow_average)
        )

    fee_rate = fee_bps / 10_000
    equity = 1.0
    results: list[BacktestRow] = []
    for index, price in enumerate(prices):
        held_position = signals[index - 1] if index > 0 else 0
        previous_position = signals[index - 2] if index > 1 else 0
        gross_return = (
            held_position * (price.close / prices[index - 1].close - 1)
            if index > 0
            else 0.0
        )
        transaction_cost = abs(held_position - previous_position) * fee_rate if index > 0 else 0.0
        net_return = gross_return - transaction_cost
        equity *= 1 + net_return
        results.append(
            BacktestRow(
                date=price.date,
                close=price.close,
                fast_average=fast_averages[index],
                slow_average=slow_averages[index],
                signal=signals[index],
                held_position=held_position,
                gross_return=gross_return,
                transaction_cost=transaction_cost,
                net_return=net_return,
                equity=equity,
            )
        )
    return results


def summarize(results: list[BacktestRow]) -> dict[str, float | None]:
    """Calculate basic performance statistics from daily net returns."""
    if not results:
        raise ValueError("At least one backtest row is required.")

    returns = [row.net_return for row in results[1:]]
    ending_equity = results[-1].equity
    total_return = ending_equity - 1
    annualized_return = (
        ending_equity ** (TRADING_DAYS_PER_YEAR / len(returns)) - 1
        if len(returns) >= TRADING_DAYS_PER_YEAR and ending_equity > 0
        else None
    )
    average_return = sum(returns) / len(returns) if returns else 0.0
    variance = (
        sum((value - average_return) ** 2 for value in returns) / len(returns)
        if returns
        else 0.0
    )
    daily_volatility = math.sqrt(variance)
    sharpe = (
        average_return / daily_volatility * math.sqrt(TRADING_DAYS_PER_YEAR)
        if daily_volatility > 0
        else 0.0
    )

    peak = 1.0
    max_drawdown = 0.0
    for row in results:
        peak = max(peak, row.equity)
        max_drawdown = min(max_drawdown, row.equity / peak - 1)

    return {
        "total_return": total_return,
        "annualized_return": annualized_return,
        "annualized_volatility": daily_volatility * math.sqrt(TRADING_DAYS_PER_YEAR),
        "sharpe": sharpe,
        "max_drawdown": max_drawdown,
    }


def write_results(path: Path, results: list[BacktestRow]) -> None:
    with path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(
            [
                "date",
                "close",
                "fast_average",
                "slow_average",
                "signal_at_close",
                "held_position",
                "gross_return",
                "transaction_cost",
                "net_return",
                "equity",
            ]
        )
        for row in results:
            writer.writerow(
                [
                    row.date.isoformat(),
                    row.close,
                    row.fast_average if row.fast_average is not None else "",
                    row.slow_average if row.slow_average is not None else "",
                    row.signal,
                    row.held_position,
                    row.gross_return,
                    row.transaction_cost,
                    row.net_return,
                    row.equity,
                ]
            )


def _column_name(index: int) -> str:
    name = ""
    while index:
        index, remainder = divmod(index - 1, 26)
        name = chr(65 + remainder) + name
    return name


def _worksheet_xml(rows: list[list[tuple[object, int]]]) -> str:
    xml_rows: list[str] = []
    for row_index, row in enumerate(rows, start=1):
        cells: list[str] = []
        for column_index, (value, style) in enumerate(row, start=1):
            reference = f"{_column_name(column_index)}{row_index}"
            style_attribute = f' s="{style}"' if style else ""
            if isinstance(value, str):
                cells.append(
                    f'<c r="{reference}" t="inlineStr"{style_attribute}>'
                    f"<is><t>{escape(value)}</t></is></c>"
                )
            else:
                cells.append(
                    f'<c r="{reference}"{style_attribute}><v>{value}</v></c>'
                )
        xml_rows.append(f'<row r="{row_index}">{"".join(cells)}</row>')
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<sheetData>{"".join(xml_rows)}</sheetData></worksheet>'
    )


def write_excel(path: Path, results: list[BacktestRow]) -> None:
    """Write a dependency-free Excel workbook with summary and daily result sheets."""
    metrics = summarize(results)
    summary_rows: list[list[tuple[object, int]]] = [
        [("Metric", 5), ("Value", 5)],
        [("Total return", 0), (metrics["total_return"], 3)],
        [
            ("Annualized return", 0),
            (
                metrics["annualized_return"]
                if metrics["annualized_return"] is not None
                else "N/A (need 252+ return observations)",
                3 if metrics["annualized_return"] is not None else 0,
            ),
        ],
        [("Annualized volatility", 0), (metrics["annualized_volatility"], 3)],
        [("Sharpe (zero risk-free rate)", 0), (metrics["sharpe"], 2)],
        [("Maximum drawdown", 0), (metrics["max_drawdown"], 3)],
        [("Note", 0), ("Hypothetical backtest; not investment advice.", 0)],
    ]
    daily_rows: list[list[tuple[object, int]]] = [
        [(heading, 5) for heading in (
            "Date",
            "Close",
            "Fast average",
            "Slow average",
            "Signal at close",
            "Held position",
            "Gross return",
            "Transaction cost",
            "Net return",
            "Equity",
        )]
    ]
    for row in results:
        daily_rows.append(
            [
                (row.date.isoformat(), 1),
                (row.close, 2),
                (row.fast_average if row.fast_average is not None else "", 2),
                (row.slow_average if row.slow_average is not None else "", 2),
                (row.signal, 4),
                (row.held_position, 4),
                (row.gross_return, 3),
                (row.transaction_cost, 3),
                (row.net_return, 3),
                (row.equity, 2),
            ]
        )

    content_types = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        '<Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
        '</Types>'
    )
    root_relationships = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
        '</Relationships>'
    )
    workbook = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        '<sheets><sheet name="Summary" sheetId="1" r:id="rId1"/>'
        '<sheet name="Daily Results" sheetId="2" r:id="rId2"/></sheets></workbook>'
    )
    workbook_relationships = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>'
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
        '</Relationships>'
    )
    styles = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        '<numFmts count="3"><numFmt numFmtId="164" formatCode="yyyy-mm-dd"/>'
        '<numFmt numFmtId="165" formatCode="#,##0.00"/>'
        '<numFmt numFmtId="166" formatCode="0.00%"/></numFmts>'
        '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font>'
        '<font><b/><sz val="11"/><name val="Calibri"/></font></fonts>'
        '<fills count="2"><fill><patternFill patternType="none"/></fill>'
        '<fill><patternFill patternType="gray125"/></fill></fills>'
        '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
        '<cellXfs count="6">'
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
        '<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>'
        '<xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>'
        '<xf numFmtId="166" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>'
        '<xf numFmtId="1" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>'
        '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>'
        '</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'
        '</styleSheet>'
    )

    with ZipFile(path, "w", ZIP_DEFLATED) as workbook_file:
        workbook_file.writestr("[Content_Types].xml", content_types)
        workbook_file.writestr("_rels/.rels", root_relationships)
        workbook_file.writestr("xl/workbook.xml", workbook)
        workbook_file.writestr("xl/_rels/workbook.xml.rels", workbook_relationships)
        workbook_file.writestr("xl/styles.xml", styles)
        workbook_file.writestr("xl/worksheets/sheet1.xml", _worksheet_xml(summary_rows))
        workbook_file.writestr("xl/worksheets/sheet2.xml", _worksheet_xml(daily_rows))


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Backtest a long-or-cash moving-average strategy using daily close prices."
    )
    parser.add_argument("prices_csv", type=Path, help="CSV file with date and close columns")
    parser.add_argument("--fast", type=int, default=20, help="fast moving-average window (default: 20)")
    parser.add_argument("--slow", type=int, default=100, help="slow moving-average window (default: 100)")
    parser.add_argument(
        "--fee-bps",
        type=float,
        default=5.0,
        help="estimated transaction cost per position change in basis points (default: 5)",
    )
    parser.add_argument("--output", type=Path, help="optional path for daily backtest results CSV")
    parser.add_argument("--output-xlsx", type=Path, help="optional path for an Excel workbook")
    args = parser.parse_args(argv)

    try:
        results = backtest(
            load_prices(args.prices_csv),
            fast_window=args.fast,
            slow_window=args.slow,
            fee_bps=args.fee_bps,
        )
        if args.output:
            write_results(args.output, results)
        if args.output_xlsx:
            write_excel(args.output_xlsx, results)
    except (OSError, ValueError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 2

    print("Performance (hypothetical, before taxes):")
    for metric, value in summarize(results).items():
        label = metric.replace("_", " ").title()
        if value is None:
            print(f"  {label}: N/A (requires at least {TRADING_DAYS_PER_YEAR} return observations)")
        elif metric == "sharpe":
            print(f"  {label}: {value:.2f}")
        else:
            print(f"  {label}: {value:.2%}")
    if args.output:
        print(f"Daily results written to {args.output}")
    if args.output_xlsx:
        print(f"Excel workbook written to {args.output_xlsx}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
