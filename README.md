# REST API for the xSwimTeam app


Install:
- Node and npm
- MongoDB (add a "swimmers" and a "coaches" collection, sample swimmer data can be found in the root directory)
- Postman (optional)
- Project dependencies using the package.json


Setup:
1. Add a .env file to the root directory with the mongodb URI (MONGODB_URI), the port you want to use (API_PORT), and a key used to sign your JWTs (TOKEN_KEY) 
2. Start the MongoDB process ("sudo systemctl start mongod")
3. cd into src/ then run "npm start"


REST API specifications:
- JSON responses formatted according to JSend standard (https://github.com/omniti-labs/jsend) 
