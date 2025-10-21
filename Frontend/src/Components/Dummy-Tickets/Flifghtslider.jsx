import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function Flifghtslider() {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
          //slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4,
          //slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          //slidesToSlide: 1 // optional, default to 1.
        }
      };
  return (
    <>
    <section className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] px-3 bg-orange-100">
    <div className="md:container md:mx-auto px-3 sd:px-10  md:px-10 lg:px-10 xl:px-10 2xl:px-10 py-10">
      <Carousel swipeable={true}
      
  draggable={true}
  showDots={false}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlay={true}
  
  //autoPlaySpeed={1000}
  //keyBoardControl={true}
  //customTransition="all .5"
  //transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
 // deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style" 
  itemClass="carousel-item-padding-40-px"
 >
      <div className='item'>
        <div className='bg-white w-[98%]  h-20 flex rounded justify-center p-5 '><img src="images/ATN.png" className='h-[100%] m-[0 auto] w-[auto!important]' alt=""/></div>
    </div>
    <div className='item'>
    <div className='bg-white w-[98%] h-20 flex rounded justify-center p-5 '><img src="images/JSH.png" className='h-[100%] m-[0 auto] w-[auto!important]' alt=""/></div>
    </div>
    <div className='item'>
    <div className='bg-white w-[98%] h-20 flex rounded justify-center  p-5 '><img src="images/KOR.png" className='h-[100%] m-[0 auto] w-[auto!important]' alt=""/></div>
    </div>
    <div className='item'>
    <div className='bg-white w-[98%] h-20 flex rounded justify-center p-5 '><img src="images/KZR.png" className='h-[100%] m-[0 auto] w-[auto!important]' alt=""/></div>
    </div>
    <div className='item'>
    <div className='bg-white w-[98%] h-20 flex rounded justify-center p-5 '><img src="images/AIC.png" className='h-[100%] m-[0 auto] w-[auto!important]' alt=""/></div>
    </div>
    <div className='item'>
    <div className='bg-white w-[98%] h-20  flex rounded justify-center p-5 '><img src="images/VTI.png" className='h-[100%] m-[0 auto] w-[auto!important]' alt=""/></div>
    </div>
    
    <div className='item'>
    <div className='bg-white w-[98%] h-20 flex rounded justify-center p-5 '><img src="images/JDI.png" className='h-[100%] m-[0 auto] w-[auto!important]' alt=""/></div>
    </div>
    <div className='item'>
    <div className='bg-white w-[98%] h-20 flex rounded justify-center p-5 '><img src="images/JAF.png" className='h-[100%] m-[0 auto] w-[auto!important]' alt=""/></div>
    </div>
    <div className='item'>
    <div className='bg-white w-[98%] h-20  flex rounded justify-center p-5 '><img src="images/JWX.png" className='h-[100%] m-[0 auto] w-[auto!important]' alt=""/></div>
    </div>
    <div className='item'>
    <div className='bg-white w-[98%] h-20 flex rounded justify-center   p-5 '><img src="images/LNI.png" className='h-[100%] m-[0 auto] w-[auto!important]' alt=""/></div>
    </div>
    <div className='item'>
    <div className='bg-white w-[98%] h-20 flex rounded justify-center   p-5 '><img src="images/SEJ.png" className='h-[100%] m-[0 auto] w-[auto!important]'alt=""/></div>
    </div>  
       </Carousel>
       </div>
       </section>
       </>
  )
}
