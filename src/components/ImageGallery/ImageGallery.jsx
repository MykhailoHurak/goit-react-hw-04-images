import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import './ImageGallery.css';

export default function ImageGallery ({ imagesFromAPI, onImageClick }) {
    return (
        <div>
            <ul className='ImageGallery'>
                {imagesFromAPI.map(({ id, tags, webformatURL, largeImageURL }) => (
                    <ImageGalleryItem
                        key={id}
                        tags={tags}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        onImageClick={onImageClick}
                    />
                ))}
            </ul>
        </div>
    );
};

ImageGallery.prototype = {
    imagesFromAPI: PropTypes.arrayOf(PropTypes.shape({})),
    onImageClick: PropTypes.func.isRequired,
}
