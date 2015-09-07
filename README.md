# TV Channel REST API

This is TV Channel REST API application built on top of
[restify](http://mcavage.me/node-restify).

## Application use

Use following command to running or testing this app:

### Install
`npm install`

### Run the app on development
`npm run dev`

### Run the test
`npm run test`


## List of API endpoints:

### Channels
Get all available TV channels based on locations

`GET /channels`

Parameters:

name | value | description
--- | --- | ---
l | `<latitude>,<logitude>` | Specify latitude and logitude of desired location. If this parameter is not exist, then location will be defined based on IP


