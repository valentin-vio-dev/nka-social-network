# NKA - Social network

+ npm install
+ npm run start:dev

## .Env file
+ SERVER_PORT=[port]
+ DATABASE_URI=[uri]
+ DATABASE_NAME=[name]
+ DATABASE_USER=[username]
+ DATABASE_PASSWORD=[password]

## Users
|           |Endpoint                                | Description|
| :-----     |:-------------|                           -----|
| GET       | http://localhost:3000/api/users           | Get all users.     |
| POST      | http://localhost:3000/api/users           |   Add new user.    |
| DELETE    | http://localhost:3000/api/users/:id       |    Delete user by id. |

## Groups
|           |Endpoint                                | Description|
| :-----     |:-------------|                           -----|
| GET       | http://localhost:3000/api/groups           | Get all groups.     |
| POST      | http://localhost:3000/api/groups           |   Add new group.    |
| DELETE    | http://localhost:3000/api/groups/:id       |    Delete group by id. |
