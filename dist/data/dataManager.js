class DataManager {
    #tournamentsTable
    #matchesTable
    #teamsTable
    constructor(teamsTable, tournamentsTable, matchesTable) {
        this.#teamsTable = teamsTable,
            this.#tournamentsTable = tournamentsTable,
            this.#matchesTable = matchesTable
    }

    addMatch = (data) => {
        this.#matchesTable.addItem({
            ...data,
            home_team: this.#teamsTable.addItem(data.home_team),
            away_team: this.#teamsTable.addItem(data.away_team),
            tournament: this.#tournamentsTable.addItem(data.tournament)
        })
    }

    #filterByTeam = (teamName, dataArr) => {
        const teamId = this.#teamsTable.getItemId(teamName)
        const matches = dataArr.filter(
            match => match.homeTeam === teamId || match.awayTeam === teamId
        )
        return matches
    }

    #filterByTournament = (tournamentName, dataArr) => {
        let matches = dataArr.filter(matches => matches.tournament === this.#tournamentsTable.getItemId(tournamentName))
        return matches
    }

    #filterByStatus = (status, dataArr) => {
        let matches = dataArr.filter(matches => matches.status.toUpperCase() === status.toUpperCase())
        return matches
    }

    #handleFilter = (filterType, filterValue, status, data) => {
        let filteredData
        if (filterType === 'team') {
            filteredData = this.#filterByTeam(filterValue, data)
        }
        if (filterType === 'tournament') {
            filteredData = this.#filterByTournament(filterValue, data)
        }
        return status ? this.#filterByStatus(status, filteredData) : filteredData
    }

    #displayNamesWhereId = (matches) => {
        return matches.map(match => {
            return {
                ...match,
                awayTeam: this.#teamsTable.getItemName(match.awayTeam),
                homeTeam: this.#teamsTable.getItemName(match.homeTeam),
                tournament: this.#tournamentsTable.getItemName(match.tournament)
            }
        })
    }

    getFilteredMatches = (filterType, filterValue, status) => {
        let matches = this.#handleFilter(filterType, filterValue, status, this.getMatches())
        return this.#displayNamesWhereId(matches)
    }
    
    getTeams = () => this.#teamsTable.getItems()
    getTournaments = () => this.#tournamentsTable.getItems()
    getMatches = () => this.#matchesTable.getItems()
}

module.exports = DataManager