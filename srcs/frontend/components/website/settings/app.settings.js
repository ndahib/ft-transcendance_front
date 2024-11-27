import { Component } from "../../../core/component.js";
import { backendGateway } from "../../../core/config.js";
import { Http } from "../../../tools/http.js";
import  _ from "../../../tools/utils.js";
import { Alert } from "../../authentication/alert_component.js";

/* *************************************************************************** #
#   * Settings Component Class :                                               #
# *************************************************************************** */
export class Settings extends Component
{
    /* === template : ======================================================= */
    get template()
    {
        return /* html */ `
        <div class="settings-container">
        <div class="header-banner position-relative d-flex justify-content-center align-items-end">
            <img src="/static/assets/imgs/user_avatar.png" alt="User Avatar" class="profile-avatar img-fluid">
        </div>

        <nav class="mynav d-flex justify-content-center">
            ${this.navItems.map(navItem => /* html */ `
                <div class="nav-item ${navItem.active ? 'active' : ''}" data-nav="${navItem.name}" data-target="${navItem.name}-settings">
                    ${navItem.name}
                </div>
            `).join('')}
        </nav>

        <!---Main Content--->
        <section class="profile-settings" id="profile-settings">
            <form class="general-info-form">
                <div class="row mb-3 gy-3">
                    <div class="col-md-6">
                        <div class="input-container">
                            <img src="/static/assets/imgs/email_icon.svg" alt="first name Icon">
                            <input id="first_name_input" type="text" class="input-field"
                                placeholder="First Name">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-container">
                            <img src="/static/assets/imgs/email_icon.svg" alt="last name Icon">
                            <input id="last_name_input" type="text" class="input-field"
                                placeholder="Last Name">
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="input-container">
                            <img src="/static/assets/imgs/email_icon.svg" alt="last name Icon">
                            <input id="username_input" type="text" class="input-field"
                                placeholder="Last Name">
                        </div>
                    </div>
                </div>

                <button id="saveButton" type="submit" class="save-changes-btn">Save Changes</button>
            </form>
        </section>
        <security-settings id="security-settings" class="d-flex justify-content-center"></security-settings>
    </div>
    `
    };

    /* === navItems : ======================================================= */
    get navItems() {
        return [
            {
                name: 'profile',
                iconSrc: '/static/assets/imgs/user_avatar.png',
                iconAlt: "User avatar",
                active: true
            },
            {
                name: 'security',
                iconSrc: '/static/assets/imgs/email_icon.svg',
                iconAlt: "security icon",
                active: false
            },
            {
                name: 'game',
                iconSrc: '/static/assets/imgs/game_icon.svg',
                iconAlt: "game settings icon",
                active: false
            },
        ];
    }
    /* === style : ======================================================= */
    get styles() {
        return /* css */ `
            @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css");
            @import url("/static/assets/styles/common-style.css");

            :host {
                font-family: 'Exo2', sans-serif;
                color: var(--color-text);
                width: 100%;
            }

            .settings-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2.5rem;
            }

            .header-banner {
                width: 100%;
                height: 230px;
                position: relative;
                border-radius: 30px;
                background: url("/static/assets/imgs/banner.jpg") lightgray 50% / cover no-repeat;
                margin-bottom: 4.5rem;
            }

            .profile-avatar {
                position: absolute;
                transform: translateX(-50%);
                bottom: -60px;
                left: 50%;
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: lightgray 50% / cover no-repeat;
            }

            .mynav {
                background: #007189;
                padding: 10px;
                width: min(500px, 100%);
                border-radius: 54px;
                color: white;
            }

            .nav-item{
                height: 100%;
                width: 100%;
                cursor: pointer;
                text-align: center;
                padding: 10px 10px;
                font-size: large;
                font-weight: 500;
                transition: all .3s;
            }

            .nav-item:first-child{
                border-radius: 54px 0 0 54px;
            }

            .nav-item:last-child{
                border-radius: 0 54px 54px 0;
            }

            .nav-item:not(:last-child){
                border-right: 1px solid #ffffff3b;
            }

            .nav-item:hover{
                font-weight: 600;
            }

            .profile-settings {
                width: min(500px, 100%);
            }

            .save-changes-btn, .input-container {
                width: 100%;
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

            .input-container {
                box-sizing: border-box;
                background-color: rgba(255, 255, 255, 0.1);
                border: 2px solid var(--color-border);
                padding-left: 1.5rem;
            }

            .input-container img {
                width: 18px;
                height: 18px;
                margin-right: 0.5rem;
                margin-left: 12px;
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
            .save-changes-btn {
                background-color: #007088;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 1em;
                font-weight: bold;
                transition: background-color 0.3s;
                margin-top: 1.5rem;
                width: 50%;
                margin-left: auto;
            }


            .save-changes-btn:hover {
                background-color: #005f74;
            }

            .active {
                box-shadow: inset 0 0 9px 5px #005061;
            }
        `;
    };

    onConnected() {
        this.alert = new Alert();
        this.nav_items = this.shadowRoot.querySelectorAll('.nav-item');
        const saveChangesBtn = this.shadowRoot.getElementById('saveButton');

        this.nav_items.forEach(navItem => {
            this.addEventListener(navItem, 'click', handleNavClick.bind(this));
        });
        if (this.nav_items.length > 0) {
            this.nav_items[0].click();
        }

        this.addEventListener(saveChangesBtn, 'click', saveChanges.bind(this));
    }
}


/* === HandleNavClick ================================================ */
function handleNavClick(event) {
    const clickedNavItem = event.currentTarget;
    const targetContentId = clickedNavItem.getAttribute('data-target');
    
    this.nav_items.forEach(item => {
        item.classList.remove('active');
    });
    clickedNavItem.classList.add('active');

    const contentItems = this.shadowRoot.querySelectorAll('[id$="-settings"]');
    contentItems.forEach(content => {
        if (content.id === targetContentId) {
            content.classList.remove('d-none');
        } else {
            content.classList.add('d-none');
        }
    });
}


/* === SaveChanges ================================================ */
async function saveChanges(event) {
    event.preventDefault();
    const firstNameInput = this.shadowRoot.getElementById('first_name_input').value;
    const lastNameInput = this.shadowRoot.getElementById('last_name_input').value;
    const usernameInput = this.shadowRoot.getElementById('username_input').value;

    if (!firstNameInput && !lastNameInput && !usernameInput) {
        this.alert.setMessage("Nothing to save");
        this.alert.modalInstance.show();
        return;
    }
    const url = backendGateway.updateProfileUrl;
    const headers = { 'Content-Type': 'application/json' };
    const data = JSON.stringify({ first_name: firstNameInput, last_name: lastNameInput, username: usernameInput});

    try{
        const response = await Http.patch(url, headers, data); // to change with PostwithAuth
        this.alert.setMessage("Changes saved");  // to handle error later 
        this.alert.modalInstance.show();

    } catch (error) {
        console.error(error);
    }

    console.log('Save changes');
}