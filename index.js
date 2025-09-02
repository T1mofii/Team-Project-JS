import{i as c,a as w,S as x}from"./assets/vendor-C-jDU7ko.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function v(e){e&&c.show({title:"❌",message:`Sorry, there are no ${e}.`,color:"red",position:"topRight",messageColor:"white",titleColor:"white",timeout:5e3})}function k(e){e.message&&c.show({title:"Error",color:"red",position:"topRight",messageColor:"white",titleColor:"white",message:e.message,timeout:5e3})}w.defaults.baseURL="https://sound-wave.b.goit.study/api/";async function $(e,t={}){try{return(await w.get(e,{params:t})).data}catch(n){return k(n),null}}async function T(e){if(!e)return null;const t=await $(`artists/${e}`);return t||(v("artist"),null)}async function I(e=10,t=1){const n=await $("feedbacks",{limit:e,page:t});if(!n||!n.data)return v("feedbacks"),[];const i=n.data;return i.length===0?(v("feedbacks"),[]):i}function q(e){const t=Math.round(e),n=5;let i="";for(let s=1;s<=n;s++)i+=s<=t?"★":"☆";return`<div class="stars">${i}</div>`}function P(e){const t=document.querySelector(".swiper-wrapper");if(!t)return;const n=e.map(({rating:i,descr:s,name:r})=>`
      <div class="swiper-slide">
        <div class="feedback-value">
          ${q(i)}
          <div class="review"><p>${s}</p></div>
          <div class="author"><p>${r}</p></div>
        </div>
      </div>`).join("");t.innerHTML=n}function O(){const e=new x(".swiper",{direction:"horizontal",loop:!1,slidesPerView:1,spaceBetween:20,pagination:{el:".swiper-pagination",clickable:!0,type:"custom",renderCustom:function(n,i,s){const r=n.slides.length;let o=2;return n.realIndex===0?o=1:n.realIndex===r-1&&(o=3),[1,2,3].map(p=>`<span class="swiper-pagination-bullet${p===o?" swiper-pagination-bullet-active":""}" data-index="${p}"></span>`).join("")}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),t=document.querySelector(".swiper-pagination");t&&t.addEventListener("click",function(n){if(!n.target.classList.contains("swiper-pagination-bullet"))return;const i=Number(n.target.dataset.index),s=e.slides.length;let r=0;i===1?r=0:i===3?r=s-1:r=Math.floor((s-1)/2),e.slideTo(r)})}async function j(){try{const e=await I(10,1);P(e),e.length<=1?document.querySelector(".swiper-pagination").style.display="none":document.querySelector(".swiper-pagination").style.display="flex",O()}catch(e){console.error("Ошибка при загрузке фидбеков:",e)}}j();const l=document.querySelector("[data-feedback-modal]"),D=document.querySelector("[data-feedback-modal-open]"),N=document.querySelector("[data-feedback-modal-close]");D.addEventListener("click",()=>{l.classList.remove("is-hidden")});N.addEventListener("click",()=>{l.classList.add("is-hidden")});l.addEventListener("click",e=>{e.target===l&&l.classList.add("is-hidden")});document.addEventListener("keydown",e=>{e.key==="Escape"&&!l.classList.contains("is-hidden")&&l.classList.add("is-hidden")});const f=document.getElementById("artist-modal-backdrop");document.getElementById("artist-modal");const z=document.getElementById("artist-close-btn"),L=document.getElementById("artist-loader"),g=document.getElementById("artist-content");let d=null,u=null;async function F(e){if(!e)return console.error("Artist ID is missing!");if(f.classList.contains("hidden")){f.classList.remove("hidden"),L.classList.remove("hidden"),g.classList.add("hidden"),document.body.style.overflow="hidden";try{const t=await T(e);if(!t){v("artist"),y();return}const n=t.tracksList||[],i={};n.forEach(r=>{const o=r.strAlbum||"Unknown Album";i[o]||(i[o]=[]),i[o].push(r)});const s=Object.entries(i).map(([r,o])=>({strAlbum:r,tracks:o}));W(t,s)}catch(t){console.error(t),g.innerHTML="<p>Error loading artist.</p>",k(t)}finally{L.classList.add("hidden"),g.classList.remove("hidden")}Y()}}function y(){f.classList.add("hidden"),document.body.style.overflow="",H()}function Y(){d||(d=e=>{e.key==="Escape"&&y()},document.addEventListener("keydown",d)),u||(u=e=>{e.target===f&&y()},f.addEventListener("click",u))}function H(){d&&(document.removeEventListener("keydown",d),d=null),u&&(f.removeEventListener("click",u),u=null)}function W(e,t){const n=e.intFormedYear?e.intDiedYear&&e.intDiedYear!=="null"?`${e.intFormedYear} - ${e.intDiedYear}`:`${e.intFormedYear} - present`:"information missing";g.innerHTML=`
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
            ${e.genres.map(s=>`<span class="genre-tag">${s}</span>`).join("")}
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
        ${t.map(s=>`
          <div class="album">
            <div class="album-title">${s.strAlbum||"—"}</div>
            ${s.tracks&&s.tracks.length?`
              <div class="tracks">
                <div class="track track-header" style="font-size: 8px !important">
                  <span style="font-size: 8px">Track</span>
                  <span style="font-size: 8px">Time</span>
                  <span style="font-size: 8px">Link</span>
                </div>
                ${s.tracks.map(r=>`
                  <div class="track">
                    <span>${r.strTrack||"—"}</span>
                    <span>${i(r.intDuration)}</span>
                    <span>
                      ${r.movie?`
                        <a href="${r.movie}" target="_blank" class="yt-link">
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
`;function i(s){if(!s)return"-";const r=Math.floor(s/1e3),o=Math.floor(r/60),p=r%60;return`${o}:${p.toString().padStart(2,"0")}`}z.addEventListener("click",y)}const a={cardItem:document.querySelector(".js-artist-card"),loader:document.querySelector(".js-artist-loader"),btnLoadMore:document.querySelector(".js-artist-loadmore-btn")};async function M(e){return(await w.get("https://sound-wave.b.goit.study/api/artists",{params:{page:e,limit:8}})).data}function R(e,t){return e?e.length>t?e.slice(0,t)+"...":e:""}function E(e){return e.map(n=>{const i=n.genres?n.genres.map(o=>`<li class="item-info-genre">${o}</li>`).join(""):"";let s;window.innerWidth<320||window.innerWidth<768?s=64:window.innerWidth<1440?s=160:s=139;const r=R(n.strBiographyEN,s);return`<li class="artist-card-item">
                <img class="artist-card-img" src="${n.strArtistThumb}" alt="${n.strArtist}" >
                <ul class="artist-item-info">
                    ${i}
                </ul>
                <div class="artist-info-container">
                    <h4 class="card-item-title">${n.strArtist}</h4>
                    <p class="card-item-info">
                         ${r}
                    </p>
                </div>
                <div class="btn-learn-more-cont">
                    <button type="button" class="artist-learn-btn" data-artist-id="${n._id}">Learn More </button>
                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 14.5492L8 7.54919L0 0.549194V14.5492Z" fill="white" />
                    </svg>
                </div>
            </li>`}).join("")}function Z(e){if(!a.cardItem){console.error("Container .js-artist-card not found");return}a.cardItem.innerHTML=e}function C(){a.loader&&a.loader.classList.add("is-active-loader")}function S(){a.loader&&a.loader.classList.remove("is-active-loader")}function A(){a.btnLoadMore.disabled=!1,a.btnLoadMore.classList.add("artist-load-more-btn-is-active")}function b(){a.btnLoadMore.disabled=!0,a.btnLoadMore.classList.remove("artist-load-more-btn-is-active")}async function G(e){const t=e.target.closest(".artist-learn-btn");if(!t)return;const n=t.dataset.artistId,i=t.closest(".artist-card-item").querySelector(".card-item-title").textContent;if(!n){c.error({message:"Artist ID not found"});return}console.log("Opening modal for artist:",i,"ID:",n);try{const s=t.textContent;t.disabled=!0,t.textContent="Loading...",await F(n)}catch(s){console.error("Error opening modal:",s),c.error({message:"Failed to open artist details. Please try again."})}finally{t.disabled=!1,t.textContent="Learn More"}}let m,h=0;const Q=8;document.addEventListener("DOMContentLoaded",async()=>{m=1,C();try{const e=await M(m),t=e.artists,n=E(t);Z(n),a.cardItem.addEventListener("click",G),h=Math.ceil(e.totalArtists/Q),m<h?A():(b(),c.error({message:"We're sorry, but you've reached the end of search results."}))}catch(e){console.error("Error loading artists:",e),h=0,c.error({message:"Sorry. Please try again!"})}finally{S()}});a.btnLoadMore.addEventListener("click",async()=>{m+=1,b(),C();try{const e=await M(m);if(!e.artists.length){c.info({message:"Sorry. Please try again!"});return}const t=e.artists,n=E(t);a.cardItem.insertAdjacentHTML("beforeend",n);const i=a.cardItem.querySelectorAll(".artist-card-item");if(i.length>0){const o=i[i.length-t.length].getBoundingClientRect().top+window.scrollY-72;window.scrollTo({top:o,behavior:"smooth"})}}catch(e){console.error("Error loading more artists:",e),c.error({message:"Sorry, there are no information. Please try again!"})}finally{S(),m<h?A():(b(),c.error({message:"We're sorry, but you've reached the end of search results."}))}});(()=>{const e={openModalBtn:document.querySelector("[data-menu-open]"),closeModalBtn:document.querySelector("[data-menu-close]"),modal:document.querySelector("[data-menu]"),header:document.querySelector(".header")},t=document.querySelectorAll(".mob-menu-link, .nav-link, .footer-nav");function n(){e.modal.classList.toggle("mob-is-open")}e.openModalBtn&&e.openModalBtn.addEventListener("click",n),e.closeModalBtn&&e.closeModalBtn.addEventListener("click",n),t.forEach(i=>{i.addEventListener("click",s=>{s.preventDefault();const r=document.querySelector(i.getAttribute("href"));if(!r)return;const o=e.header.offsetHeight,B=r.getBoundingClientRect().top+window.pageYOffset-o;window.scrollTo({top:B,behavior:"smooth"}),i.classList.contains("mob-menu-link")&&e.modal.classList.remove("mob-is-open")})})})();
//# sourceMappingURL=index.js.map
