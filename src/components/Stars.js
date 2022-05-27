import React from 'react';
import PropTypes from 'prop-types';
import FilledStar from '../images/filled-star.png';
import EmptyStar from '../images/empty-star.png';

class Stars extends React.Component {
  state = {
    currRating: 0,
  }

  onHover = ({ target }) => {
    if (target.dataset.value !== 'star') {
      this.setRating(target.dataset.value);
    }
  }

  onClick = ({ target }) => {
    console.log('hello');
    const { dataset: { value } } = target;
    const { currRating } = this.state;
    if (value !== currRating) {
      this.setRating(value - 1);
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
        {[...Array(+'5').keys()].map((el) => (
          <img
            data-testid={ `${el + 1}-rating` }
            style={ { width: '30px' } }
            className="star"
            data-value={ el + 1 }
            key={ el }
            src={ el + 1 <= currRating ? FilledStar : EmptyStar }
            alt={ el + 1 <= currRating ? 'filled star' : 'empty star' }
            onMouseOver={ this.onHover }
            onClick={ this.onClick }
          />
        ))}
      </div>
    );
  }
}

Stars.propTypes = {
  saveStarRating: PropTypes.func.isRequired,
};

export default Stars;
