import{i as c,a as v,S as T}from"./assets/vendor-C-jDU7ko.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();function y(e){e&&c.show({title:"❌",message:`Sorry, there are no ${e}.`,color:"red",position:"topRight",messageColor:"white",titleColor:"white",timeout:5e3})}function M(e){e.message&&c.show({title:"Error",color:"red",position:"topRight",messageColor:"white",titleColor:"white",message:e.message,timeout:5e3})}v.defaults.baseURL="https://sound-wave.b.goit.study/api/";let w;async function $(e,t={}){try{return(await v.get(e,{params:t})).data}catch(s){return M(s),null}}async function I(e){w=`artists/${e}`;const t=await $(w);return t||y("artist")}async function P(e=10,t=1){const s=await $("feedbacks",{limit:e,page:t});if(!s)return[];const n=s.data;return n&&Array.isArray(n)&&n.length>0?n:y("feedbacks")}const x=new T(".swiper",{direction:"horizontal",loop:!1,slidesPerView:1,spaceBetween:20,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),O=document.querySelector(".swiper-wrapper");function q(e){const t=Math.round(e),s=5;let n="";for(let r=1;r<=s;r++)n+=r<=t?"★":"☆";return n}function D(e){if(!e||e.length===0)return;const t=e.map(({rating:s,descr:n,name:r})=>`
      <div class="swiper-slide">
        <div class="feedback-value">
          <div class="stars">${q(s)}</div>
          <div class="review">
            <p>${n}</p>
          </div>
          <div class="author">
            <p>${r}</p>
          </div>
        </div>
      </div>`).join("");O.innerHTML=t,x.update()}async function j(){try{const e=await P(10,1);D(e)}catch(e){console.error("Ошибка при загрузке фидбеков:",e)}}j();const m=document.getElementById("artist-modal-backdrop");document.getElementById("artist-modal");const N=document.getElementById("artist-close-btn"),L=document.getElementById("artist-loader"),f=document.getElementById("artist-content");let l=null,d=null;async function F(e){if(!e)return console.error("Artist ID is missing!");if(m.classList.contains("hidden")){m.classList.remove("hidden"),L.classList.remove("hidden"),f.classList.add("hidden"),document.body.style.overflow="hidden";try{const t=await I(e);if(!t){y("artist"),g();return}const s=t.tracksList||[],n={};s.forEach(o=>{const i=o.strAlbum||"Unknown Album";n[i]||(n[i]=[]),n[i].push(o)});const r=Object.entries(n).map(([o,i])=>({strAlbum:o,tracks:i}));z(t,r)}catch(t){console.error(t),f.innerHTML="<p>Error loading artist.</p>",M(t)}finally{L.classList.add("hidden"),f.classList.remove("hidden")}Y()}}function g(){m.classList.add("hidden"),document.body.style.overflow="",H()}function Y(){l||(l=e=>{e.key==="Escape"&&g()},document.addEventListener("keydown",l)),d||(d=e=>{e.target===m&&g()},m.addEventListener("click",d))}function H(){l&&(document.removeEventListener("keydown",l),l=null),d&&(m.removeEventListener("click",d),d=null)}function z(e,t){const s=e.intFormedYear?e.intDiedYear&&e.intDiedYear!=="null"?`${e.intFormedYear} - ${e.intDiedYear}`:`${e.intFormedYear} - present`:"information missing";f.innerHTML=`
  <h2 class="artist-title">${e.strArtist}</h2>

  <div class="artist-header">
    <img src="${e.strArtistThumb||""}" alt="${e.strArtist}">
    <div class="artist-header-content">
      <div class="artist-info-grid-two-columns">
        ${s?`<div class="info-item"><b>Years active:</b> <p>${s}</p></div>`:""}
        ${e.strGender?`<div class="info-item"><b>Sex:</b> <p>${e.strGender}</p></div>`:""}
        ${e.intMembers?`<div class="info-item"><b>Members:</b> <p>${e.intMembers}</p></div>`:""}
        ${e.strCountry?`<div class="info-item"><b>Country:</b> <p>${e.strCountry}</p></div>`:""}
      </div>

      ${e.genres&&e.genres.length?`
        <div class="genres-container">
          <div class="genres-list">
            ${e.genres.map(r=>`<span class="genre-tag">${r}</span>`).join("")}
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
    ${t.length?`
      <div class="albums-grid">
        ${t.map(r=>`
          <div class="album">
            <div class="album-title">${r.strAlbum||"—"}</div>
            ${r.tracks&&r.tracks.length?`
              <div class="tracks">
                <div class="track track-header" style="font-size: 8px !important">
                  <span>Track</span>
                  <span>Time</span>
                  <span>Link</span>
                </div>
                ${r.tracks.map(o=>`
                  <div class="track">
                    <span>${o.strTrack||"—"}</span>
                    <span>${n(o.intDuration)}</span>
                    <span>
                      ${o.movie?`
                        <a href="${o.movie}" target="_blank" class="yt-link">
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
`;function n(r){if(!r)return"-";const o=Math.floor(r/1e3),i=Math.floor(o/60),b=o%60;return`${i}:${b.toString().padStart(2,"0")}`}N.addEventListener("click",g)}const a={cardItem:document.querySelector(".js-artist-card"),loader:document.querySelector(".js-artist-loader"),btnLoadMore:document.querySelector(".js-artist-loadmore-btn")};async function k(e){return(await v.get("https://sound-wave.b.goit.study/api/artists",{params:{page:e,limit:8}})).data}function W(e,t){return e?e.length>t?e.slice(0,t)+"...":e:""}function A(e){return e.map(s=>{const n=s.genres?s.genres.map(i=>`<li class="item-info-genre">${i}</li>`).join(""):"";let r;window.innerWidth<320||window.innerWidth<768?r=64:window.innerWidth<1440?r=160:r=139;const o=W(s.strBiographyEN,r);return`<li class="artist-card-item">
                <img class="artist-card-img" src="${s.strArtistThumb}" alt="${s.strArtist}" >
                <ul class="artist-item-info">
                    ${n}
                </ul>
                <div class="artist-info-container">
                    <h4 class="card-item-title">${s.strArtist}</h4>
                    <p class="card-item-info">
                         ${o}
                    </p>
                </div>
                <div class="btn-learn-more-cont">
                    <button type="button" class="artist-learn-btn" data-artist-id="${s._id}">Learn More </button>
                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 14.5492L8 7.54919L0 0.549194V14.5492Z" fill="white" />
                    </svg>
                </div>
            </li>`}).join("")}function R(e){if(!a.cardItem){console.error("Container .js-artist-card not found");return}a.cardItem.innerHTML=e}function C(){a.loader&&a.loader.classList.add("is-active-loader")}function E(){a.loader&&a.loader.classList.remove("is-active-loader")}function S(){a.btnLoadMore.disabled=!1,a.btnLoadMore.classList.add("artist-load-more-btn-is-active")}function h(){a.btnLoadMore.disabled=!0,a.btnLoadMore.classList.remove("artist-load-more-btn-is-active")}async function Z(e){const t=e.target.closest(".artist-learn-btn");if(!t)return;const s=t.dataset.artistId,n=t.closest(".artist-card-item").querySelector(".card-item-title").textContent;if(!s){c.error({message:"Artist ID not found"});return}console.log("Opening modal for artist:",n,"ID:",s);try{const r=t.textContent;t.disabled=!0,t.textContent="Loading...",await F(s)}catch(r){console.error("Error opening modal:",r),c.error({message:"Failed to open artist details. Please try again."})}finally{t.disabled=!1,t.textContent="Learn More"}}let u,p=0;const _=8;document.addEventListener("DOMContentLoaded",async()=>{u=1,C();try{const e=await k(u),t=e.artists,s=A(t);R(s),a.cardItem.addEventListener("click",Z),p=Math.ceil(e.totalArtists/_),u<p?S():(h(),c.error({message:"We're sorry, but you've reached the end of search results."}))}catch(e){console.error("Error loading artists:",e),p=0,c.error({message:"Sorry. Please try again!"})}finally{E()}});a.btnLoadMore.addEventListener("click",async()=>{u+=1,h(),C();try{const e=await k(u);if(!e.artists.length){c.info({message:"Sorry. Please try again!"});return}const t=e.artists,s=A(t);a.cardItem.insertAdjacentHTML("beforeend",s);const n=a.cardItem.querySelectorAll(".artist-card-item");if(n.length>0){const i=n[n.length-t.length].getBoundingClientRect().top+window.scrollY-72;window.scrollTo({top:i,behavior:"smooth"})}}catch(e){console.error("Error loading more artists:",e),c.error({message:"Sorry, there are no information. Please try again!"})}finally{E(),u<p?S():(h(),c.error({message:"We're sorry, but you've reached the end of search results."}))}});(()=>{const e={openModalBtn:document.querySelector("[data-menu-open]"),closeModalBtn:document.querySelector("[data-menu-close]"),modal:document.querySelector("[data-menu]"),header:document.querySelector(".header")},t=document.querySelectorAll(".mob-menu-link, .nav-link, .footer-nav");function s(){e.modal.classList.toggle("mob-is-open")}e.openModalBtn&&e.openModalBtn.addEventListener("click",s),e.closeModalBtn&&e.closeModalBtn.addEventListener("click",s),t.forEach(n=>{n.addEventListener("click",r=>{r.preventDefault();const o=document.querySelector(n.getAttribute("href"));if(!o)return;const i=e.header.offsetHeight,B=o.getBoundingClientRect().top+window.pageYOffset-i;window.scrollTo({top:B,behavior:"smooth"}),n.classList.contains("mob-menu-link")&&e.modal.classList.remove("mob-is-open")})})})();
//# sourceMappingURL=index.js.map
