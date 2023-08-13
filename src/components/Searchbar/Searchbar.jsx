import { useState } from 'react';
import PropTypes from 'prop-types';
import { CiSearch } from 'react-icons/ci';
import {
  SearchbarHeader,
  SearchForm,
  FormButton,
  FormButtonLabel,
  Input,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (searchInput.trim() === '') {
      return;
    }

    onSubmit(searchInput);
    setSearchInput('');
  };

  const handleChange = e => {
    setSearchInput(e.currentTarget.value);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <FormButton type="submit">
          <CiSearch />
          <FormButtonLabel>Search</FormButtonLabel>
        </FormButton>

        <Input
          type="text"
          name="searchInput"
          value={searchInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
