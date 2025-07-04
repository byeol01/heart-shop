import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/bbimbest.css";

const recommendedClasses = [
  {
    title: "향수 만들기 클래스",
    desc: "나만의 기분을 향기로 담아보는 시간",
    image: "/bbim/class1.jpg",
    price: "45,000원",
    link: "/detail/1",
  },
  {
    title: "요가 클래스",
    desc: "좋은 기분을 더 길게 이어가요",
    image: "/bbim/class10.jpg",
    price: "35,000원",
    link: "/detail/2",
  },
  {
    title: "플라워 클래스",
    desc: "활짝 핀 꽃처럼 마음도 활짝 피는 하루",
    image: "/bbim/class4.jpg",
    price: "48,000원",
    link: "/detail/2",
  },
  {
    title: "셀프브랜딩 워크숍",
    desc: "기분 좋은 날, 나를 더 빛내는 법",
    image: "/bbim/class12.jpg",
    price: "55,000원",
    link: "/detail/4",
  },
];

const PpmiRecommend = () => {
  const navigate = useNavigate();

  return (
    <div className="joy-recommend-section">
      <div className="wrap">
        <h3>쁘미가 Pick한 추천 클래스 ✨</h3>
        <div className="recommend-wrapper">
          {recommendedClasses.map((cls, idx) => (
            <div
              key={idx}
              className="recommend-card"
              onClick={() => navigate(cls.link)}
              style={{ backgroundImage: `url(${cls.image})` }}
            >
              <div className="card-overlay">
                <h4>{cls.title}</h4>
                <p>{cls.desc}</p>
                <span>{cls.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PpmiRecommend;
