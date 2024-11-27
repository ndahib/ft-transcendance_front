import { backendGateway } from "../../../core/config.js";
import { Component } from "../../../core/component.js";
import { Http } from "../../../tools/http.js";
import  _ from "../../../tools/utils.js";
import { Alert } from "../alert_component.js";

/* *************************************************************************** #
#   * SignUp Component Class :                                                 #
# *************************************************************************** */
export class CompleteSignUp extends Component
{
    /* === template : ======================================================= */

    get template()
    {
        return /* html */ `
        <p class="title"> - Complete Sign Up - </p>
        <div class="container-form">
            <div class="input-container">
                <img src="/static/assets/imgs/email_icon.svg" alt="Username Icon">
                <input id="username_input" type="text" class="input-field"
                    placeholder="Username" required>
            </div>

            <div class="input-container">
                <img src="/static/assets/imgs/email_icon.svg" alt="Password Icon">
                <input id="password_input" type="password" class="input-field"
                    placeholder="password" required>
            </div>

            <div class="input-container">
                <img src="/static/assets/imgs/email_icon.svg" alt="Password Icon">
                <input id="password_input_confirm" type="password" class="input-field"
                    placeholder="confirm password" required>
            </div>
            <button id="submit_button" class="container-email" disabled>
            COMPLETE SIGN UP
            </button>
        </div>
        `
    };

    /* === styles : ========================================================= */
    get styles()
    {
        return /*css*/`
                :host {
                    width: 75%;
                    font-family: 'Exo2', sans-serif;
                    display: block;
                }

                .title {
                    color: white;
                    margin-bottom: 20px;
                    font-weight: bold;
                    font-size: 1.3em;
                    text-align: center;
                }

                .container-form {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: white;
                }

                .container-form button, .input-container {
                    width: 96%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem 0.5rem;
                    border-radius: 50px;
                    border: none;
                    font-family: inherit;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.1s;
                    margin-bottom: 10px;
                    box-shadow: 0 0 12px 0px rgb(159 159 159 / 54%);
                }

                button[disabled] {
                    background-color: #b0b0b0 !important;
                    cursor: not-allowed !important;
                    opacity: 0.6 !important;
                }

                button[disabled]:hover {
                    background-color: #b0b0b0 !important;
                }

                .input-container {
                    box-sizing: border-box;
                    background-color: rgba(255, 255, 255, 0.1);
                    border: 2px solid var(--color-border);
                    padding-left: 1.5rem;
                }

                .input-field {
                    background-color: transparent;
                    border: none;
                    outline: none;
                    color: white;
                    font-size: 1rem;
                    font-family: inherit;
                    width: 100%;
                    padding: 0 0.5rem;
                }

                .input-container img {
                    margin-left: 12px;
                }

                .container-form img {
                    width: 24px;
                    height: 24px;
                    margin-right: 0.5rem;
                }

                .container-email {
                    background-color: #007088;
                    color: var(--color-text);
                    text-align: center;
                }

                .container-email:hover {
                    background-color: var(--color-primary);
                }

                /* Media Queries for Responsiveness */
                @media (max-width: 768px) {
                    :host {
                        width: 90%;
                    }

                    .title {
                        font-size: 1.1em;
                    }

                    .container-form button, .input-container {
                        width: 70%;
                        padding: 0.8rem 0.4rem;
                    }

                    .input-field {
                        font-size: 0.9rem;
                    }
                }

                @media (max-width: 540px) {
                    * {
                        font-size: 1em !important;
                    }

                    .container-form button, .input-container {
                        width: 70%;
                        padding: 0.7rem 0.3rem;
                    }

                    .container-google, .intra, .container-email {
                        padding: 1rem 0.5rem;
                    }

                    .container-form img {
                        width: 16px;
                        height: 16px;
                        margin-right: 0.3rem;
                    }
                }

                @media (max-width: 380px) {
                    * {
                        font-size: 0.9em !important;
                    }

                    .container-form button, .input-container {
                        width: 100%;
                    }
                }
        `;
    }


    /* === onConnected : ==================================================== */
    onConnected()
    {
        this.alert = new Alert();

        const usernameInput = this.shadowRoot.getElementById('username_input');
        const PasswordInput = this.shadowRoot.getElementById('password_input');
        const PasswordInputConfirm = this.shadowRoot.getElementById('password_input_confirm');
        const submitButton = this.shadowRoot.getElementById('submit_button');

        this.addEventListener(usernameInput,'input', updateButtonState.bind(this));
        this.addEventListener(PasswordInput,'input', updateButtonState.bind(this));
        this.addEventListener(PasswordInputConfirm,'input', updateButtonState.bind(this));
        this.addEventListener(submitButton,'click', completCallBack.bind(this));
    }
}

/* *********************************************************************** #
#   * Event callbacks :                                                    #
# *********************************************************************** */

/* === updateButtonState : =============================================== */
function updateButtonState(event)
{
    event.preventDefault();
    const usernamaeInput = this.shadowRoot.getElementById('username_input');
    const passwordInput = this.shadowRoot.getElementById('password_input');
    const submitButton = this.shadowRoot.getElementById('submit_button');
    const passwordInputConfirm = this.shadowRoot.getElementById('password_input_confirm');

    submitButton.disabled = usernamaeInput.value.length < 3 
                            || !_.validatePassword(passwordInput.value)
                            || passwordInput.value !== passwordInputConfirm.value;
}


/* === CompleteCallback : ================================================== */
async function completCallBack(event)
{
    event.preventDefault();

    const username = this.shadowRoot.getElementById('username_input').value;
    const passwordInput = this.shadowRoot.getElementById('password_input');
    const password = passwordInput.value;

    const url = backendGateway.completeSignUpUrl;
    const headers = { 'Content-Type': 'application/json' };
    const data = JSON.stringify({ username, password });

    const response = await Http.post(url, headers, data);

    this.alert.setMessage(!response.ok ? response["error"][0] : "Successfully signed up");
    this.alert.modalInstance.show();
}