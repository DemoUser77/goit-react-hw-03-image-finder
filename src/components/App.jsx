import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
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
    showModal: false,
  };


  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.toggleModal();
    
      try {
        const data = await fetchImages(this.state.query, this.setState.page);
        this.setState({ totalImages: data.totalHits });

        if (data.totalHits === 0) {
          this.setState({ images: [] });
          toast.info('Sorry, there are no images matching your search query. Please try again.')
          return;
        }
        this.setState({ images: [...this.state.images, ...data.hits] });
      }
      catch (error) {
        this.setState({ error: true, isLoading: false });
        toast.error('Please try again.')
      }
    }
  };

  hendleSearchBar = query => {
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
    if(this.state.images.length === this.state.totalImages)
    this.setState(({ page }) => ({
      page: page + 1,
      showModal: true,
    }))
  };

  onClick = event => {
    this.setState({ largeImageURL: event.target.dataset.source })
    this.toggleModal()
  };

  toggleModal = (largeImageURL) => {
    this.setState(({ showModal }) => ({
      shoModal: !showModal,
    }));
    this.setState({largeImageURL: largeImageURL})
  };
  
  toggleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }))
  };


  render() {
    const { images, tags, error, largeImageURL, isLoading, showModal } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.hendleSearchBar}></Searchbar>

        {images.length !== 0 && (
          <ImageGallery images={images} error={error} onClick={this.onClick} />
        )}

        
        {isLoading && <Loader />}

        
        {!isLoading && images.length >= 11 && !error &&
          (<Button onClick={this.onLoadMore } />)}
        
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>)}
       
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
