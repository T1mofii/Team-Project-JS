import{i as c,a as $,S as O}from"./assets/vendor-C-jDU7ko.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function L(e){e&&c.show({title:"❌",message:`Sorry, there are no ${e}.`,color:"red",position:"topRight",messageColor:"white",titleColor:"white",timeout:5e3})}function A(e){e.message&&c.show({title:"Error",color:"red",position:"topRight",messageColor:"white",titleColor:"white",message:e.message,timeout:5e3})}$.defaults.baseURL="https://sound-wave.b.goit.study/api/";async function T(e,t={}){try{return(await $.get(e,{params:t})).data}catch(n){return A(n),null}}async function j(e){if(!e)return null;const t=await T(`artists/${e}`);return t||(L("artist"),null)}async function N(e=10,t=1){const n=await T("feedbacks",{limit:e,page:t});if(!n||!n.data)return L("feedbacks"),[];const o=n.data;return o.length===0?(L("feedbacks"),[]):o}function F(e){const t=Math.round(e),n=5-t;let o="";for(let r=0;r<t;r++)o+=`<svg class="star full" viewBox="0 0 24 24" width="24" height="24">
      <path fill="#764191" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>`;for(let r=0;r<n;r++)o+=`<svg class="star empty" viewBox="0 0 24 24" width="24" height="24">
      <path fill="#828183" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>`;return`<div class="stars-wrapper">${o}</div>`}function z(e){const t=document.querySelector(".swiper-wrapper");t&&(t.innerHTML=e.map(({rating:n,descr:o,name:r})=>`
      <div class="swiper-slide">
        <div class="feedback-value">
          ${F(n)}
          <div class="review"><p>${o}</p></div>
          <div class="author"><p>${r}</p></div>
        </div>
      </div>`).join(""))}function Y(){const e=new O(".swiper",{direction:"horizontal",loop:!1,slidesPerView:1,spaceBetween:20,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),t=document.querySelector(".pagination-item.first"),n=document.querySelector(".pagination-item.middle"),o=document.querySelector(".pagination-item.last");function r(){t.classList.remove("active"),n.classList.remove("active"),o.classList.remove("active");const s=e.activeIndex,i=e.slides.length-1;s===0?t.classList.add("active"):s===i?o.classList.add("active"):n.classList.add("active")}r(),e.on("slideChange",r),t.addEventListener("click",()=>e.slideTo(0)),o.addEventListener("click",()=>e.slideTo(e.slides.length-1)),n.addEventListener("click",()=>e.slideTo(1))}async function H(){try{const e=await N(10,1);if(console.log("Loaded feedbacks:",e),!e||e.length===0){document.querySelector(".swiper-pagination").style.display="none";return}z(e);const t=document.querySelector(".custom-pagination");t&&(t.style.display=e.length>1?"flex":"none"),Y()}catch(e){console.error("Ошибка при загрузке фидбеков:",e)}}document.addEventListener("DOMContentLoaded",H);const g=document.getElementById("artist-modal-backdrop");document.getElementById("artist-modal");const W=document.getElementById("artist-close-btn"),B=document.getElementById("artist-loader"),y=document.getElementById("artist-content");let m=null,f=null;async function R(e){if(!e)return console.error("Artist ID is missing!");if(g.classList.contains("hidden")){g.classList.remove("hidden"),B.classList.remove("hidden"),y.classList.add("hidden"),document.body.style.overflow="hidden";try{const t=await j(e);if(!t){L("artist"),w();return}const n=t.tracksList||[],o={};n.forEach(s=>{const i=s.strAlbum||"Unknown Album";o[i]||(o[i]=[]),o[i].push(s)});const r=Object.entries(o).map(([s,i])=>({strAlbum:s,tracks:i}));J(t,r)}catch(t){console.error(t),y.innerHTML="<p>Error loading artist.</p>",A(t)}finally{B.classList.add("hidden"),y.classList.remove("hidden")}Z()}}function w(){g.classList.add("hidden"),document.body.style.overflow="",G()}function Z(){m||(m=e=>{e.key==="Escape"&&w()},document.addEventListener("keydown",m)),f||(f=e=>{e.target===g&&w()},g.addEventListener("click",f))}function G(){m&&(document.removeEventListener("keydown",m),m=null),f&&(g.removeEventListener("click",f),f=null)}function J(e,t){const n=e.intFormedYear?e.intDiedYear&&e.intDiedYear!=="null"?`${e.intFormedYear} - ${e.intDiedYear}`:`${e.intFormedYear} - present`:"information missing";y.innerHTML=`
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
                  <span style="font-size: 8px">Track</span>
                  <span style="font-size: 8px">Time</span>
                  <span style="font-size: 8px">Link</span>
                </div>
                ${r.tracks.map(s=>`
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
`;function o(r){if(!r)return"-";const s=Math.floor(r/1e3),i=Math.floor(s/60),h=s%60;return`${i}:${h.toString().padStart(2,"0")}`}W.addEventListener("click",w)}const a={cardItem:document.querySelector(".js-artist-card"),loader:document.querySelector(".js-artist-loader"),btnLoadMore:document.querySelector(".js-artist-loadmore-btn")};async function x(e){return(await $.get("https://sound-wave.b.goit.study/api/artists",{params:{page:e,limit:8}})).data}function K(e,t){return e?e.length>t?e.slice(0,t)+"...":e:""}function q(e){return e.map(n=>{const o=n.genres?n.genres.map(i=>`<li class="item-info-genre">${i}</li>`).join(""):"";let r;window.innerWidth<320||window.innerWidth<768?r=64:window.innerWidth<1440?r=160:r=139;const s=K(n.strBiographyEN,r);return`<li class="artist-card-item">
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
            </li>`}).join("")}function Q(e){if(!a.cardItem){console.error("Container .js-artist-card not found");return}a.cardItem.innerHTML=e}function P(){a.loader&&a.loader.classList.add("is-active-loader")}function I(){a.loader&&a.loader.classList.remove("is-active-loader")}function D(){a.btnLoadMore.disabled=!1,a.btnLoadMore.classList.add("artist-load-more-btn-is-active")}function M(){a.btnLoadMore.disabled=!0,a.btnLoadMore.classList.remove("artist-load-more-btn-is-active")}async function U(e){const t=e.target.closest(".artist-learn-btn");if(!t)return;const n=t.dataset.artistId,o=t.closest(".artist-card-item").querySelector(".card-item-title").textContent;if(!n){c.error({message:"Artist ID not found"});return}console.log("Opening modal for artist:",o,"ID:",n);try{const r=t.textContent;t.disabled=!0,t.textContent="Loading...",await R(n)}catch(r){console.error("Error opening modal:",r),c.error({message:"Failed to open artist details. Please try again."})}finally{t.disabled=!1,t.textContent="Learn More"}}let p,b=0;const V=8;document.addEventListener("DOMContentLoaded",async()=>{p=1,P();try{const e=await x(p),t=e.artists,n=q(t);Q(n),a.cardItem.addEventListener("click",U),b=Math.ceil(e.totalArtists/V),p<b?D():(M(),c.error({message:"We're sorry, but you've reached the end of search results."}))}catch(e){console.error("Error loading artists:",e),b=0,c.error({message:"Sorry. Please try again!"})}finally{I()}});a.btnLoadMore.addEventListener("click",async()=>{p+=1,M(),P();try{const e=await x(p);if(!e.artists.length){c.info({message:"Sorry. Please try again!"});return}const t=e.artists,n=q(t);a.cardItem.insertAdjacentHTML("beforeend",n);const o=a.cardItem.querySelectorAll(".artist-card-item");if(o.length>0){const i=o[o.length-t.length].getBoundingClientRect().top+window.scrollY-72;window.scrollTo({top:i,behavior:"smooth"})}}catch(e){console.error("Error loading more artists:",e),c.error({message:"Sorry, there are no information. Please try again!"})}finally{I(),p<b?D():(M(),c.error({message:"We're sorry, but you've reached the end of search results."}))}});(()=>{const e={openModalBtn:document.querySelector("[data-menu-open]"),closeModalBtn:document.querySelector("[data-menu-close]"),modal:document.querySelector("[data-menu]"),header:document.querySelector(".header")},t=document.querySelectorAll(".mob-menu-link, .nav-link, .footer-nav");function n(){e.modal.classList.toggle("mob-is-open")}e.openModalBtn&&e.openModalBtn.addEventListener("click",n),e.closeModalBtn&&e.closeModalBtn.addEventListener("click",n),t.forEach(o=>{o.addEventListener("click",r=>{r.preventDefault();const s=document.querySelector(o.getAttribute("href"));if(!s)return;const i=e.header.offsetHeight,k=s.getBoundingClientRect().top+window.pageYOffset-i;window.scrollTo({top:k,behavior:"smooth"}),o.classList.contains("mob-menu-link")&&e.modal.classList.remove("mob-is-open")})})})();(()=>{const e=document.querySelector("[data-feedback-modal-open]"),t=document.querySelector("[data-feedback-modal-close]"),n=document.querySelector("[data-feedback-modal]"),o=document.querySelector("body"),r=document.querySelector(".js-feedback-form");e&&e.addEventListener("click",s),t&&n&&(t.addEventListener("click",s),n.addEventListener("click",i)),r&&r.addEventListener("submit",k);function s(){n&&(n.classList.toggle("is-hidden"),n.classList.contains("is-hidden")?(o.classList.remove("no-scroll"),window.removeEventListener("keydown",h)):(o.classList.add("no-scroll"),window.addEventListener("keydown",h)))}function i(l){l.target===l.currentTarget&&s()}function h(l){l.code==="Escape"&&s()}async function k(l){l.preventDefault();const S=new FormData(l.currentTarget),d={name:S.get("name").trim(),rating:parseFloat(S.get("rating")),descr:S.get("message").trim()};if(!d.name||!d.descr||!d.rating){alert("Будь ласка, заповніть всі поля!");return}if(d.name.length<2||d.name.length>16){alert("Ім'я повинно містити від 2 до 16 символів.");return}if(d.descr.length<10||d.descr.length>512){alert("Повідомлення повинно містити від 10 до 512 символів.");return}const v=l.currentTarget.querySelector('button[type="submit"]');try{v.disabled=!0,v.textContent="Sending...";const u=await fetch("https://sound-wave.b.goit.study/api/feedbacks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(u.status!==201){let E=`Status: ${u.status}`;try{const C=await u.json();E=JSON.stringify(C)}catch{E=await u.text()}throw new Error(`Server responded with an error. Details: ${E}`)}alert("Thank you for your feedback!"),r.reset(),s()}catch(u){console.error("Submit error:",u),alert("Something went wrong. Please try again later.")}finally{v.disabled=!1,v.textContent="Submit"}}})();
//# sourceMappingURL=index.js.map
