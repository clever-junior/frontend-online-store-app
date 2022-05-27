import React from 'react';
import PropTypes from 'prop-types';
import FilledStar from '../images/filled-star.png';
import EmptyStar from '../images/empty-star.png';

class ReviewStars extends React.Component {
  render() {
    const { rating } = this.props;
    return (
      <div>
        {[...Array(+'5').keys()].map((el) => (
          <img
            data-testid={ `${el + 1}-rating` }
            style={ { width: '30px' } }
            className="star"
            key={ el }
            src={ el + 1 <= rating ? FilledStar : EmptyStar }
            alt={ el + 1 <= rating ? 'filled star' : 'empty star' }
          />
        ))}
      </div>
    );
  }
}

ReviewStars.propTypes = {
  rating: PropTypes.string.isRequired,
};

export default ReviewStars;
