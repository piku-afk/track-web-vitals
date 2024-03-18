# Track Web Vitals - Automation

[![tests](https://github.com/piku-afk/track-web-vitals/actions/workflows/tests.yaml/badge.svg)](https://github.com/piku-afk/track-web-vitals/actions/workflows/tests.yaml)
[![coverage](https://piku-afk.github.io/track-web-vitals/badges/coverage.svg)](https://piku-afk.github.io/track-web-vitals/)

This project provides a Node.js script that leverages Github Actions to automatically generate Lighthouse scores, store them securely in a database for convenient access and comprehensive trend analysis.

## Key Features

- **Headless Chrome with Puppeteer**: Leverage Puppeteer to efficiently run Lighthouse audits in a headless Chrome browser.
- **Automated Lighthouse Scoring**: Github Actions are scheduled to run everyday to generate Lighthouse performance scores.
- **Secure Data Storage**: Store Lighthouse scores in a PostgreSQL database using Prisma ORM, enabling easy retrieval and analysis.
- **TypeScript Development**: Benefit from the type safety and maintainability advantages of TypeScript.
- **Unit Testing**: Ensure code quality and maintainability with unit tests written using Vitest.
