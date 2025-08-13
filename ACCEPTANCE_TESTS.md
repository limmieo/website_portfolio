# Acceptance Test Plan for Tony Destin Portfolio

This document outlines the acceptance tests to validate the portfolio website's functionality, performance, and user experience.

## Test Environment

- **Browser**: Latest Chrome, Firefox, Safari, and Edge
- **Devices**: Desktop, Tablet, Mobile
- **Connection**: 4G (Fast 3G for throttled tests)

## Test Cases

### 1. Content Management

#### 1.1 JSON Content Updates
- [ ] Verify that all site content can be updated via `/public/content/content.json`
- [ ] Verify that changes to `content.json` are reflected after a page refresh
- [ ] Verify that all required fields in `content.json` have fallback values

#### 1.2 MDX Content
- [ ] Verify that MDX content renders correctly in case study pages
- [ ] Verify that MDX components (if any) work as expected
- [ ] Verify that code blocks in MDX have syntax highlighting

### 2. Navigation

#### 2.1 Main Navigation
- [ ] Verify all navigation links work correctly
- [ ] Verify active link is highlighted in the navigation
- [ ] Verify mobile menu opens/closes properly
- [ ] Verify keyboard navigation through menu items

#### 2.2 Footer Navigation
- [ ] Verify all footer links work correctly
- [ ] Verify social media links open in new tabs
- [ ] Verify copyright year is current

### 3. Pages

#### 3.1 Home Page
- [ ] Verify hero section displays correctly
- [ ] Verify stats counter animation works
- [ ] Verify featured work section shows correct projects
- [ ] Verify CTA buttons work
- [ ] Verify logo strip displays correctly

#### 3.2 Work Page
- [ ] Verify all projects are displayed
- [ ] Verify filter functionality works (search, year, stack)
- [ ] Verify project cards display correctly
- [ ] Verify "View Project" buttons work
- [ ] Verify "View All" link shows all projects

#### 3.3 Project Detail Page
- [ ] Verify project details are displayed correctly
- [ ] Verify gallery images load properly
- [ ] Verify image modal works
- [ ] Verify navigation between projects works
- [ ] Verify back to work button works

#### 3.4 About Page
- [ ] Verify profile image loads
- [ ] Verify skills section displays correctly
- [ ] Verify experience timeline is accurate
- [ ] Verify education section is correct
- [ ] Verify FAQ accordion works
- [ ] Verify resume download button works

#### 3.5 Contact Page
- [ ] Verify contact form validation works
- [ ] Verify form submission shows success message
- [ ] Verify email copy button works
- [ ] Verify phone number is clickable
- [ ] Verify social media links work

### 4. Responsiveness

#### 4.1 Desktop (≥1024px)
- [ ] Verify layout is optimized for desktop
- [ ] Verify navigation is in header
- [ ] Verify images scale appropriately

#### 4.2 Tablet (768px - 1023px)
- [ ] Verify layout adjusts correctly
- [ ] Verify navigation is accessible
- [ ] Verify text remains readable

#### 4.3 Mobile (<768px)
- [ ] Verify hamburger menu works
- [ ] Verify touch targets are at least 48x48px
- [ ] Verify text is readable without zooming
- [ ] Verify horizontal scrolling doesn't occur

### 5. Performance

#### 5.1 Lighthouse Scores
- [ ] Verify Performance score is ≥90 (Mobile)
- [ ] Verify Accessibility score is 100
- [ ] Verify Best Practices score is 100
- [ ] Verify SEO score is 100

#### 5.2 Loading Performance
- [ ] Verify First Contentful Paint < 1.5s
- [ ] Verify Largest Contentful Paint < 2.5s
- [ ] Verify Time to Interactive < 3.5s
- [ ] Verify Total Blocking Time < 150ms
- [ ] Verify Cumulative Layout Shift < 0.1

#### 5.3 Image Optimization
- [ ] Verify all images use WebP format
- [ ] Verify images have appropriate sizes attribute
- [ ] Verify images have width and height attributes
- [ ] Verify images have alt text
- [ ] Verify lazy loading is implemented

### 6. Accessibility

#### 6.1 Keyboard Navigation
- [ ] Verify all interactive elements are keyboard accessible
- [ ] Verify focus indicators are visible
- [ ] Verify tab order is logical
- [ ] Verify skip link works

#### 6.2 Screen Reader
- [ ] Verify all images have alt text
- [ ] Verify all icons have aria-labels
- [ ] Verify all form fields have labels
- [ ] Verify all interactive elements have proper ARIA attributes

#### 6.3 Color Contrast
- [ ] Verify text has sufficient contrast (4.5:1 for normal text, 3:1 for large text)
- [ ] Verify UI components have sufficient contrast
- [ ] Verify focus states are clearly visible

### 7. Functionality

#### 7.1 Forms
- [ ] Verify contact form validation
- [ ] Verify form error messages are clear
- [ ] Verify form submission works
- [ ] Verify required fields are marked

#### 7.2 Interactive Elements
- [ ] Verify all buttons work as expected
- [ ] Verify all links work correctly
- [ ] Verify all dropdowns/accordions work
- [ ] Verify all modals can be closed

### 8. Cross-Browser Testing

#### 8.1 Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### 8.2 Mobile Browsers
- [ ] Chrome for Android
- [ ] Safari for iOS
- [ ] Samsung Internet

## Running Tests

### Automated Tests
```bash
# Run performance tests
npm run test:performance

# Run accessibility tests
npm run test:accessibility

# Run visual regression tests
npm run test:visual
```

### Manual Tests
1. Review each page on different devices
2. Test all interactive elements
3. Verify all content is correct and up-to-date
4. Check console for any errors

## Test Results

| Test Category | Status | Notes |
|--------------|--------|-------|
| Content Management | ⬜ | Not started |
| Navigation | ⬜ | Not started |
| Pages | ⬜ | Not started |
| Responsiveness | ⬜ | Not started |
| Performance | ⬜ | Not started |
| Accessibility | ⬜ | Not started |
| Functionality | ⬜ | Not started |
| Cross-Browser | ⬜ | Not started |

## Notes
- Update this document as new features are added
- Document any issues found during testing
- Retest after each major update

## Sign-off

- **Tester**: ________________________
- **Date**: ________________________
- **Status**: ⬜ Passed / ⬜ Failed
- **Comments**:

---

*Last Updated: August 13, 2025*
