import pytest
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from tests_e2e.pages.dashboard_page import DashboardPage


@pytest.mark.dashboard
@pytest.mark.smoke
class TestSplashAndDashboard:
    """Tests for the initial Splash Screen and the Main Dashboard."""

    def test_splash_screen_auto_transitions_or_dismisses(self, driver, base_url):
        """Verify the 1.2s splash screen appears and can be dismissed smoothly."""
        driver.get(f"{base_url}/")

        # Either splash screen is visible or quickly auto-dismisses
        try:
            splash = WebDriverWait(driver, 2).until(
                EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'GrowSkill')]"))
            )
            splash.click()
        except Exception:
            pass

        # Verify main dashboard appears
        dashboard = DashboardPage(driver, base_url)
        assert dashboard.is_dashboard_loaded(), "Dashboard failed to load after splash screen"

    def test_dashboard_welcome_header(self, driver, base_url):
        """Verify main greeting and student status on the dashboard."""
        dashboard = DashboardPage(driver, base_url)
        dashboard.open()

        welcome_text = dashboard.get_welcome_text()
        assert "Welcome back, Buddy!" in welcome_text, f"Unexpected greeting: {welcome_text}"

    def test_dashboard_streak_and_xp_badges(self, driver, base_url):
        """Verify gamification counters (Day Streak and XP) are visible on dashboard."""
        dashboard = DashboardPage(driver, base_url)
        dashboard.open()

        assert dashboard.has_streak_badge(), "Streak badge not found on dashboard"
        assert dashboard.has_xp_badge(), "XP badge not found on dashboard"

    def test_dashboard_knowledge_overview(self, driver, base_url):
        """Verify Knowledge Twin overview and skill gaps section on dashboard."""
        dashboard = DashboardPage(driver, base_url)
        dashboard.open()

        cards = driver.find_elements(By.XPATH, "//*[contains(text(), 'Knowledge Twin') or contains(text(), 'PyTorch') or contains(text(), 'Skill')]")
        assert len(cards) > 0, "Dashboard knowledge overview cards should be visible"
