import unittest
from datetime import date, timedelta
from pathlib import Path
from tempfile import TemporaryDirectory
from xml.etree import ElementTree
from zipfile import ZipFile

from quant_backtest import Price, backtest, load_prices, summarize, write_excel


class BacktestTests(unittest.TestCase):
    def test_signal_is_used_only_after_its_close(self):
        prices = [
            Price(date(2024, 1, 1) + timedelta(days=index), close)
            for index, close in enumerate([10, 11, 12, 13, 14])
        ]
        results = backtest(prices, fast_window=1, slow_window=2, fee_bps=0)

        self.assertEqual([row.signal for row in results], [0, 1, 1, 1, 1])
        self.assertEqual([row.held_position for row in results], [0, 0, 1, 1, 1])
        self.assertEqual(results[2].net_return, 12 / 11 - 1)

    def test_transaction_cost_is_charged_on_entry_and_exit(self):
        prices = [
            Price(date(2024, 1, 1) + timedelta(days=index), close)
            for index, close in enumerate([10, 10, 11, 10, 9])
        ]
        results = backtest(prices, fast_window=1, slow_window=2, fee_bps=10)

        self.assertEqual(results[3].transaction_cost, 0.001)
        self.assertEqual(results[4].transaction_cost, 0.001)

    def test_summary_reports_drawdown(self):
        prices = [
            Price(date(2024, 1, 1) + timedelta(days=index), close)
            for index, close in enumerate([10, 11, 9])
        ]
        results = backtest(prices, fast_window=1, slow_window=2, fee_bps=0)

        self.assertLess(summarize(results)["max_drawdown"], 0)

    def test_short_sample_does_not_extrapolate_annualized_return(self):
        prices = [
            Price(date(2024, 1, 1) + timedelta(days=index), close)
            for index, close in enumerate([10, 11, 12])
        ]
        results = backtest(prices, fast_window=1, slow_window=2, fee_bps=0)

        self.assertIsNone(summarize(results)["annualized_return"])

    def test_csv_requires_ascending_unique_dates(self):
        from tempfile import TemporaryDirectory
        from pathlib import Path

        with TemporaryDirectory() as directory:
            path = Path(directory) / "prices.csv"
            path.write_text("date,close\n2024-01-02,10\n2024-01-01,11\n", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "ascending"):
                load_prices(path)

    def test_invalid_windows_are_rejected(self):
        with self.assertRaisesRegex(ValueError, "Windows"):
            backtest([Price(date(2024, 1, 1), 10), Price(date(2024, 1, 2), 11)], 2, 2)

    def test_excel_workbook_contains_summary_and_daily_data(self):
        prices = [
            Price(date(2024, 1, 1) + timedelta(days=index), close)
            for index, close in enumerate([10, 11, 12])
        ]
        results = backtest(prices, fast_window=1, slow_window=2, fee_bps=0)

        with TemporaryDirectory() as directory:
            path = Path(directory) / "results.xlsx"
            write_excel(path, results)
            with ZipFile(path) as workbook:
                self.assertIn("xl/worksheets/sheet1.xml", workbook.namelist())
                self.assertIn("xl/worksheets/sheet2.xml", workbook.namelist())
                for filename in workbook.namelist():
                    if filename.endswith(".xml") or filename.endswith(".rels"):
                        ElementTree.fromstring(workbook.read(filename))
                workbook_xml = workbook.read("xl/workbook.xml").decode("utf-8")
                summary_xml = workbook.read("xl/worksheets/sheet1.xml").decode("utf-8")
                daily_xml = workbook.read("xl/worksheets/sheet2.xml").decode("utf-8")

        self.assertIn('name="Summary"', workbook_xml)
        self.assertIn('name="Daily Results"', workbook_xml)
        self.assertIn("Total return", summary_xml)
        self.assertIn("2024-01-01", daily_xml)


if __name__ == "__main__":
    unittest.main()
