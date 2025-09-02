import{i as l,a as y,S as T}from"./assets/vendor-C-jDU7ko.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function b(e){e&&l.show({title:"❌",message:`Sorry, there are no ${e}.`,color:"red",position:"topRight",messageColor:"white",titleColor:"white",timeout:5e3})}function $(e){e.message&&l.show({title:"Error",color:"red",position:"topRight",messageColor:"white",titleColor:"white",message:e.message,timeout:5e3})}y.defaults.baseURL="https://sound-wave.b.goit.study/api/";let w;async function M(e,t={}){try{return(await y.get(e,{params:t})).data}catch(n){return $(n),null}}async function x(e){w=`artists/${e}`;const t=await M(w);return t||b("artist")}async function I(e=10,t=1){const n=await M("feedbacks",{limit:e,page:t});if(!n)return[];const i=n.data;return i&&Array.isArray(i)&&i.length>0?i:b("feedbacks")}function P(e){const t=Math.round(e),n=5;let i="";for(let r=1;r<=n;r++)i+=r<=t?"★":"☆";return`<div class="stars">${i}</div>`}function q(e){const t=document.querySelector(".swiper-wrapper");if(!t)return;const n=e.map(({rating:i,descr:r,name:s})=>`
      <div class="swiper-slide">
        <div class="feedback-value">
          ${P(i)}
          <div class="review"><p>${r}</p></div>
          <div class="author"><p>${s}</p></div>
        </div>
      </div>`).join("");t.innerHTML=n}function D(){const e=new T(".swiper",{direction:"horizontal",loop:!1,slidesPerView:1,spaceBetween:20,pagination:{el:".swiper-pagination",clickable:!0,type:"custom",renderCustom:function(n,i,r){const s=n.slides.length;let o=2;return n.realIndex===0?o=1:n.realIndex===s-1&&(o=3),[1,2,3].map(f=>`<span class="swiper-pagination-bullet${f===o?" swiper-pagination-bullet-active":""}" data-index="${f}"></span>`).join("")}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),t=document.querySelector(".swiper-pagination");t&&t.addEventListener("click",function(n){if(!n.target.classList.contains("swiper-pagination-bullet"))return;const i=Number(n.target.dataset.index),r=e.slides.length;let s=0;i===1?s=0:i===3?s=r-1:s=Math.floor((r-1)/2),e.slideTo(s)})}async function O(){try{const e=await I(10,1);q(e),e.length<=1?document.querySelector(".swiper-pagination").style.display="none":document.querySelector(".swiper-pagination").style.display="flex",D()}catch(e){console.error("Ошибка при загрузке фидбеков:",e)}}O();const m=document.getElementById("artist-modal-backdrop");document.getElementById("artist-modal");const j=document.getElementById("artist-close-btn"),L=document.getElementById("artist-loader"),p=document.getElementById("artist-content");let c=null,d=null;async function N(e){if(!e)return console.error("Artist ID is missing!");if(m.classList.contains("hidden")){m.classList.remove("hidden"),L.classList.remove("hidden"),p.classList.add("hidden"),document.body.style.overflow="hidden";try{const t=await x(e);if(!t){b("artist"),h();return}const n=t.tracksList||[],i={};n.forEach(s=>{const o=s.strAlbum||"Unknown Album";i[o]||(i[o]=[]),i[o].push(s)});const r=Object.entries(i).map(([s,o])=>({strAlbum:s,tracks:o}));H(t,r)}catch(t){console.error(t),p.innerHTML="<p>Error loading artist.</p>",$(t)}finally{L.classList.add("hidden"),p.classList.remove("hidden")}F()}}function h(){m.classList.add("hidden"),document.body.style.overflow="",Y()}function F(){c||(c=e=>{e.key==="Escape"&&h()},document.addEventListener("keydown",c)),d||(d=e=>{e.target===m&&h()},m.addEventListener("click",d))}function Y(){c&&(document.removeEventListener("keydown",c),c=null),d&&(m.removeEventListener("click",d),d=null)}function H(e,t){const n=e.intFormedYear?e.intDiedYear&&e.intDiedYear!=="null"?`${e.intFormedYear} - ${e.intDiedYear}`:`${e.intFormedYear} - present`:"information missing";p.innerHTML=`
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
                ${r.tracks.map(s=>`
                  <div class="track">
                    <span>${s.strTrack||"—"}</span>
                    <span>${i(s.intDuration)}</span>
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
`;function i(r){if(!r)return"-";const s=Math.floor(r/1e3),o=Math.floor(s/60),f=s%60;return`${o}:${f.toString().padStart(2,"0")}`}j.addEventListener("click",h)}const a={cardItem:document.querySelector(".js-artist-card"),loader:document.querySelector(".js-artist-loader"),btnLoadMore:document.querySelector(".js-artist-loadmore-btn")};async function k(e){return(await y.get("https://sound-wave.b.goit.study/api/artists",{params:{page:e,limit:8}})).data}function z(e,t){return e?e.length>t?e.slice(0,t)+"...":e:""}function C(e){return e.map(n=>{const i=n.genres?n.genres.map(o=>`<li class="item-info-genre">${o}</li>`).join(""):"";let r;window.innerWidth<320||window.innerWidth<768?r=64:window.innerWidth<1440?r=160:r=139;const s=z(n.strBiographyEN,r);return`<li class="artist-card-item">
                <img class="artist-card-img" src="${n.strArtistThumb}" alt="${n.strArtist}" >
                <ul class="artist-item-info">
                    ${i}
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
            </li>`}).join("")}function W(e){if(!a.cardItem){console.error("Container .js-artist-card not found");return}a.cardItem.innerHTML=e}function A(){a.loader&&a.loader.classList.add("is-active-loader")}function S(){a.loader&&a.loader.classList.remove("is-active-loader")}function E(){a.btnLoadMore.disabled=!1,a.btnLoadMore.classList.add("artist-load-more-btn-is-active")}function v(){a.btnLoadMore.disabled=!0,a.btnLoadMore.classList.remove("artist-load-more-btn-is-active")}async function R(e){const t=e.target.closest(".artist-learn-btn");if(!t)return;const n=t.dataset.artistId,i=t.closest(".artist-card-item").querySelector(".card-item-title").textContent;if(!n){l.error({message:"Artist ID not found"});return}console.log("Opening modal for artist:",i,"ID:",n);try{const r=t.textContent;t.disabled=!0,t.textContent="Loading...",await N(n)}catch(r){console.error("Error opening modal:",r),l.error({message:"Failed to open artist details. Please try again."})}finally{t.disabled=!1,t.textContent="Learn More"}}let u,g=0;const Z=8;document.addEventListener("DOMContentLoaded",async()=>{u=1,A();try{const e=await k(u),t=e.artists,n=C(t);W(n),a.cardItem.addEventListener("click",R),g=Math.ceil(e.totalArtists/Z),u<g?E():(v(),l.error({message:"We're sorry, but you've reached the end of search results."}))}catch(e){console.error("Error loading artists:",e),g=0,l.error({message:"Sorry. Please try again!"})}finally{S()}});a.btnLoadMore.addEventListener("click",async()=>{u+=1,v(),A();try{const e=await k(u);if(!e.artists.length){l.info({message:"Sorry. Please try again!"});return}const t=e.artists,n=C(t);a.cardItem.insertAdjacentHTML("beforeend",n);const i=a.cardItem.querySelectorAll(".artist-card-item");if(i.length>0){const o=i[i.length-t.length].getBoundingClientRect().top+window.scrollY-72;window.scrollTo({top:o,behavior:"smooth"})}}catch(e){console.error("Error loading more artists:",e),l.error({message:"Sorry, there are no information. Please try again!"})}finally{S(),u<g?E():(v(),l.error({message:"We're sorry, but you've reached the end of search results."}))}});(()=>{const e={openModalBtn:document.querySelector("[data-menu-open]"),closeModalBtn:document.querySelector("[data-menu-close]"),modal:document.querySelector("[data-menu]"),header:document.querySelector(".header")},t=document.querySelectorAll(".mob-menu-link, .nav-link, .footer-nav");function n(){e.modal.classList.toggle("mob-is-open")}e.openModalBtn&&e.openModalBtn.addEventListener("click",n),e.closeModalBtn&&e.closeModalBtn.addEventListener("click",n),t.forEach(i=>{i.addEventListener("click",r=>{r.preventDefault();const s=document.querySelector(i.getAttribute("href"));if(!s)return;const o=e.header.offsetHeight,B=s.getBoundingClientRect().top+window.pageYOffset-o;window.scrollTo({top:B,behavior:"smooth"}),i.classList.contains("mob-menu-link")&&e.modal.classList.remove("mob-is-open")})})})();
//# sourceMappingURL=index.js.map
