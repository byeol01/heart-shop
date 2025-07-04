import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location?.state || {
    image: "",
    name: "",
    price: "₩0",
  };

  // 로그인 상태 및 닉네임 상태
  const [nickname, setNickname] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 결제폼 상태
  const [orderCustomer, setOrderCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [quantity, setQuantity] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [agree14, setAgree14] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // 로그인 정보 불러오기 (localStorage에서 userInfo 가져오기)
  useEffect(() => {
    const userInfoStr = localStorage.getItem("userInfo");
    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr);
        if (userInfo && userInfo.nickname) {
          setNickname(userInfo.nickname);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("userInfo 파싱 오류:", error);
      }
    }
  }, []);

  // 가격 문자열에서 숫자만 추출 함수
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const match = priceStr.match(/\₩([\d,]+)/);
    if (!match) return 0;
    const num = match[1].replace(/,/g, "");
    return Number(num);
  };

  const basePriceForTwo = parsePrice(product.price);
  const pricePerPerson = basePriceForTwo / 2;
  const productPrice = pricePerPerson * quantity;

  // 로그인 시 10% 할인, 미로그인 시 할인 없음
  const discountRate = isLoggedIn ? 0.1 : 0;
  const discount = Math.floor(productPrice * discountRate);

  const couponDiscount = 0;
  const deliveryFee = 0;
  const totalPrice = productPrice - discount - couponDiscount + deliveryFee;

  // 수량 변경 핸들러 (2명 단위)
  const handleQuantityChange = (value) => {
    if (value < 2) {
      alert("최소 2명부터 주문 가능합니다.");
      return;
    }
    if (value % 2 !== 0) {
      alert("홀수 인원은 가게로 문의해주세요 😊");
      return;
    }
    setQuantity(value);
  };

  // 시간 선택 옵션 생성 함수
  function generateTimeOptions(start, end, stepMinutes) {
    const times = [];
    let [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    while (sh < eh || (sh === eh && sm <= em)) {
      const hh = sh.toString().padStart(2, "0");
      const mm = sm.toString().padStart(2, "0");
      times.push(`${hh}:${mm}`);

      sm += stepMinutes;
      if (sm >= 60) {
        sm -= 60;
        sh += 1;
      }
    }
    return times;
  }

  // 결제 요청 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree14 || !agreeTerms || !agreePrivacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    if (!orderCustomer.trim()) {
      alert("주문 고객명을 입력해주세요.");
      return;
    }
    if (!phone.trim()) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!date) {
      alert("날짜를 선택해주세요.");
      return;
    }
    if (!time) {
      alert("시간을 선택해주세요.");
      return;
    }

    alert(`결제 요청 완료!\n총 결제금액: ${totalPrice.toLocaleString()}원`);
    // 실제 결제 로직 추가 필요
  };

  const isMobile = window.innerWidth <= 767;

  return (
    <div className="payment-container wrap">
      <h1 className="payment-title">주문 및 결제</h1>

      {/* 로그인 상태 및 닉네임 표시 */}
      <div style={{ marginBottom: 20 }}>
        {isLoggedIn ? (
          <p style={{ color: "green" }}>
            안녕하세요, <strong>{nickname}</strong>님! 로그인 할인 10%가 적용됩니다.
          </p>
        ) : (
          <p style={{ color: "red" }}>
            로그인하시면 10% 할인이 적용됩니다.{" "}
            <button
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                color: "#007bff",
                textDecoration: "underline",
                padding: 0,
                fontSize: "1rem",
              }}
              onClick={() => navigate("/login")}
            >
              로그인 하기
            </button>
          </p>
        )}
      </div>

      <div className="payment-content">
        <div className="payment-left">
          <div className="product-summary">
            {product.image && (
              <img src={product.image} alt={product.name} className="product-image" />
            )}
            <div className="product-t">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-detail">
                <strong>인원수:</strong> {quantity}명
              </p>
              <p className="product-detail">
                <strong>날짜:</strong> {date ? date : "날짜를 선택해주세요"}
              </p>
              <p className="product-detail">
                <strong>시간:</strong> {time ? time : "시간을 선택해주세요"}
              </p>
              {isLoggedIn && (
                <p className="product-benefit" style={{ color: "green" }}>
                  지금 구매 시 10% 할인 중!
                </p>
              )}
              {!isLoggedIn && (
                <p className="product-benefit" style={{ color: "gray" }}>
                  로그인 시 10% 할인 적용
                </p>
              )}
              <p className="product-price">{product.price}</p>
            </div>
          </div>

          <form className="payment-form" onSubmit={handleSubmit}>
            <label>
              주문 고객 *
              <input
                type="text"
                value={orderCustomer}
                onChange={(e) => setOrderCustomer(e.target.value)}
                required
                placeholder="주문 고객을 입력해주세요."
              />
            </label>
            <label>
              휴대폰 번호 *
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="'-' 없이 숫자만 입력"
                pattern="[0-9]+"
              />
            </label>
            <label>
              이메일 *
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="이메일을 입력해주세요."
              />
            </label>
            <label>
              인원수 (2명 단위로 입력) *
              <input
                type="number"
                min={2}
                step={2}
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                required
              />
            </label>
            <label>
              날짜 선택 *
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <label>
              시간 선택 *
              <div className="time-buttons">
                {generateTimeOptions("10:00", "21:00", 60).map((t) => (
                  <button
                    type="button"
                    key={t}
                    className={`time-btn ${time === t ? "selected" : ""}`}
                    onClick={() => setTime(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </label>
            <fieldset>
              <legend>결제 방법 *</legend>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={() => setPaymentMethod("creditCard")}
                />
                신용카드
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="realTimeAccount"
                  checked={paymentMethod === "realTimeAccount"}
                  onChange={() => setPaymentMethod("realTimeAccount")}
                />
                실시간 계좌이체
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="bankTransfer"
                  checked={paymentMethod === "bankTransfer"}
                  onChange={() => setPaymentMethod("bankTransfer")}
                />
                무통장 결제
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="easyPay"
                  checked={paymentMethod === "easyPay"}
                  onChange={() => setPaymentMethod("easyPay")}
                />
                간편결제 (카카오, 네이버 등)
              </label>
            </fieldset>
          </form>
        </div>

        <div className="payment-summary">
          <h3 className="payment-h3">결제 정보</h3>
          <table className="summary-table">
            <tbody className="payment-td">
              <tr>
                <td>총 상품 금액</td>
                <td>{productPrice.toLocaleString()}원</td>
              </tr>
              <tr>
                <td>총 배송비</td>
                <td>{deliveryFee.toLocaleString()}원</td>
              </tr>
              <tr>
                <td>즉시 할인 금액</td>
                <td className="discount">-{discount.toLocaleString()}원</td>
              </tr>
              <tr>
                <td>쿠폰 할인 금액</td>
                <td>-{couponDiscount.toLocaleString()}원</td>
              </tr>
              <tr className="total">
                <td>총 결제 금액</td>
                <td>{totalPrice.toLocaleString()}원</td>
              </tr>
            </tbody>
          </table>

          <div className="agreement-section">
            <label>
              <input
                type="checkbox"
                checked={agree14}
                onChange={() => setAgree14(!agree14)}
                required
              />
              만 14세 이상입니다. (필수)
            </label>
            <label>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                required
              />
              주문 약관 동의 (필수)
            </label>
            <label>
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={() => setAgreePrivacy(!agreePrivacy)}
                required
              />
              개인정보 제3자 제공 안내 (필수)
            </label>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!agree14 || !agreeTerms || !agreePrivacy}
            className="submit-button"
            style={{ marginTop: "20px" }}
          >
            {totalPrice.toLocaleString()}원 결제하기
          </button>

          {isMobile && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="back-button"
              style={{
                marginTop: "10px",
                background: "none",
                border: "none",
                color: "#666",
                cursor: "pointer",
                fontSize: "0.9rem",
                textDecoration: "underline",
              }}
            >
              뒤로가기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
