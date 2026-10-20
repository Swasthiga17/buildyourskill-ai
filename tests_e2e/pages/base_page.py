import time
from typing import Tuple, List
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException, StaleElementReferenceException


class BasePage:
    """Base Page Object class encapsulating common Selenium interactions and explicit waits."""

    def __init__(self, driver: WebDriver, base_url: str = "http://localhost:5173"):
        self.driver = driver
        self.base_url = base_url.rstrip("/")

    def open(self, path: str = ""):
        """Navigate to the specified route relative to base_url."""
        url = f"{self.base_url}/{path.lstrip('/')}"
        self.driver.get(url)
        self.dismiss_splash_if_present()
        return self

    def dismiss_splash_if_present(self, timeout: float = 2.5):
        """Dismisses the 1.2s GrowSkill splash screen if it appears."""
        try:
            wait = WebDriverWait(self.driver, timeout)
            # Match the splash container by text or fixed backdrop
            splash = wait.until(
                EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'GrowSkill') and contains(@class, 'fixed')]"))
            )
            splash.click()
            time.sleep(0.4)
        except Exception:
            pass

    def wait_for_visible(self, locator: Tuple[By, str], timeout: float = 10) -> WebElement:
        """Wait until an element is visible on screen."""
        return WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located(locator)
        )

    def wait_for_clickable(self, locator: Tuple[By, str], timeout: float = 10) -> WebElement:
        """Wait until an element is clickable."""
        return WebDriverWait(self.driver, timeout).until(
            EC.element_to_be_clickable(locator)
        )

    def wait_for_presence(self, locator: Tuple[By, str], timeout: float = 10) -> WebElement:
        """Wait until element is present in DOM."""
        return WebDriverWait(self.driver, timeout).until(
            EC.presence_of_element_located(locator)
        )

    def wait_for_text_in_element(self, locator: Tuple[By, str], text: str, timeout: float = 10) -> bool:
        """Wait until element text contains the expected substring."""
        return WebDriverWait(self.driver, timeout).until(
            EC.text_to_be_present_in_element(locator, text)
        )

    def click(self, locator: Tuple[By, str], timeout: float = 10):
        """Wait for element to be clickable and click it."""
        elem = self.wait_for_clickable(locator, timeout)
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", elem)
        time.sleep(0.1)
        elem.click()

    def type_text(self, locator: Tuple[By, str], text: str, clear_first: bool = True, timeout: float = 10):
        """Wait for input field, clear it optionally, and send keys."""
        elem = self.wait_for_clickable(locator, timeout)
        if clear_first:
            elem.clear()
        elem.send_keys(text)

    def get_text(self, locator: Tuple[By, str], timeout: float = 10) -> str:
        """Get visible text of an element."""
        return self.wait_for_visible(locator, timeout).text.strip()

    def is_displayed(self, locator: Tuple[By, str], timeout: float = 3) -> bool:
        """Check if element is visible without throwing fatal timeouts."""
        try:
            return self.wait_for_visible(locator, timeout).is_displayed()
        except (TimeoutException, NoSuchElementException, StaleElementReferenceException):
            return False

    def get_elements(self, locator: Tuple[By, str], timeout: float = 5) -> List[WebElement]:
        """Find list of elements after awaiting visibility of the first."""
        try:
            self.wait_for_presence(locator, timeout)
            return self.driver.find_elements(*locator)
        except TimeoutException:
            return []

    def get_current_url(self) -> str:
        """Returns the current browser URL."""
        return self.driver.current_url

    def get_page_title(self) -> str:
        """Returns the page title."""
        return self.driver.title
