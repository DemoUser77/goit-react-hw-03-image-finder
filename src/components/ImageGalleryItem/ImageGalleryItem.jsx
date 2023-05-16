import PropTypes from 'prop-types';
import React from 'react';
import { GalleryItem,GalleryImage } from './ImageGalleryItem.styled';


export function ImageGalleryItem({ webformatURL, largeImageURL, tags, onClick }) {
   
    < GalleryItem>

        <GalleryImage
            src={webformatURL}
            alt={tags}
            data-source={largeImageURL}
            onClick={onClick}
            
        />
    
    </GalleryItem >
    
};

ImageGalleryItem.propType = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired,
    }
    
    
    

