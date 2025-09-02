import{i as l,a as v}from"./assets/vendor-CBES6XuS.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();function w(e){l.show({title:"❌",message:`Sorry, there are no ${e}.`,color:"red",position:"topRight",messageColor:"white",titleColor:"white",timeout:5e3})}function M(e){e.message&&l.show({title:"Error",color:"red",position:"topRight",messageColor:"white",titleColor:"white",message:e.message,timeout:5e3})}v.defaults.baseURL="https://sound-wave.b.goit.study/api/";let b;async function B(e){try{b=`artists/${e}`;const n=(await v.get(b,{})).data;return n||w("artist")}catch(r){M(r)}}const m=document.getElementById("artist-modal-backdrop");document.getElementById("artist-modal");const I=document.getElementById("artist-close-btn"),L=document.getElementById("artist-loader"),f=document.getElementById("artist-content");let c=null,d=null;async function T(e){if(!e)return console.error("Artist ID is missing!");if(m.classList.contains("hidden")){m.classList.remove("hidden"),L.classList.remove("hidden"),f.classList.add("hidden"),document.body.style.overflow="hidden";try{const r=await B(e);if(!r){w("artist"),p();return}const n=r.tracksList||[],o={};n.forEach(s=>{const i=s.strAlbum||"Unknown Album";o[i]||(o[i]=[]),o[i].push(s)});const t=Object.entries(o).map(([s,i])=>({strAlbum:s,tracks:i}));q(r,t)}catch(r){console.error(r),f.innerHTML="<p>Error loading artist.</p>",M(r)}finally{L.classList.add("hidden"),f.classList.remove("hidden")}O()}}function p(){m.classList.add("hidden"),document.body.style.overflow="",P()}function O(){c||(c=e=>{e.key==="Escape"&&p()},document.addEventListener("keydown",c)),d||(d=e=>{e.target===m&&p()},m.addEventListener("click",d))}function P(){c&&(document.removeEventListener("keydown",c),c=null),d&&(m.removeEventListener("click",d),d=null)}function q(e,r){const n=e.intFormedYear?e.intDiedYear&&e.intDiedYear!=="null"?`${e.intFormedYear} - ${e.intDiedYear}`:`${e.intFormedYear} - present`:"information missing";f.innerHTML=`
  <h2 class="artist-title">${e.strArtist}</h2>

  <div class="artist-header">
    <img src="${e.strArtistThumb||""}" alt="${e.strArtist}">
    <div class="artist-header-content">
      <div class="artist-info-grid-two-columns">
        ${n?`<div class="info-item"><b>Years active:</b> <p>${n}</p></div>`:""}
        ${e.strGender?`<div class="info-item"><b>Sex:</b> <p>${e.strGender}</p></div>`:""}
        ${e.intMembers?`<div class="info-item"><b>Members:</b> <p>${e.intMembers}</p></div>`:""}
        ${e.strCountry?`<div class="info-item"><b>Country:</b> <p>${e.strCountry}</p></div>`:""}
      </div>

      ${e.genres&&e.genres.length?`
        <div class="genres-container">
          <div class="genres-list">
            ${e.genres.map(t=>`<span class="genre-tag">${t}</span>`).join("")}
          </div>
        </div>
      `:""}

      ${e.strBiographyEN?`
        <div class="biography-text">
          <b>Biography</b> 
          <p>${e.strBiographyEN}</p>
        </div>
      `:""}
    </div>
  </div>

  <div class="albums">
    <h3>Albums</h3>
    ${r.length?`
      <div class="albums-grid">
        ${r.map(t=>`
          <div class="album">
            <div class="album-title">${t.strAlbum||"—"}</div>
            ${t.tracks&&t.tracks.length?`
              <div class="tracks">
                <div class="track track-header" style="font-size: 8px !important">
                  <span>Track</span>
                  <span>Time</span>
                  <span>Link</span>
                </div>
                ${t.tracks.map(s=>`
                  <div class="track">
                    <span>${s.strTrack||"—"}</span>
                    <span>${o(s.intDuration)}</span>
                    <span>
                      ${s.movie?`
                        <a href="${s.movie}" target="_blank" class="yt-link">
                          <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.5933 2.4159C20.4794 1.9933 20.2568 1.6079 19.9477 1.29807C19.6386 0.988229 19.2537 0.764759 18.8313 0.649898C17.2653 0.219898 11.0003 0.212898 11.0003 0.212898C11.0003 0.212898 4.73633 0.205898 3.16933 0.616898C2.74725 0.737045 2.36315 0.963675 2.0539 1.27503C1.74464 1.58639 1.52062 1.97202 1.40333 2.3949C0.99033 3.9609 0.98633 7.2089 0.98633 7.2089C0.98633 7.2089 0.98233 10.4729 1.39233 12.0229C1.62233 12.8799 2.29733 13.5569 3.15533 13.7879C4.73733 14.2179 10.9853 14.2249 10.9853 14.2249C10.9853 14.2249 17.2503 14.2319 18.8163 13.8219C19.2388 13.7072 19.6241 13.4843 19.934 13.1751C20.2439 12.8659 20.4677 12.4811 20.5833 12.0589C20.9973 10.4939 21.0003 7.2469 21.0003 7.2469C21.0003 7.2469 21.0203 3.9819 20.5933 2.4159ZM8.99633 10.2179L9.00133 4.2179L14.2083 7.2229L8.99633 10.2179Z" fill="white"/>
                          </svg>
                        </a>
                      `:"-"}
                    </span>
                  </div>
                `).join("")}
              </div>
            `:'<p class="no-tracks">No tracks available</p>'}
          </div>
        `).join("")}
      </div>
    `:'<p class="no-albums">No albums available.</p>'}
  </div>
