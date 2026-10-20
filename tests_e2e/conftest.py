import os
import time
import pytest
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

SCREENSHOTS_DIR = Path(__file__).parent / "screenshots"
SCREENSHOTS_DIR.mkdir(exist_ok=True)


def pytest_addoption(parser):
    """Add custom CLI flags for Selenium pytest runs."""
    parser.addoption(
        "--base-url",
        action="store",
        default=os.getenv("BASE_URL", "http://localhost:5173"),
        help="Base URL of GrowSkill AI frontend (default: http://localhost:5173)",
    )
    parser.addoption(
        "--headed",
        action="store_true",
        default=False,
        help="Run browser in headed (visible) mode instead of headless",
    )


@pytest.fixture(scope="session")
def base_url(request):
    """Returns the base target URL."""
    return request.config.getoption("--base-url").rstrip("/")


@pytest.fixture(scope="function")
def driver(request):
    """Initializes and yields a clean Chrome WebDriver instance, auto-terminating on teardown."""
    is_headed = request.config.getoption("--headed")

    options = Options()
    if not is_headed:
        options.add_argument("--headless=new")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-search-engine-choice-screen")

    # Clean driver initialization via Selenium 4's built-in Selenium Manager
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(30)
    driver.implicitly_wait(2)

    yield driver

    # Take screenshot if test failed
    if hasattr(request.node, "rep_call") and request.node.rep_call.failed:
        test_name = request.node.name.replace("/", "_").replace(":", "_")
        screenshot_path = SCREENSHOTS_DIR / f"FAILED_{test_name}_{int(time.time())}.png"
        try:
            driver.save_screenshot(str(screenshot_path))
            print(f"\n[SCREENSHOT SAVED]: {screenshot_path}")
        except Exception:
            pass

    driver.quit()


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Hook to capture test failure status for screenshot generation."""
    outcome = yield
    rep = outcome.get_result()
    setattr(item, "rep_" + rep.when, rep)


@pytest.fixture(scope="function")
def splash_handler(driver):
    """Utility fixture to dismiss or await the 1.2s splash screen when opening pages."""
    def _dismiss():
        try:
            wait = WebDriverWait(driver, 3)
            # Find the splash screen container and click to dismiss if present
            splash = wait.until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'GrowSkill') and contains(@class, 'fixed')]"))
            )
            splash.click()
            time.sleep(0.3)
        except Exception:
            # Splash screen might have already transitioned or not appeared
            pass
    return _dismiss
