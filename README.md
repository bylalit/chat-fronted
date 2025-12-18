💬 Real-Time Chat Application

Project Live Link:
https://chat-fronted-n0w2bc7s9-bylalits-projects.vercel.app/

This is a real-time chat application where users can easily register, log in, and chat with each other instantly. The application is built using Angular for the frontend and Node.js with Express.js for the backend. The main focus of this project is to provide fast and smooth real-time communication with a simple and clean user interface.

For real-time messaging, Socket.IO is used, which allows messages to appear instantly without refreshing the page. The application also includes a secure authentication system using JWT (JSON Web Token), so only logged-in users can access the chat features.

All user details and chat messages are stored in MongoDB, which helps in managing and saving data properly. On the frontend side, the app is developed using Angular standalone components, along with TypeScript, HTML, CSS, and Bootstrap, to make the UI responsive and user-friendly on different devices.

The backend is built using Express.js, which provides REST APIs for user authentication and handles real-time communication with Socket.IO. The frontend of this project is deployed on Vercel, and the backend is deployed on Render, making the application available online.

This project is very helpful for understanding full-stack development, real-time chat using WebSockets, user authentication, and how frontend and backend work together in a real-world application.


# ChatApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
