// sadDetailPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Woongbest from "../jsx/Woongbest";
import "../css/SadDetailPage.css";
import "../../css/common.css";
import "../../css/reset.css";

const classTexts = [
  {
    title: "아로마 캔들 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "38,000원",
    desc: "은은한 향에 마음이 스르르 녹는 시간",
  },
  {
    title: "감정 캘리그라피 클래스",
    target: "개인",
    type: "창작",
    price: "34,000원",
    desc: "말로 하기 어려운 마음을 글씨로 풀어내요",
  },
  {
    title: "토분 식물 화분 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "36,000원",
    desc: "흙을 만지고 식물을 돌보며 마음을 달래요",
  },
  {
    title: "우울감 표현 드로잉 클래스",
    target: "개인",
    type: "창작",
    price: "39,000원",
    desc: "감정을 그림으로 비워내는 힐링 아트",
  },
  {
    title: "심리그림상담 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "60,000원",
    desc: "그리는 것만으로도 치유가 시작돼요",
  },
  {
    title: "명상 & 호흡 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "32,000원",
    desc: "깊은 숨 한 번에 고요한 위로가 스며들어요",
  },
  {
    title: "티 테라피 & 마음 일기 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "40,000원",
    desc: "따뜻한 차 한 잔, 그리고 나와 마주하는 시간",
  },
  {
    title: "반려동물 돌봄 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "28,000원",
    desc: "누군가를 돌보는 것이 나를 살피는 길",
  },
  {
    title: "향초 힐링 테라피 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "42,000원",
    desc: "마음을 밝혀주는 따뜻한 불빛",
  },
  {
    title: "천연 비누 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "33,000원",
    desc: "손끝으로 만드는 포근한 위로",
  },
  {
    title: "사운드 테라피 클래스",
    target: "단체/모임",
    type: "감성/휴식",
    price: "50,000원",
    desc: "울림이 전하는 깊은 안정감",
  },
  {
    title: "정리정돈/미니멀라이프 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "35,000원",
    desc: "공간을 비우면 마음도 가벼워져요",
  },
  {
    title: "차분한 요가 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "30,000원",
    desc: "무기력한 날, 몸부터 깨워보세요",
  },
  {
    title: "느린 걷기 명상 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "28,000원",
    desc: "걸으며 생각을 정리하고 감정을 흘려보내요",
  },
  {
    title: "북테라피 클래스",
    target: "단체/모임",
    type: "감성/휴식",
    price: "27,000원",
    desc: "책 속에서 발견하는 공감과 위로",
  },
  {
    title: "자수 클래스",
    target: "개인",
    type: "창작",
    price: "37,000원",
    desc: "한 땀 한 땀, 마음도 함께 꿰매는 시간",
  },
  {
    title: "무드등 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "36,000원",
    desc: "어두운 마음을 은은한 불빛으로 감싸줄게요",
  },
  {
    title: "감성 사진 촬영 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "45,000원",
    desc: "지금의 나를 있는 그대로 남기는 기록",
  },
];

const sadClasses = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  image: `/woong/class${i + 1}.jpg`, // ← 백틱으로 감싸서 문자열로 처리!
  ...classTexts[i],
  location: ['서울', '경기', '부산', '인천', '강원'][i % 5],
}));


