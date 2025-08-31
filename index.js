import{i as d,a as p}from"./assets/vendor-CWxlEZoa.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const i={cardItem:document.querySelector(".js-artist-card"),loader:document.querySelector(".js-artist-loader"),btnLoadMore:document.querySelector(".js-artist-loadmore-btn")};async function f(t){return(await p.get("https://sound-wave.b.goit.study/api/artists",{params:{page:t,limit:8}})).data}function L(t,s){return t?t.length>s?t.slice(0,s)+"...":t:""}function m(t){return t.map(o=>{const a=o.genres?o.genres.map(c=>`<li class="item-info-genre">${c}</li>`).join(""):"";let e;window.innerWidth<320||window.innerWidth<768?e=64:window.innerWidth<1440?e=160:e=139;const r=L(o.strBiographyEN,e);return`<li class="artist-card-item">
                <img class="artist-card-img" src="${o.strArtistThumb}" alt="${o.strArtist}" >
                <ul class="artist-item-info">
                    ${a}
                </ul>
                <div class="artist-info-container">
                    <h4 class="card-item-title">${o.strArtist}</h4>
                    <p class="card-item-info">
                         ${r}
                    </p>
                </div>
                <div class="btn-learn-more-cont">
                    <button type="button" class="artist-learn-btn" data-artist-id="artist-modal">Learn More </button>
                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 14.5492L8 7.54919L0 0.549194V14.5492Z" fill="white" />
                    </svg>
                </div>
            </li>`}).join("")}function h(){i.loader&&i.loader.classList.add("is-active-loader")}function g(){i.loader&&i.loader.classList.remove("is-active-loader")}function y(){i.btnLoadMore.disabled=!1,i.btnLoadMore.classList.add("artist-load-more-btn-is-active")}function u(){i.btnLoadMore.disabled=!0,i.btnLoadMore.classList.remove("artist-load-more-btn-is-active")}let n,l=0;const b=8;document.addEventListener("DOMContentLoaded",async()=>{n=1,h();try{const t=await f(n),s=t.artists,o=m(s);i.cardItem.innerHTML=o,l=Math.ceil(t.totalArtists/b),n<l?y():(u(),d.error({message:"We're sorry, but you've reached the end of search results."}))}catch{l=0,d.error({message:"Sorry. Please try again!"})}finally{g()}});i.btnLoadMore.addEventListener("click",async()=>{n+=1,u(),h();try{const t=await f(n);if(!t.artists.length){d.info({message:"Sorry. Please try again!"});return}const s=t.artists,o=m(s);i.cardItem.insertAdjacentHTML("beforeend",o);const a=document.querySelector(".artist-card-item");if(!a)return;const e=a.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}catch{d.error({message:"Sorry, there are no information. Please try again!"})}finally{g(),n<l?y():(u(),d.error({message:"We're sorry, but you've reached the end of search results."}))}});
//# sourceMappingURL=index.js.map
