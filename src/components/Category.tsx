// import React from 'react';
// // import PropTypes from 'prop-types';

import { Menu } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Category({ id, name, onClick }) {
  return (
    <Menu.Item>
    {({ active }) => (
      <a
        href="#"
        data-testid="category"
        type="button"
        onClick={()=>onClick(id)}
        className={classNames(
          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
          'block px-4 py-2 text-sm'
        )}
      >
        {name}
      </a>
    )}
  </Menu.Item>
    // <a
    //   href="#"
    //   data-testid="category"
    //   type="button"
    //   onClick={() => onClick(id)}
    //   className={classNames(
    //     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    //     'block px-4 py-2 text-sm'
    //   )}
    // >
    //   {name}
    // </a>
  )
}

// class Categories extends React.Component {
//   render() {
//     const { id, name, onClick } = this.props;
//     return (
//       <label htmlFor={ id } data-testid="category">
//         <input
//           type="radio"
//           id={ id }
//           name="categoriaSelecionada"
//           onClick={ () => onClick(id) }
//         />
//         { name }
//       </label>
//     );
//   }
// }

// Categories.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
// };

export default Category;
