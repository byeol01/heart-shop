// 추천받기
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MobileRegionClass.css";

const MobileRegionClass = () => {
  const navigate = useNavigate();
  const [likedClasses, setLikedClasses] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("서울");

  const toggleLike = (className) => {
    setLikedClasses((prev) =>
      prev.includes(className) ? prev.filter((c) => c !== className) : [...prev, className]
    );
  };

  useEffect(() => {
    if (modalData) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalData]);

  return (
    <div className="mobile-region-wrapper">
      <h2>우리 동네 클래스</h2>

      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="region-select"
      >
        <option value="">지역을 선택하세요</option>
        {Object.keys(regionClasses).map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {selectedRegion && (
        <div className="class-list">
          {regionClasses[selectedRegion].map(({ name, description, region, address, details, price }) => (
            <div key={name} className="class-cards">
              <img src={classImages[name]} alt={name} className="class-image" />
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
                    onClick={() =>
                      setModalData({ name, description, region, address, details, price, image: classImages[name] })
                    }
                  >
                    더보기
                  </button>

                  <button
                    className="apply-button"
                    onClick={() =>
                      navigate("/payment", {
                        state: { name, description, price, image: classImages[name] },
                      })
                    }
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
  );
};

export default MobileRegionClass;
