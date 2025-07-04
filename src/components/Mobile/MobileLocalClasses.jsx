import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Navigation, Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import '../css/MobileLocalClasses.css';

import { classImages, regionClasses } from '../js/regionClassData';

const MobileLocalClasses = () => {
  const [selectedRegion, setSelectedRegion] = useState('서울');
  const navigate = useNavigate();
  const filteredClasses = regionClasses[selectedRegion] || [];

  // ✅ handleApply 함수 정의
  const handleApply = (item) => {
    navigate('/payment', {
      state: {
        name: item.name,
        image: classImages[item.name],
        description: item.description,
        address: item.address,
        price: item.price || '',
      },
    });
  };

  return (
    <div className="local-classes-wrapper">
      <h2 className="title">우리동네클래스</h2>

      <div className="region-buttons">
        {['서울', '경기', '강원', '충청', '전라', '경상', '제주'].map(region => (
          <button
            key={region}
            className={region === selectedRegion ? 'active' : ''}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="local-class-section">
        <Swiper
          modules={[Pagination, Navigation, Mousewheel, FreeMode]}
          slidesPerView={'auto'}
          spaceBetween={16}
          freeMode={true}
          mousewheel={true}
          pagination={{ clickable: true }}
          navigation={false}
          style={{ paddingBottom: '20px' }}
        >
          {filteredClasses.map((item, idx) => (
            <SwiperSlide key={idx} style={{ width: '250px' }}>
              <div className="class-card">
                <div className="like-button">♡</div>
                <img src={classImages[item.name]} alt={item.name} className="class-img" />
                <div className="class-name">{item.name}</div>
                <div className="class-desc">{item.description}</div>
                <div className="class-location">{item.address}</div>
                <button className="apply-btn" onClick={() => handleApply(item)}>
                  신청하기
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MobileLocalClasses;
