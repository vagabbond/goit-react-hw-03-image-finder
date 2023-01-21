import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Component } from 'react';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    name: '',
  };
  hendelChange = event => {
    this.setState({ name: event.currentTarget.value });
  };
  hendelSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.name);
  };
  render() {
    const { name } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.hendelSubmit}>
          <SearchFormButton type="submit">
            <IconContext.Provider value={{ size: '20' }}>
              <AiOutlineSearch />
            </IconContext.Provider>
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            value={name}
            onChange={this.hendelChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}
