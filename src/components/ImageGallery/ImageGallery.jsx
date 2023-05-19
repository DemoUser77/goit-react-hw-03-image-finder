import PropTypes from 'prop-types';
import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';



export function ImageGallery ({ images, onClickModal })  {

     return (
        <Gallery>
            {images.map(({id, webformatURL, largeImageURL,tags }) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                    onClickModal={onClickModal}
                />
            ))}
        </Gallery>
    )
}



ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ),
    onClickModal: PropTypes.func.isRequired,
};


// ImageGallery.propTypes = {
//     images: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             webformatURL: PropTypes.string.isRequired,
//             largeImageURL: PropTypes.string.isRequired,
//             tags: PropTypes.string.isRequired,
//         })
//     ),
//     onClickModal: PropTypes.func.isRequired,
// };

