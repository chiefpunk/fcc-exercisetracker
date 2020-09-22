# Exercise Journal API

A REST API that processes exercise activity. A micro-service project part of the freecode curriculum.

---
### Development
    * Frontend is built using HTML/CSS and is used to demo API functions
    * API is built using Node/Express and handles data creation, updates, and retrieval
    * Backend is a MongoDB document database that stores user and exercise data

---
### User Stories:
    1. I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
    2. I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
    3. I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). App will return the user object with added array log and count (total exercise count).
    4. I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

---
### Usage:
#### Create a New User
**Endpoint:**  
```/api/exercise/new-user```

**Method:**  
```POST```

**Body:**
```
{
    userName: 'USERNAME'
}
```
---
#### Add Exercise
**Endpoint:**  
```/api/exercise/add```

**Method:**  
```POST```

**Body:**
```
{
    description: 'DESCRIPTION',
    duration: 'DURATION',
    date: 'YYYY-MM-DD',++
}
```
++*Optional field. The default value is the current date.*

---
#### List Users
**Endpoint:**  
```/api/exercise/users```

**Method:**  
```GET```

---
#### View Exercise Journal
**Endpoint:**  
```/api/exercise/log```

**Method:**  
```GET```

**Parameters:**  
```userId=USERID```  
```from=YYYY-MM-DD```**  
```to=YYYY-MM-DD```**  
```limit=INTEGER```**

** *Optional. Default parameters will display all records.*

**Example:**  
```/api/exercise/log?userId=5bfccc12f3829103cd0a89ed&from=2011-06-01&to=2018-12-31&limit=5```

---
**Go to API demo app:**

[https://exercise-rash-tracker.glitch.me/](https://exercise-rash-tracker.glitch.me/)
