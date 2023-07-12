import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { id, name, onClick } = this.props;
    return (
      <label htmlFor={ id } data-testid="category">
        <input
          type="radio"
          id={ id }
          name="categoriaSelecionada"
          onClick={ () => onClick(id) }
        />
        { name }
      </label>
    );
  }
}

Categories.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Categories;