`;function o(t){if(!t)return"-";const s=Math.floor(t/1e3),i=Math.floor(s/60),y=s%60;return`${i}:${y.toString().padStart(2,"0")}`}I.addEventListener("click",p)}const a={cardItem:document.querySelector(".js-artist-card"),loader:document.querySelector(".js-artist-loader"),btnLoadMore:document.querySelector(".js-artist-loadmore-btn")};async function $(e){return(await v.get("https://sound-wave.b.goit.study/api/artists",{params:{page:e,limit:8}})).data}function x(e,r){return e?e.length>r?e.slice(0,r)+"...":e:""}function C(e){return e.map(n=>{const o=n.genres?n.genres.map(i=>`<li class="item-info-genre">${i}</li>`).join(""):"";let t;window.innerWidth<320||window.innerWidth<768?t=64:window.innerWidth<1440?t=160:t=139;const s=x(n.strBiographyEN,t);return`<li class="artist-card-item">
                <img class="artist-card-img" src="${n.strArtistThumb}" alt="${n.strArtist}" >
                <ul class="artist-item-info">
                    ${o}
                </ul>
                <div class="artist-info-container">
                    <h4 class="card-item-title">${n.strArtist}</h4>
                    <p class="card-item-info">
                         ${s}
                    </p>
                </div>
                <div class="btn-learn-more-cont">
                    <button type="button" class="artist-learn-btn" data-artist-id="${n._id}">Learn More </button>
                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 14.5492L8 7.54919L0 0.549194V14.5492Z" fill="white" />
                    </svg>
                </div>
            </li>`}).join("")}function D(e){if(!a.cardItem){console.error("Container .js-artist-card not found");return}a.cardItem.innerHTML=e}function A(){a.loader&&a.loader.classList.add("is-active-loader")}function k(){a.loader&&a.loader.classList.remove("is-active-loader")}function E(){a.btnLoadMore.disabled=!1,a.btnLoadMore.classList.add("artist-load-more-btn-is-active")}function h(){a.btnLoadMore.disabled=!0,a.btnLoadMore.classList.remove("artist-load-more-btn-is-active")}async function N(e){const r=e.target.closest(".artist-learn-btn");if(!r)return;const n=r.dataset.artistId,o=r.closest(".artist-card-item").querySelector(".card-item-title").textContent;if(!n){l.error({message:"Artist ID not found"});return}console.log("Opening modal for artist:",o,"ID:",n);try{const t=r.textContent;r.disabled=!0,r.textContent="Loading...",await T(n)}catch(t){console.error("Error opening modal:",t),l.error({message:"Failed to open artist details. Please try again."})}finally{r.disabled=!1,r.textContent="Learn More"}}let u,g=0;const j=8;document.addEventListener("DOMContentLoaded",async()=>{u=1,A();try{const e=await $(u),r=e.artists,n=C(r);D(n),a.cardItem.addEventListener("click",N),g=Math.ceil(e.totalArtists/j),u<g?E():(h(),l.error({message:"We're sorry, but you've reached the end of search results."}))}catch(e){console.error("Error loading artists:",e),g=0,l.error({message:"Sorry. Please try again!"})}finally{k()}});a.btnLoadMore.addEventListener("click",async()=>{u+=1,h(),A();try{const e=await $(u);if(!e.artists.length){l.info({message:"Sorry. Please try again!"});return}const r=e.artists,n=C(r);a.cardItem.insertAdjacentHTML("beforeend",n);const o=a.cardItem.querySelectorAll(".artist-card-item");o.length>0&&o[o.length-r.length].scrollIntoView({behavior:"smooth",block:"start"})}catch(e){console.error("Error loading more artists:",e),l.error({message:"Sorry, there are no information. Please try again!"})}finally{k(),u<g?E():(h(),l.error({message:"We're sorry, but you've reached the end of search results."}))}});(()=>{const e={openModalBtn:document.querySelector("[data-menu-open]"),closeModalBtn:document.querySelector("[data-menu-close]"),modal:document.querySelector("[data-menu]"),header:document.querySelector(".header")},r=document.querySelectorAll(".mob-menu-link, .nav-link, .footer-nav");function n(){e.modal.classList.toggle("mob-is-open")}e.openModalBtn&&e.openModalBtn.addEventListener("click",n),e.closeModalBtn&&e.closeModalBtn.addEventListener("click",n),r.forEach(o=>{o.addEventListener("click",t=>{t.preventDefault();const s=document.querySelector(o.getAttribute("href"));if(!s)return;const i=e.header.offsetHeight,S=s.getBoundingClientRect().top+window.pageYOffset-i;window.scrollTo({top:S,behavior:"smooth"}),o.classList.contains("mob-menu-link")&&e.modal.classList.remove("mob-is-open")})})})();
//# sourceMappingURL=index.js.map
