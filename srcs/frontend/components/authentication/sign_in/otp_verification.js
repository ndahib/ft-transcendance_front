import { backendGateway } from "../../../core/config.js";
import { Component } from "../../../core/component.js";
import { Http } from "../../../tools/http.js";
import  _ from "../../../tools/utils.js";
import { Alert } from "../alert_component.js";

/* *************************************************************************** #
#   * OtpVerification Class :                                                  #
# *************************************************************************** */

export class OtpVerification extends Component
{
    /* === template : ======================================================= */
    get template()
    {
        return /* html */ `
        <div class="container">
            <h1>Enter Verification Code</h1>
            <p>We've sent a verification code to your email</p>
            <div class="otp-container">
                <input type="text" maxlength="1" class="otp-input" autofocus>
                <input type="text" maxlength="1" class="otp-input">
                <input type="text" maxlength="1" class="otp-input">
                <input type="text" maxlength="1" class="otp-input">
                <input type="text" maxlength="1" class="otp-input">
                <input type="text" maxlength="1" class="otp-input">
            </div>
            <button id="verify-btn" class="verify-btn" disabled>Verify Code</button>
            <div class="resend">Resend Code</div>
        </div>
    `;}

    /* === Styles : ========================================================= */
    get styles()
    {
        return /*css*/`
            :host 
            {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            }
            .container {
                width: 100%;
                max-width: 400px;
                padding: 2rem;
                text-align: center;
                z-index: 1;
            }
            .logo {
                margin-bottom: 2rem;
            }
    
            .logo img {
                width: 120px;
                height: auto;
            }
    
            h1 {
                color: white;
                font-size: 1.5rem;
                margin-bottom: 1rem;
                font-weight: 600;
            }
    
            p {
                color: #a0aec0;
                margin-bottom: 2rem;
                font-size: 0.95rem;
            }
            .otp-container {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
                margin-bottom: 2rem;
            }
            .otp-input {
                width: 50px;
                height: 50px;
                border: 2px solid #2d3748;
                border-radius: 12px;
                background: transparent;
                color: white;
                font-size: 1.25rem;
                text-align: center;
                transition: all 0.3s ease;
            }
            .otp-input:focus {
                border-color: #4fd1c5;
                outline: none;
                box-shadow: 0 0 0 2px rgba(79, 209, 197, 0.2);
            }
            .verify-btn {
                width: 100%;
                padding: 1rem;
                border: none;
                border-radius: 25px;
                background: #4fd1c5;
                color: white;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            .verify-btn:hover {
                background: #38b2ac;
            }
    
            .verify-btn:disabled {
                background: #2d3748;
                cursor: not-allowed;
            }
    
            .resend {
                margin-top: 1rem;
                color: #4fd1c5;
                text-decoration: none;
                font-size: 0.9rem;
                cursor: pointer;
            }
    
            .resend:hover {
                text-decoration: underline;
            }
        `;
    }

    /* === Onconnected : ==================================================== */
    onConnected() {
        this.otpInputs = this.shadowRoot.querySelectorAll('.otp-input');
        this.verifyButton = this.shadowRoot.getElementById("verify-btn");

        this.otpInputs.forEach((input, index) => {
            input.addEventListener('input', (event) => 
            updateButtonState.bind(this)(event, input, index));
        });
    }
}
    /* === updateButtonState : ======================================================= */
    function updateButtonState(event, input, index) {
        const value = event.target.value;

        if (!/^\d*$/.test(value)) {
            input.value = '';
            return;
        }
        if (value && index < this.otpInputs.length - 1) {
            this.otpInputs[index + 1].focus();
        }

        const isComplete = Array.from(this.otpInputs).every(input => input.value);
        this.verifyButton.disabled = !isComplete;
    }
