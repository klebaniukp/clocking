# clocking

APP FINISHED

## clocking in peerspective of user

-   You can register/login to some account and start task, you can set task description, if not provided it will be generated automatically.
-   Next you can pause, resume or end task. For each of operations (start,pause,resume,end) you have collected timestamps. If account has started task its timestamps and description will be generated and you will not be able to start another task.
-   When you login on admin account (passes below tech stack) you can see all tasks and their details (description, timestamps, maker email).

APP FUNCTIONALITIES:

-   Singup / signin
-   Start / pause / resume / end task functionality
-   On worker side: showing all timestamps of current task
-   On admin side: displaying every task with task id, maker email, timestamp and descriptions
-   Worker can't start task when another task is in progress

## Tech/framework used 🔧

| Tech                                           | Description                               |
| ---------------------------------------------- | ----------------------------------------- |
| [Typescript](https://www.typescriptlang.org/)  | Javascript superset language              |
| [React](https://reactjs.org/)                  | Library for building user interfaces      |
| [Express](https://expressjs.com/)              | Backend web framework for Node.js         |
| [Jwt](https://jwt.io/)                         | Library for identifying user session      |
| [MongoDB](https://www.mongodb.com/)            | Non-relational database                   |
| [Eslint](https://eslint.org/)                  | Javascript Linter                         |
| [Prettier](https://prettier.io/)               | Code formatter                            |
| [Bcrypt](https://www.npmjs.com/package/bcrypt) | Package for crypting (hashing) data       |
| [Bootstrap](https://getbootstrap.com/)         | CSS library                               |
| [Axios](https://axios-http.com/docs/intro)     | Promise based HTTP client                 |
| [Redis](https://redis.io/)                     | In-memory data structure store (for chat) |

## Admin panel 👨 💻

login: admin@gmail.com
password: Password1$

## Photos 🏙

![worker-panel](packages/client/public/worker-panel.png)
![admin-panel](packages/client/public/admin-panel.png)
