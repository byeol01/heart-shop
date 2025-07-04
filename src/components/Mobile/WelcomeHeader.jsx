import React from 'react';
import CharacterImage from './CharacterImage';
import '../css/WelcomeHeader.css';

export default function WelcomeHeader({ nickname }) {
  const isGuest = !nickname;

  return (
    <div className="welcome-header">
      <div className="welcome-text">
        어서오세요 <strong>{isGuest ? 'Guest' : nickname}</strong>님<br />
        기분상점입니다 :)
      </div>
      <CharacterImage nickname={nickname} />
    </div>
  );
}
