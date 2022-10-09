import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export default function ImageGalleryItem ({ tags, webformatURL, largeImageURL, onImageClick }) {
    return (
        <li>
            <img
                src={webformatURL}
                alt={tags}
                className='ImageGalleryItem__image'
                onClick={() => onImageClick(largeImageURL)}
            />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    onImageClick: PropTypes.func.isRequired,
};