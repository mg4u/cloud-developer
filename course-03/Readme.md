# cloud-developer
content for Udacity's cloud developer nanodegree

# Installation
Before any Installation proccess.
Set the DB connection, aws bucket configration, and JWT into envirment variables file
 
# 1- Install Node Modules
@ For Node Projects 
CD into ay node project in the courses and run
<pre>
npm install
</pre>

@ for Front end application
<pre>
cd udacity-c3-frontend
npm install
ionic serve
</pre>

# 2- Build Images

cd into docker file
<pre>
cd docker
</pre>
run these 2 commands after setting the image Names in the `docker-compose.yaml` and `docker-dompose-build.yaml`

<pre>
docker-compose -f docker-compose-build.yaml build --parallel
</pre>

# 3- Kubernetes

Generate encrypted values for aws credentials, Database User Name, and Database Password using bcrypt and put the values into aws-secret.yaml and env-secret.yaml files
<pre>
kubectl apply -f aws-secret.yaml
kubectl apply -f env-secret.yaml

kubectl apply -f env-configmap.yaml

kubectl apply -f backend-feed-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f backend-user-deployment.yaml

kubectl apply -f backend-feed-service.yaml
kubectl apply -f backend-user-service.yaml
kubectl apply -f frontend-service.yaml
</pre>
Deploy reverse proxy, has to be done after the services are running:
<pre>
kubectl apply -f reverseproxy-deployment.yaml
kubectl apply -f reverseproxy-service.yaml
</pre>
- Access the cluster from localhost
<pre>
kubectl port-forward service/frontend 8100:8100
kubectl port-forward service/reverseproxy 8080:8080
</pre>

# Check Performance
<pre>
kubectl get nodes
kubectl get pod --all-namespaces
kubectl get svc
kubectl get configmaps
kubectl get secrets
kubectl describe secret/env-secret
</pre>


