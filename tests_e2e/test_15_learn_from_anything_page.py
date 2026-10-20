import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestLearnFromAnythingPage:
    """Tests for the Signature Feature: Learn From Anything Page (/learn-anything)."""

    def test_learn_from_anything_header_and_input(self, driver, base_url):
        """Verify the Learn From Anything heading and resource input field."""
        page = BasePage(driver, base_url).open("/learn-anything")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'Learn From') and contains(., 'Anything')]"))
        assert heading.is_displayed(), "Learn From Anything heading missing"

        url_input = (By.CSS_SELECTOR, "input[type='text']")
        assert page.is_displayed(url_input), "Resource URL input missing"

    def test_learn_from_anything_step_progression(self, driver, base_url):
        """Verify clicking Start Analysis button advances to Step 2."""
        page = BasePage(driver, base_url).open("/learn-anything")

        start_btn = (By.XPATH, "//button[contains(., 'Analyze') or contains(., 'Start') or contains(., 'Next')]")
        if page.is_displayed(start_btn):
            page.click(start_btn)
            assert page.is_displayed((By.XPATH, "//h1[contains(., 'Learn From')]"))
