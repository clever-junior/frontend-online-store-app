import SearchIcon from '../../../assets/search-icon-4.svg';

function SearchInput({ onChange, value, onBtnClick }) {
  return (
    <div className="flex pt-2 relative mx-auto text-gray-600">
      <input 
        data-testid="query-input"
        className="shadow-md w-full bg-white h-10 px-5 pr-16 rounded-sm text-sm focus:outline-none"
        type="text"
        name="search"
        placeholder="Buscar produtos, marcas e muito mais..."
        onChange={ ({ target: { value } }) => onChange(value)}
        onKeyDown={ ({ key }) => key === 'Enter' && onBtnClick() }  
        value={ value }
      />
      <button 
        data-testid="query-button"
        type="button"
        className="absolute right-0 top-0 mt-5 mr-4"
        onClick={ () => onBtnClick() }
      >
        <img src={SearchIcon} alt="search icon" width="16px" height="21px" />
      </button>
    </div>
  )
}

export default SearchInput;