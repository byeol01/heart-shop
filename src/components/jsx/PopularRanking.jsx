// src/jsx/PopularRanking.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import '../css/PopularRanking.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ranking1 from '../img/ranking1.jpg';
import ranking2 from '../img/ranking2.jpg';
import ranking3 from '../img/ranking3.jpg';
import ranking4 from '../img/ranking4.jpg';
import ranking5 from '../img/ranking5.jpg';
import ranking6 from '../img/ranking6.jpg';
import ranking7 from '../img/ranking7.jpg';
import ranking8 from '../img/ranking8.jpg';
import ranking9 from '../img/ranking9.jpg';

const popularItems = [
  { image: ranking1, title: '향수공방', subtitle: '감성 향기로 힐링하기' },
  { image: ranking2, title: '반지공방', subtitle: '커플 반지 만들기' },
  { image: ranking3, title: '희망공방', subtitle: '소원 담은 공예' },
  { image: ranking4, title: '아로마캔들', subtitle: '향기와 빛을 담다' },
  { image: ranking5, title: '캘리그라피', subtitle: '손글씨로 전하는 마음' },
  { image: ranking6, title: '도자기 공방', subtitle: '흙으로 빚는 시간' },
  { image: ranking7, title: '페인팅 클래스', subtitle: '색으로 감정 그리기' },
  { image: ranking8, title: '마크라메', subtitle: '매듭으로 완성하는 작품' },
  { image: ranking9, title: '플로리스트', subtitle: '꽃으로 나를 표현하기' },
];


const PopularRanking = () => {
  const [currentTop, setCurrentTop] = useState(0); // 현재 맨 위에 보이는 슬라이드 인덱스

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2500,
    vertical: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    pauseOnHover: true,
    afterChange: (index) => {
      setCurrentTop(index); // 현재 보여지는 가장 위 슬라이드 index 저장
    }
  };

  return (
    <div className="ranking">
      <h3 className="ranking-title">인기클래스 순위</h3>
      <Slider {...settings} className="ranking-list">
        {popularItems.map((item, index) => (
          <div key={index}>
            <div className={`ranking-item ${index === currentTop ? 'top-ranked' : ''}`}>
              <span className="rank-number">{index + 1}</span>
              <img src={item.image} alt={item.title} className="rank-thumbnail" />
              <div className="rank-info">
                <div className="rank-title">{item.title}</div>
                <div className="rank-subtitle">{item.subtitle}</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularRanking;
