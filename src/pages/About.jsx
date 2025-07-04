import "../css/About.css"

const About = () => (
  <div className="page-wrapper">
    <div className="about-container">
      <h1 className="about-title">회사소개</h1>
      <p>
        <strong>기분상점</strong>은 박선아와 이한별이 함께 만든 감정 기반 클래스 큐레이션 플랫폼입니다.
        우리는 사람들의 다양한 감정에 공감하고, 그 감정에 어울리는 활동을 제안함으로써 삶의 작은 즐거움을 선물하고자 합니다.
      </p>

      <p>
        당신이 오늘 <strong>행복하거나, 슬프거나, 지치거나, 무기력</strong>할 때 – 기분상점은 그 기분을 토닥이고,
        어울리는 수업과 활동을 추천해줍니다. <br />
        예를 들어 슬플 땐 따뜻한 플라워 클래스, 지칠 땐 요가나 명상 클래스처럼요.
      </p>

      <h2 className="about-subtitle">서비스 비전</h2>
      <ul>
        <li>감정에 맞춘 퍼스널 클래스 큐레이션</li>
        <li>일상의 감정을 예술로 풀어낼 수 있는 기회 제공</li>
        <li>작은 변화로 큰 위로를 전하는 공간</li>
      </ul>

      <h2 className="about-subtitle">제작자 소개</h2>
      <p>
        <strong>박선아</strong> – 감성 UI/UX 디자이너. 사용자의 감정 흐름을 시각화하는 데 관심이 많습니다.<br />
        <strong>이한별</strong> – 프론트엔드 개발자. 감정 데이터를 바탕으로 맞춤형 추천 시스템 구현을 담당했습니다.
      </p>

      <h2 className="about-subtitle">연락처</h2>
      <p>
        이메일: <a href="mailto:heartshop.team@gmail.com">heartshop.team@gmail.com</a> <br />
        인스타그램: <a href="https://instagram.com/heartshop_official" target="_blank" rel="noreferrer">@heartshop_official</a>
      </p>
    </div>
  </div>
);

export default About;
