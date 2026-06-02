# KrishiAI Security Framework & Implementation Guide

## Security Architecture

### 1. Authentication & Authorization

#### Authentication Flow
```
User → Registration (Phone + OTP) → JWT Token → Authenticated Requests
User → Login → OTP Verification → JWT Token → Authenticated Requests
```

#### JWT Token Strategy
- **Access Token**: 
  - Expiration: 1 hour (3600s)
  - Contains: user_id, role, permissions
  - Stored in: HttpOnly cookie (XSS protection)
  - Sent in: Authorization header

- **Refresh Token**:
  - Expiration: 7 days (604800s)
  - Contains: user_id only
  - Stored in: Secure, HttpOnly cookie
  - Cannot access protected resources

#### Token Refresh Mechanism
```
1. Access token expires
2. Client sends refresh token to /auth/refresh
3. Backend validates refresh token
4. Issues new access token
5. Optionally rotates refresh token
```

#### Role-Based Access Control (RBAC)
```
FARMER - Can manage farm data, view recommendations
SELLER - Can create marketplace listings
ADMIN - System management, user management, analytics
SUPPORT - Help tickets, user support
MODERATOR - Community forum moderation
```

### 2. Password Security

#### Hashing Algorithm
- **Algorithm**: BCrypt with variable rounds
- **Work Factor**: 12 (cost)
- **Salt**: Automatically generated per password
- **Comparison**: Time-constant to prevent timing attacks

#### Password Policy
```
Minimum Length: 8 characters
Require: Uppercase, lowercase, digit, special character
Expiration: 90 days
History: Cannot reuse last 5 passwords
Lockout: 5 failed attempts → 30 minutes lockout
```

#### Implementation
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
    
    // Usage
    String hashedPassword = passwordEncoder().encode(rawPassword);
    boolean matches = passwordEncoder().matches(rawPassword, hashedPassword);
}
```

### 3. API Security

#### Input Validation
```java
@RestController
@RequestMapping("/api/v1")
public class AuthController {
    
    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        // ValidationAnnotations ensure:
        // - @NotBlank for phone
        // - @Email for email
        // - @Size(min=8) for password
        // - @Pattern for phone format
    }
}
```

#### Rate Limiting
```properties
# Per IP: 100 requests per minute
# Per user: 1000 requests per hour
# Per endpoint: Custom limits

# Implementation: Spring Cloud CircuitBreaker + Resilience4j
```

#### CORS Configuration
```properties
# Allowed Origins: https://krishiai.example.com
# Allowed Methods: GET, POST, PUT, DELETE
# Allowed Headers: Content-Type, Authorization
# Credentials: true
# Max Age: 3600 seconds
```

#### SQL Injection Prevention
```java
// ❌ VULNERABLE
String query = "SELECT * FROM users WHERE email = '" + email + "'";
List users = entityManager.createNativeQuery(query).getResultList();

// ✅ SECURE - Using JPA
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}

// ✅ SECURE - Using Named Queries
@Query("SELECT u FROM User u WHERE u.email = :email")
User findByEmail(@Param("email") String email);
```

#### XSS Prevention
```java
// Frontend: Sanitize output
// <div>{{ userInput | sanitize }}</div>

// Backend: Content Security Policy Headers
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.headers().contentSecurityPolicy(
        "default-src 'self'; "
        + "script-src 'self' 'unsafe-inline'; "
        + "style-src 'self' 'unsafe-inline'"
    );
}
```

#### CSRF Protection
```properties
# Enabled by default in Spring Security
# CSRF token included in:
# - Hidden form fields
# - X-CSRF-TOKEN header
# - Cookies (safe-only, HttpOnly)
```

### 4. Data Protection

#### Encryption at Rest
```properties
# Sensitive Fields (encrypted in database)
- password_hash
- phone_number
- bank_account_details
- aadhar_number (if stored)

# Encryption: AES-256
# Key Management: AWS KMS

# Implementation
@Entity
public class User {
    @Convert(converter = EncryptedStringConverter.class)
    private String phoneNumber;
}
```

#### Encryption in Transit
```properties
# Protocol: HTTPS/TLS 1.2+
# Certificate: AWS Certificate Manager
# HSTS: Enabled (max-age: 31536000)
# Cipher Suites: Modern only (TLS_ECDHE_*, TLS_DHE_*)
```

#### Data Classification
```
PUBLIC: General agricultural information
INTERNAL: Platform metadata, audit logs
CONFIDENTIAL: User profiles, financial data
RESTRICTED: Government IDs, bank details

