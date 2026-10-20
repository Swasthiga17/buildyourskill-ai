import time
from selenium.webdriver.common.by import By
from tests_e2e.pages.base_page import BasePage


class NavigationComponent(BasePage):
    """Component Object for global Sidebar, Header, Copilot drawer, and Feedback modal."""

    # Sidebar Navigation Links
    SIDEBAR_TOGGLE_BTN = (By.XPATH, "//button[@aria-label='Collapse sidebar' or @aria-label='Expand sidebar']")
    NAV_DASHBOARD = (By.XPATH, "//aside//a[@href='/' or @href='/dashboard']")
    NAV_KNOWLEDGE_TWIN = (By.XPATH, "//aside//a[@href='/knowledge-twin']")
    NAV_ROADMAP = (By.XPATH, "//aside//a[@href='/roadmap']")
    NAV_TODAYS_PLAN = (By.XPATH, "//aside//a[@href='/today-plan']")
    NAV_STUDY = (By.XPATH, "//aside//a[@href='/study']")
    NAV_PROJECTS = (By.XPATH, "//aside//a[@href='/projects']")
    NAV_ASSESSMENTS = (By.XPATH, "//aside//a[@href='/assessments']")
    NAV_INTERVIEW = (By.XPATH, "//aside//a[@href='/interview']")
    NAV_MENTOR = (By.XPATH, "//aside//a[@href='/mentor']")
    NAV_DOCUMENTS_RAG = (By.XPATH, "//aside//a[@href='/import-knowledge']")
    NAV_GITHUB_ANALYZER = (By.XPATH, "//aside//a[@href='/learn-anything']")
    NAV_PROGRESS = (By.XPATH, "//aside//a[@href='/progress']")
    NAV_SETTINGS = (By.XPATH, "//aside//a[@href='/settings']")
    NAV_ADMIN = (By.XPATH, "//aside//a[@href='/admin']")

    # Global Top Header
    SEARCH_INPUT = (By.CSS_SELECTOR, "header input[placeholder*='Search']")

    # Floating AI Mentor Co-pilot
    COPILOT_TRIGGER_BUTTON = (By.XPATH, "//button[contains(., 'AI Mentor') and not(ancestor::aside)]")
    COPILOT_DRAWER = (By.XPATH, "//*[contains(text(), 'AI Mentor Co-pilot')]")
    COPILOT_INPUT = (By.XPATH, "//input[@placeholder='Ask mentor anything...']")
    COPILOT_SEND_BUTTON = (By.XPATH, "//input[@placeholder='Ask mentor anything...']/following-sibling::button")
    COPILOT_CLOSE_BUTTON = (By.XPATH, "//div[contains(@class, 'rounded-3xl')]//div[contains(@class, 'border-b')]//button")
    COPILOT_MESSAGES = (By.CSS_SELECTOR, "div.overflow-y-auto p")

    # Beta Feedback Modal
    FEEDBACK_FLOATING_TRIGGER = (By.XPATH, "//button[contains(., 'Feedback') or contains(., 'Beta Feedback')]")

    def toggle_sidebar(self):
        self.click(self.SIDEBAR_TOGGLE_BTN)
        time.sleep(0.3)

    def navigate_to(self, route_name: str):
        """Click on the designated sidebar navigation link."""
        locators = {
            "dashboard": self.NAV_DASHBOARD,
            "knowledge-twin": self.NAV_KNOWLEDGE_TWIN,
            "roadmap": self.NAV_ROADMAP,
            "today-plan": self.NAV_TODAYS_PLAN,
            "study": self.NAV_STUDY,
            "projects": self.NAV_PROJECTS,
            "assessments": self.NAV_ASSESSMENTS,
            "interview": self.NAV_INTERVIEW,
            "mentor": self.NAV_MENTOR,
            "import-knowledge": self.NAV_DOCUMENTS_RAG,
            "learn-anything": self.NAV_GITHUB_ANALYZER,
            "progress": self.NAV_PROGRESS,
            "settings": self.NAV_SETTINGS,
            "admin": self.NAV_ADMIN,
        }
        loc = locators.get(route_name.lower())
        if not loc:
            raise ValueError(f"Unknown route name: {route_name}")
        self.click(loc)
        time.sleep(0.3)

    def open_copilot(self):
        if not self.is_displayed(self.COPILOT_DRAWER, timeout=1):
            self.click(self.COPILOT_TRIGGER_BUTTON)
            self.wait_for_visible(self.COPILOT_DRAWER)

    def close_copilot(self):
        if self.is_displayed(self.COPILOT_DRAWER, timeout=1):
            self.click(self.COPILOT_CLOSE_BUTTON)
            time.sleep(0.2)

    def send_copilot_message(self, message: str):
        self.open_copilot()
        self.type_text(self.COPILOT_INPUT, message)
        self.click(self.COPILOT_SEND_BUTTON)
        time.sleep(0.6)

    def get_latest_copilot_message(self) -> str:
        messages = self.get_elements(self.COPILOT_MESSAGES)
        if messages:
            return messages[-1].text
        return ""