const sadDetailPage = () => {
  const isMobile = window.innerWidth <= 767;
  const navigate = useNavigate(); // ✅ navigate 선언

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 10000, max: 100000 });
  const [targetFilter, setTargetFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const toggleView = () => setIsExpanded((prev) => !prev);
  const toggleFilter = (filter) => setActiveFilter(prev => prev === filter ? null : filter);
  const resetFilters = () => {
    setPriceRange({ min: 10000, max: 100000 });
    setTargetFilter('');
    setTypeFilter('');
    setLocationFilter('');
    setActiveFilter(null);
  };

  const filteredClasses = sadClasses.filter(cls => {
    const priceNumber = Number(cls.price.replace(/[^0-9]/g, ""));
    const matchesPrice = priceNumber >= priceRange.min && priceNumber <= priceRange.max;
    const matchesTarget = targetFilter ? cls.target === targetFilter : true;
    const matchesType = typeFilter ? cls.type === typeFilter : true;
    const matchesLocation = locationFilter ? cls.location === locationFilter : true;
    return matchesPrice && matchesTarget && matchesType && matchesLocation;
  });

  const visibleList = isExpanded ? filteredClasses : filteredClasses.slice(0, 8);

  return (
    <>
      <div className="detail-container wrap">
        <div className="emotion-filter">
          <Link to={isMobile ? "/detail/happy" : "/joy"} className="btn pink">기쁨</Link>
          <Link to={isMobile ? "/detail/sad" : "/sad"} className="btn blue">슬픔</Link>
          <Link to={isMobile ? "/detail/aggro" : "/angry"} className="btn orange">분노</Link>
          <Link to={isMobile ? "/detail/awe" : "/fear"} className="btn purple">두려움</Link>
        </div>

        <div className="tag-filter">
          <button className="tag-btn" onClick={() => toggleFilter('price')}>가격 <span>＋</span></button>
          <button className="tag-btn" onClick={() => toggleFilter('target')}>참여 대상 <span>＋</span></button>
          <button className="tag-btn" onClick={() => toggleFilter('type')}>체험 유형 <span>＋</span></button>
          <button className="tag-btn" onClick={() => toggleFilter('location')}>장소 <span>＋</span></button>
          <button className="reset-btn" title="초기화" onClick={resetFilters}>⟳</button>
        </div>

        {activeFilter === 'price' && (
          <div className="price-filter">
            <Slider
              range
              min={10000}
              max={100000}
              step={1000}
              value={[priceRange.min, priceRange.max]}
              onChange={([min, max]) => setPriceRange({ min, max })}
              trackStyle={[{ backgroundColor: '#dbeeff' }]}
              handleStyle={[
                { borderColor: '#dbeeff' },
                { borderColor: '#dbeeff' }
              ]}
            />
            <div className="price-values">
              <span>최저 <strong>₩{priceRange.min.toLocaleString()}</strong></span>
              <span>-</span>
              <span>최대 <strong>₩{priceRange.max.toLocaleString()}</strong></span>
            </div>
          </div>
        )}

        {activeFilter === 'target' && (
          <div className="target-filter">
            <button className="sad-tag-btn" onClick={() => setTargetFilter('개인')}>개인</button>
            <button className="sad-tag-btn" onClick={() => setTargetFilter('친구/커플')}>친구/커플</button>
            <button className="sad-tag-btn" onClick={() => setTargetFilter('단체/모임')}>단체/모임</button>
          </div>
        )}

        {activeFilter === 'type' && (
          <div className="type-filter">
            <button className="sad-tag-btn" onClick={() => setTypeFilter('창작')}>창작</button>
            <button className="sad-tag-btn" onClick={() => setTypeFilter('신체활동')}>신체활동</button>
            <button className="sad-tag-btn" onClick={() => setTypeFilter('감성/휴식')}>감성/휴식</button>
          </div>
        )}

        {activeFilter === 'location' && (
          <div className="location-filter">
            <button className="sad-tag-btn" onClick={() => setLocationFilter('서울')}>서울</button>
            <button className="sad-tag-btn" onClick={() => setLocationFilter('경기')}>경기</button>
            <button className="sad-tag-btn" onClick={() => setLocationFilter('부산')}>부산</button>
            <button className="sad-tag-btn" onClick={() => setLocationFilter('인천')}>인천</button>
            <button className="sad-tag-btn" onClick={() => setLocationFilter('강원')}>강원</button>
          </div>
        )}

        <div className="sort-filter">
          <select><option>인기순 / 최신순</option></select>
        </div>

        <div className="classall">
          {visibleList.map((cls) => (
            <div key={cls.id} className="class-card">
              <img src={cls.image} alt={cls.title} className="class-img" />
              <div className="card-text">
                <h2>{cls.title}</h2>
                <p>{cls.desc}</p>
                <span className="card-price">{cls.price}</span>
              </div>
              <div className="card-buttons">
                <button className="wishlist-btn">🤍</button>
                <button
                  className="sad-apply-btn"
                  onClick={() =>
                    navigate("/payment", {
                      state: {
                        name: cls.title,
                        price: cls.price,
                        image: cls.image,
                      },
                    })
                  }
                >
                  신청하기
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredClasses.length > 8 && (
          <button className="sad-more-btn" onClick={toggleView}>
            {isExpanded ? "접기" : "더보기"}
          </button>
        )}
      </div>

      <Woongbest />
    </>
  );
};

export default sadDetailPage;