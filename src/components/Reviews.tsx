import React from 'react';
import ReviewStars from './ReviewStars';

class Reviews extends React.Component {
  render() {
    const { listOfReviews } = this.props;
    return (
      <div>
        {listOfReviews && listOfReviews.map((review, index) => (
          <div key={ index }>
            <p>{review.userEmail}</p>
            <ReviewStars rating={ review.starRating } />
            <p>{review.productReview}</p>
          </div>
        ))}
      </div>
    );
  }
}

// Reviews.propTypes = {
//   listOfReviews: PropTypes.arrayOf().isRequired,
// };

export default Reviews;
