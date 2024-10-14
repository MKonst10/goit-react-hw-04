import styles from "./SearchBar.module.css";
import { Toaster } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ onSubmit, value, onSearch }) => {
  return (
    <div>
      <header className={styles.search}>
        <form onSubmit={onSubmit}>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={(e) => onSearch(e.target.value)}
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
