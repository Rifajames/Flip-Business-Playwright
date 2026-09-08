# Flip for Business — Registration QA Take-Home

A Playwright + TypeScript QA automation exercise for the Flip for Business registration flow.

## Why Playwright + TypeScript?

Playwright gives reliable browser automation, auto-waiting, network-level capabilities, traces, screenshots, and strong support for semantic locators. TypeScript adds type safety while keeping the test code readable for a QA/SDET team.

## Project structure

```text
.
├── docs/
│   ├── TEST-CASES.md
│   └── TEST-STRATEGY.md
├── pages/
│   └── signup.page.ts
├── test-data/
│   └── registration.data.ts
├── tests/
│   ├── registration.spec.ts
│   └── registration.contract.spec.ts
├── package.json
└── playwright.config.ts
```

## Prerequisites

- Node.js 20+
- npm

## Install

```bash
npm install
npx playwright install chromium
```

## Run

```bash
npm test
```

Headed:

```bash
npm run test:headed
```

Smoke only:

```bash
npm run test:smoke
```

Open report:

```bash
npm run report
```

## Important note about real registration

The public test intentionally stops at the external verification boundary. A real registration can send email/SMS/WhatsApp OTP and create a real business account. For a take-home submission, do not use real personal/business credentials or bypass OTP protections.

For a controlled QA environment, I would add:

1. Disposable mailbox integration for verification email.
2. Test-only OTP retrieval API or seeded OTP in a non-production environment.
3. Test account cleanup API.
4. API interception/mocking for third-party providers where appropriate.
5. Backend assertions for uniqueness and idempotency.

## Assumptions to validate locally

The initial form is expected to expose semantic labels similar to:

- Nama Lengkap
- Email Bisnis
- Nama Bisnis
- Tipe Bisnis
- ID Flip
- Nomor HP/Handphone
- Kata Sandi/Password
- Buat Akun/Buat

The live site may change labels or registration steps. If that happens, update only the page-object locators, not the test intent.

## What I would say in the interview

> “I intentionally did not make the E2E suite dependent on a real OTP provider. Registration is a high-side-effect flow, so I keep a small UI smoke suite and move uniqueness, idempotency, rate limiting, OTP lifecycle, and server error handling to API/integration tests. That gives faster and more deterministic feedback while still covering the highest-risk business behavior.”
