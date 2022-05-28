import React from 'react';
import PropTypes from 'prop-types';
import FilledStar from '../images/filled-star.png';
import EmptyStar from '../images/empty-star.png';

class Stars extends React.Component {
  state = {
    currRating: 0,
  }

  // onHover = ({ target }) => {
  //   if (target.className === 'star') {
  //     this.setRating(target.dataset.value);
  //   }
  // }

  onClick = ({ target }) => {
    const { dataset: { value } } = target;
    const { currRating } = this.state;
    if (value !== currRating) {
      this.setRating(value);
    }
  }

  setRating = (value) => {
    const { saveStarRating } = this.props;
    this.setState({ currRating: value }, () => saveStarRating(value));
  }

  render() {
    const { currRating } = this.state;
    return (
      <div>
        {[...Array(+'5').keys()].map((index) => (
          <button type="button" key={ index } onClick={ this.onClick }>
            <img
              data-testid={ `${index + 1}-rating` }
              style={ { width: '30px' } }
              className="star"
              data-value={ index + 1 }
              src={ index + 1 <= currRating ? FilledStar : EmptyStar }
              alt={ index + 1 <= currRating ? 'filled star' : 'empty star' }
            />
          </button>
        ))}
      </div>
    );
  }
}

Stars.propTypes = {
  saveStarRating: PropTypes.func.isRequired,
};

export default Stars;
