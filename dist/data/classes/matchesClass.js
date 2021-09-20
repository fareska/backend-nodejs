class MatchesTable {
    #upcoming
    #results
    #items
    #itemsIdCounter
    constructor() {
        this.#items = []
        this.#itemsIdCounter = 0
        this.#upcoming = []
        this.#results = []
    }

    #addUpcoming = (matchId, kickoff) => this.#upcoming.push({ matchId, kickoff })
    #addResult = (matchId, homeScore, awayScore) => this.#results.push({ matchId, homeScore, awayScore })
    #getUpcomingData = (matchId) => this.#upcoming.find(match => match.matchId === matchId)
    #getResultsData = (matchId) => this.#results.find(match => match.matchId === matchId)

    addItem = (matchData) => {
        const match = {
            id: this.#itemsIdCounter++,
            homeTeam: matchData.home_team,
            awayTeam: matchData.away_team,
            tournament: matchData.tournament,
            startTime: matchData.start_time,
            status: matchData.kickoff ? 'upcoming' : 'played'
        }

        match.status === 'upcoming'
            ? this.#addUpcoming(match.id, matchData.kickoff)
            : this.#addResult(match.id, matchData.home_score, matchData.away_score)

        this.#items.push(match)
        return 'Match has been added'
    }


    getItems = () => {
        let matches = this.#items.map(item => {
            if (item.status === 'upcoming') {
                let match = this.#getUpcomingData(item.id)
                return { ...item, kickoff: match.kickoff }
            }
            if (item.status === 'played') {
                let match = this.#getResultsData(item.id)
                return {
                    ...item,
                    result: {
                        homeTeam: match.homeScore,
                        tournament: match.awayScore,
                    }
                }
            }
        })
        return matches
    }
}

module.exports = MatchesTable