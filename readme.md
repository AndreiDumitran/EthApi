## Dependancies

-   Docker needs to be isntalled

## .env

-   copy the .env_example file, rename it and modify `SERVER_PORT` as with the desired port

## Usage

-   run `docker-compose up` which should start the project

## Routes

-   `/price/createPrice` - creates a record in the database with the current price of ETH in USD at the moment of calling the route
    -   The server calls this route every 60 seconds to create a new record in the database
-   `/price/get/singlePrice/{minutesAgo}` - returns what was the ETH price in USD `{minutesAgo}`
    -   Example: `/price/get/singlePrice/15` - will return the price of ETH in USD from `15` minutes ago assuming that the server runned for more than 15 minutes
-   `/price/get/getAll/{page}/{limit}` - returns the records stored in the database as `{limit}` per `{page}`
    -   Example: `/price/get/getAll/1/8` - will return `8` records from page `1` which means the database has at least `9` records
    -   NOTE: the pagination starts from `index 0` - first page is always `0`

## Database

The records in the database will remove itself after 60 minutes due to:

```
expireAt: {
		type: Date,
		default: Date.now,
		expires: '60m',
	},
```

## Requirements

- [x] Only 60 records in the database
- [x] Public endpoint with pagination
- [x] Public endpoint to return single data point
- [x] NodeJS
- [x] ExpressJS
- [x] Docker
- [x] REST
- [ ] SOLID principles
- [ ] Hexagonal Principles
- [x] MongoDB
- [ ] Tests
