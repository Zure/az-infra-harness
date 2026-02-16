# Non-Functional Requirements

## Scale
- **Expected Users**: 50,000 registered users, ~5,000 daily active users
- **Concurrent Users**: Peak of 500 concurrent users during business hours
- **Growth**: Anticipate 30% year-over-year growth
- **Data Volume**: ~2GB current, growing to 10GB over 2 years

## Availability
- **Target Uptime**: 99.5% (allows ~3.6 hours downtime per month)
- **Maintenance Windows**: Acceptable during off-peak hours (weekends 2-6 AM)
- **Critical Period**: Business hours Monday-Friday 8 AM - 6 PM EST

## Security & Confidentiality
- **Data Sensitivity**: Contains PII (names, addresses, emails, phone numbers)
- **Compliance**: Must comply with GDPR, CCPA
- **Authentication**: Multi-factor authentication required for account access
- **Data at Rest**: Encryption required for customer data
- **Data in Transit**: TLS 1.2+ required for all connections

## Integrity
- **Backup Frequency**: Daily automated backups with 30-day retention
- **Recovery Time Objective (RTO)**: 4 hours
- **Recovery Point Objective (RPO)**: 24 hours (acceptable to lose up to 1 day of data)
- **Data Consistency**: Eventually consistent acceptable for order status updates

## Usage Patterns
- **Traffic Type**: Steady baseline with moderate spikes during business hours
- **Peak Times**: Monday mornings (8-10 AM EST), post-marketing campaigns
- **Seasonal Variance**: 40% increase during holiday shopping season (Nov-Dec)
- **Geographic Distribution**: 80% North America, 15% Europe, 5% Asia-Pacific
