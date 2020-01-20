# cloud-developer
***content for Udacity's cloud developer nanodegree***
***Monolith to Microservices***

[![Build Status](https://travis-ci.org/mg4u/cloud-developer.svg?branch=master)](https://travis-ci.org/mg4u/cloud-developer)

Before any Installation proccess.
- 1- Create Postgard DB, S# Bucket in your AWS account.
- 2- Set the DB connection, aws bucket configration, and JWT into envirment variables file
```
 **Use this link to create Base4 strng of `username`, and `Password` of the DB, and `aws credentials`**
```
 [https://www.base64encode.org/](https://www.base64encode.org/)
 The credentials file usally stored in `C:\Users\<your-user-name>\.aws`

- 3- Install Docker on your machine
- 4- install `aws` , `eksctl`, and ensure that `kubectl` command tools are working well on your machine.


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

# 2- Docker Images

cd into docker file
<pre>
cd docker
</pre>
run these 2 commands after setting the image Names in the `docker-compose.yaml` and `docker-dompose-build.yaml`, to build and run the images

<pre>
docker-compose -f docker-compose-build.yaml build --parallel
docker-compose up
</pre>

# 3- Kubernetes
- Run on AWS Cluster
### Create cluster
<pre>
eksctl create cluster --name YOUR_CLUSTER_NAME 
</pre>
Generate encrypted values for aws credentials, Database User Name, and Database Password using bcrypt and put the values into aws-secret.yaml and env-secret.yaml files
<pre>
cd kbs

kubectl apply -f aws-secret.yaml
kubectl apply -f env-secret.yaml

kubectl apply -f env-configmap.yaml

kubectl apply -f backend-feed-deployment.yaml
kubectl apply -f backend-user-deployment.yaml
kubectl apply -f backend-user-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f reverseproxy-deployment.yaml

kubectl apply -f back-feed-service.yaml
kubectl apply -f back-user-service.yaml
kubectl apply -f reverseproxy-service.yaml
kubectl apply -f frontend-service.yaml

</pre>
- Access the cluster from localhost
<pre>
kubectl port-forward service/frontend 8100:8100
kubectl port-forward service/reverseproxy 8080:8080
</pre>

# Scaling Up/Down
<pre>
kubectl scale deployment/backend-user --replicas=3
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