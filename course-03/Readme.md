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

# 3- Kurbenetes



# Run the docker in local machine
<pre>
cd docker
docker-compose up
</pre>

# Run the front end
<pre>
cd udacity-c3-frontend
npm start
</pre>



