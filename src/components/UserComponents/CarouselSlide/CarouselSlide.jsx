import './CarouselSlide.css'
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function CarouselSlide() {


  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="carousel-container">
        <Slider {...settings}>
          <div>
            <img src={'https://assets.tatacliq.com/medias/sys_master/images/49975170465822.jpg'} />
          </div>
          <div>
            <img src={'https://assets.tatacliq.com/medias/sys_master/images/49975170334750.jpg'} />
          </div>
          <div>
            <img src={'https://assets.tatacliq.com/medias/sys_master/images/49975170531358.jpg'} />
          </div>
          <div>
            <img src={'https://assets.tatacliq.com/medias/sys_master/images/49975170400286.jpg'} />
          </div>
        </Slider>
    </div>
  );
}

export default CarouselSlide;