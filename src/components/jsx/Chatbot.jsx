import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/Chatbot.css';

const STATIC_RECOMMENDATIONS = {
  joy: [
    '1. 향수공방: 나만의 향기를 만들어 보는 클래스입니다.',
    '2. 플라워 클래스: 꽃다발로 기쁨을 표현해 보세요.',
    '3. 페인팅 워크샵: 색으로 감정을 그려보는 시간입니다.'
  ],
  sad: [
    '1. 아로마 테라피: 편안한 향으로 마음을 달래 보세요.',
    '2. 요가 클래스: 부드러운 동작으로 스트레스를 풀어드립니다.',
    '3. 힐링 마스크 만들기: 자신만의 마스크팩을 만들어 보세요.'
  ],
  anger: [
    '1. 복싱 클래스: 신체 활동으로 분노를 해소해 보세요.',
    '2. 타악기 워크샵: 북 연주로 스트레스를 날려보세요.',
    '3. 도예 클래스: 흙을 빚으며 마음을 차분히 가라앉혀 드립니다.'
  ],
  fear: [
    '1. 캠핑 체험: 자연 속에서 용기를 북돋아 보세요.',
    '2. 아이스크림 만들기: 달콤한 경험으로 두려움을 달래 드립니다.',
    '3. 명상 클래스: 호흡 명상으로 마음을 안정시켜 보세요.'
  ]
};

const EMOTIONS = [
  { key: 'joy', label: '기쁨', emoji: '😄' },
  { key: 'sad', label: '슬픔', emoji: '😢' },
  { key: 'anger', label: '분노', emoji: '😡' },
  { key: 'fear', label: '두려움', emoji: '😱' }
];

const COMMENT_TEXT = {
  joy: '오늘은 기분이 좋으시군요! 그럼 기분 좋을 때 하기 좋은 클래스를 추천해 드릴게요!',
  sad: '오늘은 우울하신가 보네요. 기분 전환에 도움이 될 클래스를 추천해드릴게요.',
  anger: '오늘은 속상하셨네요. 분노 해소에 좋을 클래스를 추천해드릴게요.',
  fear: '오늘은 조금 두려우신가요? 용기를 북돋아줄 클래스를 추천해드릴게요.'
};

const Chatbot = () => {
  const initialText = '안녕하세요! 오늘의 기분은 어떠신가요? 😊';
  const [messages, setMessages] = useState([{ from: 'bot', text: '' }]);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const typeWriter = (fullText, msgIndex, speed = 50, onComplete) => {
    let idx = 0;
    const timer = setInterval(() => {
      setMessages(prev => {
        const updated = [...prev];
        updated[msgIndex].text = fullText.slice(0, idx + 1);
        return updated;
      });
      idx++;
      if (idx >= fullText.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);
  };

  useEffect(() => {
    typeWriter(initialText, 0, 50);
  }, []);

  const handleEmotionClick = (key, emoji) => {
    const userMessage = { from: 'user', text: emoji };
    const botComment = { from: 'bot', text: '' };
    const botRec = { from: 'bot', text: '' };

    setMessages(prev => [...prev, userMessage, botComment]);

    const commentIdx = messages.length + 1;
    const recIdx = commentIdx + 1;

    setTimeout(() => {
      typeWriter(COMMENT_TEXT[key], commentIdx, 30, () => {
        setMessages(prev => [...prev, botRec]);

        const recs = STATIC_RECOMMENDATIONS[key] || [];
        const fullText = recs.join('\n');

        typeWriter(fullText, recIdx, 30, () => {
          setMessages(prev => {
            const updated = [...prev];
            updated[recIdx] = {
              ...updated[recIdx],
              url: `/${key}`,
              linkText: '더 보러가기'
            };
            return updated;
          });
        });
      });
    }, 500);
  };

  return (
    <div className="chatbot-container">
      <h3 className="chatbot-title h5">클래스 추천 챗봇</h3>

      <div className="chatbot-messages" ref={messagesContainerRef}>
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.from}`}>
            {m.text.split('\n').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
            {m.url && (
              <Link to={m.url} className="more-link">{m.linkText}</Link>
            )}
          </div>
        ))}
      </div>

      <div className="emotion-row">
        {EMOTIONS.map(e => (
          <button
            key={e.key}
            className="emotion-btn"
            title={e.label}
            onClick={() => handleEmotionClick(e.key, e.emoji)}
          >
            <span role="img" aria-label={e.label}>{e.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
