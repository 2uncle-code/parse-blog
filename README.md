# parseserver.cn 中文站

## 环境配置
   我们这次使用的是docker容器技术，以及docker-compose的容器编排管理。为什么要用docker呢？
   因为我不想在windows下搭建一下环境配置的教程，Mac下再写个教材，linux下再写个。:)
     
   当然第一步你还得先把docker装好。传送门(https://docs.docker.com/install/)。
	因为篇幅问题docker的更深入使用不在本篇讨论范围。
### 启动mongo容器   
   打开根目录下的docker-compose.yml。我们先看mongo节点。
``` docker
   mongo:
     image: mongo
     restart: always
     ports: 
       - 27017:27017
     volumes:
       - ./mgdata:/data/db
       - ./mgbackup:/var/mgbackup
     networks:
       - app_net    
```

参数解析：
* image:	默认使用最新的mongodb官方镜像。
* restart:	启动docker服务的时候默认启动该容器。
* ports:	把容器端口映射到主机端口上。
* volumes： 左边为主机物理路径，右边为映射到容器内的路径。
* networks: 容器将要使用的网路节点。

现在你可以通过你的实际情况简单调整下参数。其它的节点，也是大同小异。就不一一赘述了。
	
**注意	！！！
请仔细检查文件/文件夹路径，端口映射等问题。**

按照你的实际情况，调整好docker-compose.yml的所有节点。
1. 把server/db下的blog.gz拷贝到mongo节点的backup文件夹下。
2. 通过cmd/shell等在项目根目录下输入：
 ```docker-compose up -d  mongo```
3. 我们再进入mongo容器内：```docker-compose exec mongo bash```
4. 把我们的blog.gz导入到mongo容器内：
``` 
	mongorestore  --gzip --db blog --archive=/var/mgbackup/blog.gz 

```

5.输入命令**mongo** 进入mongodb控制台。看到如下结果，就证明导入成功了。

```
			> use blog
			switched to db blog
			> show tables;
			Category
			Comment
			Post
			_Join:roles:_Role
			_Join:users:_Role
			_Role
			_SCHEMA
			_Session
			_User
			>
```

### 启动redis容器
按照我们配置mongodb的方法，配置好redis容器后：
``` docker-compose up -d redis```

### 启动blog_server
按照我们配置mongodb的方法，配置好blog_server容器后,现在还不能启动容器。

cmd或shell到blog_server根目录下。

``` cp example.env .env ```

按照你的实际情况填写env,
填写完毕后再启动blog_server容器：

``` docker-compose up -d blog_server ```
 在浏览器打开blog_server，我这里配置的是http://localhost:8088/parse，
 你将会得到
{"error":"unauthorized"}

### 启动blog_frontend
和blog_server容器一样，先配置节点，再到根目录下
``` cp example.env .env ```
按照你的实际情况填写env,
填写完毕后再启动blog_frontend容器：

``` docker-compose up -d blog_frontend ```

接着在浏览器里打开blog_frontend,我这里配置的是http://localhost:8080,
如果没有问题那你就能看到网页了哦！

## 使用dashboard 管理你到程序
	请参考[](https://github.com/vtista/parse_dashboard)

## 使用nginx转向
```
server {
    listen 80;
    server_name www.parseserver.cn parseserver.cn;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass      http://blog_frontend:8080;

    }

   location /parse {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass      http://blog_server:8088/parse;

    }

}

```
	   