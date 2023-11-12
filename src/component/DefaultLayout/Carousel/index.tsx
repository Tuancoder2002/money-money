import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UncontrolledExample() {
  const carouselItemStyle = {
    height: '200px', // Đặt chiều cao của mỗi phần tử Carousel
    boxShadow: '0 0 10px #ccc !important',
  borderRadius: '10px !important',
  };

  return (
    <Carousel style={{ width: '60%', margin: 'auto' }}>
      <Carousel.Item style={carouselItemStyle}>
        <img
          className="d-block w-100"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO6eo46xJgcZT5etJ6T6Z1zPy1rGIERI8IcA&usqp=CAU"
          alt="First slide"
          style={{ objectFit: 'cover', height: '100%', width: '100%',borderRadius: '30px', boxShadow: '0 0 5px #ccc',}}
        />
        <Carousel.Caption>
          <h3>Ngạn ngữ Thổ Nhĩ Kỳ</h3>
          <p>Người ta giàu vì biết lao động, Giàu hơn nữa vì biết tiết kiệm chi
            tiêu.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={carouselItemStyle}>
        <img
          className="d-block w-100"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcGzrJw7HMwdoP8BuPzXtj27U_368ghRM-mQ&usqp=CAU"
          alt="First slide"
          style={{ objectFit: 'cover', height: '100%', width: '100%',borderRadius: '30px', boxShadow: '0 0 5px #ccc',}}
        />
        <Carousel.Caption>
          <h3>Ngạn ngữ Đức</h3>
          <p>Tiết kiệm là một nghệ thuật, lớn hơn cả việc kiếm tiền.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={carouselItemStyle}>
        <img
          className="d-block w-100"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sxll-kTRhCQabvseZKqFOIM1e4eK27-mEQ&usqp=CAU"
          alt="First slide"
          style={{ objectFit: 'cover', height: '100%', width: '100%',borderRadius: '30px', boxShadow: '0 0 5px #ccc',}}
        />
        <Carousel.Caption>
          <h3>Warrent Buffett</h3>
          <p>Đừng tiết kiệm những gì còn lại sau khi tiêu, mà hãy tiêu những gì còn lại khi tiết kiệm.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* Các Carousel.Item khác tương tự */}
    </Carousel>
  );
}

export default UncontrolledExample;
