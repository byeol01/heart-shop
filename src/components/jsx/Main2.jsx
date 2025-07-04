import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import mapImg from "../img/map.png";
import { classImages, regionClasses } from "../js/regionClassData";
import "../css/Main2.css";




const regionPositions = {
  서울: { top: "20%", left: "250px" },
  경기: { top: "30%", left: "260px" },
  강원: { top: "25%", left: "380px" },
  충청: { top: "43%", left: "250px" },
  전라: { top: "62%", left: "240px" },
  경상: { top: "50%", left: "400px" },
  제주: { top: "90%", left: "130px" },
};

const regionHoverImages = {
  서울: {
    src: "/img/map2.png",
    top: "350px",
    left: "300px",
    width: "100%",
    height: "100%",
  },
  경기: {
    src: "/img/map1.png",
    top: "350px",
    left: "300px",
    width: "100%",
    height: "100%",
  },
  강원: {
    src: "/img/map8.png",
    top: "350px",
    left: "300px",
    width: "100%",
    height: "100%",
  },
  충청: {
    src: "/img/map7.png",
    top: "350px",
    left: "300px",
    width: "100%",
    height: "100%",
  },
  전라: {
    src: "/img/map4.png",
    top: "350px",
    left: "300px",
    width: "100%",
    height: "100%",
  },
  경상: {
    src: "/img/map6.png",
    top: "350px",
    left: "300px",
    width: "100%",
    height: "100%",
  },
  제주: {
    src: "/img/map3.png",
    top: "350px",
    left: "300px",
    width: "100%",
    height: "100%",
  },

};

const regions = Object.keys(regionClasses);

export default function Main2() {
  const navigate = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState("서울");
  const [likedClasses, setLikedClasses] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState("서울");

  const toggleLike = (className) => {
    setLikedClasses((prev) =>
      prev.includes(className) ? prev.filter((c) => c !== className) : [...prev, className]
    );
  };

  useEffect(() => {
    if (modalData) {
      document.body.style.overflow = "hidden"; // 모달 열릴 때 스크롤 잠금
    } else {
      document.body.style.overflow = ""; // 모달 닫힐 때 인라인 스타일 제거
    }

    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 초기화
    };
  }, [modalData]);

  return (
    <div className="main-container wrap">
      <div className="content-container">
        <div className="map-wrapper">
          <div className="region-description">
            <h2 className="section-title">우리 동네 클래스</h2>
          </div>

          <div className="map-container">
            <img src={mapImg} alt="Korea Map" className="map-image" />
            {regions.map((region) => (
              <button
                key={region}
                className="region-button"
                style={{
                  position: "absolute",
                  top: regionPositions[region].top,
                  left: regionPositions[region].left,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedRegion(region)}
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                {region}
              </button>
            ))}

            {hoveredRegion && regionHoverImages[hoveredRegion] && (
              <img
                src={regionHoverImages[hoveredRegion].src}
                alt="hover"
                className="region-hover-image"
                style={{
                  position: "absolute",
                  top: regionHoverImages[hoveredRegion].top,
                  left: regionHoverImages[hoveredRegion].left,
                  width: regionHoverImages[hoveredRegion].width,
                  height: regionHoverImages[hoveredRegion].height,
                  zIndex: 2,
                  pointerEvents: "none",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </div>

          <div className="class-container">
            <div className="selector-container">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="region-select"
              >
                <option value="">지역을 선택하세요</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="title-row">
              <h2 className="title">
                {selectedRegion ? `${selectedRegion} 베스트 클래스` : "지역을 선택하세요"}
              </h2>
              <img
                src="/img/all.png"
                alt="background"
                className={`bg-image ${selectedRegion ? "small" : "large"}`}
              />
            </div>

            {selectedRegion && (
              <div className="class-list">
                {regionClasses[selectedRegion].map(({ name, description, region, address, details, price }) => (
                  <div key={name} className="class-box">
                    <img
                      src={classImages[name]}
                      alt={name}
                      className="class-image"
                    />
                    <div className="class-info">
                      <h3>{name}</h3>
                      <p>{description}</p>
                      <p><b>지역:</b> {region}</p>
                      <div className="class-actions">
                        <button
                          className={`like-button ${likedClasses.includes(name) ? "liked" : ""}`}
                          onClick={() => toggleLike(name)}
                        >
                          {likedClasses.includes(name) ? "💛 찜됨" : "🤍 찜하기"}
                        </button>
                        <button
                          className="more-button"
                          onClick={() => setModalData({ name, description, region, address, details, price, image: classImages[name] })}
                        >
                          더보기
                        </button>
                        <button
                          className="apply-button"
                          onClick={() => {
                            navigate("/payment", {
                              state: { name, description, price, image: classImages[name] },
                            });
                          }}
                        >
                          신청하기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {modalData && (
              <div className="modal-overlay" onClick={() => setModalData(null)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <button className="modal-close" onClick={() => setModalData(null)}>
                    &times;
                  </button>
                  <img src={modalData.image} alt={modalData.name} />
                  <h2>{modalData.name}</h2>
                  <p><strong>설명:</strong> {modalData.description}</p>
                  <p><strong>지역:</strong> {modalData.region}</p>
                  <p><strong>상세 주소:</strong> {modalData.address}</p>
                  <p><strong>활동 내용:</strong> {modalData.details}</p>
                  <p><strong>가격:</strong> {modalData.price}</p>
                  <button
                    className="apply-button"
                    onClick={() => {
                      document.body.style.overflow = "auto";
                      navigate("/payment", {
                        state: {
                          name: modalData.name,
                          description: modalData.description,
                          price: modalData.price,
                          image: modalData.image,
                        },
                      });
                    }}
                  >
                    신청하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
