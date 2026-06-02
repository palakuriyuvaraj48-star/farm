# Test Configuration and Strategy for KrishiAI Platform

## Testing Framework

### Unit Testing
- **Backend**: JUnit 5 + Mockito + Spring Boot Test
- **Frontend**: Jest + React Testing Library
- **AI/ML**: Pytest + Unittest

### Integration Testing
- **Backend APIs**: Spring Boot @WebMvcTest + MockMvc
- **Database**: Testcontainers (PostgreSQL)
- **API Contracts**: Spring Cloud Contract Testing

### E2E Testing
- **Frontend**: Cypress
- **API Workflows**: Postman/Newman
- **Performance**: JMeter

### Performance Testing
- **Load Testing**: Apache JMeter
- **Database Benchmarking**: pgBench
- **API Response Time Metrics**: Spring Boot Actuator

## Test Coverage Goals

- **Backend Services**: 80%+ coverage
- **Frontend Components**: 75%+ coverage
- **Critical Paths**: 100% coverage

## Test Execution

### Local Development
```bash
# Backend tests
./mvnw test

# Backend integration tests
./mvnw verify

# Frontend tests
npm test

# AI Service tests
pytest tests/
```

### CI/CD Pipeline
```bash
# Run all tests
./mvnw clean verify
npm test -- --coverage
pytest tests/ --cov

# Performance tests
jmeter -n -t performance/load-test.jmx -l results.jtl
```

## Test Categories

### 1. Authentication & Authorization Tests
- User registration (happy path, validation failures)
- OTP verification (valid, expired, wrong OTP)
- Login (valid credentials, invalid credentials)
- JWT token validation (valid, expired, tampered)
- Role-based access control (authorized, unauthorized)

### 2. Crop Recommendation Tests
- Valid input scenarios (various soil types, seasons)
- Edge cases (extreme temperatures, low budgets)
- Model accuracy benchmarks (>85% confidence)
- Confidence score validation

### 3. Disease Detection Tests
- Image upload (valid formats, corrupted files)
- Model accuracy (test dataset benchmarks)
- Edge cases (multiple diseases, partial disease)
- Performance (<2s inference time)

### 4. Profit Prediction Tests
- Cost calculations (seed, fertilizer, labor)
- Revenue calculations (yield × price)
- Break-even analysis
- Risk assessment logic

### 5. Market Price Prediction Tests
- Historical trend analysis
- Time-series forecasting accuracy
- Recommendations (sell now vs wait)
- Price range predictions

### 6. API Contract Tests
- Request/response schema validation
- Status codes (200, 400, 401, 403, 404, 500)
- Error message formats
- Rate limiting responses

### 7. Database Tests
- CRUD operations
- Foreign key constraints
- Unique constraints
- Index efficiency

### 8. Frontend Component Tests
- Rendering
- User interactions (click, input)
- Form validation
- API integration
- Responsive design

### 9. Security Tests
- SQL injection prevention
- XSS prevention
- CSRF protection
- Password hashing verification
- JWT token security

### 10. Performance Tests
- API response time (<200ms for CRUD, <2s for AI)
- Database query performance
- Frontend page load (<3s)
- Concurrent user load (1000+ users)

## Test Data Strategies

### Fixtures & Factories
- UserFactory: Generate test users with roles
- FarmerFactory: Generate farmer profiles
- CropFactory: Generate crop data
- WeatherFactory: Generate weather data

### Mock Data
- Static JSON files for API responses
- Seeded random data for consistency
- Realistic Indian agricultural data

### Database Seeding
- Flyway migrations for test data
- Testcontainers for isolated databases
- Snapshot testing for complex data

## Continuous Integration

### GitHub Actions Workflow
1. **Trigger**: On push to main/develop branches
2. **Steps**:
   - Checkout code
   - Setup JDK 17
   - Setup Node.js 18
   - Setup Python 3.10
   - Build backend (Maven)
   - Build frontend (npm)
   - Run backend tests
   - Run frontend tests
   - Run API contract tests
   - Run security scanning (SonarQube)
   - Build Docker images
   - Run integration tests
   - Generate coverage reports

### Branch Protection Rules
- Require status checks to pass
- Require 80% test coverage
- Require code review approval
- Require branches to be up to date

## Test Execution Times

| Category | Time | Frequency |
|----------|------|-----------|
| Unit Tests | 5-10 min | Every commit |
| Integration Tests | 10-15 min | Every commit |
| E2E Tests | 15-20 min | Daily |
| Performance Tests | 30-60 min | Weekly |
| Security Tests | 10-15 min | Weekly |

## Test Reporting

### Coverage Reports
- Jacoco (backend)
- Istanbul (frontend)
- Coverage.py (Python)

### Test Reports
- JUnit XML (CI/CD integration)
- HTML reports (local view)
- Cucumber reports (BDD tests)

### Metrics
- Test execution time
- Failure rate
- Coverage trend
- Performance benchmarks

## Automated Test Scenarios

### Scenario 1: Complete Farmer Journey
```
1. User registration with OTP
2. Profile creation with land details
3. Crop recommendation request
4. Profit prediction calculation
5. Weather forecast check
6. Market price prediction
7. Purchase recommendation
```

### Scenario 2: Disease Detection Flow
```
1. Upload crop image
2. Disease detection inference
3. Treatment recommendation
4. Save diagnosis
5. Receive notifications
```

### Scenario 3: Market Transaction
```
1. Check current prices
2. Get sell recommendation
3. Create market listing
4. Buyer connection
5. Payment processing
```

### Scenario 4: Community Engagement
```
1. Create forum post
2. Add comments
3. Receive likes
4. Get notifications
5. Track reputation
```

## Test Maintenance

- Review & update tests weekly
- Remove obsolete test cases
- Refactor flaky tests
- Update fixtures for schema changes
- Monitor test execution trends

## Deployment Test Gates

- All unit tests passing
- Coverage >80%
- No critical security issues
- API contract tests passing
- Performance baseline met
- E2E smoke tests passing

## Future Enhancements

- Visual regression testing (Playwright)
- Load testing automation (Gatling)
- Accessibility testing (Axe, Pa11y)
- API fuzz testing (REST-assured)
- Database backup/restore testing
