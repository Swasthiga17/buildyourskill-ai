import pytest
import time
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class TestMentorChatPage:
    """Tests for the Dedicated AI Mentor Chat Page (/mentor)."""

    def test_mentor_chat_header_and_history(self, driver, base_url):
        """Verify the AI Mentor header and new chat button."""
        page = BasePage(driver, base_url).open("/mentor")

        heading = page.wait_for_visible((By.XPATH, "//h1[contains(., 'AI Mentor')]"))
        assert heading.is_displayed(), "AI Mentor heading missing"

        new_chat_btn = page.wait_for_visible((By.XPATH, "//button[contains(., 'New Chat')]"))
        assert new_chat_btn.is_displayed(), "New Chat button missing"

    def test_send_mentor_message_and_receive_response(self, driver, base_url):
        """Verify sending a technical question receives a simulated grounded AI response."""
        page = BasePage(driver, base_url).open("/mentor")

        input_field = (By.CSS_SELECTOR, "form input, input[placeholder*='Ask']")
        send_btn = (By.CSS_SELECTOR, "form button[type='submit'], form button")

        test_query = "What is the best way to optimize PyTorch backprop?"
        page.type_text(input_field, test_query)
        page.click(send_btn)

        # Verify user message appears in chat thread
        user_msg = page.wait_for_visible((By.XPATH, f"//*[contains(text(), '{test_query}')]"), timeout=5)
        assert user_msg.is_displayed(), "User query was not rendered in chat thread"

        # Wait for AI response to appear
        time.sleep(1.0)
        ai_responses = page.get_elements((By.XPATH, "//*[contains(text(), 'Grounded on your Knowledge Twin') or contains(text(), 'PyTorch') or contains(text(), 'tensor')]"))
        assert len(ai_responses) > 0, "AI Mentor failed to respond"
