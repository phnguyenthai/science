@echo off
setlocal
chcp 65001 >nul
set "SCRIPT_DIR=%~dp0"
set "VENV_PYTHON=%SCRIPT_DIR%.venv\Scripts\python.exe"

if not exist "%VENV_PYTHON%" (
    set "PYTHON_CMD="
    where py >nul 2>nul
    if not errorlevel 1 (
        py -3 --version >nul 2>nul
        if not errorlevel 1 set "PYTHON_CMD=py -3"
    )
    if not defined PYTHON_CMD (
        where python >nul 2>nul
        if not errorlevel 1 (
            python --version >nul 2>nul
            if not errorlevel 1 set "PYTHON_CMD=python"
        )
    )
    if not defined PYTHON_CMD (
        for /f "usebackq delims=" %%P in (`powershell -NoProfile -Command "$p = Get-ChildItem -Path (Join-Path $env:APPDATA 'uv\python\cpython-*\windows-*\python.exe') -ErrorAction SilentlyContinue | Sort-Object FullName -Descending | Select-Object -First 1; if ($p) { $p.FullName }"`) do set "PYTHON_CMD="%%P""
    )
    if not defined PYTHON_CMD (
        echo Python 3.10 or later was not found. Install Python or uv and try again.
        pause
        exit /b 1
    )
    %PYTHON_CMD% -m venv "%SCRIPT_DIR%.venv"
    if errorlevel 1 (
        echo Could not create the local Python environment.
        pause
        exit /b 1
    )
    "%VENV_PYTHON%" -m pip install -r "%SCRIPT_DIR%requirements.txt"
    if errorlevel 1 (
        echo Could not install packages. Check your internet connection and try again.
        pause
        exit /b 1
    )
)

"%VENV_PYTHON%" "%SCRIPT_DIR%download_and_plot.py" --ticker SPY --period max --output-dir "%SCRIPT_DIR:~0,-1%"
if errorlevel 1 (
    echo.
    echo Download or backtest failed. Check your internet connection and dependencies in requirements.txt.
    pause
    exit /b 1
)

echo.
echo Opening the chart...
start "" "%SCRIPT_DIR%SPY_backtest.png"
start "" "%SCRIPT_DIR%SPY_backtest.xlsx"
exit /b 0
