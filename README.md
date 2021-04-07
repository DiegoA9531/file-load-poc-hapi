# file-load-pof-hapi
Proof of Concept for reading a file using hapi

# NodeJs Backend Challenge

You work on a product that receives potentially large files in CSV format, process them and import their data into our database. However, providers do not all use the same layout of columns. The order may differ between providers, they may only send a subset of the columns, or they may include additional columns we do not wish to capture.

## Deliverable

Create a public repository on github or gitlab. Make sure to commit every 30 min or so, regardless if you are still on a WIP.

## Task

Build an API with a single endpoint that accepts a file upload in the CSV format and the provider name that sent the file, looks up a configuration defining the column layout and parses the CSV into either a file or - as a stretch goal - into an in-memory database (see below).
The columns we care about are defined below in the “Columns” section.

### Columns

- UUID
- VIN (alphanumerical vehicle id)
- Make
- Model
- Mileage
- Year
- Price
- Zip Code
- Create Date
- Update Date

You are responsible for:

- Choosing the framework/libraries/architecture you’ll be using
- Defining the format of the configuration file and how it is stored/loaded.

Stretch goals:

- Use an in-memory database(e.g. [SQLite](https://www.npmjs.com/package/sqlite3), [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)) instead of a file for storage.
- Provide appropriate tests ensuring the desired outcome.

**NOTE: Document any assumptions and design decisions you have made.**

Used DEFRA's boilerplate as a base: https://github.com/DEFRA/hapi-api-boilerplate

I used the attributes of the sequelize model to validate de name of the columns in the csv file considering uuid as the primary key

As a POC i wanted to clean cluter of the files if they had any so I only had relevant info in the data I'm going to insert into the in-memmory db

Basic tests for validating an empty form or a file with partial relevant info