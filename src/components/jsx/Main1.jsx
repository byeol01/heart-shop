
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Main1.css';
import Chatbot from '../jsx/Chatbot';
import CharacterBar from '../jsx/CharacterBar';
import PopularRanking from '../jsx/PopularRanking';

const Main1 = () => {
  return (
    <div className="main1-content wrap">

      {/* 1) 챗봇 (왼쪽 상단) */}
      <div className="ai">
        <Chatbot />
      </div>

      {/* 2) 인기클래스 순위 (오른쪽 상단) */}
      <PopularRanking />
      {/* 3) 검색창 (랭킹 밑, 카드 위) */}
      <div className="character-bar-container">
        <CharacterBar />
      </div>

      {/* 4) 추천 캐릭터 카드 (하단 전체) */}
      <div className="character">
        <ul className="character-list">
          <li>
            <h3>쁘미</h3>
            <p>밝은 에너지로 하루를 빛낼 맞춤 클래스를 추천해드릴게요!</p>
            <Link to="/joy" className="block">보러가기</Link>
          </li>
          <li>
            <h3>웅이</h3>
            <p>쓸쓸함을 감싸줄 위로 클래스를 추천해드릴게요...</p>
            <Link to="/sad" className="block">보러가기</Link>
          </li>
          <li>
            <h3>팡이</h3>
            <p>치솟는 분노를 가라앉힐 힐링 클래스를 추천해드릴게요!!!</p>
            <Link to="/angry" className="block">보러가기</Link>
          </li>
          <li>
            <h3>무무</h3>
            <p>두려움을 달래고 용기를 북돋을 클래스를 추천해드릴게요.</p>
            <Link to="/fear" className="block">보러가기</Link>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Main1;
