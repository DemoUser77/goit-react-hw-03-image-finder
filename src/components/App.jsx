import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchImages } from '../api/PixabayApi';


export class App extends React.Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageURL: null,
    isLoading: false,
    error: null,
    isShowModal: false,
   
  };


  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.toggleLoader();
    
      try {
        const data = await fetchImages(this.state.query, this.state.page);
        this.setState({ totalImages: data.totalHits });

        if (data.totalHits === 0) {
          this.setState({ images: [] });
          toast.info('Sorry, there are no images matching your search query. Please try again.')
          return;
        }
        this.setState ({
          images: [...this.state.images, ...data.hits]});
      }
      catch (error) {
        this.setState({ error });
        toast.error('Please try again.')
      } finally {
        this.toggleLoader();
      }
    }
  };

  handleSearchBar = query => {
    if (query === this.state.query)
      return;
    this.setState({
      images: [],
      query,
      page: 1,
      error: null,
      
    })
  };


  onLoadMore = () => {
    if (this.state.images.length === this.state.totalImages) {
      toast.info('No more photos')
    }
    this.setState(({ page }) => ({
      page:page + 1,
    }))
  };


  onClickModal = event => {
    this.setState({ largeImageURL: event.target.dataset.source })
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };
  
  toggleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }))
  };


  render() {
    const { images,  error, largeImageURL, isLoading, isShowModal } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchBar}  />

        {images.length > 0 && !error && (
          <ImageGallery images={images} error={error} onClickModal={this.onClickModal} />
        )}

        
        {isLoading && <Loader />}

        
        {!isLoading && images.length >= 12 && !error &&
          (<Button onLoadMore={this.onLoadMore } />)}
        
        {isShowModal && (
          <Modal onClose={this.toggleModal}
          largeImageURL={largeImageURL}/>)}
       
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
      
      </div>
    );
  };
};
