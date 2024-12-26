import styles from "./CardUI.module.css";

type Props = {
  data: any
}

const CardUI = ({ data }: Props) => {
  return (
    <div className={styles["main--container"]}>
      <img src={data.image} />
      <h4>{data.title?.slice(0, 40)} ...</h4>
      <p>Author: <span>{data.author}</span></p>
      <small>Source <span>{data.source}</span></small>
      <button>
        <a href={data.url} target='_blank'>
          Visit  
        </a>         
      </button>
    </div>
  )
}

export default CardUI