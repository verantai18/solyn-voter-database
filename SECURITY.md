# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Solyn seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to the maintainers.

### What to include in your report

- **Type of issue** (buffer overflow, SQL injection, cross-site scripting, etc.)
- **Full paths of source file(s) related to the vulnerability**
- **The location of the affected source code (tag/branch/commit or direct URL)**
- **Any special configuration required to reproduce the issue**
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code (if possible)**
- **Impact of the issue, including how an attacker might exploit it**

This information will help us triage your report more quickly.

### Preferred Languages

We prefer all communications to be in English.

## What to expect

After you submit a report, we will:

1. **Confirm the problem** and determine the affected versions.
2. **Audit the codebase** to find any similar problems.
3. **Prepare fixes** for all supported versions. These fixes will be released as fast as possible.

## Security Considerations

### Data Privacy
- This application works with publicly available voter registration data
- No sensitive personal information is stored or processed
- All data handling follows applicable privacy laws

### Political Use
- This tool is designed for Democratic Party organizing
- Users must comply with campaign finance and election laws
- Voter contact must respect privacy preferences

### Technical Security
- Environment variables for sensitive configuration
- Input validation and sanitization
- HTTPS enforcement in production
- Regular dependency updates

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new versions with the fixes
5. Publicly announce the vulnerability

## Security Updates

We regularly update dependencies to address security vulnerabilities. To ensure you're running the latest secure version:

1. Keep your dependencies updated
2. Monitor security advisories
3. Update promptly when security patches are released

## Contact

For security issues, please contact the maintainers directly rather than opening a public issue. 