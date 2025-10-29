import {React, useEffect, useState} from "react"

const Scoreboard = (props) => {
    const [team1Score, setTeamOneScore] = useState(0);
    const [team2Score, setTeamTwoScore] = useState(0);

    return (
        <div>
            {props.team1} vs {props.team2}
            <div>
                <button onClick = {() => setTeamOneScore(team1Score + 1)}>
                    Add Point to {props.team1}
                </button>
                <button onClick = {() => setTeamTwoScore(team2Score + 1)}>
                    Add Point to {props.team2}
                </button>
                <div>
                    <p>{props.team1}: {team1Score}</p>
                    <p>{props.team2}: {team2Score}</p>
                </div>
            </div>
        </div>
    )
};

export default Scoreboard;