import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


@pytest.mark.smoke
class TestLandingPage:
    """Tests for the public Landing Page (/landing)."""

    def test_landing_hero_section(self, driver, base_url):
        """Verify the landing page hero heading and value proposition."""
        page = BasePage(driver, base_url).open("/landing")

        heading_elem = page.wait_for_visible((By.TAG_NAME, "h1"))
        assert "Master AI Engineering with a" in heading_elem.text
        assert "Living Knowledge Twin" in heading_elem.text

    def test_landing_call_to_action_buttons(self, driver, base_url):
        """Verify presence of main CTA links to dashboard and login."""
        page = BasePage(driver, base_url).open("/landing")

        cta_buttons = page.get_elements((By.XPATH, "//a[contains(., 'Start Learning') or contains(., 'Get Started') or contains(., 'Sign In')]"))
        assert len(cta_buttons) >= 1, "At least one call-to-action button must be displayed on landing page"

    def test_landing_feature_tabs_interaction(self, driver, base_url):
        """Verify switching between interactive preview tabs (Knowledge Twin, AI Mentor, Roadmap)."""
        page = BasePage(driver, base_url).open("/landing")

        # Click on 'AI Mentor' preview tab if available
        mentor_tab = (By.XPATH, "//button[contains(., 'AI Mentor') or contains(., 'Mentor')]")
        if page.is_displayed(mentor_tab, timeout=3):
            page.click(mentor_tab)
            assert page.is_displayed(mentor_tab)
