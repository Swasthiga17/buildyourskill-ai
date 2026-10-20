#!/usr/bin/env python3
"""GrowSkill AI - Automated Selenium E2E Test Suite Runner

Usage:
    python run_tests.py                      # Run all tests in headless mode
    python run_tests.py --headed             # Run tests with visible browser
    python run_tests.py --smoke              # Run only quick smoke tests
    python run_tests.py --file test_03_login_page.py
    python run_tests.py --url http://localhost:5173
"""

import sys
import os
import argparse
import subprocess
import urllib.request
from pathlib import Path


def check_server(url: str, timeout: float = 3.0) -> bool:
    """Check if the frontend server is reachable."""
    try:
        urllib.request.urlopen(url, timeout=timeout)
        return True
    except Exception:
        return False


def main():
    parser = argparse.ArgumentParser(description="Run GrowSkill AI Selenium E2E Tests")
    parser.add_argument("--url", default="http://localhost:5173", help="Base URL of frontend (default: http://localhost:5173)")
    parser.add_argument("--headed", action="store_true", help="Run browser in headed (visible) mode")
    parser.add_argument("--smoke", action="store_true", help="Run only tests marked as @pytest.mark.smoke")
    parser.add_argument("--file", default="", help="Run a specific test file (e.g. test_03_login_page.py)")
    parser.add_argument("--html", action="store_true", help="Generate HTML report in reports/report.html")

    args = parser.parse_args()

    tests_dir = Path(__file__).parent.resolve()
    reports_dir = tests_dir / "reports"
    reports_dir.mkdir(exist_ok=True)

    print("=" * 70)
    print("[*] GROWSKILL AI - SELENIUM AUTOMATION TEST RUNNER")
    print("=" * 70)
    print(f"Target URL: {args.url}")
    print(f"Browser:    Chrome ({'Headed (Visible)' if args.headed else 'Headless'})")

    # Check if target frontend server is running
    is_up = check_server(args.url)
    if not is_up:
        print("\n[!] WARNING: Frontend server does not appear to be responding at:", args.url)
        print("   If you haven't started it yet, in another terminal run:")
        print("   cd frontend && npm run dev")
        print("\n   Continuing anyway in case it is starting up...\n")
    else:
        print("[+] Frontend server is responding!")

    cmd = [
        sys.executable,
        "-m",
        "pytest",
        str(tests_dir),
        f"--base-url={args.url}",
        "-v",
        "--tb=short"
    ]

    if args.headed:
        cmd.append("--headed")

    if args.smoke:
        cmd.extend(["-m", "smoke"])

    if args.file:
        target = tests_dir / args.file
        if not target.exists():
            print(f"Error: Specified file not found: {target}")
            sys.exit(1)
        cmd = [c for c in cmd if c != str(tests_dir)]
        cmd.append(str(target))

    if args.html:
        cmd.append(f"--html={reports_dir / 'report.html'}")
        cmd.append("--self-contained-html")

    print("\nExecuting command:")
    print(" ".join(cmd))
    print("=" * 70 + "\n")

    result = subprocess.run(cmd, cwd=str(tests_dir))
    sys.exit(result.returncode)


if __name__ == "__main__":
    main()
