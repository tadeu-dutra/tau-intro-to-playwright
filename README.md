# tau-intro-to-playwright

Learning project developed while following the [Introduction to Playwright course](https://testautomationu.applitools.com/playwright-intro/) from [Test Automation University (TAU)](https://testautomationu.applitools.com/), instructed by [Renata Andrade](https://www.linkedin.com/in/raptatinha/). The project progressively explores testing patterns and visual testing capabilities using Playwright and Applitools Eyes as part of the learning process.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Key Testing Patterns](#key-testing-patterns)
- [Visual Testing with Applitools Eyes](#visual-testing-with-applitools-eyes)
- [Getting Started](#getting-started)
- [Available Test Commands](#available-test-commands)
- [Test File Breakdown](#test-file-breakdown)

---

## Project Overview

This project serves as a learning resource for Playwright test automation engineers. It demonstrates:

- **Progressive complexity**: From basic linear tests to more advanced patterns
- **Multiple test patterns**: AAA (Arrange-Act-Assert), Page Object Model, Component patterns, Data-driven tests
- **Visual testing**: Both manual and fixture-based Applitools Eyes integration

---

## Project Structure

```
tau-intro-to-playwright/
├── playwright.config.ts          # Playwright configuration with Applitools Eyes setup
├── applitools.config.ts          # Applitools Eyes configuration helpers
├── package.json                  # Dependencies and test scripts
├── .env                         # Environment variables (APPLITOOLS_API_KEY)
│
├── tests/                                          # Test files organized by pattern and complexity
│   ├── simple-linear-demo.spec.ts                  # Linear pattern tests (basic intro)
│   ├── aaa-patern-demo.spec.ts                     # AAA pattern + Page Object Model
│   ├── header-navigation-demo.spec.ts              # Data-driven tests with POM
│   ├── aaa-patern-visualtesting-default.spec.ts    # Visual testing - manual Eyes setup
│   ├── aaa-patern-visualtesting-fixtures.spec.ts   # Visual testing - fixture Eyes setup
│   ├── applitools-demo-visual-testing.spec.ts      # Visual testing on Applitools demo site
│   └── ... (additional test files)
│
├── pages/                       # Page Object Model classes
│   ├── base-page.ts             # Base class with common page methods (goto, assertions)
│   ├── home-page.ts             # HomePage with header and search modal components
│   └── top-menu-page.ts         # TopMenuPage for language selection and navigation
│
├── components/                  # Reusable UI component classes
│   ├── header-component.ts      # HeaderComponent for navigation and search
│   └── search-modal.ts          # SearchModal for search interactions
│
├── fixtures/                    # Custom Playwright fixtures
│   └── eyes.ts                  # Eyes fixture for visual testing (recommended approach)
│
├── utils/                       # Utility functions and helpers
│
├── playwright-report/           # HTML report generated from test runs
├── custom-report/               # Custom HTML reports
└── test-results/                # Test artifacts (screenshots, traces)
```

### Directory Descriptions

- **tests/**: Contains all test specifications organized by pattern type. Each file demonstrates a specific testing approach.
- **pages/**: Page Object Model implementation. Encapsulates page elements and common actions for maintainability and reusability.
- **components/**: Reusable UI component abstractions (header, search modal, etc.) used within pages.
- **fixtures/**: Custom Playwright fixtures for setup/teardown, particularly the Eyes fixture for visual testing.
- **playwright-report/**: Auto-generated HTML test report from Playwright. View with `npm run test:show-report`.

---

## Key Testing Patterns

This project demonstrates multiple test patterns, each with distinct advantages:

| Pattern | Purpose | Example File | Key Concepts |
|---------|---------|---------|--------------|
| **Linear Tests** | Simple, sequential test structure | `simple-linear-demo.spec.ts` | Basic Playwright syntax, `test.describe()`, assertions |
| **AAA Pattern** | Arrange-Act-Assert with clear test flow | `aaa-patern-demo.spec.ts` | `test.beforeEach()`, `test.step()`, structured assertions |
| **Page Object Model (POM)** | Encapsulates page elements and actions into reusable classes | Pages in `pages/` directory | Class inheritance, method reuse, maintainability |
| **Component Pattern** | Extracts UI components into separate classes | `header-component.ts`, `search-modal.ts` | Component composition, locator encapsulation |
| **Data-Driven Tests** | Parameterized tests iterating over multiple scenarios | `header-navigation-demo.spec.ts` | Array iteration, dynamic test generation |
| **Visual Testing (Manual)** | Direct Eyes API usage with manual setup | `aaa-patern-visualtesting-default.spec.ts` | Eyes open/close, batch management, configuration |
| **Visual Testing (Fixture)** | Applitools Eyes via fixture (recommended) | `aaa-patern-visualtesting-fixtures.specc.ts` | Fixture-based eyes object, auto setup/teardown, race condition prevention |

### Recommended Pattern Progression

For learning, follow this progression:

1. **Start with Linear Tests** → Understand basic Playwright syntax and test structure
2. **Move to AAA Pattern** → Learn structured test organization
3. **Adopt Page Object Model** → Improve maintainability and reusability
4. **Add Component Patterns** → Scale UI abstraction
5. **Implement Visual Testing** → Add regression detection via Applitools Eyes
6. **Use Fixtures** → Simplify test setup and prevent race conditions

---

## Visual Testing with Applitools Eyes

Applitools integrates with Playwright using a custom test fixture that centralizes and reuses setup/teardown code for visual testing. This fixture replaces the default playwright/test function, automating eyes.open() and eyes.close() calls and providing an eyes object within tests. In this project we have examples using both:

#### 1. Manual Setup (Traditional)
- Creates `Eyes` instance with `VisualGridRunner` or `ClassicRunner`
- Manually calls `eyes.open()` in `beforeEach`
- Manually calls `eyes.close()` in `afterEach`
- More control, but more boilerplate code
- Example: `aaa-patern-visualtesting-default.spec.ts`

#### 2. Fixture-Based (Recommended)
- Imports Eyes fixture from `@applitools/eyes-playwright/fixture`
- Eyes automatically injected as `{ eyes }` parameter in tests
- Auto open/close via fixture lifecycle
- Cleaner code, prevents race conditions
- Example: `aaa-patern-visualtesting-fixtures.spec.ts`

**Recommendation:** Use fixture-based approach.

### Visual Checkpoint Patterns

Visual checkpoints are defined using the `Target` object. Some examples used in this project are:

```typescript
// Full page screenshot (including scrolled content)
await eyes.check('Page Name', Target.window().fully());

// Layout-only comparison (ignore color/content)
await eyes.check('Page Name', Target.window().fully().layout());

// Ignore color differences
await eyes.check('Page Name', Target.window().fully().ignoreColors());
```

### Batch & Reporting

- **Batch**: Groups test checkpoints into a logical suite for dashboard reporting
- **Reporters**: HTML report auto-generated via `@applitools/eyes-playwright/reporter`
- **Results**: Viewable in [Applitools Dashboard](https://eyes.applitools.com) (cloud) with detailed diffs

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Applitools Account** (free at [applitools.com](https://applitools.com))

### Installation

```bash
# Install dependencies
npm install
```

This installs:
- `@playwright/test` — Playwright testing framework
- `@applitools/eyes-playwright` — Visual testing integration
- `dotenv` / `dotenv-cli` — Environment variable management for API keys
- `cross-env` — Cross-platform environment variable support

### Environment Setup

1. **Create `.env` file** in project root:
   ```
   APPLITOOLS_API_KEY=<your-applitools-api-key>
   ```

2. **Get your API key**:
   - Sign up at [applitools.com](https://applitools.com)
   - Go to **Settings** → **API Keys**
   - Copy your API key

3. **Verify setup**:
   ```bash
   npm run test:smoke  # Should run without errors
   npm run test:show-report # View HTML report
   ```

---

## Available Test Commands

### Basic Test Execution

```bash
# Run all tests (all browsers)
npm test

# Run all tests across all configured browsers
npm run test:all-browsers-and-tests

# Run tests in headed mode (see browser window)
npm run test:headed

# Run with Playwright Inspector (step-by-step debugging)
npm run test:debug
```

### Pattern-Based Execution

Run specific test files to learn different patterns:

```bash
# Simple linear demo (introductory)
npm run test:simple-linear-demo

# AAA pattern + Page Object Model
npm run test:aaa-pom

# Data-driven testing
npm run test:data-driven
```

### Filtered Tests

```bash
# Run only tests tagged with @smoke
npm run test:smoke

# Run all tests except @smoke tagged tests
npm run test:non-smoke
```

### Reports

```bash
# View HTML report from last test run
npm run test:show-report

# Generate custom HTML report directory running a basic test
npm run test:report-html-customdir

# Generate JUnit XML report running a basic test
npm run test:report-junit

# Generate JSON report running a basic test
npm run test:report-json
```

### Visual Testing

```bash
# Run visual tests with default Eyes setup
npm run test:visualtesting-default

# Run visual tests with fixture-based Eyes (recommended)
npm run test:visualtesting-fixtures
```

---

## Test File Breakdown

Each test file demonstrates specific concepts and patterns:

| Test File | Focus | Demonstrates | Browser Scope |
|-----------|-------|---------|--------------|
| **simple-linear-demo.spec.ts** | Basic intro without POM | test.describe(), getByRole(), test tagging (@smoke) | Standard |
| **aaa-patern-demo.spec.ts** | AAA pattern + POM | beforeEach(), test.step(), page object methods | Standard |
| **header-navigation-demo.spec.ts** | Data-driven + POM | Loop-based test generation, multiple scenarios | Standard |
| **aaa-patern-visualtesting-default.spec.ts** | Manual Eyes setup | Eyes API, VisualGridRunner, batch management | Standard |
| **aaa-patern-visualtesting-fixtures.spec.ts** | Fixture-based visual tests | Eyes fixture, automated setup/teardown (recommended) | Eyes Fixture |

### Learning Path

1. Start with `simple-linear-demo.spec.ts` to understand basic Playwright
2. Move to `aaa-patern-demo.spec.ts` for structured test patterns
3. Explore `header-navigation-demo.spec.ts` for data-driven scenarios
4. Add visual testing with `aaa-patern-visualtesting-default.spec.ts` (manual config) and `aaa-patern-visualtesting-fixtures.spec.ts` (fixture-based)

---

## Key Dependencies

- **@playwright/test** ^1.40.0 — Testing framework and browser automation
- **@applitools/eyes-playwright** ^1.40.0 — Visual testing integration
- **dotenv** ^17.x — Load environment variables from .env file
- **dotenv-cli** ^11.x — CLI support for environment variables

---

## Troubleshooting

### Environment Variables Not Loading
- Ensure `.env` file exists in project root
- Check `APPLITOOLS_API_KEY` is set without quotes
- Use `npm run` prefix to load dotenv-cli properly

### Visual Tests Not Running
- Verify `APPLITOOLS_API_KEY` is valid
- Check Applitools account hasn't been suspended
- Ensure `@applitools/eyes-playwright` is installed

### Tests Timing Out
- Increase `timeout` in `playwright.config.ts` if needed
- Check internet connection (for Applitools cloud sync)
- Review `use.actionTimeout` and `use.navigationTimeout` settings

---

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Applitools Eyes for Playwright](https://applitools.com/tutorials/playwright.html)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Visual Testing Guide](https://applitools.com/docs/topics/overview.html)

---

## AI Assistance

This project documentation was generated with AI assistance and reviewed and edited by the author.
