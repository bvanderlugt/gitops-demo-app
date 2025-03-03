# GitOps Demo Application

This repository demonstrates a GitOps-based approach to application deployment using Flux, Helm, and GitHub Actions. It serves as a reference implementation for continuous delivery of applications to Kubernetes.

## Repository Structure

This monorepo contains several components that would typically be split into separate repositories in a production environment:

- **app-demo/**: The application source code (a NestJS application)
  - In production, this would be its own repository, with CI/CD focused only on building and testing the application code.

- **helm-chart/**: Helm chart for deploying the application to Kubernetes
  - In production, this could be in its own repository or part of the application repository.
  - Maintains deployment configuration separate from infrastructure concerns.

- **flux/**: Flux manifests for GitOps deployment
  - In production, this would typically be in a separate "gitops" or "kubernetes" repository.
  - Contains all the Kubernetes manifests and Flux configurations for deploying applications.
  
- **.github/workflows/**: CI/CD pipelines for the application
  - In production, each repository would contain its own workflows relevant to its specific component.

## CI/CD Pipelines

The following GitHub Actions workflows are set up in this repository:

1. **Publish App Demo Image** (`publish-app-demo.yml`)
   - Builds and publishes the Docker image to GitHub Container Registry (GHCR)
   - Triggered manually with a version input parameter
   - Tags images according to semantic versioning

2. **Publish Helm Chart** (`publish-helm-chart.yml`)
   - Packages and publishes the Helm chart to GitHub Container Registry
   - Triggered manually with a version input parameter
   - Updates chart version fields before publishing

3. **Publish App Demo (Combined)** (`publish-app-demo-combined.yml`)
   - Combines the above two workflows into a single workflow
   - Ensures the Docker image and Helm chart versions are synchronized
   - Updates the Helm chart to reference the correct image version

4. **Publish Helm Chart to GitHub Pages** (`publish-helm-pages.yml`)
   - Packages the Helm chart and publishes it to GitHub Pages
   - Creates a Helm repository for easy installation
   - Triggered on changes to the Helm chart or manually

## GitOps Deployment

This repository uses Flux to implement GitOps-style deployments:

- Flux continuously monitors the git repository
- When changes are detected, Flux applies them to the Kubernetes cluster
- Separate environments (staging, production) with different configurations
- Infrastructure components managed alongside applications

## Roadmap

### Completed

- [x] Set up multi-environment GitOps structure (staging, production)
- [x] Create Docker image build and publish workflow
- [x] Implement Helm chart for application deployment
- [x] Publish Helm charts to container registry
- [x] Configure Flux for continuous deployment
- [x] Set up infrastructure components (ingress-nginx, cert-manager)
- [x] Configure GitHub authentication for private registries

### In Progress

- [ ] Add automated testing for the application
- [ ] Add testing for the Helm charts
- [ ] Create an IaC directory with Terraform code cloud deployments
- [ ] Implement promotion workflow from staging to production
- [ ] Add monitoring and alerting
- [ ] Implement autoscaling based on metrics
- [ ] Add secret management with Sealed Secrets or External Secrets
- [ ] Implement canary deployments
- [ ] Add backup and restore strategy
- [ ] Implement drift detection and correction
- [ ] Add security scanning for containers and manifests
- [ ] Document operational procedures
