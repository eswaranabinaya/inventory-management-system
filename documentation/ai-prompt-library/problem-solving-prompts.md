# Problem-Solving Prompts for IMS

## Prompt 1: JVM Memory Optimization for Spring Boot in Docker
**Prompt**: "Optimize JVM memory settings in a Spring Boot Docker container to prevent out-of-memory crashes on a resource-constrained cloud platform."
**Context**: The backend frequently crashed on Railway's free tier due to limited memory. Needed to tune JVM heap size for stability without sacrificing performance.
**Effectiveness**: Dramatically reduced OOM errors and stabilized backend uptime, enabling successful production deployment.

---

## Prompt 2: CORS and Environment Variable Debugging for Frontend-Backend Integration
**Prompt**: "Resolve CORS errors and environment variable misconfigurations preventing a React frontend from communicating with a Spring Boot backend in production."
**Context**: The frontend failed to call backend APIs due to CORS issues and incorrect API URLs set via environment variables on Vercel and Railway.
**Effectiveness**: Enabled seamless frontend-backend integration, eliminated 403/404 errors, and improved deployment reliability.

---

## Prompt 3: SPA Routing and 404 Handling on Vercel
**Prompt**: "Configure Vercel to support client-side routing in a React single-page application, ensuring direct navigation to any route does not result in a 404 error."
**Context**: Direct navigation to non-root routes (e.g., /register) returned 404s due to missing server-side rewrites for SPA routing.
**Effectiveness**: Implemented a fallback rewrite rule, ensuring all client-side routes are handled correctly and improving user experience.

---

## Prompt 4: Spring Boot Actuator Metrics NPE in Container Environments
**Prompt**: "Fix NullPointerExceptions caused by Spring Boot Actuator metrics (ProcessorMetrics, TomcatMetrics) when running in a minimal Docker container."
**Context**: The backend crashed with NPEs due to missing system resources for certain Micrometer metrics in the containerized environment.
**Effectiveness**: Disabled problematic metrics and excluded auto-configurations, resulting in stable application startup and monitoring.

---

## Prompt 5: Authentication and Endpoint Protection Troubleshooting
**Prompt**: "Resolve authentication failures and endpoint protection issues in a Spring Boot application using JWT and Spring Security. Address CSRF, CORS, and public/private endpoint configuration."
**Context**: Encountered persistent 403/404 errors on authentication endpoints due to misconfigured JWT filters, CSRF protection, and CORS settings. Needed to ensure public access for login/register and secure all other endpoints.
**Effectiveness**: Refined security configuration, adjusted JWT filter logic, and updated CORS/CSRF settings. Resulted in reliable authentication, correct endpoint protection, and smooth frontend-backend integration.

---

## Prompt 6: Database Migration and Versioning Consistency
**Prompt**: "Fix issues with database migration/versioning in a Spring Boot application using Flyway, ensuring schema consistency across environments and handling failed or out-of-order migrations."
**Context**: Faced migration failures and schema drift due to out-of-order or failed Flyway migrations during development and deployment. Needed a robust process for versioning and recovery.
**Effectiveness**: Standardized migration scripts, enforced strict versioning, and implemented recovery steps for failed migrations. Achieved consistent schema state across all environments and reliable CI/CD deployments.