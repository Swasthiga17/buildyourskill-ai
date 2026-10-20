import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestAssessmentsPage:
    """Tests for the Assessments Center Page (/assessments)."""

    def test_assessments_header(self, driver, base_url):
        """Verify the Assessments Center title."""
        page = BasePage(driver, base_url).open("/assessments")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'Assessments')]"))
        assert heading.is_displayed(), "Assessments header missing"

    def test_assessment_cards_rendered(self, driver, base_url):
        """Verify that assessment quiz cards are visible."""
        page = BasePage(driver, base_url).open("/assessments")

        # Cards for fundamental topics
        python_card = page.wait_for_presence((By.XPATH, "//*[contains(text(), 'Python Fundamentals')]"))
        ml_card = page.wait_for_presence((By.XPATH, "//*[contains(text(), 'Machine Learning Basics')]"))

        assert python_card.is_displayed(), "Python Fundamentals assessment card missing"
        assert ml_card.is_displayed(), "Machine Learning assessment card missing"
