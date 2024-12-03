# AI Chat

## Getting started

#### How to start locally:

1. `npm i -g pm2`
2. `npm install`
3. Copy `.env.example` to `.env.example` and update value inside
4. `npm run start:dev`
5. Open `http://localhost`

#### How to work with pm2:

`pm2 stop all` - stop all service

`pm2 restart {{SERVICE_NAME}}` - restart specific service.

Example: `pm2 restart auth`
`pm2 restart all` - restart all services

`pm2 delete all` - delete all services from pm2

`pm2 logs {{SERVICE_NAME}}` logs for specific service

`pm2 logs {{SERVICE_NAME}} --raw | bunyan` logs for specific service formatted by bunyan

Endpoints:
`http://localhost` - frontend

### Technologies Used

- **Node.js** & **Express**: Used for the backend to create a scalable, efficient, and easy-to-maintain server. Express provides a flexible framework for handling API requests and middleware.
- **MongoDB**: A NoSQL database chosen for its flexibility and scalability, allowing seamless integration with the backend.
- **React**: Utilized for building a dynamic and responsive frontend, ensuring a smooth user experience.
- **Lerna**: Employed to manage the monorepo structure, enabling efficient handling of multiple packages and simplifying code sharing across the project.
