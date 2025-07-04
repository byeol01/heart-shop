import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from './WelcomeHeader';
import "../css/MobileHome.css";
import Chatbot from "../jsx/Chatbot";
import MobileLocalClasses from './MobileLocalClasses';

const MobileHomeScreen = ({ user }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  const nickname = user?.nickname || "Guest"; // ✅ 사용자 정보

  const categories = [
    { id: 'happy', name: 'BBIM' },
    { id: 'sad', name: 'WOONG' },
    { id: 'aggro', name: 'PING' },
    { id: 'awe', name: 'MUMU' },
  ];

  const moodCards = [
    {
      id: 'happy',
      title: '삐므',
      descriptionLines: ['밝은 에너지로 하루를 빛낼 맞춤', '클래스를 추천해드릴게요!'],
      bgImage: '/img/mhappy.png',
    },
    {
      id: 'sad',
      title: '웅이',
      descriptionLines: ['쓸쓸함을 감싸줄 위로 클래스를', '추천해드릴게요...'],
      bgImage: '/img/msad.png',
    },
    {
      id: 'aggro',
      title: '팡이',
      descriptionLines: ['치솟는 분노를 가라앉힐', '힐링 클래스를 추천해드릴게요!!!'],
      bgImage: '/img/mangry.png',
    },
    {
      id: 'awe',
      title: '무무',
      descriptionLines: ['두려움을 달래고 용기를', '북돋을 클래스를 추천해드릴게요.'],
      bgImage: '/img/mafraid.png',
    }
  ];

  const handleNavigate = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleCategoryClick = (index) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "start" });
  };

  const handleScroll = () => {
    const scrollX = scrollRef.current?.scrollLeft || 0;
    const cardOffsets = cardRefs.current.map((el) => el?.offsetLeft || 0);

    const closestIndex = cardOffsets.reduce((closest, offset, idx) => {
      return Math.abs(offset - scrollX) < Math.abs(cardOffsets[closest] - scrollX) ? idx : closest;
    }, 0);

    setCurrentIndex(closestIndex);
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const startDrag = (x) => {
      isDown = true;
      slider.classList.add("dragging");
      startX = x - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const moveDrag = (x) => {
      if (!isDown) return;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    const endDrag = () => {
      isDown = false;
      slider.classList.remove("dragging");
    };

    // 마우스 이벤트
    slider.addEventListener("mousedown", (e) => startDrag(e.pageX));
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      moveDrag(e.pageX);
    });
    slider.addEventListener("mouseup", endDrag);
    slider.addEventListener("mouseleave", endDrag);

    // 터치 이벤트
    slider.addEventListener("touchstart", (e) => startDrag(e.touches[0].pageX));
    slider.addEventListener("touchmove", (e) => moveDrag(e.touches[0].pageX));
    slider.addEventListener("touchend", endDrag);

    return () => {
      slider.removeEventListener("mousedown", (e) => startDrag(e.pageX));
      slider.removeEventListener("mousemove", moveDrag);
      slider.removeEventListener("mouseup", endDrag);
      slider.removeEventListener("mouseleave", endDrag);

      slider.removeEventListener("touchstart", (e) => startDrag(e.touches[0].pageX));
      slider.removeEventListener("touchmove", moveDrag);
      slider.removeEventListener("touchend", endDrag);
    };
  }, []);

  return (
    <div className="mobile-wrapper">
      {/* ✅ 닉네임 전달 (Guest 고정 제거!) */}
      <WelcomeHeader nickname={nickname} />

      <div className="content-wrapper">
        <div className="category-sidebar">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(index)}
              className={`category-btn ${currentIndex === index ? `active category-color-${index}` : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="card-list scrollbar-hide" ref={scrollRef}>
          {moodCards.map((card, index) => (
            <div
              key={card.id}
              className="card"
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ backgroundImage: `url(${card.bgImage})` }}
            >
              <div className="mobile-card-overlay">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">
                  {card.descriptionLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== card.descriptionLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <button
                  onClick={() => handleNavigate(card.id)}
                  className="more-btn"
                >
                  추천받기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Chatbot />

      <div className="local-class-section">
        <h2 className="section-title">🏠 우리동네 클래스</h2>
        <MobileLocalClasses />
      </div>
    </div>
  );
};

export default MobileHomeScreen;
