import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestStudyHubPage:
    """Tests for the Dedicated Study Hub & Notes pages (/study)."""

    def test_study_hub_header(self, driver, base_url):
        """Verify Study Hub main title and description."""
        page = BasePage(driver, base_url).open("/study")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'Study & Notes')]"))
        assert heading.is_displayed(), "Study Hub header missing"

    def test_study_modules_list(self, driver, base_url):
        """Verify that core technical study modules are rendered."""
        page = BasePage(driver, base_url).open("/study")

        # Modules list verification
        module_titles = ["Python & Software Engineering", "Mathematics & Statistics", "Deep Learning"]
        for title in module_titles:
            elem = page.wait_for_presence((By.XPATH, f"//*[contains(text(), '{title}')]"))
            assert elem.is_displayed(), f"Study module '{title}' not found"

    def test_study_stage_detail_view(self, driver, base_url):
        """Verify opening a specific stage study notes view (e.g. /study/python)."""
        page = BasePage(driver, base_url).open("/study/python")

        notes_content = page.wait_for_visible((By.XPATH, "//*[contains(text(), 'Python') or contains(text(), 'Notes') or contains(text(), 'Stage')]"))
        assert notes_content.is_displayed(), "Stage notes content failed to load"
