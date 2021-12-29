//@ts-ignore
import { virtual, html, useEffect, useCallback } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
// @ts-ignore
import Collapse from "bootstrap/js/src/collapse";
// @ts-ignore
import iconSearch from "../../img/icon-search.png";
// @ts-ignore
import iconTranslate from "../../img/icon-translate.png";

const TopNavigationIcons = virtual((() => {
  useEffect(() => {
    const translationScriptElement = document.createElement("script");
    translationScriptElement.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2";
    document.body.appendChild(translationScriptElement);
  }, []);

  const handleSearchIconMouseEnter = useCallback((e) => {
    const searchNavItem = e.target;
    const searchInputElement = searchNavItem.querySelector(
      'input[type="search"]'
    );
    searchInputElement && searchInputElement.classList.remove("d-lg-none");
    const spanElement = searchNavItem.querySelector("span");
    spanElement.classList.add("rounded-start");
    spanElement.classList.remove("rounded");
  }, []);

  const handleSearchIconMouseLeave = useCallback((e) => {
    const searchNavItem = e.target;
    const searchInputElement = searchNavItem.querySelector(
      'input[type="search"]'
    );
    searchInputElement && searchInputElement.classList.add("d-lg-none");
    const spanElement = searchNavItem.querySelector("span");
    spanElement.classList.remove("rounded-start");
    spanElement.classList.add("rounded");
  }, []);

  const handleTranslateIconMouseEnter = useCallback((e) => {
    const translateNavItem = e.target;
    const languageSelector = translateNavItem.querySelector("select");
    languageSelector && languageSelector.classList.remove("d-lg-none");
    const spanElement = translateNavItem.querySelector("span");
    spanElement.classList.add("rounded-start");
    spanElement.classList.remove("rounded");
  }, []);

  const handleTranslateIconMouseLeave = useCallback((e) => {
    const translateNavItem = e.target;
    const languageSelector = translateNavItem.querySelector("select");
    languageSelector && languageSelector.classList.add("d-lg-none");
    const spanElement = translateNavItem.querySelector("span");
    spanElement.classList.remove("rounded-start");
    spanElement.classList.add("rounded");
  }, []);

  return html`
    <li
      class="nav-item mt-3 mt-lg-0"
      id="search-nav-item"
      @mouseenter=${handleSearchIconMouseEnter}
      @mouseleave=${handleSearchIconMouseLeave}
    >
      <form class="d-flex h-100" method="get" action="/" target="_blank">
        <div class="input-group">
          <span
            class="input-group-text cursor-pointer bg-primary rounded"
            id="search"
            ><img src=${iconSearch} width="19px"
          /></span>
          <input
            type="search"
            placeholder="Search..."
            class="form-control d-lg-none"
            name="s"
            aria-label="search"
            autocomplete="off"
          />
        </div>
      </form>
    </li>
    <li
      class="nav-item mt-3 mt-lg-0"
      id="translate-nav-item"
      @mouseenter=${handleTranslateIconMouseEnter}
      @mouseleave=${handleTranslateIconMouseLeave}
    >
      <div class="input-group flex-nowrap align-items-center h-100">
        <span
          class="input-group-text cursor-pointer bg-primary h-100 rounded d-none d-lg-block"
          id="translate"
          ><img src=${iconTranslate} width="19px"
        /></span>
        <select
          onchange="doGTranslate(this);"
          class="h-100 d-lg-none form-control"
        >
          <option value="">Select Language</option>
          <option value="en|en">English</option>
          <option value="en|af">Afrikaans</option>
          <option value="en|sq">Albanian</option>
          <option value="en|ar">Arabic</option>
          <option value="en|hy">Armenian</option>
          <option value="en|az">Azerbaijani</option>
          <option value="en|eu">Basque</option>
          <option value="en|be">Belarusian</option>
          <option value="en|bg">Bulgarian</option>
          <option value="en|ca">Catalan</option>
          <option value="en|zh-CN">Chinese (Simplified)</option>
          <option value="en|zh-TW">Chinese (Traditional)</option>
          <option value="en|hr">Croatian</option>
          <option value="en|cs">Czech</option>
          <option value="en|da">Danish</option>
          <option value="en|nl">Dutch</option>
          <option value="en|et">Estonian</option>
          <option value="en|tl">Filipino</option>
          <option value="en|fi">Finnish</option>
          <option value="en|fr">French</option>
          <option value="en|gl">Galician</option>
          <option value="en|ka">Georgian</option>
          <option value="en|de">German</option>
          <option value="en|el">Greek</option>
          <option value="en|ht">Haitian Creole</option>
          <option value="en|iw">Hebrew</option>
          <option value="en|hi">Hindi</option>
          <option value="en|hu">Hungarian</option>
          <option value="en|is">Icelandic</option>
          <option value="en|id">Indonesian</option>
          <option value="en|ga">Irish</option>
          <option value="en|it">Italian</option>
          <option value="en|ja">Japanese</option>
          <option value="en|ko">Korean</option>
          <option value="en|lv">Latvian</option>
          <option value="en|lt">Lithuanian</option>
          <option value="en|mk">Macedonian</option>
          <option value="en|ms">Malay</option>
          <option value="en|mt">Maltese</option>
          <option value="en|no">Norwegian</option>
          <option value="en|fa">Persian</option>
          <option value="en|pl">Polish</option>
          <option value="en|pt">Portuguese</option>
          <option value="en|ro">Romanian</option>
          <option value="en|ru">Russian</option>
          <option value="en|sr">Serbian</option>
          <option value="en|sk">Slovak</option>
          <option value="en|sl">Slovenian</option>
          <option value="en|es">Spanish</option>
          <option value="en|sw">Swahili</option>
          <option value="en|sv">Swedish</option>
          <option value="en|th">Thai</option>
          <option value="en|tr">Turkish</option>
          <option value="en|uk">Ukrainian</option>
          <option value="en|ur">Urdu</option>
          <option value="en|vi">Vietnamese</option>
          <option value="en|cy">Welsh</option>
          <option value="en|yi">Yiddish</option>
          <option value="en|bn">Bengali</option>
          <option value="en|bs">Bosnian</option>
          <option value="en|ceb">Cebuano</option>
          <option value="en|eo">Esperanto</option>
          <option value="en|gu">Gujarati</option>
          <option value="en|ha">Hausa</option>
          <option value="en|hmn">Hmong</option>
          <option value="en|ig">Igbo</option>
          <option value="en|jw">Javanese</option>
          <option value="en|kn">Kannada</option>
          <option value="en|km">Khmer</option>
          <option value="en|lo">Lao</option>
          <option value="en|la">Latin</option>
          <option value="en|mi">Maori</option>
          <option value="en|mr">Marathi</option>
          <option value="en|mn">Mongolian</option>
          <option value="en|ne">Nepali</option>
          <option value="en|pa">Punjabi</option>
          <option value="en|so">Somali</option>
          <option value="en|ta">Tamil</option>
          <option value="en|te">Telugu</option>
          <option value="en|yo">Yoruba</option>
          <option value="en|zu">Zulu</option>
        </select>
        <div id="google_translate_element2" class="d-none"></div>
      </div>
    </li>
  `;
}) as VirtualRenderer);

export default TopNavigationIcons;
