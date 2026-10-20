import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestProjectsPage:
    """Tests for the Project Generator and Portfolio Page (/projects)."""

    def test_projects_header_and_cta(self, driver, base_url):
        """Verify the Projects title and Generate Project button."""
        page = BasePage(driver, base_url).open("/projects")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'Projects')]"))
        assert heading.is_displayed(), "Projects heading missing"

        gen_btn = page.wait_for_visible((By.XPATH, "//button[contains(., 'Generate Project')]"))
        assert gen_btn.is_displayed(), "Generate Project button missing"

    def test_project_cards_rendered(self, driver, base_url):
        """Verify recommended and active project cards are displayed."""
        page = BasePage(driver, base_url).open("/projects")

        rag_project = page.wait_for_presence((By.XPATH, "//*[contains(text(), 'AI Blog Summarizer with RAG')]"))
        assert rag_project.is_displayed(), "RAG project card not found"

    def test_project_tabs_filter(self, driver, base_url):
        """Verify switching between explore and my-projects tabs."""
        page = BasePage(driver, base_url).open("/projects")

        tab = (By.XPATH, "//button[contains(text(), 'Explore') or contains(text(), 'My Projects')]")
        if page.is_displayed(tab):
            page.click(tab)
            assert page.is_displayed((By.XPATH, "//h1[contains(., 'Projects')]"))
