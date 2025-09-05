import{i as c,a as C,S as j}from"./assets/vendor-C-jDU7ko.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();function w(e){e&&c.show({title:"❌",message:`Sorry, there are no ${e}.`,color:"#764191",position:"topRight",messageColor:"white",titleColor:"white",timeout:5e3})}function T(e){e.message&&c.show({title:"Error",color:"#764191",position:"topRight",messageColor:"white",titleColor:"white",message:e.message,timeout:5e3})}function F(e){c.show({title:"🎉 Success!",message:e,color:"#764191",position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"fadeInDown",transitionOut:"fadeOutUp",close:!0,icon:"💌"})}function N(e){c.show({title:"❌ Error",message:e,color:"#764191",position:"topRight",timeout:5e3,progressBar:!0,transitionIn:"flipInX",transitionOut:"flipOutX",close:!0,icon:"⚠️"})}function M(e){c.show({title:"⚠️ Warning",message:e,color:"#764191",position:"topRight",timeout:4e3,progressBar:!0,transitionIn:"flipInY",transitionOut:"flipOutY",close:!0,icon:"⚡"})}C.defaults.baseURL="https://sound-wave.b.goit.study/api/";async function x(e,t={}){try{return(await C.get(e,{params:t})).data}catch(r){return T(r),null}}async function z(e){if(!e)return null;const t=await x(`artists/${e}`);return t||(w("artist"),null)}async function Y(e=10,t=1){const r=await x("feedbacks",{limit:e,page:t});if(!r||!r.data)return w("feedbacks"),[];const o=r.data;return o.length===0?(w("feedbacks"),[]):o}function R(e){const t=Math.round(e),r=5-t;let o="";for(let n=0;n<t;n++)o+=`<svg class="star full" viewBox="0 0 24 24" width="24" height="24">
      <path fill="#764191" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>`;for(let n=0;n<r;n++)o+=`<svg class="star empty" viewBox="0 0 24 24" width="24" height="24">
      <path fill="#828183" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>`;return`<div class="stars-wrapper">${o}</div>`}function H(e){const t=document.querySelector(".swiper-wrapper");t&&(t.innerHTML=e.map(({rating:r,descr:o,name:n})=>`
      <div class="swiper-slide">
        <div class="feedback-value">
          ${R(r)}
          <div class="review"><p>${o}</p></div>
          <div class="author"><p>${n}</p></div>
        </div>
      </div>`).join(""))}function W(){const e=new j(".swiper",{direction:"horizontal",loop:!1,slidesPerView:1,spaceBetween:20,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),t=document.querySelector(".pagination-item.first"),r=document.querySelector(".pagination-item.middle"),o=document.querySelector(".pagination-item.last");function n(){t.classList.remove("active"),r.classList.remove("active"),o.classList.remove("active");const s=e.activeIndex,i=e.slides.length-1;s===0?t.classList.add("active"):s===i?o.classList.add("active"):r.classList.add("active")}n(),e.on("slideChange",n),t.addEventListener("click",()=>e.slideTo(0)),o.addEventListener("click",()=>e.slideTo(e.slides.length-1)),r.addEventListener("click",()=>e.slideTo(1))}async function U(){try{const e=await Y(10,1);if(console.log("Loaded feedbacks:",e),!e||e.length===0){document.querySelector(".swiper-pagination").style.display="none";return}H(e);const t=document.querySelector(".custom-pagination");t&&(t.style.display=e.length>1?"flex":"none"),W()}catch(e){console.error("Ошибка при загрузке фидбеков:",e)}}document.addEventListener("DOMContentLoaded",U);const g=document.getElementById("artist-modal-backdrop");document.getElementById("artist-modal");const Z=document.getElementById("artist-close-btn"),A=document.getElementById("artist-loader"),y=document.getElementById("artist-content");let m=null,f=null;async function G(e){if(!e)return console.error("Artist ID is missing!");if(g.classList.contains("hidden")){g.classList.remove("hidden"),A.classList.remove("hidden"),y.classList.add("hidden"),document.body.style.overflow="hidden";try{const t=await z(e);if(!t){w("artist"),L();return}const r=t.tracksList||[],o={};r.forEach(s=>{const i=s.strAlbum||"Unknown Album";o[i]||(o[i]=[]),o[i].push(s)});const n=Object.entries(o).map(([s,i])=>({strAlbum:s,tracks:i}));Q(t,n)}catch(t){console.error(t),y.innerHTML="<p>Error loading artist.</p>",T(t)}finally{A.classList.add("hidden"),y.classList.remove("hidden")}J()}}function L(){g.classList.add("hidden"),document.body.style.overflow="",K()}function J(){m||(m=e=>{e.key==="Escape"&&L()},document.addEventListener("keydown",m)),f||(f=e=>{e.target===g&&L()},g.addEventListener("click",f))}function K(){m&&(document.removeEventListener("keydown",m),m=null),f&&(g.removeEventListener("click",f),f=null)}function Q(e,t){const r=e.intFormedYear?e.intDiedYear&&e.intDiedYear!=="null"?`${e.intFormedYear} - ${e.intDiedYear}`:`${e.intFormedYear} - present`:"information missing";y.innerHTML=`
  <h2 class="artist-title">${e.strArtist}</h2>

  <div class="artist-header">
    <img src="${e.strArtistThumb||""}" alt="${e.strArtist}">
    <div class="artist-header-content">
      <div class="artist-info-grid-two-columns">
        ${r?`<div class="info-item"><b>Years active:</b> <p>${r}</p></div>`:""}
        ${e.strGender?`<div class="info-item"><b>Sex:</b> <p>${e.strGender}</p></div>`:""}
        ${e.intMembers?`<div class="info-item"><b>Members:</b> <p>${e.intMembers}</p></div>`:""}
        ${e.strCountry?`<div class="info-item"><b>Country:</b> <p>${e.strCountry}</p></div>`:""}
      </div>

      ${e.genres&&e.genres.length?`
        <div class="genres-container">
          <div class="genres-list">
            ${e.genres.map(n=>`<span class="genre-tag">${n}</span>`).join("")}
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
        ${t.map(n=>`
          <div class="album">
            <div class="album-title">${n.strAlbum||"—"}</div>
            ${n.tracks&&n.tracks.length?`
              <div class="tracks">
                <div class="track track-header" style="font-size: 8px !important">
                  <span style="font-size: 8px">Track</span>
                  <span style="font-size: 8px">Time</span>
                  <span style="font-size: 8px">Link</span>
                </div>
                ${n.tracks.map(s=>`
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
`;function o(n){if(!n)return"-";const s=Math.floor(n/1e3),i=Math.floor(s/60),h=s%60;return`${i}:${h.toString().padStart(2,"0")}`}Z.addEventListener("click",L)}const a={cardItem:document.querySelector(".js-artist-card"),loader:document.querySelector(".js-artist-loader"),btnLoadMore:document.querySelector(".js-artist-loadmore-btn")};async function I(e){return(await C.get("https://sound-wave.b.goit.study/api/artists",{params:{page:e,limit:8}})).data}function V(e,t){return e?e.length>t?e.slice(0,t)+"...":e:""}function q(e){return e.map(r=>{const o=r.genres?r.genres.map(i=>`<li class="item-info-genre">${i}</li>`).join(""):"";let n;window.innerWidth<320||window.innerWidth<768?n=64:window.innerWidth<1440?n=160:n=139;const s=V(r.strBiographyEN,n);return`<li class="artist-card-item">
                <img class="artist-card-img" src="${r.strArtistThumb}" alt="${r.strArtist}" >
                <ul class="artist-item-info">
                    ${o}
                </ul>
                <div class="artist-info-container">
                    <h4 class="card-item-title">${r.strArtist}</h4>
                    <p class="card-item-info">
                         ${s}
                    </p>
                </div>
                <div class="btn-learn-more-cont">
                    <button type="button" class="artist-learn-btn" data-artist-id="${r._id}">Learn More </button>
                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 14.5492L8 7.54919L0 0.549194V14.5492Z" fill="white" />
                    </svg>
                </div>
            </li>`}).join("")}function X(e){if(!a.cardItem){console.error("Container .js-artist-card not found");return}a.cardItem.innerHTML=e}function O(){a.loader&&a.loader.classList.add("is-active-loader")}function P(){a.loader&&a.loader.classList.remove("is-active-loader")}function D(){a.btnLoadMore.disabled=!1,a.btnLoadMore.classList.add("artist-load-more-btn-is-active")}function $(){a.btnLoadMore.disabled=!0,a.btnLoadMore.classList.remove("artist-load-more-btn-is-active")}async function _(e){const t=e.target.closest(".artist-learn-btn");if(!t)return;const r=t.dataset.artistId,o=t.closest(".artist-card-item").querySelector(".card-item-title").textContent;if(!r){c.error({message:"Artist ID not found"});return}console.log("Opening modal for artist:",o,"ID:",r);try{const n=t.textContent;t.disabled=!0,t.textContent="Loading...",await G(r)}catch(n){console.error("Error opening modal:",n),c.error({message:"Failed to open artist details. Please try again."})}finally{t.disabled=!1,t.textContent="Learn More"}}let p,b=0;const ee=8;document.addEventListener("DOMContentLoaded",async()=>{p=1,O();try{const e=await I(p),t=e.artists,r=q(t);X(r),a.cardItem.addEventListener("click",_),b=Math.ceil(e.totalArtists/ee),p<b?D():($(),c.error({message:"We're sorry, but you've reached the end of search results."}))}catch(e){console.error("Error loading artists:",e),b=0,c.error({message:"Sorry. Please try again!"})}finally{P()}});a.btnLoadMore.addEventListener("click",async()=>{p+=1,$(),O();try{const e=await I(p);if(!e.artists.length){c.info({message:"Sorry. Please try again!"});return}const t=e.artists,r=q(t);a.cardItem.insertAdjacentHTML("beforeend",r);const o=a.cardItem.querySelectorAll(".artist-card-item");if(o.length>0){const i=o[o.length-t.length].getBoundingClientRect().top+window.scrollY-72;window.scrollTo({top:i,behavior:"smooth"})}}catch(e){console.error("Error loading more artists:",e),c.error({message:"Sorry, there are no information. Please try again!"})}finally{P(),p<b?D():($(),c.error({message:"We're sorry, but you've reached the end of search results."}))}});(()=>{const e={openModalBtn:document.querySelector("[data-menu-open]"),closeModalBtn:document.querySelector("[data-menu-close]"),modal:document.querySelector("[data-menu]"),header:document.querySelector(".header")},t=document.querySelectorAll(".mob-menu-link, .nav-link, .footer-nav");function r(){e.modal.classList.toggle("mob-is-open"),document.body.classList.add("no-scroll")}e.openModalBtn&&e.openModalBtn.addEventListener("click",r),e.closeModalBtn&&e.closeModalBtn.addEventListener("click",r),t.forEach(o=>{o.addEventListener("click",n=>{n.preventDefault();const s=document.querySelector(o.getAttribute("href"));if(!s)return;const i=e.header.offsetHeight,k=s.getBoundingClientRect().top+window.pageYOffset-i;window.scrollTo({top:k,behavior:"smooth"}),o.classList.contains("mob-menu-link")&&e.modal.classList.remove("mob-is-open")})})})();(()=>{const e=document.querySelector("[data-feedback-modal-open]"),t=document.querySelector("[data-feedback-modal-close]"),r=document.querySelector("[data-feedback-modal]"),o=document.querySelector("body"),n=document.querySelector(".js-feedback-form");e&&e.addEventListener("click",s),t&&r&&(t.addEventListener("click",s),r.addEventListener("click",i)),n&&n.addEventListener("submit",k);function s(){r&&(r.classList.toggle("is-hidden"),r.classList.contains("is-hidden")?(o.classList.remove("no-scroll"),window.removeEventListener("keydown",h)):(o.classList.add("no-scroll"),window.addEventListener("keydown",h)))}function i(l){l.target===l.currentTarget&&s()}function h(l){l.code==="Escape"&&s()}async function k(l){l.preventDefault();const S=new FormData(l.currentTarget),d={name:S.get("name").trim(),rating:parseFloat(S.get("rating")),descr:S.get("message").trim()};if(!d.name||!d.descr||!d.rating){M("Будь ласка, заповніть всі поля!");return}if(d.name.length<2||d.name.length>16){M("Ім'я повинно містити від 2 до 16 символів.");return}if(d.descr.length<10||d.descr.length>512){M("Повідомлення повинно містити від 10 до 512 символів.");return}const v=l.currentTarget.querySelector('button[type="submit"]');try{v.disabled=!0,v.textContent="Sending...";const u=await fetch("https://sound-wave.b.goit.study/api/feedbacks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(u.status!==201){let E=`Status: ${u.status}`;try{const B=await u.json();E=JSON.stringify(B)}catch{E=await u.text()}throw new Error(`Server responded with an error. Details: ${E}`)}F("Thank you for your feedback!"),n.reset(),s()}catch(u){console.error("Submit error:",u),N("Something went wrong. Please try again later.")}finally{v.disabled=!1,v.textContent="Submit"}}})();
//# sourceMappingURL=index.js.map
