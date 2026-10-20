import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestCareerDashboardPage:
    """Tests for the Career Intelligence Dashboard (/career)."""

    def test_career_dashboard_header(self, driver, base_url):
        """Verify Career Intelligence title and badge."""
        page = BasePage(driver, base_url).open("/career")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'Career') and contains(., 'Intelligence')]"))
        assert heading.is_displayed(), "Career Intelligence heading missing"

    def test_career_advisor_interaction(self, driver, base_url):
        """Verify the interactive Career Advisor chat box responds to career questions."""
        page = BasePage(driver, base_url).open("/career")

        chat_input = (By.CSS_SELECTOR, "input[placeholder*='Ask'], input[type='text']")
        if page.is_displayed(chat_input):
            page.type_text(chat_input, "What projects should I build to become an AI/ML Engineer?")
            send_btn = (By.XPATH, "//button[contains(., 'Ask') or contains(., 'Send')]")
            if page.is_displayed(send_btn):
                page.click(send_btn)

            advisor_reply = page.wait_for_visible((By.XPATH, "//*[contains(text(), 'MLOps') or contains(text(), 'Career Advisor')]"))
            assert advisor_reply.is_displayed(), "Career advisor failed to reply"
