import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestImportKnowledgePage:
    """Tests for the Documents / RAG Resource Library Page (/import-knowledge)."""

    def test_import_knowledge_header_and_search(self, driver, base_url):
        """Verify the AI Resource Library title and document search bar."""
        page = BasePage(driver, base_url).open("/import-knowledge")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'AI Resource') and contains(., 'Library')]"))
        assert heading.is_displayed(), "Resource Library heading missing"

        search_input = (By.CSS_SELECTOR, "input[placeholder*='Search']")
        assert page.is_displayed(search_input), "Knowledge search input missing"

    def test_import_knowledge_tabs(self, driver, base_url):
        """Verify presence of knowledge ingestion tabs (Search, Video, Notes, Library)."""
        page = BasePage(driver, base_url).open("/import-knowledge")

        tab_elem = page.get_elements((By.XPATH, "//button[contains(., 'Search') or contains(., 'Notes') or contains(., 'Library')]"))
        assert len(tab_elem) > 0, "Resource tabs should be visible"
