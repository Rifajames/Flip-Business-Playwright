# Flip for Business Registration - Test Cases

Scope: registration entry point at `https://business.flip.id/signup` and the registration journey through email/OTP/business verification. Tests that create an account should use disposable test data and a controlled mailbox/OTP provider.

## Priority / Severity

- **P0 / Blocker:** registration unavailable, data corruption, security/privacy exposure, duplicate account creation.
- **P1 / Critical:** valid users cannot register/verify, invalid identity/business data accepted, OTP bypass, password exposed.
- **P2 / Major:** field validation incorrect, recovery/resend broken, UX blocks a meaningful subset of users.
- **P3 / Minor:** copy, alignment, non-blocking usability defects.

## Functional test matrix

| ID | Scenario | Type | Priority | Expected result |
|---|---|---|---|---|
| REG-001 | Open signup page | Positive | P0 | Page loads over HTTPS and form is usable |
| REG-002 | Register with valid business data | Positive | P0 | Registration request succeeds and user moves to verification |
| REG-003 | Required fields empty | Negative | P1 | Submission blocked and field-level feedback shown |
| REG-004 | Full name below minimum length | Edge | P2 | Clear validation; no malformed request |
| REG-005 | Full name at maximum length | Edge | P2 | Accepted if within specification |
| REG-006 | Full name over maximum length | Negative | P2 | Rejected without truncating silently |
| REG-007 | Full name with spaces between words | Positive | P3 | Accepted |
| REG-008 | Full name with leading/trailing spaces | Edge | P2 | Trimmed or rejected consistently |
| REG-009 | Business email valid corporate email | Positive | P1 | Accepted |
| REG-010 | Business email malformed | Negative | P1 | Rejected |
| REG-011 | Business email with uppercase characters | Edge | P2 | Handled consistently; no duplicate due to case |
| REG-012 | Personal email where corporate email is required | Negative | P1 | Correctly rejected or explicitly allowed per requirement |
| REG-013 | Existing email | Negative | P1 | Existing account detected; no duplicate account |
| REG-014 | Business name with punctuation | Edge | P2 | Accepted if legal/business-name rules allow it |
| REG-015 | Business name maximum length | Edge | P2 | Boundary handled correctly |
| REG-016 | Business type not selected | Negative | P1 | Submission blocked |
| REG-017 | Each supported business type | Positive | P1 | Correct downstream requirements are triggered |
| REG-018 | Invalid/tampered business type value | Security | P1 | Backend rejects unsupported value |
| REG-019 | Valid Flip ID | Positive | P1 | Accepted |
| REG-020 | Flip ID already exists | Negative | P1 | User receives duplicate identifier feedback |
| REG-021 | Flip ID contains unsupported characters | Negative | P2 | Rejected with format guidance |
| REG-022 | Flip ID at min length | Edge | P2 | Correct boundary behavior |
| REG-023 | Flip ID at max length | Edge | P2 | Correct boundary behavior |
| REG-024 | Phone number valid Indonesia format | Positive | P1 | Accepted and normalized consistently |
| REG-025 | Phone number too short | Negative | P1 | Rejected |
| REG-026 | Phone number too long | Negative | P1 | Rejected |
| REG-027 | Phone contains letters/symbols | Negative | P1 | Rejected |
| REG-028 | Phone entered with +62 | Edge | P2 | Accepted/normalized consistently if supported |
| REG-029 | Phone already registered | Negative | P1 | Duplicate account prevented |
| REG-030 | Password meets policy | Positive | P1 | Accepted |
| REG-031 | Password below minimum length | Negative | P1 | Rejected |
| REG-032 | Password missing required character classes | Negative | P2 | Rejected with policy feedback |
| REG-033 | Password visible/hidden toggle | UX/Security | P2 | Toggle works; value is not leaked |
| REG-034 | Password not exposed in URL/logs | Security | P0 | Secret never appears in URL or client-visible telemetry |
| REG-035 | Submit once | Positive | P0 | One registration request created |
| REG-036 | Double-click submit | Edge | P1 | Button debounced/disabled; no duplicate registration |
| REG-037 | Refresh during submission | Edge | P1 | No inconsistent/duplicate account state |
| REG-038 | Back/forward browser navigation | Edge | P2 | State is handled safely; sensitive values not unexpectedly exposed |
| REG-039 | Slow network | Failure | P1 | Loading state appears and request eventually resolves/fails gracefully |
| REG-040 | Request timeout | Failure | P1 | User gets retryable error; no false success |
| REG-041 | 5xx from registration API | Failure | P1 | Friendly error, no data loss where possible |
| REG-042 | Network disconnected before submit | Failure | P1 | Clear connectivity error; user can retry |
| REG-043 | Network disconnected after request sent | Failure | P0 | Client avoids duplicate registration on retry; final state recoverable |
| REG-044 | API returns malformed response | Failure | P1 | UI fails safely; no broken/blank state |
| REG-045 | CAPTCHA/rate limit triggered | Security/Failure | P1 | Rate limit is respected and user is informed |
| REG-046 | Email verification received | Positive | P1 | Verification link is valid and activates intended account |
| REG-047 | Expired verification link | Negative | P1 | Expiry handled; resend/recovery available |
| REG-048 | Verification link reused | Security | P1 | Second use is rejected or idempotently handled |
| REG-049 | OTP correct | Positive | P0 | User progresses to next registration step |
| REG-050 | OTP incorrect | Negative | P1 | Error shown; account remains protected |
| REG-051 | OTP expired | Negative | P1 | OTP rejected and resend available |
| REG-052 | OTP resend repeatedly | Edge/Abuse | P1 | Rate limited; previous OTP invalidation rules enforced |
| REG-053 | OTP submitted multiple times | Edge | P1 | No duplicate side effects |
| REG-054 | OTP brute-force attempts | Security | P0 | Attempts throttled/blocked and audited |
| REG-055 | Session expires between steps | Failure | P1 | User is redirected/recovered without data leakage |
| REG-056 | Document upload wrong file type | Negative | P1 | Rejected with supported formats |
| REG-057 | Document exceeds max size | Negative | P1 | Rejected before/at upload with clear message |
| REG-058 | Corrupted document | Negative | P2 | Upload rejected safely |
| REG-059 | Multiple documents uploaded where one is required | Edge | P2 | Rules enforced consistently |
| REG-060 | Submit verification with incomplete data | Negative | P1 | Submission blocked with missing-field feedback |
| REG-061 | Submit verification twice | Edge | P1 | Idempotent/no duplicate verification case |
| REG-062 | User edits data before final submit | Positive | P1 | Final submitted values match latest user input |
| REG-063 | Browser closes before final submit | Failure | P2 | Draft/session behavior follows product requirement |
| REG-064 | XSS payload in text fields | Security | P0 | Payload is encoded/rejected; never executed |
| REG-065 | SQL/NoSQL injection-like input | Security | P0 | Backend treats input as data |
| REG-066 | Unexpected Unicode/emoji in allowed fields | Edge | P2 | Correctly handled without crashes |
| REG-067 | Very long pasted input | Edge | P2 | Input capped/validated; page remains responsive |
| REG-068 | Keyboard-only registration | Accessibility | P2 | All controls reachable and usable |
| REG-069 | Screen reader labels | Accessibility | P2 | Inputs have meaningful accessible names |
| REG-070 | Mobile viewport | Compatibility | P2 | Form remains usable without overlap |
| REG-071 | Duplicate account created concurrently | Concurrency | P0 | Backend enforces uniqueness atomically |
| REG-072 | Registration API succeeds but response is lost | Failure | P0 | Retry/reconciliation does not create duplicate account |

## Automation strategy

### Automated in this project
- Page availability/smoke.
- Required-field validation.
- Email format validation.
- Happy-path form submission up to the external verification boundary.
- Basic duplicate-click resilience.
- HTTP contract sanity check for the signup route.

### Better covered at API/integration level
- Atomic uniqueness for email/phone/Flip ID.
- 5xx/timeout/retry/idempotency.
- OTP expiry/rate limiting/brute force.
- Verification-link reuse.
- Document validation.
- Concurrent registration requests.

### Manual/exploratory
- Accessibility review.
- Cross-browser visual behavior.
- Real email/SMS/WhatsApp delivery.
- Security testing that requires privileged tooling.

## Test data rules

Never commit real identity documents, real customer phone numbers, real credentials, or production OTPs. Use disposable accounts and environment variables.
