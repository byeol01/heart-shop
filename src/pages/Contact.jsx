import "../css/Contact.css";

const Contact = () => (
  <div className="info-page wrap" style={{ padding: "40px" }}>
    <h1>문의하기</h1>
    <p>궁금한 점이나 요청 사항이 있으면 아래 연락처로 편하게 연락해 주세요.</p>

    <h2>연락처</h2>
    <ul>
      <li>이메일: <a href="mailto:heartshop.team@gmail.com">heartshop.team@gmail.com</a></li>
      <li>전화번호: 010-1234-5678</li>
    </ul>

    <h2>문의 폼</h2>
    <form>
      <label htmlFor="name">이름</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="email">이메일</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="message">문의 내용</label>
      <textarea id="message" name="message" rows="6" required></textarea>

      <button type="submit" className="custom-btn">전송</button>
    </form>
  </div>
);

export default Contact;
