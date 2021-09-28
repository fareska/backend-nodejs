// Import built-in Nodejs HTTP and URL modules  
const http = require('http')
const url = require('url')

const Api = require('./dist/routes/api')
const DataManager = require('./dist/data/DataManager')
const DataLoader = require('./dist/data/DataLoader')
const DataTable = require('./dist/data/classes/dataClasses')
const MatchesTable = require('./dist/data/classes/matchesClass')

//Instantiate a Matches class - for setting and retrieving matches data
const matchesTable = new MatchesTable()

//Instantiate a DataTable class -  class for saving array of items  
const teamsTable = new DataTable()
const tournamentsTable = new DataTable()

//Instantiate a DataManager class -  class for serving the data    
const dataManager = new DataManager(teamsTable, tournamentsTable, matchesTable)

//Instantiate a DataLoader class -  class for loading data from csv files to a data manager     
const dataLoader = new DataLoader(dataManager)

//calling insertFilesDataToDataManager method and give it the csv file path as an argument.
dataLoader.insertFilesDataToDataManager("./dist/data/dataOrigin/result_played.csv")
dataLoader.insertFilesDataToDataManager("./dist/data/dataOrigin/result_upcoming.csv")

//Instantiate an API class -  class for handling the "matches" routes requests and calling the appropriate methods from the relevant data manager      
const api = new Api('matches', dataManager)

// a function receives url address and request parameters, if they valid then it call a getData method from the appropriate api (otherwise it returns null)
//(the matches api in pur case) and pass it it's parameters and an argument 
// the getData method return the relevant data depending on the url and the parameters 
const handleDataRouting = (pathName, params) => {
    let data = null
    if(params.name){
        data = api.getData(pathName, params)
        if(typeof data === 'string'){
            throw data
        }else {
            return  data
        }
    }
    return data
}

// Create an http server object (a request Listener,) 
const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname
    const params = url.parse(req.url, true).query
    try {
        const data = handleDataRouting(pathName, params)
        if (data !== null) {
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify(data))
        } else {
            res.writeHead(404, { 'Content-type': 'text/html' })
            res.end('<h1>Page Not Found- 404</h1>')
        }
    } catch (error) {
        res.writeHead(400, { 'Content-type': 'text/html' })
        res.end(`<h1>${error}</h1>`)
    }
})

const PORT = process.env.PORT || 5000
//The http server object listen method - this method receives a port number and callback function.
server.listen(PORT, () => console.log(`Server is running on port${PORT}`))


