
import { Component } from "../../core/component.js";

/* *************************************************************************** #
#   * AuthApp Component Class :                                                #
# *************************************************************************** */
export class BaseApp extends Component
{

    /* === template : ======================================================= */
    get template()
    {
        return /* html */ `
            <header class="top-bar">
                <img
                    src="/static/assets/imgs/logo.svg"
                    class="logo"
                    alt="Logo">
                <div class="search-container">
                    <input
                        type="text"
                        class="search-input"
                        placeholder="Search...">
                    <button class="search-button">
                        <img
                            src="/static/assets/imgs/search_icon.svg"
                            alt="Search">
                    </button>
                </div>
                <div class="notification-container">
                    <img
                        src="/static/assets/imgs/user_avatar.png"
                        class="user-avatar"
                        alt="User Avatar">
                    <span class="user-name">Hael-mou</span>
                    <button class="notification-button">
                        <img
                            src="/static/assets/imgs/notification_icon.svg"
                            alt="Notifications">
                        <span class="notification-badge">3</span>
                    </button>
                </div>
            </header>

            <div class="container-main">
                <nav class="container-nav">
                    ${this.navItems.map(navItem => /* html */ `
                        <div
                            class="nav-item"
                            data-nav="${navItem.name}">
                            <div class="nav-background"></div>
                            <img
                                class="nav-icon ${navItem.iconClass}"
                                src="${navItem.iconSrc}"
                                alt="${navItem.name}"/>
                        </div>
                    `).join('')}
                </nav>
                <main class="content-area">
                    <slot></slot>
                </main>
            </div>
        `;
    }

    /* === navItems : ======================================================= */
    get navItems() {
        return [
            {
                name: 'home',
                iconClass: 'home-icon',
                iconSrc: '/static/assets/imgs/home_icon.svg'
            },
            {
                name: 'tour',
                iconClass: 'tour-icon',
                iconSrc: '/static/assets/imgs/tournements.svg'
            },
            {
                name: 'chat',
                iconClass: 'chat-icon',
                iconSrc: '/static/assets/imgs/chat_icon.svg'
            },
            {
                name: 'game',
                iconClass: 'game-icon',
                iconSrc: '/static/assets/imgs/game_icon.svg'
            },
            {
                name: 'setting',
                iconClass: 'setting-icon',
                iconSrc: '/static/assets/imgs/Setting_icon.svg'
            }
        ];
    }


