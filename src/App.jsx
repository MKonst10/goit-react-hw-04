import { useState, useEffect, useRef } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import toast from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const imgRef = useRef(null);

  const [search, setSearch] = useState("");
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const fetchParams = new URLSearchParams({
      client_id: "rROOcxrgaSvz3J-ktRZ3eDl9Nmsulij0vEhZYe94i1A",
      query: search,
      per_page: 12,
      page: page,
      orientation: "landscape",
    });
    if (search === "") {
      return toast("Please enter your request");
    }
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.unsplash.com/search/photos/?${fetchParams}`
      );
      if (data.results.length === 0) {
        return toast(
          "Sorry, there are no images matching your search query. Please try again!"
        );
      }

      setImages(data.results);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoader(false);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      console.log("Image position and size:", rect);
    }
  }, []);

  const onLoadMore = async () => {
    setPage((prevPage) => prevPage + 1);
    const fetchParams = new URLSearchParams({
      client_id: "rROOcxrgaSvz3J-ktRZ3eDl9Nmsulij0vEhZYe94i1A",
      query: search,
      per_page: 12,
      page: page,
      orientation: "landscape",
    });
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.unsplash.com/search/photos/?${fetchParams}`
      );
      if (data.results.length === 0) {
        return toast(
          "Sorry, there are no images matching your search query. Please try again!"
        );
      }

      setImages((prevImages) => {
        return [...prevImages, ...data.results];
      });
      if (imgRef.current) {
        const cardHeight = imgRef.current.getBoundingClientRect().height;
        scrollBy({
          top: cardHeight * 3,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SearchBar onSubmit={onSubmit} value={search} onSearch={setSearch} />
      {images !== null && (
        <ImageGallery images={images} openModal={openModal} ref={imgRef} />
      )}
      {loader && <Loader />}
      {error && <ErrorMessage error={error} />}
      {images !== null && <LoadMoreBtn onLoad={onLoadMore} />}
      {selectedImage && (
        <ImageModal
          data={selectedImage}
          isOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}{" "}
    </>
  );
}

export default App;
