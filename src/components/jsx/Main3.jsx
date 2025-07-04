// // // src/components/Main3.jsx
// import React, { useState } from 'react';
// import '../css/Main3.css';
// import pang from '../img/pang.png';
// import bbim from '../img/bbim.png';
// import woong from '../img/woong.png';
// import mumu from '../img/mumu.png';



// const slides = [
//   { src: bbim, name: '쁘미' },
//   { src: woong, name: '웅이' },
//   { src: pang, name: '팡이' },
//   { src: mumu, name: '무무' },
// ];

// const Main3 = () => {
//   const [active, setActive] = useState(0);

//   return (
//     <div className="wrap">
//       <ul className="slider">
//         {slides.map((slide, idx) => (
//           <li
//             key={idx}
//             className={`panel ${active === idx ? 'open' : 'closed'}`}
//             onClick={() => setActive(idx)}
//           >
//             <img src={slide.src} alt={slide.name} />
//           </li>
//         ))}
//       </ul>

//       {/* 이름이 들어간 도트 네비 */}
//       <ul className="dots">
//         {slides.map((slide, idx) => (
//           <li
//             key={idx}
//             className={active === idx ? 'dot active' : 'dot'}
//             onClick={() => setActive(idx)}
//           >
//             {slide.name}
//           </li>
//         ))}
//       </ul>

//       <button>버튼</button>
//     </div>
//   );
// };

// export default Main3;
// src/components/Main3.jsx
import React, { useState } from 'react';
import '../css/Main3.css';
import pang from '../img/pang.png';
import bbim from '../img/bbim.png';
import woong from '../img/woong.png';
import mumu from '../img/mumu.png';

const slides = [
  { src: bbim , name: '쁘미' },
  { src: woong, name: '웅이' },
  { src: pang, name: '팡이' },
  { src: mumu, name: '무무' },
];

const getBackgroundColor = (name) => {
  switch (name) {
    case '쁘미': return '#F5CACA';
    case '웅이': return '#B3CDE0';
    case '팡이': return '#FFCEA6';
    case '무무': return '#D6CDEA';
    default: return '#eee';
  }
};

const Main3 = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="wrap">
      <h2 className="section3-title">기분상점 직원들을 소개합니다.</h2>
      <ul className="slider">
        {slides.map((slide, idx) => (
          <li
            key={idx}
            className={`panel ${active === idx ? 'open' : 'closed'}`}
            onClick={() => setActive(idx)}
            style={{
              backgroundColor: active !== idx ? getBackgroundColor(slide.name) : 'transparent',
            }}
          >
            {active === idx && (
              <img src={slide.src} alt={slide.name} />
            )}
          </li>
        ))}
      </ul>

      <ul className="dots">
        {slides.map((slide, idx) => (
          <li
            key={idx}
            className={active === idx ? 'dot active' : 'dot'}
            onClick={() => setActive(idx)}
          >
            {slide.name}
          </li>
        ))}
      </ul>

      <button>버튼</button>
    </div>
  );
};

export default Main3;

