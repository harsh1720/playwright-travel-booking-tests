# ✈️ playwright-travel-booking-tests

This project is a robust end-to-end test suite built using [Playwright](https://playwright.dev/) with **TypeScript** to automate and validate core user journeys on a real-world travel booking demo website.

## 📌 Project Overview

The goal of this project is to simulate and verify the functionality of a travel booking platform through automated browser testing. Scenarios covered include searching flights, booking, negative test validations, and visual + trace reporting.

---

## 🚀 Tech Stack

- **Framework**: [Playwright](https://playwright.dev/)
- **Language**: TypeScript
- **CI/CD**: GitHub Actions
- **Reporting**: HTML Report, Trace Viewer, Screenshots
- **Test Runner**: Playwright Test

---

## 🧪 Test Scenarios

### ✅ Positive Tests
- Book a flight with all valid details
- Select origin, destination, date, and passenger count
- Verify confirmation and booking reference

---

## 📁 Folder Structure

```

.
├── tests/                    # All test cases
│   ├── positive-cases.spec.ts
│   └── negative-cases.spec.ts
├── playwright.config.ts      # Configuration
├── utils/                    # Helpers and selectors
├── .github/workflows/ci.yml  # CI setup
└── README.md

````

---

## ⚙️ Setup & Installation

```bash
# 1. Clone the repo
git clone https://github.com/harsh1720/playwright-travel-booking-tests.git
cd playwright-travel-booking-tests

# 2. Install dependencies
npm install

# 3. Run tests locally
npx playwright test
````

---

## 🖼️ Traces & Reports

* **View HTML Report**:

  ```bash
  npx playwright show-report
  ```

* **View Trace File** (from failed tests):

  ```bash
  npx playwright show-trace trace.zip
  ```

Screenshots and traces are also uploaded in CI during failure for debugging ease.

---

## ⚡ CI/CD Integration

* GitHub Actions workflow configured in `.github/workflows/ci.yml`
* Tests run on push and pull requests
* Traces and screenshots are available in the Actions artifacts

---

## 🛠️ Future Enhancements

* Test hotel bookings and rental car flows
* Add device and browser coverage (mobile, Safari)
* Add data-driven test strategy
* Integrate with Allure or custom dashboards

---

## 🙌 Author

Created by [@harsh1720](https://github.com/harsh1720)
Feel free to fork, contribute or raise issues.

---

## 📝 License

MIT License – Free to use, modify, and distribute.

![CI](https://github.com/harsh1720/playwright-travel-booking-tests/actions/workflows/playwright.yml/badge.svg)

