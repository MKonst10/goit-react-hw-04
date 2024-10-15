import styles from "./SearchBar.module.css";
import { toast, Toaster } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const value = form.elements.text.value.trim();
    if (value === "") {
      toast.error("This is an invalid request. Try again!");
      return;
    } else {
      onSubmit(value);
    }
  };
  return (
    <div>
      <header className={styles.search}>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={styles.button}>
            <CiSearch />
          </button>
          <Toaster />
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
