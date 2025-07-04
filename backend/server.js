// server.js
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const port = 4000;

app.use(cors({
  origin: "http://localhost:5173",  // 반드시 클라이언트 주소를 정확하게!
  credentials: true                 // 인증 정보 허용
}));

app.use(express.json());

// MySQL 커넥션 풀 생성
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Dlhb0410**!", // 본인 비밀번호로 변경하세요
  database: "heart_shop",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 회원가입 API
app.post("/api/signup", async (req, res) => {
  const { userId, password, nickname, email, phone } = req.body;
  if (!userId || !password || !nickname || !email || !phone) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  const connection = await pool.getConnection();

  try {
    // 중복 아이디 검사
    const [existing] = await connection.query("SELECT userId FROM users WHERE userId = ?", [userId]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "이미 존재하는 아이디입니다." });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 정보 삽입
    await connection.query(
      "INSERT INTO users (userId, password, nickname, email, phone) VALUES (?, ?, ?, ?, ?)",
      [userId, hashedPassword, nickname, email, phone]
    );

    res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("❌ 회원가입 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  } finally {
    connection.release();
  }
});

// 로그인 API
app.post("/api/login", async (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ message: "아이디와 비밀번호를 입력하세요." });
  }

  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE userId = ?", [userId]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "존재하지 않는 사용자입니다." });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
    }

    res.status(200).json({ message: "로그인 성공", nickname: user.nickname });
  } catch (error) {
    console.error("❌ 로그인 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  } finally {
    connection.release();
  }
});

// 테스트용 기본 라우터
app.get("/", (req, res) => {
  res.send("✅ 서버 정상 작동 중!");
});

app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
