Vitta Hiring
==================================

## Getting started

```sh
# Clone the repository
git clone git@github.com:pinceladasdaweb/case-2018-02.git myproject
cd myproject

# Install server dependencies
npm install

# Start server
npm start

# Install client dependencies
cd client && npm install

# Start client
npm start
```

## Database

This settings can be changed in the `common/config.js` file. Use the `querys.sql` file to create the tables in the database.

### config.js
```js
export const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'vitta',
  connectionLimit: 100
}
```