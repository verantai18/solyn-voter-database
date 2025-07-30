# Contributing to Solyn

Thank you for your interest in contributing to Solyn! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker
- Include a clear description of the problem
- Provide steps to reproduce the issue
- Include browser/device information if relevant

### Suggesting Features
- Open a feature request issue
- Describe the use case and benefits
- Consider implementation complexity
- Check if it aligns with project goals

### Code Contributions
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development
```bash
# Clone your fork
git clone https://github.com/your-username/solyn-voter-database.git
cd solyn-voter-database

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

## 📝 Code Standards

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` types when possible
- Use strict mode

### React/Next.js
- Follow React best practices
- Use functional components with hooks
- Implement proper error boundaries
- Optimize for performance

### Styling
- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design
- Maintain accessibility standards

### Git Commit Messages
Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(voter-db): add advanced search functionality
fix(route-optimizer): resolve API key validation issue
docs(readme): update installation instructions
```

## 🧪 Testing

### Before Submitting
- Test your changes locally
- Ensure all existing functionality works
- Test on different browsers/devices
- Check for accessibility issues
- Verify mobile responsiveness

### Testing Checklist
- [ ] Functionality works as expected
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Accessibility standards met
- [ ] Performance not degraded

## 📋 Pull Request Guidelines

### PR Title
Use the same format as commit messages:
```
type(scope): brief description
```

### PR Description
Include:
- **Summary**: What does this PR do?
- **Motivation**: Why is this change needed?
- **Changes**: What files were modified?
- **Testing**: How was this tested?
- **Screenshots**: If UI changes were made

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Address any feedback
4. Merge when approved

## 🎯 Project Goals

### Democratic Party Focus
This project is specifically designed for Democratic Party organizing. Contributions should:
- Support Democratic Party organizing efforts
- Respect voter privacy and data protection
- Follow campaign finance and election laws
- Promote civic engagement

### Technical Excellence
- Maintain high code quality
- Ensure security and privacy
- Optimize for performance
- Provide excellent user experience

## 🚫 What Not to Contribute

- Code that violates election laws
- Features that compromise voter privacy
- Changes that break existing functionality
- Code that doesn't follow project standards

## 📞 Getting Help

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the README and code comments

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation
- Release notes

Thank you for contributing to Solyn! 🎉 