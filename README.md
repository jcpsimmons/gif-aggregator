# gif-aggregator (backend)

**update**
API is now accessible via Heroku.

- GET https://gif-aggregator.herokuapp.com/api/v1/trending
- GET https://gif-aggregator.herokuapp.com/api/v1/test
- POST https://gif-aggregator.herokuapp.com/api/v1/search (send x-www-form-urlencoded query and query string)

I'm building a site that queries the GIPHY API and displays gifs.

I don't want my API key out in the open, so I'm building this backend to route requests behind the scenes.

I'm using Node and Express for the server. I'm using Axios to handle requests from the backend to GIPHY's API.

## How to run on your own machine

- clone the repository
- run `npm install` to grab the dependencies (I've .gitignored them to cut down on number of repo files)
- make a directory in the root of the project named 'keys'
- make a file named 'keys.js' in that folder
- assign your own GIPHY API key as a **string** to an exported variable named **giphyKey**
- run with `nodemon app.js`

## To-do

- input sanitization - empty strings, illicit characters, etc.
- create an errors object for each route, and return better errors for frontend
- parsing the JSON response from GIPHY for easier use on the frontend
- rating slider
