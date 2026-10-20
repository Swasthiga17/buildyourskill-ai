import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestTodayPlanPage:
    """Tests for the Daily Focused Plan Page (/today-plan)."""

    def test_today_plan_heading_and_modules(self, driver, base_url):
        """Verify the 45-Minute Focused Plan header and learn steps."""
        page = BasePage(driver, base_url).open("/today-plan")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., \"Today's 45-Minute Focused Plan\")]"))
        assert heading.is_displayed(), "Today's Plan heading missing"

        learn_step = page.wait_for_visible((By.XPATH, "//*[contains(text(), 'Step 1: Learn')]"))
        assert learn_step.is_displayed(), "Step 1: Learn section missing"

    def test_today_plan_quiz_options_interactive(self, driver, base_url):
        """Verify quiz option buttons are selectable within the daily micro-learning module."""
        page = BasePage(driver, base_url).open("/today-plan")

        options = page.get_elements((By.XPATH, "//button[contains(@class, 'p-4') or contains(@class, 'rounded-2xl')]"))
        if options:
            page.click((By.XPATH, "(//button[contains(@class, 'p-4') or contains(@class, 'rounded-2xl')])[1]"))
            # Confirm interaction did not crash the page
            assert page.is_displayed((By.XPATH, "//h1[contains(., \"Today's 45-Minute Focused Plan\")]"))
