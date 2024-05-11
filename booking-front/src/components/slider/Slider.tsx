import './slider.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { PhotoUrlType } from '../../types/types';

type SliderTypeProp = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
  slideIndex: number;
  slides: PhotoUrlType[];
};

const Slider = ({
  setIsOpen,
  setSlideIndex,
  slideIndex,
  slides,
}: SliderTypeProp): JSX.Element => {
  function handleSlideShown(
    direction: string,
    totalSlides: number = slides.length
  ) {
    if (direction === 'left') {
      slideIndex <= 0
        ? setSlideIndex(totalSlides - 1)
        : setSlideIndex((prev) => prev - 1);
    } else {
      slideIndex >= totalSlides - 1
        ? setSlideIndex(0)
        : setSlideIndex((prev) => prev + 1);
    }
  }

  function handleSliderClosing() {
    setIsOpen(false);
  }

  return (
    <>
      <div className='slider'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='close-btn'
          onClick={handleSliderClosing}
        />

        <div className='slide'>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className='close-btn'
            onClick={handleSliderClosing}
          />

          <FontAwesomeIcon
            icon={faChevronLeft}
            className='arrow-btn left'
            onClick={() => handleSlideShown('left')}
          />

          <img
            src={slides[slideIndex].imgUrl}
            alt={`image-${slideIndex}`}
            className='image'
          />

          <FontAwesomeIcon
            icon={faChevronRight}
            className='arrow-btn  right'
            onClick={() => handleSlideShown('right')}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