    /* === styles : ========================================================= */
    get styles()
    {
            return /*css*/`

            :host {
                min-height: 100vh;
                min-height: 100dvh;
                display: flex;
                justify-content: center;
                flex-direction: column;
                --bg-color: #1a1a1a;
                --text-color: #ffffff;
                --gradient-start: rgba(56, 56, 56, 0.5);
                --gradient-end: rgba(44, 44, 44, 0.5);
                overflow: hidden;
                min-width: min(96%, 1920px);
                gap: 1.5rem;
                font-family: 'Exo2', sans-serif;
                padding: 4rem 0 !important;
            }

            .top-bar {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 15px 20px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 30px;
                background: linear-gradient(to right, var(--gradient-start) 3%,
                            var(--gradient-end) 100%);
                /*max-width: 100%;*/
                box-sizing: border-box;
            }

            .logo {
                width: 140px;
                height: auto;
            }

            .search-container {
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 5px 10px;
            }

            .search-input {
                padding: 8px 12px;
                border: none;
                background: none;
                color: var(--text-color);
                width: 150px;
            }

            .search-input::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }

            .search-button {
                background: none;
                border: none;
                cursor: pointer;
            }

            .search-button img {
                width: 20px;
                height: 20px;
                filter: invert(1);
            }

            .notification-container {
                box-sizing: border-box;
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 5px 10px;
            }

            .user-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 10px;
            }

            .user-name {
                margin-right: 15px;
                font-size: 14px;
                font-weight: bold;
                color: #fff;
            }

            .notification-button {
                background: none;
                border: none;
                cursor: pointer;
                position: relative;
            }

            .notification-button img {
                width: 24px;
                height: 24px;
                filter: invert(1);
            }

            .notification-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background-color: var(--color-primary, #ff4081);
                color: white;
                border-radius: 50%;
                padding: 2px 6px;
                font-size: 12px;
            }

            .container-main {
                /*flex: 1;
                display: flex;
                height: 0;
                flex-grow: 1;
                max-width: 100%;*/

                display: flex;
                flex: 1;
                overflow: hidden;
                box-sizing: border-box;
                border-radius: 30px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: linear-gradient(to right, var(--gradient-start) 3%,
                                var(--gradient-end) 100%);
            }

            .container-nav {
                width: 93px;
                border-right: 1px solid rgba(255, 255, 255, 0.2);
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .nav-item {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 93px;
                cursor: pointer;
            }

            .nav-background {
                position: absolute;
                left: 0;
                top: 14%;
                width: 0;
                height: 79%;
                background-color: rgba(33, 148, 148, 0.1);
                border-radius: 0 30px;
                transition: width 0.3s ease;
            }

            .nav-item:hover .nav-background,
            .nav-item.selected .nav-background {
                width: 100%;
            }

            .nav-icon {
                width: 32px;
                transition: transform 0.3s ease, filter 0.3s ease;
                z-index: 1;
            }

            .nav-item:hover .nav-icon {
                transform: scale(1.1);
                filter: brightness(1.2);
            }

            .nav-item.selected::before {
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                height: 24px;
                border-radius: 0 2px 2px 0;
                background-color: var(--color-primary, #ff4081);
            }

            .nav-item:first-child {
                margin-top: 40px;
            }

            .nav-item:last-child {
                margin-top: auto;
                margin-bottom: 10px;
            }

            .nav-item.selected .nav-background {
                animation: flash 0.5s ease-out;
            }

            .content-area {
                flex-grow: 1;
                padding: 20px;
                overflow-y: auto;
            }

            @keyframes flash {
                0% { background-color: rgba(33, 148, 148, 0.1); }
                50% { background-color: rgba(33, 148, 148, 0.3); }
                100% { background-color: rgba(33, 148, 148, 0.1); }
            }


            @media (max-width: 1300px) {
                .user-name {
                    display: none;
                }
            }

            @media (max-width: 900px) {
                .top-bar {
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 10px;
                    border-radius: 5px;
                }

                .logo {
                    order: 1;
                    width: 100px;
                    margin-bottom: 10px;
                }

                .search-container {
                    order: 3;
                    width: 100%;
                    margin-top: 10px;
                }

                .search-input {
                    width: calc(100% - 40px);
                }

                .notification-container {
                    order: 2;
                    margin-left: auto;
                }


                .container-main {
                    flex-direction: column-reverse;
                    border-radius: 5px;
                }
                .container-nav {
                    width: 100%;
                    height: auto;
                    flex-direction: row;
                    justify-content: space-around;
                    border-right: none;
                    padding: 15px 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                }

                .nav-item {
                    width: 8%;
                    height: 40px;
                }

                .nav-item:first-child {
                    margin-top: 0;
                }

                .nav-item:last-child {
                    margin-top: 0;
                    margin-bottom: 0;
                }

                .nav-item.selected::before {
                    left: 50%;
                    top: 125%;
                    /*top: auto;*/
                    transform: translateX(-50%);
                    width: 24px;
                    height: 4px;
                    border-radius: 2px 2px 0  0;
                }

                .nav-background {
                    left: 10%;
                    top: 10%;
                    width: 80%;
                    height: 0;
                    transition: height 0.3s ease;
                }

                .nav-item:hover .nav-background,
                .nav-item.selected .nav-background {
                    width: 84%;
                    height: 90%;
                }
            }
        `
    }

}
