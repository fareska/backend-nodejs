This project is a football game service through which users can get list of matches (and games results)

In the project directory, you can run:
node server - you can define the port number which the server going to listen to in an env file otherwise the default prot is 5000.

this project build with nodejs avoiding using any framework.
the project loads football games data from two csv files and structure it in separated classes  

The available endpoints:
(assuming the user knows the teams and tournaments)

GET:(http://localhost:5000)

/matches/team/:team_name_
/matches/tournament/:tournament_name


/matches/team?name={the team name}&status={match status}
the name parameter is required (in the upcoming version this will be fixed to /matches/team/name/status?)
and the status parameter is optional 

    for example the following get req will return all the matches played by Arsenal (the teams, result and so on..): 
    /matches/team?name=arsenal&status=played
    
    another example, the following returns all the upcoming matches in the fa tournament.
    /matches/tournament?name=fa&status=upcoming
