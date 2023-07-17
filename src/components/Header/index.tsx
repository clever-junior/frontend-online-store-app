// import searchIcon from '../assets/search-icon.svg';
import { useContext, useEffect, useState } from 'react';
import { getProductsFromCategoryAndQuery } from '../../services/api';
import { Link } from 'react-router-dom';
import Dropdown from './components/Dropdown';
import SearchInput from './components/SearchInput';
import CartIcon from '../../assets/cart-icon.svg';
import OpenCartIcon from '../../assets/open-cart-icon.svg';
import LogoIcon from '../../assets/logo-icon.svg';
import { AppContext } from '../../store/contexts/AppContext';

function Header() {
  const { setProducts, cartSize } = useContext(AppContext);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const search = async () => {
    const { results } = await getProductsFromCategoryAndQuery({
      query: searchInputValue, categoryId
    });

    setProducts && setProducts(results);
  }

  useEffect(() => {
    search();
  }, [categoryId])

  return (
    <header className="bg-yellow-300 flex justify-center h-24 w-full box-border left-0 top-0 relative box-shadow-sm">
      <div className="grid grid-rows-1 grid-cols-[162px_580px_390px] pt-2 pb-3 px-2.5 gap-x-6 mb-0 mx-40 relative w-10/12">
        <div className='flex items-center '>
          <Link to="/">
            <img src={LogoIcon} alt="logo" width="" height="" />
          </Link>
        </div>
        <div className="flex items-center">
          <div className='w-full'>
            <SearchInput
              onChange={setSearchInputValue}
              value={searchInputValue}
              onBtnClick={search}
            />
          </div>
        </div>
        <div className='flex items-center border-collapse box-border text-sm font-light justify-evenly'>
          <div className='box-border relative h-7'>
            <Dropdown setCategoryId={setCategoryId} />
          </div>
          <div className='mx-6 h-7'>
            <Link to="shopping-cart">
              {
                cartSize && cartSize > 0 ? (
                  <>
                    <span className="absolute text-sm ml-1.6 mb-2 text-gray-500">{cartSize}</span>
                    <img src={OpenCartIcon} alt="cart icon" width="22px" height="15px" className='mt-1' />
                  </>) : <img src={CartIcon} alt="cart icon" width="22px" height="15px" />

              }
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;