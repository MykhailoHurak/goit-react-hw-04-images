import PropTypes from 'prop-types';
import './ButtonLoadMore.css';

export default function ButtonLoadMore({ onClickButtonLoadMore, onStatusButtonLoadMore }) {
    return (
        <div className='ButtonLoadMore__Box'>
            <button
                className='ButtonLoadMore'
                type="button"
                onClick={onClickButtonLoadMore}
            >
                {onStatusButtonLoadMore ? 'Loading...' : 'Load more'}
            </button>
        </div>
    );
};

ButtonLoadMore.propTypes = {
    onStatusButtonLoadMore: PropTypes.bool.isRequired,
    onClickButtonLoadMore: PropTypes.func,
};