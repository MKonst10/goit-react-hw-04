import { forwardRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = forwardRef(({ images, openModal }, ref) => {
  return (
    <div className={styles.galleryWrap}>
      <ul className={styles.gallery}>
        {images !== null &&
          images.map((image) => (
            <li key={image.id} className={styles.imageCard}>
              <ImageCard data={image} openModal={openModal} ref={ref} />
            </li>
          ))}
      </ul>
    </div>
  );
});

ImageGallery.displayName = "ImageGallery";

export default ImageGallery;
