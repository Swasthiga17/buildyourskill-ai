import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestAdminDashboardPage:
    """Tests for the Admin Private Beta Operations & Funnel Dashboard (/admin)."""

    def test_admin_dashboard_loads_or_shows_auth_gate(self, driver, base_url):
        """Verify the Admin dashboard either displays telemetry or a graceful admin gate message."""
        page = BasePage(driver, base_url).open("/admin")

        # Either the admin operations heading is loaded, or the admin auth required card is shown
        admin_content = page.get_elements(
            (By.XPATH, "//*[contains(text(), 'Private Beta Operations') or contains(text(), 'Admin Authorization') or contains(text(), 'Telemetry')]")
        )
        assert len(admin_content) > 0, "Admin page neither rendered telemetry nor auth requirement message"
