import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

export function Button({ onLoadMore }) {
    return (
        <ButtonLoadMore type='button' onClick={onLoadMore}>
            LoadMore
        </ButtonLoadMore>
    )
};

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
};