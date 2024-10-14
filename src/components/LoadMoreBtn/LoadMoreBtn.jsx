import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoad }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.button} onClick={onLoad}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
