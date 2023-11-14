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
          <h3>Bước 1</h3>
          <p>Thêm Ví mới bằng cách click vào nút "Ví của tôi" ở bên góc trái màn hình.</p>
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
          <h3>Bước 2</h3>
          <p>Thêm giao dịch mới ở phía trên cùng góc phải màn hình.</p>
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
          <h3>Bước 3</h3>
          <p>Kiểm soát chi tiêu của bạn ở mục "Sổ giao dịch".</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* Các Carousel.Item khác tương tự */}
    </Carousel>
  );
}

export default UncontrolledExample;
