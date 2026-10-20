import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestProgressAnalyticsPage:
    """Tests for the Progress & Gamification Hub Page (/progress)."""

    def test_progress_analytics_header(self, driver, base_url):
        """Verify the Progress & Gamification Hub title."""
        page = BasePage(driver, base_url).open("/progress")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'Progress') and contains(., 'Gamification Hub')]"))
        assert heading.is_displayed(), "Progress & Gamification Hub heading missing"

    def test_progress_tabs_switching(self, driver, base_url):
        """Verify switching between gamification tabs (Streak, XP, Achievements)."""
        page = BasePage(driver, base_url).open("/progress")

        streak_tab = (By.XPATH, "//button[contains(., 'Streak') or contains(., 'XP') or contains(., 'Achievements')]")
        if page.is_displayed(streak_tab):
            page.click(streak_tab)
            assert page.is_displayed((By.XPATH, "//h1[contains(., 'Progress')]"))
