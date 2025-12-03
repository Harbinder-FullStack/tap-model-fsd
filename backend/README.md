# 🚀 Full Stack Backend Servers -- MySQL & MongoDB

This repository contains **two Node.js backend servers** built for
learning full-stack development.\
Each server connects to a different database and runs on separate ports.

GitHub Repo:
**https://github.com/Harbinder-FullStack/tap-model-fsd.git**

------------------------------------------------------------------------

# 📌 Project Overview

  Server File         Database   Port
  ------------------- ---------- ----------
  `mongo_server.js`   MongoDB    **3000**
  `mysql_server.js`   MySQL      **3001**

------------------------------------------------------------------------

# 🛠 1. Prerequisites

Ensure the following tools are installed on your system:

### ✅ Node.js & npm

Download: https://nodejs.org

Check installation:

``` bash
node -v
npm -v
```

------------------------------------------------------------------------

# 🗄️ 2. Install MySQL (Windows)

### Using MySQL Installer (recommended)

Download MySQL Installer:\
https://dev.mysql.com/downloads/installer/

During installation select: - **MySQL Server** - **MySQL Workbench** -
Optional: Shell, Router

Verify installation:

``` bash
mysql --version
```

------------------------------------------------------------------------

# 🍃 3. Install MongoDB (Windows)

Download MongoDB Community Server:\
https://www.mongodb.com/try/download/community

During setup: - Select *Complete installation* - Install **MongoDB
Compass** (optional)

Verify:

``` bash
mongod --version
mongosh --version
```

Start the MongoDB service:

``` bash
net start MongoDB
```

------------------------------------------------------------------------

# 📥 4. Clone the Repository

``` bash
git clone https://github.com/Harbinder-FullStack/tap-model-fsd.git
cd tap-model-fsd
```

------------------------------------------------------------------------

# 📦 5. Install Dependencies

``` bash
npm install
```

Or install DB drivers manually:

``` bash
npm install mysql2 mongodb
```

------------------------------------------------------------------------

# ⚙ 6. Database Configuration

## 🟦 MySQL Server (`mysql_server.js`)

``` js
host: 'localhost',
user: 'root',
password: '',
database: 'library'
```

Test:

``` bash
mysql -h localhost -u root -p
```

------------------------------------------------------------------------

## 🟩 MongoDB Server (`mongo_server.js`)

``` js
const url = "mongodb://localhost:27017/library";
```

Test:

``` bash
mongosh "mongodb://localhost:27017/library"
```

------------------------------------------------------------------------

# ▶ 7. Running Both Servers

## MongoDB Server (port **3000**)

``` bash
node mongo_server.js
```

## MySQL Server (port **3001**)

``` bash
node mysql_server.js
```

------------------------------------------------------------------------

# 🧪 8. Testing API Endpoints

Use Postman, Browser, Curl:

    GET http://localhost:3000/books
    GET http://localhost:3001/books

------------------------------------------------------------------------

# 🎯 Summary

✔ Mongo Server → **3000**\
✔ MySQL Server → **3001**\
✔ Both connect using host **localhost**

------------------------------------------------------------------------
