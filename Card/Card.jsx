 import styles from './Card.module.css'

function Card(props){
    return(
        <div className={styles.card} >
          <div className={styles.emoji} style={{ backgroundColor: props.color, }}>{props.emoji}</div>
          <h1>{props.headline}</h1>
          <h5>{props.text}</h5>
          <img src={props.img} alt=""></img>
        </div>
    );
}
export default Card