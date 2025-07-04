import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SearchModal.css';

const STATIC_RECOMMENDATIONS = [
  {
    title: "향수 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "45,000원",
    desc: "나만의 기분을 향기로 담아보는 시간",
    image: "/bbim/class1.jpg",
  },
  {
    title: "아크릴 페인팅 클래스",
    target: "개인",
    type: "창작",
    price: "38,000원",
    desc: "기분 좋을 땐 색으로 감정을 표현해봐요",
    image: "/bbim/class2.jpg",
  },
  {
    title: "캘리그라피 클래스",
    target: "개인",
    type: "창작",
    price: "32,000원",
    desc: "말보다 마음이 닿는 글씨 한 줄",
    image: "/bbim/class3.jpg",
  },
  {
    title: "플라워 클래스",
    target: "친구/커플",
    type: "창작",
    price: "48,000원",
    desc: "활짝 핀 꽃처럼 마음도 활짝 피는 하루",
    image: "/bbim/class4.jpg",
  },
  {
    title: "케이크 만들기 클래스",
    target: "친구/커플",
    type: "창작",
    price: "52,000원",
    desc: "달콤한 기분을 케이크에 담아 함께 나눠요",
    image: "/bbim/class5.jpg",
  },
  {
    title: "베이킹 클래스",
    target: "친구/커플",
    type: "창작",
    price: "50,000원",
    desc: "만들고 나누는 기쁨, 한 입의 행복",
    image: "/bbim/class6.jpg",
  },
  {
    title: "댄스 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "30,000원",
    desc: "신나는 리듬 속에 몸도 기분도 들썩!",
    image: "/bbim/class7.jpg",
  },
  {
    title: "에어로빅 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "28,000원",
    desc: "에너지 넘치는 하루를 위한 댄스 피트니스",
    image: "/bbim/class8.jpg",
  },
  {
    title: "암벽등반 or 클라이밍 체험",
    target: "친구/커플",
    type: "신체활동",
    price: "60,000원",
    desc: "기쁨도 정점까지! 스릴 있는 체험 도전",
    image: "/bbim/class9.jpg",
  },
  {
    title: "요가 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "35,000원",
    desc: "좋은 기분을 더 길게, 더 부드럽게 이어가요",
    image: "/bbim/class10.jpg",
  },
  {
    title: "마인드풀니스 워크숍",
    target: "개인",
    type: "감성/휴식",
    price: "40,000원",
    desc: "기쁜 지금, 내 안의 평화를 만나보세요",
    image: "/bbim/class11.jpg",
  },
  {
    title: "셀프브랜딩 워크숍",
    target: "개인",
    type: "감성/휴식",
    price: "55,000원",
    desc: "기분 좋은 날, 나를 더 빛내는 법",
    image: "/bbim/class12.jpg",
  },
  {
    title: "커플 사진 촬영 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "58,000원",
    desc: "오늘의 기쁨을 사진으로 남겨요",
    image: "/bbim/class13.jpg",
  },
  {
    title: "와인 테이스팅 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "65,000원",
    desc: "향긋한 와인과 함께하는 낭만 가득한 저녁",
    image: "/bbim/class14.jpg",
  },
  {
    title: "보드게임 모임 클래스",
    target: "단체/모임",
    type: "감성/휴식",
    price: "25,000원",
    desc: "웃음 터지는 순간을 함께 즐겨요",
    image: "/bbim/class15.jpg",
  },
  {
    title: "프라이빗 티 블렌딩 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "42,000원",
    desc: "향긋한 티처럼 여운 있는 기쁨을 경험해요",
    image: "/bbim/class16.jpg",
  },
  {
    title: "폴라로이드 감정일기 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "37,000원",
    desc: "찰칵, 오늘의 기쁨을 기록하는 시간",
    image: "/bbim/class17.jpg",
  },
  {
    title: "파자마 감성 홈카페 클래스",
    target: "단체/모임",
    type: "감성/휴식",
    price: "46,000원",
    desc: "포근하고 즐거운 우리만의 홈파티 타임",
    image: "/bbim/class18.jpg",
  },
  {
    title: "아로마 캔들 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "38,000원",
    desc: "은은한 향에 마음이 스르르 녹는 시간",
    image: "/woong/class1.jpg",
  },
  {
    title: "감정 캘리그라피 클래스",
    target: "개인",
    type: "창작",
    price: "34,000원",
    desc: "말로 하기 어려운 마음을 글씨로 풀어내요",
    image: "/woong/class2.jpg",
  },
  {
    title: "토분 식물 화분 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "36,000원",
    desc: "흙을 만지고 식물을 돌보며 마음을 달래요",
    image: "/woong/class3.jpg",
  },
  {
    title: "우울감 표현 드로잉 클래스",
    target: "개인",
    type: "창작",
    price: "39,000원",
    desc: "감정을 그림으로 비워내는 힐링 아트",
    image: "/woong/class4.jpg",
  },
  {
    title: "심리그림상담 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "60,000원",
    desc: "그리는 것만으로도 치유가 시작돼요",
    image: "/woong/class5.jpg",
  },
  {
    title: "명상 & 호흡 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "32,000원",
    desc: "깊은 숨 한 번에 고요한 위로가 스며들어요",
    image: "/woong/class6.jpg",
  },
  {
    title: "티 테라피 & 마음 일기 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "40,000원",
    desc: "따뜻한 차 한 잔, 그리고 나와 마주하는 시간",
    image: "/woong/class7.jpg",
  },
  {
    title: "반려동물 돌봄 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "28,000원",
    desc: "누군가를 돌보는 것이 나를 살피는 길",
    image: "/woong/class8.jpg",
  },
  {
    title: "향초 힐링 테라피 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "42,000원",
    desc: "마음을 밝혀주는 따뜻한 불빛",
    image: "/woong/class9.jpg",
  },
  {
    title: "천연 비누 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "33,000원",
    desc: "손끝으로 만드는 포근한 위로",
    image: "/woong/class10.jpg",
  },
  {
    title: "사운드 테라피 클래스",
    target: "단체/모임",
    type: "감성/휴식",
    price: "50,000원",
    desc: "울림이 전하는 깊은 안정감",
    image: "/woong/class11.jpg",
  },
  {
    title: "정리정돈/미니멀라이프 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "35,000원",
    desc: "공간을 비우면 마음도 가벼워져요",
    image: "/woong/class12.jpg",
  },
  {
    title: "차분한 요가 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "30,000원",
    desc: "무기력한 날, 몸부터 깨워보세요",
    image: "/woong/class13.jpg",
  },
  {
    title: "느린 걷기 명상 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "28,000원",
    desc: "걸으며 생각을 정리하고 감정을 흘려보내요",
    image: "/woong/class14.jpg",
  },
  {
    title: "북테라피 클래스",
    target: "단체/모임",
    type: "감성/휴식",
    price: "27,000원",
    desc: "책 속에서 발견하는 공감과 위로",
    image: "/woong/class15.jpg",
  },
  {
    title: "자수 클래스",
    target: "개인",
    type: "창작",
    price: "37,000원",
    desc: "한 땀 한 땀, 마음도 함께 꿰매는 시간",
    image: "/woong/class16.jpg",
  },
  {
    title: "무드등 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "36,000원",
    desc: "어두운 마음을 은은한 불빛으로 감싸줄게요",
    image: "/woong/class17.jpg",
  },
  {
    title: "감성 사진 촬영 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "45,000원",
    desc: "지금의 나를 있는 그대로 남기는 기록",
    image: "/woong/class18.jpg",
  },
  {
    title: "권투 스트레스 해소 클래스",
    target: "개인",
    type: "신체활동",
    price: "40,000원",
    desc: "주먹 안에 담긴 감정을 펀치로 시원하게 날려보세요",
    image: "/pang/class1.jpg",
  },
  {
    title: "도자기 핸드빌딩 클래스",
    target: "개인",
    type: "창작",
    price: "48,000원",
    desc: "무게감 있는 흙을 손끝으로 빚으며 마음을 차분히 정돈해요",
    image: "/pang/class2.jpg",
  },
  {
    title: "스크래치 아트 테라피 클래스",
    target: "개인",
    type: "창작",
    price: "36,000원",
    desc: "긁고 지우며 감정을 흘려보내는 집중의 시간",
    image: "/pang/class3.jpg",
  },
  {
    title: "킥복싱 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "38,000원",
    desc: "강한 움직임으로 속에 쌓인 화를 건강하게 발산해요",
    image: "/pang/class4.jpg",
  },
  {
    title: "우드카빙 클래스",
    target: "개인",
    type: "창작",
    price: "42,000원",
    desc: "단단한 나무를 조각하며 마음도 단단해지는 체험",
    image: "/pang/class5.jpg",
  },
  {
    title: "수묵화 명상 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "35,000원",
    desc: "먹 향에 마음을 실어 고요하게 번지는 여운",
    image: "/pang/class6.jpg",
  },
  {
    title: "타로&자기성찰 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "33,000원",
    desc: "감정의 방향을 잃었을 때, 내면의 소리를 들어보세요",
    image: "/pang/class7.jpg",
  },
  {
    title: "냉침한방차 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "37,000원",
    desc: "화끈한 감정은 차가운 약차로 진정시켜요",
    image: "/pang/class8.jpg",
  },
  {
    title: "감정 글쓰기 해소 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "29,000원",
    desc: "감정을 말 대신 글로 풀며 자신과 마주해보세요",
    image: "/pang/class9.jpg",
  },
  {
    title: "한지 등불 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "39,000원",
    desc: "마음을 밝히는 조용한 손작업, 한지를 통해 스스로를 어루만져요",
    image: "/pang/class10.jpg",
  },
  {
    title: "핸드드립 커피 클래스",
    target: "친구/커플",
    type: "감성/휴식",
    price: "36,000원",
    desc: "천천히 내려지는 커피 한 잔에 분노도 가라앉아요",
    image: "/pang/class11.jpg",
  },
  {
    title: "크로키 클래스",
    target: "개인",
    type: "창작",
    price: "41,000원",
    desc: "빠른 선 위에 감정을 얹어 순간을 흘려보내는 드로잉",
    image: "/pang/class12.jpg",
  },
  {
    title: "해금 소리 명상 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "55,000원",
    desc: "울림이 긴장을 풀고 마음을 다독여주는 전통음악 치유",
    image: "/pang/class13.jpg",
  },
  {
    title: "미니 복싱볼 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "30,000원",
    desc: "스트레스를 담아 뚝뚝 치는, 내 손으로 만든 해소 도구",
    image: "/pang/class14.jpg",
  },
  {
    title: "명상 트래킹 클래스",
    target: "단체/모임",
    type: "신체활동",
    price: "34,000원",
    desc: "숲길을 따라 걸으며 마음을 비우는 감정 순환의 시간",
    image: "/pang/class15.jpg",
  },
  {
    title: "감정 캔버스 페인팅 클래스",
    target: "단체/모임",
    type: "창작",
    price: "43,000원",
    desc: "붓질 하나하나에 감정을 담아내는 해방의 그림",
    image: "/pang/class16.jpg",
  },
  {
    title: "매듭 공예 클래스",
    target: "개인",
    type: "창작",
    price: "35,000원",
    desc: "복잡한 감정을 천천히 매듭지으며 가라앉히는 작업",
    image: "/pang/class17.jpg",
  },
  {
    title: "무향 심신 안정 명상 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "30,000원",
    desc: "자극 없는 공간에서 나 자신에게 집중하는 깊은 휴식",
    image: "/pang/class18.jpg",
  },
  {
    title: "마인드풀 요가 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "35,000원",
    desc: "두려움에 흔들릴 때, 호흡과 함께 마음을 다잡아보세요",
    image: "/mumu/class1.jpg",
  },
  {
    title: "심리 드로잉 클래스",
    target: "개인",
    type: "창작",
    price: "38,000원",
    desc: "내면의 감정을 색으로 풀어내며 나를 마주하는 시간",
    image: "/mumu/class2.jpg",
  },
  {
    title: "호신술 입문 클래스",
    target: "친구/커플",
    type: "신체활동",
    price: "45,000원",
    desc: "불안한 상황에 대비하는 나만의 방어법 배우기",
    image: "/mumu/class3.jpg",
  },
  {
    title: "감정 일기 쓰기 워크숍",
    target: "개인",
    type: "감성/휴식",
    price: "28,000원",
    desc: "두려움을 정리하고 마음의 무게를 덜어내는 글쓰기",
    image: "/mumu/class4.jpg",
  },
  {
    title: "프라이빗 명상 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "42,000원",
    desc: "마음의 소란을 잠재우고 내면의 평화를 찾는 시간",
    image: "/mumu/class5.jpg",
  },
  {
    title: "연기 입문 클래스",
    target: "단체/모임",
    type: "창작",
    price: "40,000원",
    desc: "두려운 상황도 연기로 연습하면 현실에서 덜 떨려요",
    image: "/mumu/class6.jpg",
  },
  {
    title: "심박수 안정 요가 & 티 테라피",
    target: "개인",
    type: "감성/휴식",
    price: "50,000원",
    desc: "긴장한 몸과 마음을 함께 이완시키는 콜라보 클래스",
    image: "/mumu/class7.jpg",
  },
  {
    title: "심리 상담 아트워크 클래스",
    target: "개인",
    type: "감성/휴식",
    price: "55,000원",
    desc: "예술을 통해 두려움의 뿌리를 들여다보는 과정",
    image: "/mumu/class8.jpg",
  },
  {
    title: "플라워 아레인지 힐링 클래스",
    target: "개인",
    type: "창작",
    price: "39,000원",
    desc: "불안한 하루, 손끝으로 평온을 피워보세요",
    image: "/mumu/class9.jpg",
  },
  {
    title: "음악으로 감정 표현하기",
    target: "단체/모임",
    type: "창작",
    price: "33,000원",
    desc: "두려운 감정을 말 대신 음악으로 풀어내요",
    image: "/mumu/class10.jpg",
  },
  {
    title: "아로마 감정 안정 워크숍",
    target: "개인",
    type: "감성/휴식",
    price: "44,000원",
    desc: "향으로 나를 위로하고 감정을 다독이는 시간",
    image: "/mumu/class11.jpg",
  },
  {
    title: "용기 노트 만들기 클래스",
    target: "개인",
    type: "창작",
    price: "36,000원",
    desc: "불안할 때마다 꺼내보는 나만의 응원 노트 만들기",
    image: "/mumu/class12.jpg",
  },
  {
    title: "감정 표현 인형극 클래스",
    target: "친구/커플",
    type: "창작",
    price: "35,000원",
    desc: "감정 표현 인형극 클래스",
    image: "/mumu/class13.jpg",
  },
];

