import { ImageGallery, ImageGalleryItem, Image } from './ImageGallery.styled';

export const Gallery = ({ images, onClick }) => {
  return (
    <ImageGallery>
      {images.map(el => {
        return (
          <ImageGalleryItem
            key={el.id}
            onClick={() => onClick(el.largeImageURL)}
          >
            <Image src={el.webformatURL} alt="" />
          </ImageGalleryItem>
        );
      })}
    </ImageGallery>
  );
};
