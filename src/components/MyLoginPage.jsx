import { MyFooter } from "./MyFooter";
import { MyNavbar } from "./MyNavbar";

export const MyLoginPage = () => {
  return (
    <div>
      <MyNavbar />
      <div className="my-login-page-body">
        <div class="login-page">
          <p class="login-title">LOGIN</p>
          <input
            type="email"
            class="login-email-input login-inputs"
            placeholder="Enter your email here"
          />
          <input
            type="password"
            class="login-password login-inputs"
            placeholder="Enter your password here"
          />
          <button class="login-buttons">Login With Something</button>
          <button class="login-buttons">LOGIN</button>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
