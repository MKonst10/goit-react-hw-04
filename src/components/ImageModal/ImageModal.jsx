import Modal from "react-modal";
import styles from "./ImageModal.module.css";
import { useEffect } from "react";

Modal.setAppElement("#root");
const ImageModal = ({ data, isOpen, closeModal }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div>
      <Modal
        className={styles.modal}
        isOpen={isOpen}
        shouldCloseOnEsc={true}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        overlayClassName={styles.overlay}
      >
        <img src={data.urls.regular} alt={data.alt_description} />
      </Modal>
    </div>
  );
};

export default ImageModal;
