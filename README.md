# nodejs-mysql-starter-kit
A starter kit for setting up a Node.js/Express project with a MySQL database.

There aren't that many resources out there for using a SQL database with Node.js, so this is a starter kit with boilerplate for setting up a quick Node.js project with user sign up and authentication. You can interact with the database with raw SQL. If you want to add an object-relational mapping (ORM) package like Sequelize or Bookshelf, you can drop it in [models/db.js](../blob/master/models/db.js) and [models/user.js](../blob/master/models/user.js).

## Prerequisites
* [Node.js and NPM](https://nodejs.org/en/)
* [MySQL](https://dev.mysql.com/downloads/installer/)

## Quick setup
1. `npm install` to install the necessary packages.
2. Update [config/database.js](../blob/master/config/database.js) with your MySQL database information and uncomment the line in the [.gitignore](../blob/master/.gitignore) to ignore the updated config file.
3. Update some project-specific info in a few places:
  * Your project name in [package.json](../blob/master/package.json)
  * Your passport secret in [app.js](../blob/master/app.js)
4. `node scripts/dbsetup.js` to set up your database, if it doesn't already exist.
5. `npm start` to start up your app! Go to [http://localhost:3000](http://localhost:3000) to see it.

## User authentication
This starter kit comes with local user authentication. The user authentication is roughly based off of [this tutorial](https://scotch.io/tutorials/easy-node-authentication-setup-and-local). There is a User class in [models/user.js](../blob/master/models/user.js) and new users are furnished with a UUID instead of the default MySQL ascending object ids.

## User administration
Basic user administration (viewing and deleting users) is accessible at the `/admin` path. This path is only visible to users with the `admin` property (in the users database), which you can set with direct database access.
