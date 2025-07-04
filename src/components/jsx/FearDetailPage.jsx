// fearDetailPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Mumubest from "../jsx/mumubest";
import "../css/fearDetailPage.css";
import "../../css/common.css";
import "../../css/reset.css";

const classTexts = [
  {
    title: "마인드풀 요가 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "35,000원",
    desc: "두려움에 흔들릴 때, 호흡과 함께 마음을 다잡아보세요",
  },
  {
    title: "심리 드로잉 클래스",
    target: "개인",
    type: "창작",
    price: "38,000원",
    desc: "내면의 감정을 색으로 풀어내며 나를 마주하는 시간",
  },
  {
    title: "호신술 입문 클래스",
    target: "친구/커플",
    type: "신체활동",
    price: "45,000원",
    desc: "불안한 상황에 대비하는 나만의 방어법 배우기",
  },
  {
    title: "감정 일기 쓰기 워크숍",
    target: "개인",
    type: "감성/휴식",
    price: "28,000원",
    desc: "두려움을 정리하고 마음의 무게를 덜어내는 글쓰기",
  },
  {
    title: "프라이빗 명상 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "42,000원",
    desc: "마음의 소란을 잠재우고 내면의 평화를 찾는 시간",
  },
  {
    title: "연기 입문 클래스",
    target: "단체/모임",
    type: "창작",
    price: "40,000원",
    desc: "두려운 상황도 연기로 연습하면 현실에서 덜 떨려요",
  },
  {
    title: "심박수 안정 요가 & 티 테라피",
    target: "개인",
    type: "감성/휴식",
    price: "50,000원",
    desc: "긴장한 몸과 마음을 함께 이완시키는 콜라보 클래스",
  },
  {
    title: "심리 상담 아트워크 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "55,000원",
    desc: "예술을 통해 두려움의 뿌리를 들여다보는 과정",
  },
  {
    title: "플라워 아레인지 힐링 클래스",
    target: "개인",
    type: "창작",
    price: "39,000원",
    desc: "불안한 하루, 손끝으로 평온을 피워보세요",
  },
  {
    title: "음악으로 감정 표현하기",
    target: "단체/모임",
    type: "창작",
    price: "33,000원",
    desc: "두려운 감정을 말 대신 음악으로 풀어내요",
  },
  {
    title: "아로마 감정 안정 워크숍",
    target: "개인",
    type: "감성/휴식",
    price: "44,000원",
    desc: "향으로 나를 위로하고 감정을 다독이는 시간",
  },
  {
    title: "용기 노트 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "36,000원",
    desc: "불안할 때마다 꺼내보는 나만의 응원 노트 만들기",
  },
  {
    title: "감정 표현 인형극 클래스",
    target: "친구/커플",
    type: "창작",
    price: "35,000원",
    desc: "감정 표현 인형극 클래스",
  },
];


const FearDetailPage = () => {
  const isMobile = window.innerWidth <= 767;
  const navigate = useNavigate();

  const fearClasses = Array.from({ length: 13 }, (_, i) => ({
    id: i,
    image: `/mumu/class${i + 1}.jpg`, // ← 백틱으로 감싸서 문자열로 처리!
    ...classTexts[i],
    location: ['서울', '경기', '부산', '인천', '강원'][i % 5],
  }));

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 10000, max: 100000 });
  const [targetFilter, setTargetFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const toggleView = () => setIsExpanded(prev => !prev);
  const toggleFilter = (filter) => {
    setActiveFilter(prev => (prev === filter ? null : filter));
  };

  const resetFilters = () => {
    setPriceRange({ min: 10000, max: 100000 });
    setTargetFilter('');
    setTypeFilter('');
    setLocationFilter('');
    setActiveFilter(null);
  };

  const filteredClasses = fearClasses.filter(cls => {
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
              trackStyle={[{ backgroundColor: '#e9defd' }]}
              handleStyle={[
                { borderColor: '#e9defd' },
                { borderColor: '#e9defd' }
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
            <button className="fear-tag-btn" onClick={() => setTargetFilter('개인')}>개인</button>
            <button className="fear-tag-btn" onClick={() => setTargetFilter('친구/커플')}>친구/커플</button>
            <button className="fear-tag-btn" onClick={() => setTargetFilter('단체/모임')}>단체/모임</button>
          </div>
        )}

        {activeFilter === 'type' && (
          <div className="type-filter">
            <button className="fear-tag-btn" onClick={() => setTypeFilter('창작')}>창작</button>
            <button className="fear-tag-btn" onClick={() => setTypeFilter('신체활동')}>신체활동</button>
            <button className="fear-tag-btn" onClick={() => setTypeFilter('감성/휴식')}>감성/휴식</button>
          </div>
        )}

        {activeFilter === 'location' && (
          <div className="location-filter">
            <button className="fear-tag-btn" onClick={() => setLocationFilter('서울')}>서울</button>
            <button className="fear-tag-btn" onClick={() => setLocationFilter('경기')}>경기</button>
            <button className="fear-tag-btn" onClick={() => setLocationFilter('부산')}>부산</button>
            <button className="fear-tag-btn" onClick={() => setLocationFilter('인천')}>인천</button>
            <button className="fear-tag-btn" onClick={() => setLocationFilter('강원')}>강원</button>
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
                  className="fear-apply-btn"
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
          <button className="fear-more-btn" onClick={toggleView}>
            {isExpanded ? "접기" : "더보기"}
          </button>
        )}
      </div>

      <Mumubest />
    </>
  );
};

export default FearDetailPage;