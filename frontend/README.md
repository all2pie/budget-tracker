# Budget Tracker - Frontend

## Setup

Run `npm i`

## Running

Run `npm start`

## Architecture

### Folder Structure

#### Root (src)

* [styles.scss](src/styles.scss) handles all of the global styles and the overrides for Angular Material
* [m3-theme.scss](src/m3-theme.scss) defines the custom material theme

#### app

* [common](src/app/common) folder contains the helpers, utilities, common types, services and generic components like header and toolbar
* [auth](src/app/auth) folder contains the login and signUp pages and it is using the Module approach
* [home](src/app/home) folder has the base layout with the side nav and toolbar that is used by other pages using router outlet
* [profile](src/app/profile) folder is responsible for the user profile page
* [expense](src/app/expense) folder contains the expense list and the add, update and delete dialogues for expense
* [user](src/app/user) folder contains the user list and the update and delete dialogue for expense
* [analysis](src/app/analysis) folder contains the expense chart
* [AppComponent](src/app/app.component.ts) is the main component which is used in standalone mode
* [app.routes.ts](src/app/app.routes.ts) contains the all of the routes

### Libraries

| Name                 | Use Case                         |
| -------------------- | -------------------------------- |
| @angular/material    | For UI components                |
| @swimlane/ngx-charts | For displaying the expense chart |

## Future Improvements

* Add a loader/spinner
* Improve code reuse in base http service
* Improve handle table config and use that for tables
