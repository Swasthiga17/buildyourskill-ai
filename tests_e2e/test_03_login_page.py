import pytest
import time
from tests_e2e.pages.login_page import LoginPage
from tests_e2e.pages.dashboard_page import DashboardPage


@pytest.mark.login
@pytest.mark.smoke
class TestLoginPage:
    """Tests for the Login Page (/login) authentication and redirects."""

    def test_login_page_renders_elements(self, driver, base_url):
        """Verify email input, password input, and submit buttons exist on /login."""
        login_page = LoginPage(driver, base_url).open()

        assert login_page.is_login_page_loaded(), "Login page failed to render required elements"
        assert login_page.is_displayed(LoginPage.GOOGLE_LOGIN_BUTTON), "Google login button missing"

    def test_login_flow_redirects_to_dashboard(self, driver, base_url):
        """Verify submitting valid demo credentials redirects user to the dashboard."""
        login_page = LoginPage(driver, base_url).open()

        login_page.login(email="alex.rivera@example.com", password="password123")

        # After submission, route transitions to /dashboard
        dashboard = DashboardPage(driver, base_url)
        assert dashboard.is_dashboard_loaded(), "Failed to redirect to Dashboard after login"
        assert "/dashboard" in driver.current_url or "/" in driver.current_url

    def test_google_login_redirect(self, driver, base_url):
        """Verify clicking Google sign-in navigates user directly to dashboard in demo mode."""
        login_page = LoginPage(driver, base_url).open()

        login_page.click_google_login()
        time.sleep(0.5)

        dashboard = DashboardPage(driver, base_url)
        assert dashboard.is_dashboard_loaded(), "Google login button should transition to Dashboard"