const EMOTION_TAGS = [
  { icon: '😄', label: '기쁠 때', path: '/joy' },
  { icon: '😢', label: '슬플 때', path: '/sad' },
  { icon: '😡', label: '화날 때', path: '/angry' },
  { icon: '😱', label: '두려울 때', path: '/fear' },
];

const IS_LOGGED_IN = true;
const STORAGE_KEY = 'search_history';

export default function SearchModal({ onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [relatedResults, setRelatedResults] = useState([]);
  const [popularKeywords, setPopularKeywords] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (!IS_LOGGED_IN) return;
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    // 임시 인기검색어 (실제로는 상품 타이틀로 구성)
    const dummyPopular = [
      "아로마 캔들 만들기 클래스",
      "토분 식물 화분 만들기 클래스",
      "감정 캘리그라피 클래스",
      "요가 클래스",
    ];
    setPopularKeywords(dummyPopular);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setRelatedResults([]);
      return;
    }

    const timer = setTimeout(() => {
      // 상품 객체 배열에서 title 기준 검색하도록 변경됨
      const filtered = STATIC_RECOMMENDATIONS.filter(item =>
        item.title.includes(query)  // ← 수정된 부분: item.title.includes(query)
      );
      setRelatedResults(filtered);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  function saveSearchHistory(keyword) {
    if (!IS_LOGGED_IN) return;

    let newHistory = [...searchHistory];
    newHistory = newHistory.filter(item => item !== keyword);
    newHistory.unshift(keyword);
    if (newHistory.length > 10) newHistory = newHistory.slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  }

  function deleteHistoryItem(index) {
    const newHistory = [...searchHistory];
    newHistory.splice(index, 1);
    setSearchHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  }

  function clearAllHistory() {
    setSearchHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  function onSelectKeyword(title) {
    saveSearchHistory(title);
    onClose();

    // 상품 정보 객체 찾기
    const product = STATIC_RECOMMENDATIONS.find(item => item.title === title);

    // state로 상품 정보 같이 넘겨주기
    navigate('/payment', {
      state: product
        ? {
          name: product.title,
          price: product.price,
          image: product.image || '',
        }
        : { name: title, price: '₩0원', image: '' },
    });  // ← 수정된 부분: state로 상품 정보 넘김
  }

  function onEmotionClick(path) {
    onClose();
    navigate(path);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content wrap" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <input
          autoFocus
          className="modal-input"
          type="text"
          placeholder="클래스 검색…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        {/* 최근 검색어 */}
        {query.length < 2 && searchHistory.length > 0 && (
          <div className="search-history">
            <div className="search-history-header">
              <h4>최근 검색어</h4>
              <button className="btn-clear-all" onClick={clearAllHistory}>전체 삭제</button>
            </div>
            <ul>
              {searchHistory.map((item, i) => (
                <li key={i}>
                  <span onClick={() => onSelectKeyword(item)}>{item}</span>
                  <button className="btn-delete-history" onClick={() => deleteHistoryItem(i)}>×</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 인기 검색어 */}
        {query.length < 2 && popularKeywords.length > 0 && (
          <div className="popular-keywords">
            <h4>인기 검색어</h4>
            <ul>
              {popularKeywords.map((item, i) => (
                <li key={i} onClick={() => onSelectKeyword(item)}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 관련 검색어 */}
        {relatedResults.length > 0 && (
          <div className="related-results">
            <h4>관련 검색어</h4>
            <ul>
              {relatedResults.map((item, i) => (
                <li key={i} onClick={() => onSelectKeyword(item.title)}>{item.title}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 감정 태그 */}
        {query.length < 2 && (
          <div className="emotion-tags">
            <h4>기분 따라 둘러보기</h4>
            <ul>
              {EMOTION_TAGS.map(({ icon, label, path }, i) => (
                <li
                  key={i}
                  className="emotion-tag-item"
                  onClick={() => onEmotionClick(path)}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title={label}
                >
                  <span style={{ fontSize: '22px' }}>{icon}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
