import React from "react";
import { useNavigate } from "react-router-dom";

const recommendedClasses = [
  {
    title: "우울감 표현 드로잉 클래스",
    desc: "감정을 그림으로 비워내는 힐링 아트",
    image: "/woong/class4.jpg",
    price: "39,000원",
    link: "/detail/1",
  },
  {
    title: "천연 비누 만들기 클래스",
    desc: "손끝으로 만드는 포근한 위로",
    image: "/woong/class10.jpg",
    price: "33,000원",
    link: "/detail/3",
  },
  {
    title: "반려동물 돌봄 클래스",
    desc: "누군가를 돌보는 것이 나를 살피는 길",
    image: "/woong/class8.jpg",
    price: "28,000원",
    link: "/detail/3",
  },
  {
    title: "북테라피 클래스",
    desc: "책 속에서 발견하는 공감과 위로",
    image: "/woong/class15.jpg",
    price: "27,000원",
    link: "/detail/4",
  },
];

const PpmiRecommend = () => {
  const navigate = useNavigate();

  return (
    <div className="sad-recommend-section">
      <div className="wrap">
        <h3>웅이가 Pick한 추천 클래스 ✨</h3>
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
