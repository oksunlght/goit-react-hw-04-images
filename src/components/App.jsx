import { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { fetchImages } from 'utils/fetch-api';
import Searchbar from './Searchbar';
import ImageGallery from './Gallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from './Modal';
import Button from './Button';
import { AppContainer, LoaderWrapper } from './App.styled';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState(null);
  const [modalUrl, setModalUrl] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchInput === '') {
      return;
    }

    fetchImages(searchInput, page, perPage)
      .then(({ hits, totalHits }) => {
        if (page > 1) {
          setImages(prevState => [...prevState, ...hits]);
          setIsLoading(false);
          return;
        }
        setImages(hits);
        setTotalHits(totalHits - hits.length);
        setTotalHits(totalHits);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [page, perPage, searchInput]);

  const onSubmit = searchInput => {
    setSearchInput(searchInput);
    setImages(null);
    setTotalHits(0);
    setPage(1);
    setPerPage(12);
    setIsLoading(true);
  };

  const handleModalUrl = url => {
    setModalUrl(url);
  };

  const onOpenModal = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setModalUrl('');
    setShowModal(false);
  };

  const incrementPage = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={onSubmit} />

      <ImageGallery searchInput={searchInput}>
        {images &&
          images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              images={images}
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              onClick={handleModalUrl}
              onOpenModal={onOpenModal}
            />
          ))}
      </ImageGallery>
      {images && images.length - totalHits < 0 && !isLoading && (
        <Button onClick={incrementPage} />
      )}
      {isLoading && (
        <LoaderWrapper>
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={isLoading}
          />
        </LoaderWrapper>
      )}
      {showModal && <Modal onClose={onModalClose} largeImageURL={modalUrl} />}
    </AppContainer>
  );
};

export default App;
