import { Component } from "../../core/component.js";
import { backendGateway } from "../../core/config.js";
import { Http } from "../../tools/http.js";
import { TournamentCard } from "./tournament_card.js";

/* *************************************************************************** #
#   * NewTournament page Class :                                               #
# *************************************************************************** */

export class NewTournament extends Component {
  /* === Constructor: ===================================================== */
  constructor() {
    super();
    this.tournaments = [];
  }

  /* === Init: ============================================================ */
  async init() {
    const tournamentUrl = backendGateway.getTournamentsUrl;
    const response = await Http.get(tournamentUrl);
    this.tournaments = response;
  }

  /* === Render: ========================================================== */
  render() {
    super.render();
    const tournamentsList = this.shadowRoot.getElementById("tournament-list");
    this.tournaments.forEach((tournament) => {
      const div = document.createElement("div");
      div.classList.add("swiper-slide");
      const tournamentCard = new TournamentCard(tournament);
      div.appendChild(tournamentCard);
      tournamentsList.appendChild(div);
    });
  }

  /* === Template : ======================================================= */
  get template() {
    return /* html */ `
      <h2 class="tournament-header">Tournaments</h2>
      <h4 class="tournament-subheader">Join or Create Your Tournament</h4>
      
      <div class="swiper mySwiper tournament-swiper">
        <div id="tournament-list" class="swiper-wrapper"></div>
        <div id="nextBtn" class="swiper-button-next"></div>
        <div id="prevBtn" class="swiper-button-prev"></div>
      </div>
        <div id="create-form" class="create-tournament-form">
          <input type="text" id="tournament-name" placeholder="Tournament Name" required />
          <button type="submit" id="submit-btn" class="submit-btn">Create</button>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
    `;
  }

  /* === Styles : ======================================================== */
  get styles() {
    return /* css */ `
        @import url("https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css");
        @import url("/static/assets/styles/common-style.css");

        *{
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
        }
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100%;
            padding: 20px;
            background-color: #282828;
            color: #fff;
            box-sizing: border-box;
        }

        .tournament-header {
            font-size: 2.5rem;
            font-family: fantasy, sans-serif;
            margin-bottom: 10px;
        }

        .tournament-subheader {
            font-size: 1.25rem;
            color: #bbb;
            margin-bottom: 30px;
            font-family: fantasy, sans-serif;
        }

        .swiper {
            width: 100%;
            max-width: 1200px;
            padding: 20px 0;
            position: relative;
        }

        .swiper-slide {
            width: min(600px, 100%);
            height: 400px;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
            background-color: #444;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease-in-out;
            cursor: pointer;
        }

        .create-tournament-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
            background-color: #333;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            width: 100%;
        }

        .create-tournament-form input {
            width: 95%;
            padding: 12px;
            margin: 10px 0;
            border-radius: 8px;
            border: none;
            font-size: 1rem;
        }

        .submit-btn {
            background-color: #d8571c;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s ease;
        }
        }
        `;
  }

  /* === Init Swiper: ===================================================== */
  initSwiper() {
        const swiperEl = this.shadowRoot.querySelector('.swiper');
        return new Swiper(swiperEl, {
            spaceBetween: 10,
            slidesPerView: 'auto',
            centeredSlides: true,
            effect: 'coverflow',
            grabCursor: true,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            centeredSlides: true,
            initialSlide: this.tournaments.length > 1 ? 1 : 0,
        });
    }

    /* === onConnect : ===================================================== */
    onConnected() {
        this.swiper = this.initSwiper();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const nextButton = this.shadowRoot.getElementById('nextBtn');
        const prevButton = this.shadowRoot.getElementById('prevBtn');
        const createForm = this.shadowRoot.getElementById('create-form');
        const submitButton = this.shadowRoot.getElementById('submit-btn');
        const tournamentsList = this.shadowRoot.getElementById("tournament-list");

        this.addEventListener(nextButton, 'click', () => {
            this.swiper.slideNext();
        });
        this.addEventListener(prevButton, 'click', () => {
            this.swiper.slidePrev();
        });

        this.addEventListener(submitButton, 'click', async (event) => {
            event.preventDefault();
            const name = this.shadowRoot.getElementById('tournament-name').value;
            if (name) {
                await addTournament.bind(this)(name);
            }
        });
    }
}


/* ========== Helper Function: ============================================================*/
async function addTournament(tournamentName) {
    const url = backendGateway.addTournamentUrl;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ name: tournamentName });

    const response = await Http.post(url, headers, body);
}