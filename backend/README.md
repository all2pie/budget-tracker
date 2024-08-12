# Budget Tracker - Backend

## Setup

* Run `npm i`
* Run `docker-compose up -d` or have a local instance of MongoDB

## Starting

* Use `npm run start`
* Visit <http://localhost:3000/docs> to view APIs documentation

## Architecture

### Modules

* Expense - Handles Expenses
* User - Handles Auth and Profile
* Notification - Handles Notifications

### Folder Structure

* [common](src/common) - used for utils, helpers, shared types etc.
* module folder - it usually contains the following:
  * model - this is the DB model
  * controller - this handles the API routes, permissions & dto validations
  * service - this handles the business logic
  * dto - this contains the dto's which are used to handle the validations
  * module - this registers the components of the specific module

### Libraries

| Name             | Use Case                                          |
| ---------------- | ------------------------------------------------- |
| argon2           | For hashing passwords                             |
| class-validator  | For handling validations                          |
| swagger          | For creating API documentation                    |
| jwt              | For handling json web tokens                      |
| api-query-params | To convert request query params to mongoose query |

## Future Improvements

* Add config service and use environment variables
