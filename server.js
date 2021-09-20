const http = require('http')
const url = require('url')
const Api = require('./dist/routes/api')
const DataManager = require('./dist/data/DataManager')
const DataLoader = require('./dist/data/DataLoader')

const DataTable = require('./dist/data/classes/dataClasses')
const MatchesTable = require('./dist/data/classes/matchesClass')

const matchesTable = new MatchesTable()
const teamsTable = new DataTable()
const tournamentsTable = new DataTable()

const dataManager = new DataManager(teamsTable, tournamentsTable, matchesTable)
const dataLoader = new DataLoader(dataManager)
dataLoader.insertFilesDataToDataManager("./dist/data/dataOrigin/result_played.csv")
dataLoader.insertFilesDataToDataManager("./dist/data/dataOrigin/result_upcoming.csv")

const api = new Api('matches', dataManager)

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
server.listen(PORT, () => console.log(`Server is running on port${PORT}`))


