# Danish Amin Portfolio — DevOps Deployment Guide
## React + Docker + Kubernetes + Azure AKS + GitHub Actions CI/CD

---

## 1. LOCAL DEVELOPMENT

```bash
# Install dependencies
npm install

# Run dev server (hot reload at localhost:5173)
npm run dev

# OR run in Docker with hot reload
docker compose --profile dev up portfolio-dev
```

---

## 2. TEST PRODUCTION BUILD LOCALLY

```bash
# Build and run the production Docker image
docker compose up portfolio

# Visit http://localhost:3000
# This is exactly what will run in production
```

---

## 3. SET UP GITHUB REPOSITORY

```bash
# Initialize Git (if not done)
git init
git add .
git commit -m "Initial portfolio"

# Push to GitHub
git remote add origin https://github.com/geoxpyder/danishamin-portfolio.git
git branch -M main
git push -u origin main
```

---

## 4. CREATE AZURE AKS CLUSTER

```bash
# Login to Azure
az login

# Create resource group
az group create \
  --name portfolio-rg \
  --location eastus

# Create AKS cluster (cheapest tier, 1 node)
az aks create \
  --resource-group portfolio-rg \
  --name portfolio-cluster \
  --node-count 1 \
  --node-vm-size Standard_B2s \
  --enable-cluster-autoscaler \
  --min-count 1 \
  --max-count 3 \
  --generate-ssh-keys

# Connect kubectl to your cluster
az aks get-credentials \
  --resource-group portfolio-rg \
  --name portfolio-cluster

# Verify connection
kubectl get nodes
```

---

## 5. INSTALL NGINX INGRESS + CERT-MANAGER (SSL)

```bash
# Install NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

# Install cert-manager for automatic TLS/SSL
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create Let's Encrypt ClusterIssuer
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: amind0584@gmail.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
EOF

# Get the external IP of your ingress (wait 2-3 min)
kubectl get svc -n ingress-nginx
# Copy the EXTERNAL-IP
```

---

## 6. POINT NAMECHEAP DOMAIN TO AZURE

1. Go to Namecheap → danishamin.me → Advanced DNS
2. Delete all existing A records
3. Add:
   - Type: A | Host: @ | Value: EXTERNAL-IP from step 5 | TTL: Auto
   - Type: A | Host: www | Value: EXTERNAL-IP from step 5 | TTL: Auto
4. Wait 10-30 min for DNS propagation

---

## 7. DEPLOY TO KUBERNETES

```bash
# Update the image in k8s/deployment.yaml first:
# Replace YOUR_REGISTRY with: ghcr.io/YOUR_GITHUB_USERNAME

# Apply all manifests
kubectl apply -f k8s/deployment.yaml

# Check everything is running
kubectl get all -n portfolio

# Check ingress and TLS cert
kubectl get ingress -n portfolio
kubectl get certificate -n portfolio
```

---

## 8. SET UP CI/CD (GITHUB ACTIONS)

### Create Azure Service Principal:
```bash
az ad sp create-for-rbac \
  --name portfolio-deploy \
  --role contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/portfolio-rg \
  --sdk-auth

# Copy the entire JSON output
```

### Add GitHub Secrets:
Go to GitHub repo → Settings → Secrets → Actions → New secret

| Secret Name | Value |
|---|---|
| `AZURE_CREDENTIALS` | The JSON from az ad sp command |
| `AKS_RESOURCE_GROUP` | `portfolio-rg` |
| `AKS_CLUSTER_NAME` | `portfolio-cluster` |

### Now push any change and it auto-deploys:
```bash
git add .
git commit -m "Update hero text"
git push origin main
# → GitHub Actions builds → pushes Docker image → deploys to AKS
```

---

## 9. MAKING CHANGES TO THE SITE

```bash
# Edit src/App.jsx
# Test locally:
npm run dev

# When happy, commit and push:
git add .
git commit -m "Update About section"
git push origin main
# CI/CD handles everything else automatically
```

---

## 10. USEFUL COMMANDS

```bash
# View live pods
kubectl get pods -n portfolio

# View logs
kubectl logs -l app=portfolio -n portfolio

# Restart all pods (force re-pull image)
kubectl rollout restart deployment/danishamin-portfolio -n portfolio

# Scale manually
kubectl scale deployment/danishamin-portfolio --replicas=3 -n portfolio

# Check TLS cert status
kubectl describe certificate portfolio-tls -n portfolio

# SSH into a pod for debugging
kubectl exec -it PODNAME -n portfolio -- sh
```

---

## COST ESTIMATE (Azure)

| Resource | Cost |
|---|---|
| AKS (1x Standard_B2s node) | ~$30/mo |
| Public IP | ~$3/mo |
| Storage | < $1/mo |
| **Total** | **~$34/mo** |

**Free alternative:** Use Azure Static Web Apps (free tier) — skip K8s entirely for a static portfolio. K8s is worth it if you add backend services later.

---

## FILE STRUCTURE

```
danishamin-portfolio/
├── src/
│   ├── App.jsx          ← All components live here
│   ├── main.jsx         ← React entry point
│   └── index.css        ← Global styles + theme variables
├── public/
│   └── index.html
├── k8s/
│   └── deployment.yaml  ← K8s Deployment, Service, Ingress, HPA
├── .github/
│   └── workflows/
│       └── ci-cd.yml    ← GitHub Actions pipeline
├── Dockerfile           ← Production: multi-stage build
├── Dockerfile.dev       ← Dev: hot reload
├── docker-compose.yml   ← Local dev/test
├── nginx.conf           ← Nginx config for SPA routing
├── vite.config.js       ← Vite build config
└── package.json
```
