import SearchBar from 'material-ui-search-bar';

const Searchbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <SearchBar
      className="search-bar"
      value={searchQuery}
      name="searchBar"
      onChange={(newValue) => setSearchQuery(newValue)}
      onRequestSearch={() => console.log('Search triggered')}
    />
  );
};

export default Searchbar;