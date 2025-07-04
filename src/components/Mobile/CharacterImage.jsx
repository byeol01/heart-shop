import React, { useEffect, useState } from 'react';
import '../css/CharacterImage.css';

const guestImage = '/img/guest.png';
const animalImages = [
  '/img/sun.png',
  '/img/byeol.png',
  '/img/bbim.png',
  '/img/pang.png',
  '/img/woong.png',
  '/img/mumu.png',
];

export default function CharacterImage({ nickname }) {
  const [profileImage, setProfileImage] = useState(null);
  const isGuest = !nickname || nickname.toLowerCase() === 'guest';

  useEffect(() => {
    if (isGuest) {
      setProfileImage(guestImage);
    } else {
      const savedImage = localStorage.getItem(`profileImage_${nickname}`);
      if (savedImage) {
        setProfileImage(savedImage);
      } else {
        const randomImage = animalImages[Math.floor(Math.random() * animalImages.length)];
        localStorage.setItem(`profileImage_${nickname}`, randomImage);
        setProfileImage(randomImage);
      }
    }
  }, [nickname, isGuest]);

  const handleChangeProfile = () => {
    if (isGuest) return;

    const currentIndex = animalImages.indexOf(profileImage);
    const nextImage = animalImages[(currentIndex + 1) % animalImages.length];
    setProfileImage(nextImage);
    localStorage.setItem(`profileImage_${nickname}`, nextImage);
  };

  return (
    <div className="character-image-wrapper" onClick={handleChangeProfile}>
      <img src={profileImage} alt="프로필" className="character-image" />
      {!isGuest && <div className="change-hint">프로필 변경</div>}
    </div>
  );
}
