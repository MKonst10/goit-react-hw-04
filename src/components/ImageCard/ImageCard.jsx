import { forwardRef, useRef } from "react";
import styles from "./ImageCard.module.css";

const ImageCard = forwardRef(({ data, openModal }, ref) => {
  return (
    <div>
      <img
        className={styles.image}
        src={data.urls.small}
        alt={data.alt_description}
        onClick={() => openModal(data)}
        ref={ref}
      />
    </div>
  );
});

ImageCard.displayName = "ImageCard";

export default ImageCard;
