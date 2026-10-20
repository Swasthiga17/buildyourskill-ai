# GrowSkill AI - Selenium 4 E2E Test Automation Suite

Comprehensive end-to-end (E2E) browser test automation suite built with **Selenium 4** and **Pytest** for the GrowSkill AI platform.

## Test Structure

```
tests_e2e/
├── conftest.py                       # Pytest fixtures (WebDriver, base_url, screenshot on failure)
├── pytest.ini                        # Pytest configuration, python paths & markers
├── requirements-test.txt             # Testing dependencies
├── run_tests.py                      # Interactive CLI runner
│
├── pages/                            # Page Object Model (POM) layer
│   ├── base_page.py                  # Core wait wrappers, element finders, and interaction methods
│   ├── login_page.py                 # /login Page Object
│   ├── dashboard_page.py             # /dashboard Page Object
│   └── navigation_component.py       # Sidebar, Header, Copilot, & Feedback component
│
├── test_01_splash_and_dashboard.py   # Splash screen dismissal and main dashboard metrics
├── test_02_landing_page.py           # Landing page hero, value propositions, and preview tabs
├── test_03_login_page.py             # Credentials validation, Google OAuth, and redirect
├── test_04_knowledge_twin_page.py     # Knowledge twin fidelity score and skill bars
├── test_05_roadmap_pages.py          # Roadmap home & individual stages (Python, RAG, Agents)
├── test_06_study_hub_page.py         # Study & Notes hub modules and deep notes view
├── test_07_today_plan_page.py        # 45-minute daily micro-learning plan and quiz
├── test_08_projects_page.py          # Project generator, explore tabs, and portfolio cards
├── test_09_mentor_chat_page.py       # AI Mentor chat messaging thread and AI replies
├── test_10_assessments_page.py       # Assessments center quiz cards and topic tags
├── test_11_interview_readiness_page.py # Technical interview questions and answer grading
├── test_12_career_dashboard_page.py  # Career intelligence command center & career advisor
├── test_13_progress_analytics_page.py # Gamification hub (streak tracker and XP stats)
├── test_14_import_knowledge_page.py  # Documents (RAG) library and search engine
├── test_15_learn_from_anything_page.py # Signature feature: Learn from YouTube/PDF/GitHub
├── test_16_settings_page.py          # Personalization, mentor persona, and preferences
├── test_17_admin_dashboard_page.py   # Private beta operations, funnel telemetry & invites
└── test_18_global_navigation.py      # Sidebar toggle, routing flow, and floating AI Copilot
```

---

## Prerequisites & Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r tests_e2e/requirements-test.txt
   ```
   *(Selenium 4 automatically manages the Chrome driver binary using built-in Selenium Manager).*

2. **Ensure the GrowSkill AI frontend is running:**
   ```bash
   cd frontend
   npm run dev
   ```
   *(Default URL: `http://localhost:5173`)*

---

## Running the Tests

### 1. Using the Test Runner Script
```bash
# Run all tests in headless mode:
python tests_e2e/run_tests.py

# Run with visible browser window (Headed mode):
python tests_e2e/run_tests.py --headed

# Run only quick smoke tests:
python tests_e2e/run_tests.py --smoke

# Run a specific page test:
python tests_e2e/run_tests.py --file test_03_login_page.py

# Run against a custom base URL:
python tests_e2e/run_tests.py --url http://127.0.0.1:3000
```

### 2. Using Pytest Directly
```bash
# Run all tests:
pytest tests_e2e -v

# Run headed mode:
pytest tests_e2e -v --headed

# Run specific marker:
pytest tests_e2e -m smoke -v
pytest tests_e2e -m login -v
pytest tests_e2e -m navigation -v
```

---

## Automatic Screenshots on Failure
Whenever a test assertion fails, a full-resolution screenshot is automatically saved in `tests_e2e/screenshots/` with the test name and timestamp for fast debugging.
