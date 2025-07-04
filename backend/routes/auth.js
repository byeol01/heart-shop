// routes/auth.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // DB 연결 불러오기

// 회원가입 라우터
router.post('/signup', (req, res) => {
  const { nickname, userId, password, email, phone } = req.body;

  // 모든 필드가 있는지 확인
  if (!nickname || !userId || !password || !email || !phone) {
    return res.status(400).json({ message: '모든 항목을 입력해주세요.' });
  }

  // SQL 삽입
  const sql = `
    INSERT INTO users (nickname, userId, password, email, phone)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [nickname, userId, password, email, phone];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('회원가입 오류:', err);
      return res.status(500).json({ message: '서버 오류로 인해 실패했습니다.' });
    }

    return res.status(201).json({ message: '회원가입이 완료되었습니다!' });
  });
});

module.exports = router;
