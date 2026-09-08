# QA Strategy & Reasoning

## 1. Scope

The registration flow is treated as a business-critical onboarding journey. Success is not only “the form submits”; the system must create exactly one valid account, verify ownership of contact channels, protect credentials, preserve user data across transient failures, and prevent duplicate or fraudulent registration.

## 2. Risk-based coverage

Highest risk areas:

1. **Identity/account uniqueness** — duplicate email, phone, or Flip ID; concurrent submissions.
2. **Verification** — OTP/email link expiry, replay, brute force, resend behavior.
3. **Reliability** — request succeeds while client loses the response, retries, timeouts, refreshes.
4. **Sensitive data** — password/PII exposure in URLs, logs, screenshots, analytics, or error messages.
5. **Business eligibility** — business type determines required documents/verification rules.
6. **Document handling** — invalid, oversized, corrupted, or malicious files.

## 3. Test pyramid

- **UI E2E:** a small set of critical happy/negative flows.
- **API/integration:** most validation, uniqueness, idempotency, error mapping, rate limiting.
- **Component/unit:** field formatting, validation rules, accessibility attributes.
- **Exploratory/manual:** usability, real email/OTP behavior, unexpected navigation, accessibility, mobile.


## 4. Automation principles

- Prefer semantic locators (`getByLabel`, `getByRole`) over CSS/XPath tied to implementation details.
- Generate unique test data for every account-creating test.
- Never hard-code production credentials or OTPs.
- Capture trace/screenshot/video only when useful for failure diagnosis.
- Use retries only for known infrastructure flakiness; do not hide product defects with aggressive retries.
- Assert business outcomes, not only URLs or button clicks.

## 5. Observability expected from CI

Each failure should provide:
- Playwright trace.
- Screenshot on failure.
- Video on failure where configured.
- Browser/project.
- Test data identifier with secrets removed.
- Network/API error where available.
- Clear distinction between product failure and environment/provider failure.

## 6. Definition of done

Registration is considered production-ready when:
- Critical happy path passes consistently.
- Required and malformed input is rejected server-side and client-side as appropriate.
- Uniqueness is enforced atomically.
- OTP/email verification cannot be bypassed or replayed.
- Retry/idempotency behavior is proven for ambiguous network failures.
- Sensitive data is not exposed.
- Major supported browsers/mobile layouts are usable.
- CI has stable smoke coverage and useful failure artifacts.
