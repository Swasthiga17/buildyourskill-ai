import pytest
import time
from tests_e2e.pages.navigation_component import NavigationComponent
from tests_e2e.pages.dashboard_page import DashboardPage


@pytest.mark.navigation
@pytest.mark.smoke
class TestGlobalNavigation:
    """Tests for global UI controls: Sidebar toggling, routing, Header search, and Floating Copilot."""

    def test_sidebar_collapse_and_expand(self, driver, base_url):
        """Verify the sidebar can be toggled between expanded and collapsed states."""
        nav = NavigationComponent(driver, base_url).open("/dashboard")

        # Toggle to collapsed
        nav.toggle_sidebar()
        # Toggle back to expanded
        nav.toggle_sidebar()

        assert nav.is_displayed(NavigationComponent.NAV_DASHBOARD), "Sidebar nav failed to render after toggle"

    def test_sidebar_routing_flow(self, driver, base_url):
        """Verify clicking sidebar links navigates correctly between routes."""
        nav = NavigationComponent(driver, base_url).open("/dashboard")

        # Navigate to Knowledge Twin
        nav.navigate_to("knowledge-twin")
        assert "/knowledge-twin" in driver.current_url

        # Navigate to Roadmap
        nav.navigate_to("roadmap")
        assert "/roadmap" in driver.current_url

        # Navigate back to Dashboard
        nav.navigate_to("dashboard")
        assert "/dashboard" in driver.current_url or driver.current_url.endswith("/")

    def test_global_header_search(self, driver, base_url):
        """Verify typing in the global header search bar."""
        nav = NavigationComponent(driver, base_url).open("/dashboard")

        nav.type_text(NavigationComponent.SEARCH_INPUT, "PyTorch Autograd")
        assert nav.is_displayed(NavigationComponent.SEARCH_INPUT)

    def test_floating_ai_copilot_drawer(self, driver, base_url):
        """Verify the floating AI Mentor Copilot widget opens, sends a message, and closes."""
        nav = NavigationComponent(driver, base_url).open("/dashboard")

        # Open copilot
        nav.open_copilot()
        assert nav.is_displayed(NavigationComponent.COPILOT_DRAWER), "Copilot drawer failed to open"

        # Send a message
        nav.send_copilot_message("What should I practice today?")

        # Check response
        latest = nav.get_latest_copilot_message()
        assert len(latest) > 0, "Copilot drawer did not return any text"

        # Close copilot
        nav.close_copilot()
