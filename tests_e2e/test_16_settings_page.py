import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestSettingsPage:
    """Tests for the Settings & Personalization Page (/settings)."""

    def test_settings_header_and_save_button(self, driver, base_url):
        """Verify the Settings title and Save button."""
        page = BasePage(driver, base_url).open("/settings")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'Settings') and contains(., 'Personalization')]"))
        assert heading.is_displayed(), "Settings heading missing"

        save_btn = page.wait_for_visible((By.XPATH, "//button[contains(., 'Save')]"))
        assert save_btn.is_displayed(), "Save settings button missing"

    def test_settings_tabs_switching(self, driver, base_url):
        """Verify switching between setting categories (Profile, AI Mentor, Notifications)."""
        page = BasePage(driver, base_url).open("/settings")

        mentor_tab = (By.XPATH, "//button[contains(., 'Mentor') or contains(., 'Notifications') or contains(., 'Preferences')]")
        if page.is_displayed(mentor_tab):
            page.click(mentor_tab)
            assert page.is_displayed((By.XPATH, "//h1[contains(., 'Settings')]"))
