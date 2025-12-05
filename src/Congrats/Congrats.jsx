import styles from "./Congrats.module.css"

function Congrats(props){

    return(
    <div className={styles.quizwrapper}>
        <img src="resources/congrats.png"></img>
        <h1>Congrats! You completed the quiz.</h1>
        <h2>You answer {props.currentScore}/10 correctly.</h2>
        <button onClick={props.onPlayAgain}>Play again</button>
    </div>
    )
}
export default Congrats