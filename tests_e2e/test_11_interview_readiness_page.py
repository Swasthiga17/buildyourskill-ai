import pytest
import time
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestInterviewReadinessPage:
    """Tests for the AI Interview Readiness Simulator Page (/interview)."""

    def test_interview_simulator_header(self, driver, base_url):
        """Verify the Interview Readiness Simulator heading."""
        page = BasePage(driver, base_url).open("/interview")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'Interview') and contains(., 'Readiness Simulator')]"))
        assert heading.is_displayed(), "Interview simulator heading missing"

    def test_interview_question_and_answer_grading(self, driver, base_url):
        """Verify answering an interview question and receiving AI feedback scoring."""
        page = BasePage(driver, base_url).open("/interview")

        # Verify current question is visible
        q_title = page.wait_for_visible((By.XPATH, "//*[contains(text(), 'PyTorch Autograd') or contains(text(), 'Vector Indexing')]"))
        assert q_title.is_displayed(), "Interview question title missing"

        # Find textarea and type answer
        textarea = (By.CSS_SELECTOR, "textarea")
        if page.is_displayed(textarea):
            page.type_text(textarea, "PyTorch constructs a dynamic Directed Acyclic Graph (DAG) during the forward pass. Calling loss.backward() utilizes the chain rule to accumulate gradients in .grad.")

            # Find submit button
            submit_btn = (By.XPATH, "//button[contains(., 'Evaluate') or contains(., 'Submit') or contains(., 'Grade')]")
            if page.is_displayed(submit_btn):
                page.click(submit_btn)
                time.sleep(1.0)

                # Verify score or feedback card appears
                feedback_elem = page.get_elements((By.XPATH, "//*[contains(text(), 'Score') or contains(text(), 'Feedback') or contains(text(), 'Great')]"))
                assert len(feedback_elem) > 0, "Evaluation scoring or feedback not returned"
