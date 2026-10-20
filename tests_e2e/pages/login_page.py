from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class LoginPage(BasePage):
    """Page Object for /login."""

    EMAIL_INPUT = (By.CSS_SELECTOR, "input[type='email']")
    PASSWORD_INPUT = (By.CSS_SELECTOR, "input[placeholder*='password'], input[type='password'], input[type='text']")
    SUBMIT_BUTTON = (By.CSS_SELECTOR, "button[type='submit']")
    GOOGLE_LOGIN_BUTTON = (By.XPATH, "//button[contains(., 'Continue with Google')]")
    HEADING = (By.XPATH, "//h2[contains(text(), 'Sign in to your account')]")
    PASSWORD_TOGGLE = (By.CSS_SELECTOR, "button[type='button'] svg")
    CREATE_ACCOUNT_LINK = (By.XPATH, "//a[contains(text(), 'Create an account')]")

    def open(self):
        super().open("/login")
        return self

    def enter_email(self, email: str):
        self.type_text(self.EMAIL_INPUT, email)
        return self

    def enter_password(self, password: str):
        self.type_text(self.PASSWORD_INPUT, password)
        return self

    def click_sign_in(self):
        self.click(self.SUBMIT_BUTTON)
        return self

    def click_google_login(self):
        self.click(self.GOOGLE_LOGIN_BUTTON)
        return self

    def login(self, email: str = "alex.rivera@example.com", password: str = "password123"):
        """Convenience method to execute a complete login flow."""
        self.enter_email(email)
        self.enter_password(password)
        self.click_sign_in()
        return self

    def is_login_page_loaded(self) -> bool:
        return self.is_displayed(self.HEADING) and self.is_displayed(self.SUBMIT_BUTTON)