# Access: Only authorized roles can access higher classification
```

### 5. File Upload Security

#### Image Upload (Disease Detection)
```java
@PostMapping("/disease-detection/upload")
public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
    // 1. Validate file type (image only)
    if (!file.getContentType().startsWith("image/")) {
        throw new IllegalArgumentException("Only images allowed");
    }
    
    // 2. Validate file size (max 10MB)
    if (file.getSize() > 10 * 1024 * 1024) {
        throw new IllegalArgumentException("File too large");
    }
    
    // 3. Validate magic bytes (prevent file type spoofing)
    byte[] fileContent = file.getBytes();
    if (!isValidImageMagic(fileContent)) {
        throw new IllegalArgumentException("Invalid image file");
    }
    
    // 4. Generate secure filename
    String secureFilename = UUID.randomUUID() + ".jpg";
    
    // 5. Store in S3 with versioning & encryption
    String s3Key = "uploads/disease-detection/" + userId + "/" + secureFilename;
    amazonS3.putObject(bucket, s3Key, file.getInputStream(), metadata);
    
    // 6. Scan with antivirus (optional)
    scanFileForMalware(file.getInputStream());
}
```

#### Document Upload (Scheme Verification)
```
Max Size: 5MB
Allowed Types: PDF, JPG, PNG only
Scanning: Antivirus + OCR verification
Storage: Encrypted S3 bucket
Retention: 7 years (compliance)
```

### 6. API Security Headers

#### Response Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

#### Implementation
```java
@Configuration
public class SecurityHeadersConfig implements WebMvcConfigurer {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.headers()
            .contentTypeOptions().disable()
            .frameOptions().deny()
            .and()
            .headers().httpStrictTransportSecurity()
                .maxAgeInSeconds(31536000)
                .includeSubDomains(true);
        return http.build();
    }
}
```

### 7. Audit Logging

#### Audit Events Logged
- User login/logout
- Failed login attempts
- Permission changes
- Data access (crop recommendations)
- Financial transactions
- Admin actions
- API rate limit violations

#### Audit Log Schema
```sql
CREATE TABLE audit_logs (
    id BIGINT PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    action VARCHAR(100),
    resource_type VARCHAR(50),
    resource_id BIGINT,
    old_value TEXT,
    new_value TEXT,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP DEFAULT NOW(),
    INDEX idx_user_id (user_id),
    INDEX idx_timestamp (timestamp)
);
```

#### Audit Service
```java
@Service
public class AuditService {
    
    @Async
    public void logAction(String action, String resourceType, 
                         Long resourceId, Object oldValue, Object newValue) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setResourceType(resourceType);
        log.setResourceId(resourceId);
        log.setOldValue(JsonUtils.toJson(oldValue));
        log.setNewValue(JsonUtils.toJson(newValue));
        log.setUserId(getCurrentUserId());
        log.setIpAddress(getClientIpAddress());
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);
    }
}
```

### 8. Third-Party Security

#### External API Integration
```properties
# AWS SDK
- Use IAM roles (not access keys)
- Rotate credentials every 90 days
- Limit permissions (principle of least privilege)

# Weather API
- Use API keys with rate limiting
- Store keys in AWS Secrets Manager
- Monitor usage for anomalies

# SMS Gateway
- Whitelist IP addresses
- Use secure webhooks (HMAC verification)
- Log all transactions
```

#### Dependency Management
```xml
<plugin>
    <groupId>org.owasp</groupId>
    <artifactId>dependency-check-maven</artifactId>
    <version>8.3.1</version>
    <executions>
        <execution>
            <goals>
                <goal>check</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### 9. Secret Management

#### Secrets Storage
```
Development: .env file (local, never committed)
Staging/Production: AWS Secrets Manager
- Database passwords
- API keys
- JWT secret
- AWS credentials
- Encryption keys
```

#### Key Rotation Policy
```
- Database passwords: Every 6 months
- API keys: Every 3 months
- JWT secrets: Every 30 days
- AWS credentials: Every 90 days
- SSL certificates: Auto-renewal 30 days before expiry
```

### 10. Incident Response

#### Security Incident Protocol
```
1. DETECT: Monitor alerts, logs, metrics
2. CONTAIN: Disable account, revoke tokens, isolate resources
3. ERADICATE: Patch vulnerabilities, update code
4. RECOVER: Restore services, verify integrity
5. COMMUNICATE: Notify users if data exposed
6. REVIEW: Post-mortem analysis, process improvements
```

#### Monitoring
```
- Failed login attempts (>5 triggers lockout)
- Unusual API patterns (sudden spike in requests)
- Database anomalies (unexpected queries)
- Server resource spikes (memory, CPU, disk)
- Certificate expiration alerts
- Security dependency vulnerabilities
```

### 11. Compliance

#### Data Protection
- GDPR: User consent for data processing
- India Data Privacy: Comply with proposed bill
- RBI: Financial transaction security
- DMRC: Agricultural data regulations

#### Audit & Logging
- Retain logs for 1 year minimum
- Immutable audit trail
- Regular access reviews
- Compliance reports

#### Privacy Policy
- Data collection transparency
- User rights (access, delete)
- Third-party sharing disclosure
- Retention policies

## Security Checklist

### Pre-Deployment
- [ ] All dependencies scanned for vulnerabilities
- [ ] Secrets removed from code
- [ ] HTTPS enabled with valid certificate
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Audit logging enabled
- [ ] Database encrypted
- [ ] Backups encrypted
- [ ] Security headers set
- [ ] Password policy enforced

### Post-Deployment
- [ ] Monitor failed login attempts
- [ ] Check SSL certificate validity
- [ ] Verify backup integrity
- [ ] Review audit logs
- [ ] Test disaster recovery
- [ ] Conduct penetration testing
- [ ] Review access logs for anomalies

## Security Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Spring Security: https://spring.io/projects/spring-security
- JWT Best Practices: https://tools.ietf.org/html/rfc8725
- NIST Cybersecurity: https://www.nist.gov/cybersecurity
