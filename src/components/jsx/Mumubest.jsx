import React from "react";
import { useNavigate } from "react-router-dom";

const recommendedClasses = [
  {
    title: "심리 드로잉 클래스",
    desc: "감정을 색으로 풀어내며 나를 마주하는 시간",
    image: "/mumu/class2.jpg",
    price: "38,000원",
    link: "/detail/1",
  },
  {
    title: "음악으로 감정 표현하기",
    desc: "두려운 감정을 말 대신 음악으로 풀어내요",
    image: "/mumu/class10.jpg",
    price: "33,000원",
    link: "/detail/3",
  },
  {
    title: "아로마 감정 안정 워크숍",
    desc: "향으로 나를 위로하고 감정을 다독이는 시간",
    image: "/mumu/class11.jpg",
    price: "44,000원",
    link: "/detail/3",
  },
  {
    title: "감정 표현 인형극 클래스",
    desc: "감정 표현 인형극 클래스",
    image: "/mumu/class13.jpg",
    price: "35,000원",
    link: "/detail/4",
  },
];


const PpmiRecommend = () => {
  const navigate = useNavigate();

  return (
    <div className="fear-recommend-section">
      <div className="wrap">
        <h3>무무가 Pick한 추천 클래스 ✨</h3>
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
