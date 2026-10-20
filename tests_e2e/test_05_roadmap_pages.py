import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestRoadmapPages:
    """Tests for the Multi-Stage Roadmap Home and Stage Detail pages."""

    def test_roadmap_home_header_and_role(self, driver, base_url):
        """Verify the Roadmap main title and current target role badge."""
        page = BasePage(driver, base_url).open("/roadmap")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'Personalized Roadmap')]"))
        assert heading.is_displayed(), "Roadmap heading missing"

        role_badge = page.wait_for_visible((By.XPATH, "//*[contains(text(), 'Role: AI/ML Engineer')]"))
        assert role_badge.is_displayed(), "Target role badge missing"

    def test_roadmap_stage_navigation_python(self, driver, base_url):
        """Verify navigating to Stage 1 (Python) opens the dedicated roadmap stage view."""
        page = BasePage(driver, base_url).open("/roadmap/python")

        stage_title = page.wait_for_visible((By.XPATH, "//*[contains(text(), 'Python') or contains(text(), 'Stage')]"))
        assert stage_title.is_displayed(), "Python stage details not rendered"

    def test_roadmap_stage_navigation_rag(self, driver, base_url):
        """Verify navigating directly to the RAG stage page."""
        page = BasePage(driver, base_url).open("/roadmap/rag")

        rag_header = page.wait_for_visible((By.XPATH, "//*[contains(text(), 'RAG') or contains(text(), 'Retrieval')]"))
        assert rag_header.is_displayed(), "RAG stage page failed to load"
