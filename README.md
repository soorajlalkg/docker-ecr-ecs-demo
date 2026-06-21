# 🚀 Node.js App Dockerized & Deployed to AWS ECS (ECR + Fargate)

This project demonstrates how to containerize a Node.js application using Docker and deploy it to AWS using **Amazon Elastic Container Registry (ECR)** and **Amazon Elastic Container Service (ECS)** with Fargate.

---

## 📌 Tech Stack

- Node.js
- Express.js
- Docker
- AWS ECR (container registry)
- AWS ECS (container orchestration)
- AWS Fargate (serverless containers)

---

## 🧠 Learning Phases

This project is broken into step-by-step learning phases:

### 🟢 Phase 1: Build Node.js App
- Create a simple Express server
- Add database connection (PostgreSQL)
- Handle environment variables using `.env`

---

### 🟡 Phase 2: Containerization with Docker
- Write a `Dockerfile`
- Understand image vs container
- Build and run container locally
- Fix env variable injection using `--env-file`

---

### 🔵 Phase 3: Push Image to AWS ECR
- Create ECR repository
- Authenticate Docker with AWS CLI
- Tag Docker image
- Push image to ECR

---

### 🟣 Phase 4: Deploy on AWS ECS (Fargate)
- Create ECS Cluster
- Define Task Definition
- Configure container port mapping
- Deploy service with public access

---

### 🔴 Phase 5: Production Readiness Concepts
- Use external managed DB (Aiven / RDS)
- Configure secure environment variables
- Understand scaling & load balancing (ALB basics)
- Clean up AWS resources to avoid charges

---

## 🏗️ Build & Run Locally
```
docker build -t docker-ecr-ecs-demo .

docker run -p 3000:3000 docker-ecr-ecs-demo

docker run -p 3000:3000 --env-file .env docker-ecr-ecs-demo
```

Test locally:
```
http://localhost:3000/api/health
```

## ⚙️ AWS Configuration

Configure AWS CLI:
```
aws configure
```

Or with profile:
```
aws configure --profile aws-dev
```

## 📦 Create ECR Repository
```
aws ecr create-repository \
  --repository-name docker-ecr-ecs-demo \
  --profile aws-dev \
  --region ap-southeast-2
```

Example output:
```
123456789012.dkr.ecr.ap-southeast-2.amazonaws.com/docker-ecr-ecs-demo
```
Save this URL.

## 🔐 Login Docker to ECR
```
aws ecr get-login-password \
  --region ap-southeast-2 \
  --profile aws-dev \
| docker login \
  --username AWS \
  --password-stdin 123456789012.dkr.ecr.ap-southeast-2.amazonaws.com
```

## 🐳 Build Docker Image
```
docker build -t docker-ecr-ecs-demo .
```

## 🏷️ Tag Image for ECR
```
docker tag docker-ecr-ecs-demo:latest \
123456789012.dkr.ecr.ap-southeast-2.amazonaws.com/docker-ecr-ecs-demo:latest
```

## 🚀 Push Image to ECR
```
docker push 123456789012.dkr.ecr.ap-southeast-2.amazonaws.com/docker-ecr-ecs-demo:latest
```

## 🌐 Create ECS Cluster (Fargate)

Go to:

**ECS → Clusters → Create Cluster**

Select:

Networking only (Fargate)
Cluster name: docker-ecr-ecs-demo

## 🧩 Create Task Definition (IMPORTANT)

Go to:

**ECS → Task Definitions → Create**

**Settings:**
- Launch type: Fargate
- OS: Linux
- CPU: 0.25 vCPU
- Memory: 0.5 GB

**Container settings:**
- Container name: node-app
- Image: <your-ecr-url>:latest
- Container port: 3000

## 🔐 Environment Variables

Add:
```
PORT=3000
DB_HOST=your-db-host
DB_PORT=your-db-port
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
```

⚠️ Production Note:

Do NOT store secrets in plain environment variables in production.

Use:

- AWS Secrets Manager
- AWS Systems Manager (SSM Parameter Store)

## 🌍 Create ECS Service

**Go to ECS → Cluster → Create Service**

**Settings:**
- Launch type: Fargate
- Task definition: created above
- Service name: node-service
- Desired tasks: 1

**Networking:**
- VPC: Default VPC
- Subnets: all available
- Auto-assign public IP: ✅ ENABLED
- 
**Security Group:**
Allow inbound:
- Type: Custom TCP
- Port: 3000
- Source: 0.0.0.0/0

## 🚀 Deploy Service

Click Create Service

ECS will:

- Pull image from ECR
- Inject environment variables
- Start container

🔍 Test Deployment

Go to:

**ECS → Service → Tasks → Public IP**

Open:
```
http://<public-ip>:3000/api/health
```

## 🧠 Important Learning Note

Direct IP access is only for testing.

For production use:

- Application Load Balancer (ALB)
- Route 53 domain
- HTTPS via ACM
