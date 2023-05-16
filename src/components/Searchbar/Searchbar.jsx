import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import {SearchHeader, SearchForm, SearchButton, SearchSpan, SearchInput} from './Searchbar.styled';

export class Searchbar extends React.Component {
  state = {
    query: '',
  }

  handleChange = event => {
    this.setState({ query: event.target.value })
  };

  handleSubmit = event => {
    event.preventDefault();
    
    const { query } = this.state;

    if (query.trim() === '') {
      toast.info('Please write your query.')
      return
    }
    this.props.onSubmit(query);
  };


  render() {

    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchSpan>Search</SearchSpan>
          </SearchButton>

          <SearchInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchHeader>
    )
  }
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}