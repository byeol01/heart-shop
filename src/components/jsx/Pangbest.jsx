import React from "react";
import { useNavigate } from "react-router-dom";

const recommendedClasses = [
  {
    title: "수묵화 명상 클래스",
    desc: "먹 향에 마음을 실어 고요하게 번지는 여운",
    image: "/pang/class6.jpg",
    price: "35,000원",
    link: "/detail/1",
  },
  {
    title: "크로키 클래스",
    desc: "선 위에 감정을 얹어 순간을 흘려보내는 드로잉",
    image: "/pang/class12.jpg",
    price: "41,000원",
    link: "/detail/3",
  },
  {
    title: "감정 캔버스 페인팅 클래스",
    desc: "붓질 하나하나에 감정을 담아내는 해방의 그림",
    image: "/pang/class16.jpg",
    price: "43,000원",
    link: "/detail/3",
  },
  {
    title: "매듭 공예 클래스",
    desc: "복잡한 감정을 매듭지으며 가라앉히는 작업",
    image: "/pang/class17.jpg",
    price: "35,000원",
    link: "/detail/4",
  },
];


const PpmiRecommend = () => {
  const navigate = useNavigate();

  return (
    <div className="angry-recommend-section">
      <div className="wrap">
        <h3>팡이가 Pick한 추천 클래스 ✨</h3>
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
