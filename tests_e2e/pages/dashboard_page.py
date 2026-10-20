from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class DashboardPage(BasePage):
    """Page Object for the Main Dashboard (/ and /dashboard)."""

    WELCOME_HEADER = (By.XPATH, "//h1[contains(., 'Welcome back, Buddy!')]")
    STREAK_BADGE = (By.XPATH, "//*[contains(., 'Day Streak')]")
    XP_BADGE = (By.XPATH, "//*[contains(., 'XP Earned')]")
    ONBOARDING_CHECKLIST = (By.XPATH, "//*[contains(text(), 'Onboarding') or contains(text(), 'Phase') or contains(text(), 'Checklist')]")
    SIDEBAR = (By.CSS_SELECTOR, "aside")
    NAV_LINKS = (By.CSS_SELECTOR, "aside nav a")

    def open(self):
        super().open("/dashboard")
        return self

    def is_dashboard_loaded(self) -> bool:
        return self.is_displayed(self.WELCOME_HEADER)

    def get_welcome_text(self) -> str:
        return self.get_text(self.WELCOME_HEADER)

    def has_streak_badge(self) -> bool:
        return self.is_displayed(self.STREAK_BADGE)

    def has_xp_badge(self) -> bool:
        return self.is_displayed(self.XP_BADGE)
