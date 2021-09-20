class Api {
    constructor(path, dataManager) {
        this.path = path
        this.dataManager = dataManager
    }

    #isValidReq = (pathname) =>  pathname.slice(1, this.path.length + 1) === this.path ? true : false
    
    #getRequiredParameter = (pathname) =>  pathname.slice(this.path.length + 2, pathname.length )
    
    getData = (pathname, params) => {
        if (this.#isValidReq(pathname)) {
            const requiredParameter = this.#getRequiredParameter(pathname)
            if (requiredParameter === 'team') {
                return this.dataManager.getFilteredMatches('team', params.name, params.status && params.status)
            }
            if (requiredParameter === 'tournament') {
                return this.dataManager.getFilteredMatches('tournament', params.name, params.status && params.status)
            } else {
                return 'Invalid required parameter it should be either \'team\' or \'tournament\''
            }
        } else {
            return 'Invalid route'
        }
    }

}
module.exports = Api