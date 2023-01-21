import React, { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';

import { SearchBar } from './Searchbar/Searchbar';
import { Gallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { fetchImages } from './Fetch';

export class App extends Component {
  state = {
    images: [],
    status: 'idle',
    filter: '',
    page: 1,
    largeImg: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.filter !== this.state.filter ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      this.fetchImg(this.state.filter, this.state.page);
    }
    if (prevState.filter !== this.state.filter) {
      this.setState({ images: [] });
    }
  }

  fetchImg = async (filter, page) => {
    try {
      const hits = await fetchImages(filter, page);
      hits.length === 0
        ? this.setState({ status: 'rejected' })
        : this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            status: 'resolved',
          }));
    } catch (error) {
      console.log(error);
      this.setState({ status: 'rejected' });
    }
  };
  onSubmit = filter => {
    this.setState({ filter });
  };
  onClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  openModal = img => {
    this.setState({ largeImg: img });
  };
  toggleModal = () => {
    this.setState({ largeImg: '' });
  };
  render() {
    const { status } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.onSubmit}></SearchBar>
        {status === 'rejected' && <h1>Something went wrong</h1>}
        {status === 'resolved' && (
          <>
            <Gallery images={this.state.images} onClick={this.openModal} />
            {status === 'pending' ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />
            ) : (
              <Button onClick={this.onClick} />
            )}
          </>
        )}
        {this.state.largeImg && (
          <Modal
            toggleModal={this.toggleModal}
            largeImg={this.state.largeImg}
          />
        )}
      </>
    );
  }
}
