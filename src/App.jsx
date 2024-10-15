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
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  const handleSubmit = (value) => {
    setSearch(value);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (search === "") return;

    const fetchPhotos = async () => {
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
        console.log(data);
        setTotalPages(data.total_pages);
        console.log(totalPages);

        if (data.results.length === 0) {
          setImages(data.results);
          return toast(
            "Sorry, there are no images matching your search query. Please try again!"
          );
        } else {
          setImages((prevImages) => [...prevImages, ...data.results]);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    if (search) {
      fetchPhotos();
    }
  }, [search, page]);

  useEffect(() => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      console.log("Image position and size:", rect);
    }
  }, []);

  const handleChangePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      const cardHeight = imgRef.current.getBoundingClientRect().height;
      scrollBy({
        top: cardHeight * 3,
        behavior: "smooth",
      });
    }
  }, [images]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} value={search} onSearch={setSearch} />
      {images !== null && (
        <ImageGallery images={images} openModal={openModal} ref={imgRef} />
      )}
      {loader && <Loader />}
      {error && <ErrorMessage error={error} />}
      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onLoad={handleChangePage} />
      )}
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
