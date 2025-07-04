import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Pangbest from "../jsx/Pangbest";
import "../css/angryDetailPage.css";
import "../../css/common.css";
import "../../css/reset.css";

const classTexts = [
  {
    title: "권투 스트레스 해소 클래스",
    target: "개인",
    type: "신체활동",
    price: "40,000원",
    desc: "주먹 안에 담긴 감정을 펀치로 시원하게 날려보세요",
  },
  {
    title: "도자기 핸드빌딩 클래스",
    target: "개인",
    type: "창작",
    price: "48,000원",
    desc: "무게감 있는 흙을 손끝으로 빚으며 마음을 차분히 정돈해요",
  },
  {
    title: "스크래치 아트 테라피 클래스",
    target: "개인",
    type: "창작",
    price: "36,000원",
    desc: "긁고 지우며 감정을 흘려보내는 집중의 시간",
  },
  {
    title: "킥복싱 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "38,000원",
    desc: "강한 움직임으로 속에 쌓인 화를 건강하게 발산해요",
  },
  {
    title: "우드카빙 클래스",
    target: "개인",
    type: "창작",
    price: "42,000원",
    desc: "단단한 나무를 조각하며 마음도 단단해지는 체험",
  },
  {
    title: "수묵화 명상 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "35,000원",
    desc: "먹 향에 마음을 실어 고요하게 번지는 여운",
  },
  {
    title: "타로&자기성찰 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "33,000원",
    desc: "감정의 방향을 잃었을 때, 내면의 소리를 들어보세요",
  },
  {
    title: "냉침한방차 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "37,000원",
    desc: "화끈한 감정은 차가운 약차로 진정시켜요",
  },
  {
    title: "감정 글쓰기 해소 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "29,000원",
    desc: "감정을 말 대신 글로 풀며 자신과 마주해보세요",
  },
  {
    title: "한지 등불 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "39,000원",
    desc: "마음을 밝히는 조용한 손작업, 한지를 통해 스스로를 어루만져요",
  },
  {
    title: "핸드드립 커피 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "36,000원",
    desc: "천천히 내려지는 커피 한 잔에 분노도 가라앉아요",
  },
  {
    title: "크로키 클래스",
    target: "개인",
    type: "창작",
    price: "41,000원",
    desc: "빠른 선 위에 감정을 얹어 순간을 흘려보내는 드로잉",
  },
  {
    title: "해금 소리 명상 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "55,000원",
    desc: "울림이 긴장을 풀고 마음을 다독여주는 전통음악 치유",
  },
  {
    title: "미니 복싱볼 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "30,000원",
    desc: "스트레스를 담아 뚝뚝 치는, 내 손으로 만든 해소 도구",
  },
  {
    title: "명상 트래킹 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "34,000원",
    desc: "숲길을 따라 걸으며 마음을 비우는 감정 순환의 시간",
  },
  {
    title: "감정 캔버스 페인팅 클래스",
    target: "단체/모임",
    type: "창작",
    price: "43,000원",
    desc: "붓질 하나하나에 감정을 담아내는 해방의 그림",
  },
  {
    title: "매듭 공예 클래스",
    target: "개인",
    type: "창작",
    price: "35,000원",
    desc: "복잡한 감정을 천천히 매듭지으며 가라앉히는 작업",
  },
  {
    title: "무향 심신 안정 명상 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "30,000원",
    desc: "자극 없는 공간에서 나 자신에게 집중하는 깊은 휴식",
  },
];

const angryClasses = classTexts.map((cls, i) => ({
  id: i,
  image: `/pang/class${i + 1}.jpg`,
  ...cls,
  location: ["서울", "경기", "부산", "인천", "강원"][i % 5],
  popularity: [60, 80, 70, 85, 95, 75, 90, 50, 65, 55, 40, 35, 30, 25, 20, 45, 15, 10][i],
  date: `2024-06-${String(30 - i).padStart(2, "0")}`,
}));

const AngryDetailPage = () => {
  const isMobile = window.innerWidth <= 767;
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 10000, max: 100000 });
  const [targetFilter, setTargetFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [wishlist, setWishlist] = useState([]);

  const toggleView = () => setIsExpanded((prev) => !prev);
  const toggleFilter = (filter) => setActiveFilter(prev => (prev === filter ? null : filter));
  const resetFilters = () => {
    setPriceRange({ min: 10000, max: 100000 });
    setTargetFilter("");
    setTypeFilter("");
    setLocationFilter("");
    setActiveFilter(null);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const sortedClasses = [...angryClasses].sort((a, b) => {
    if (sortOption === "popular") {
      return b.popularity - a.popularity; // 인기순: 높은 인기 먼저
    }
    if (sortOption === "recent") {
      return new Date(b.date) - new Date(a.date); // 최신순: 최신 날짜 먼저
    }
    return 0;
  });


  const filteredClasses = sortedClasses.filter(cls => {
    const price = Number(cls.price.replace(/[^0-9]/g, ""));
    const matchPrice = price >= priceRange.min && price <= priceRange.max;
    const matchTarget = targetFilter ? cls.target === targetFilter : true;
    const matchType = typeFilter ? cls.type === typeFilter : true;
    const matchLocation = locationFilter ? cls.location === locationFilter : true;
    return matchPrice && matchTarget && matchType && matchLocation;
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
              range min={10000} max={100000} step={1000}
              value={[priceRange.min, priceRange.max]}
              onChange={([min, max]) => setPriceRange({ min, max })}
              trackStyle={[{ backgroundColor: '#FFCEA6' }]}
              handleStyle={[{ borderColor: '#FFCEA6' }, { borderColor: '#FFCEA6' }]}
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
            <button className="angry-tag-btn" onClick={() => setTargetFilter('개인')}>개인</button>
            <button className="angry-tag-btn" onClick={() => setTargetFilter('친구/커플')}>친구/커플</button>
            <button className="angry-tag-btn" onClick={() => setTargetFilter('단체/모임')}>단체/모임</button>
          </div>
        )}

        {activeFilter === 'type' && (
          <div className="type-filter">
            <button className="angry-tag-btn" onClick={() => setTypeFilter('창작')}>창작</button>
            <button className="angry-tag-btn" onClick={() => setTypeFilter('신체활동')}>신체활동</button>
            <button className="angry-tag-btn" onClick={() => setTypeFilter('감성/휴식')}>감성/휴식</button>
          </div>
        )}

        {activeFilter === 'location' && (
          <div className="location-filter">
            <button className="angry-tag-btn" onClick={() => setLocationFilter('서울')}>서울</button>
            <button className="angry-tag-btn" onClick={() => setLocationFilter('경기')}>경기</button>
            <button className="angry-tag-btn" onClick={() => setLocationFilter('부산')}>부산</button>
            <button className="angry-tag-btn" onClick={() => setLocationFilter('인천')}>인천</button>
            <button className="angry-tag-btn" onClick={() => setLocationFilter('강원')}>강원</button>
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
                  className="angry-apply-btn"
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
          <button className="angry-more-btn" onClick={toggleView}>
            {isExpanded ? "접기" : "더보기"}
          </button>
        )}
      </div>

      <Pangbest />
    </>
  );
};

export default AngryDetailPage;
