import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Bbimbest from "../jsx/bbimbest";
import "../css/joyDetailPage.css";
import "../../css/common.css";
import "../../css/reset.css";

const classTexts = [
  {
    title: "향수 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "45,000원",
    desc: "나만의 기분을 향기로 담아보는 시간",
  },
  {
    title: "아크릴 페인팅 클래스",
    target: "개인",
    type: "창작",
    price: "38,000원",
    desc: "기분 좋을 땐 색으로 감정을 표현해봐요",
  },
  {
    title: "캘리그라피 클래스",
    target: "개인",
    type: "창작",
    price: "32,000원",
    desc: "말보다 마음이 닿는 글씨 한 줄",
  },
  {
    title: "플라워 클래스",
    target: "친구/커플",
    type: "창작",
    price: "48,000원",
    desc: "활짝 핀 꽃처럼 마음도 활짝 피는 하루",
  },
  {
    title: "케이크 만들기 클래스",
    target: "친구/커플",
    type: "창작",
    price: "52,000원",
    desc: "달콤한 기분을 케이크에 담아 함께 나눠요",
  },
  {
    title: "베이킹 클래스",
    target: "친구/커플",
    type: "창작",
    price: "50,000원",
    desc: "만들고 나누는 기쁨, 한 입의 행복",
  },
  {
    title: "댄스 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "30,000원",
    desc: "신나는 리듬 속에 몸도 기분도 들썩!",
  },
  {
    title: "에어로빅 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "28,000원",
    desc: "에너지 넘치는 하루를 위한 댄스 피트니스",
  },
  {
    title: "암벽등반 or 클라이밍 체험",
    target: "친구/커플",
    type: "신체활동",
    price: "60,000원",
    desc: "기쁨도 정점까지! 스릴 있는 체험 도전",
  },
  {
    title: "요가 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "35,000원",
    desc: "좋은 기분을 더 길게, 더 부드럽게 이어가요",
  },
  {
    title: "마인드풀니스 워크숍",
    target: "개인",
    type: "감성/휴식",
    price: "40,000원",
    desc: "기쁜 지금, 내 안의 평화를 만나보세요",
  },
  {
    title: "셀프브랜딩 워크숍",
    target: "개인",
    type: "감성/휴식",
    price: "55,000원",
    desc: "기분 좋은 날, 나를 더 빛내는 법",
  },
  {
    title: "커플 사진 촬영 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "58,000원",
    desc: "오늘의 기쁨을 사진으로 남겨요",
  },
  {
    title: "와인 테이스팅 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "65,000원",
    desc: "향긋한 와인과 함께하는 낭만 가득한 저녁",
  },
  {
    title: "보드게임 모임 클래스",
    target: "단체/모임",
    type: "감성/휴식",
    price: "25,000원",
    desc: "웃음 터지는 순간을 함께 즐겨요",
  },
  {
    title: "프라이빗 티 블렌딩 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "42,000원",
    desc: "향긋한 티처럼 여운 있는 기쁨을 경험해요",
  },
  {
    title: "폴라로이드 감정일기 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "37,000원",
    desc: "찰칵, 오늘의 기쁨을 기록하는 시간",
  },
  {
    title: "파자마 감성 홈카페 클래스",
    target: "단체/모임",
    type: "감성/휴식",
    price: "46,000원",
    desc: "포근하고 즐거운 우리만의 홈파티 타임",
  },
];

const joyClasses = classTexts.map((cls, i) => ({
  id: i,
  image: `/bbim/class${i + 1}.jpg`,
  ...cls,
  location: ["서울", "경기", "부산", "인천", "강원"][i % 5],
  popularity: [100, 90, 75, 98, 88, 85, 70, 60, 65, 99, 45, 95, 40, 55, 35, 30, 50, 20][i],
  date: `2024-06-${String(30 - i).padStart(2, "0")}`,
}));


const JoyDetailPage = () => {
  const isMobile = window.innerWidth <= 767;
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 10000, max: 100000 });
  const [targetFilter, setTargetFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortOption, setSortOption] = useState("popular");
  const [wishlist, setWishlist] = useState([]);

  const toggleView = () => setIsExpanded((prev) => !prev);
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

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const sortedClasses = [...joyClasses].sort((a, b) => {
    if (sortOption === "popular") return b.popularity - a.popularity;
    if (sortOption === "recent") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  const filteredClasses = sortedClasses.filter(cls => {
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
              trackStyle={[{ backgroundColor: '#ffbdbd' }]}
              handleStyle={[{ borderColor: '#ffbdbd' }, { borderColor: '#ffbdbd' }]}
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
            <button className="joy-tag-btn" onClick={() => setTargetFilter('개인')}>개인</button>
            <button className="joy-tag-btn" onClick={() => setTargetFilter('친구/커플')}>친구/커플</button>
            <button className="joy-tag-btn" onClick={() => setTargetFilter('단체/모임')}>단체/모임</button>
          </div>
        )}

        {activeFilter === 'type' && (
          <div className="type-filter">
            <button className="joy-tag-btn" onClick={() => setTypeFilter('창작')}>창작</button>
            <button className="joy-tag-btn" onClick={() => setTypeFilter('신체활동')}>신체활동</button>
            <button className="joy-tag-btn" onClick={() => setTypeFilter('감성/휴식')}>감성/휴식</button>
          </div>
        )}

        {activeFilter === 'location' && (
          <div className="location-filter">
            <button className="joy-tag-btn" onClick={() => setLocationFilter('서울')}>서울</button>
            <button className="joy-tag-btn" onClick={() => setLocationFilter('경기')}>경기</button>
            <button className="joy-tag-btn" onClick={() => setLocationFilter('부산')}>부산</button>
            <button className="joy-tag-btn" onClick={() => setLocationFilter('인천')}>인천</button>
            <button className="joy-tag-btn" onClick={() => setLocationFilter('강원')}>강원</button>
          </div>
        )}

        <div className="sort-filter">
          <label htmlFor="sortSelect">정렬 기준:</label>
          <select
            id="sortSelect"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="popular">인기순</option>
            <option value="recent">최신순</option>
          </select>
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
                <button
                  className="wishlist-btn"
                  onClick={() => toggleWishlist(cls.id)}
                >
                  {wishlist.includes(cls.id) ? "❤️" : "🤍"}
                </button>
                <button
                  className="joy-apply-btn"
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
          <button className="joy-more-btn" onClick={toggleView}>
            {isExpanded ? "접기" : "더보기"}
          </button>
        )}
      </div>

      <Bbimbest />
    </>
  );
};

export default JoyDetailPage;
