import "./MyPaymentPage.css";

export const MyPaymentPage = () => {
  return (
    <div className="my-payment-page">
      <div className="payment-options">
        <h4>Payment Options</h4>
        <div className="payment-option-card">
          <label htmlFor="">
            <input type="radio" />
            <span>PNB Debit Card</span> <span>*********123</span>
          </label>
          <div>
            <input type="password" placeholder="cvv" maxlength="3" />
            <button>CONTINUE</button>
          </div>
        </div>
      </div>
    </div>
  );
};
