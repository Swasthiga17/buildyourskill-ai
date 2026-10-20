import pytest
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestKnowledgeTwinPage:
    """Tests for the Knowledge Twin Page (/knowledge-twin)."""

    def test_knowledge_twin_header_and_score(self, driver, base_url):
        """Verify the title and overall fidelity score on the Knowledge Twin page."""
        page = BasePage(driver, base_url).open("/knowledge-twin")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'Knowledge Twin')]"))
        assert heading.is_displayed(), "Knowledge Twin heading missing"

        # Verify Overall Score is displayed
        score_badge = page.wait_for_visible((By.XPATH, "//*[contains(text(), 'Overall Score') or contains(text(), '79%')]"))
        assert score_badge.is_displayed(), "Overall score gauge missing"

    def test_knowledge_twin_skill_items_displayed(self, driver, base_url):
        """Verify that core tracked skills (Python, PyTorch, MLOps) are displayed in the breakdown."""
        page = BasePage(driver, base_url).open("/knowledge-twin")

        # Check for core skill entries
        skills = ["Python", "Machine Learning", "PyTorch"]
        for skill in skills:
            elem = page.wait_for_presence((By.XPATH, f"//*[contains(text(), '{skill}')]"))
            assert elem.is_displayed(), f"Expected skill '{skill}' to be visible on Knowledge Twin"
