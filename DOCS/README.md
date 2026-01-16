All eng and design docs.

## Software Design Details

### Backend
- **Architecture**: Microservices-based architecture using Node.js and TypeScript.
- **API Strategy**: RESTful APIs for external integrations and gRPC for internal service communication.
- **Data Layer**: 
  - **Relational**: PostgreSQL for transactional data and complex queries.
  - **NoSQL**: MongoDB for document storage and flexible schemas.
  - **Caching**: Redis for session management and high-frequency data access.
- **Security**: JWT-based authentication with RBAC (Role-Based Access Control) and TLS encryption for all data in transit.

### Frontend
- **Framework**: React with Next.js for Server-Side Rendering (SSR) and static site generation.
- **State Management**: TanStack Query (React Query) for server state and Zustand for lightweight client-side state.
- **UI/UX**: Tailwind CSS for styling and Radix UI primitives for accessible component design.
- **Performance**: Image optimization, code splitting, and edge caching via Vercel or Cloudflare.

### Infrastructure
- **Cloud Provider**: AWS (EC2, RDS, S3, and Lambda for serverless functions).
- **Orchestration**: Kubernetes (EKS) for managing containerized workloads.
- **CI/CD**: GitHub Actions for automated build, test, and deployment pipelines.
- **Observability**: 
  - **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana).
  - **Monitoring**: Prometheus and Grafana for real-time metrics.
  - **Tracing**: OpenTelemetry for distributed request tracing.




Funtional Requirements:

  Login with user credentials
  Reset password with user credentials
  Create new user

  Create new group
  Add users to group
  Remove users from group
  
  Create new transaction
  Add participants to transaction
  Remove participants from transaction
  Settle debt

  notification when new transaction is created to any of the group that you belong to
  notification when new group is created with you added to it

  live update in group page when new transactions are added.
  live update in group page when new participants are added.

  
  
    