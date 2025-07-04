const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('DB 연결 실패:', err);
    return;
  }
  console.log('✅ MySQL 연결 성공');
});

console.log('환경변수 DB_USER:', process.env.DB_USER);
console.log('환경변수 DB_PASSWORD:', process.env.DB_PASSWORD);

module.exports = connection;
