// src/components/Mobile/ClassCard.jsx
import React, { useState } from 'react';

export default function ClassCard({ title }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="class-card">
      <h3>{title}</h3>
      <button onClick={() => setLiked(!liked)}>
        {liked ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
