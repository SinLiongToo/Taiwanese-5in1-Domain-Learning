# 🎒 五合一跨領域台語雙語學習 App (Taiwanese 5-in-1 Domain Learning WebApp)

[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-brightgreen?logo=github)](https://sinliongtoo.github.io/Taiwanese-5in1-Domain-Learning/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MOE Taigi Audio](https://img.shields.io/badge/MOE%20Audio-20261019--0109-orange)](https://github.com/ChhoeTaigi/KipSutianDataMirror)

這是一個專為兒童與台語初學者設計的**跨領域台語雙語互動式學習 WebApp**。本應用程式將生物人體、生活機械、臺灣地理、野生動物與本土昆蟲等五大範疇，融入真實高畫質圖鑑、向量標籤導引與趣味問答挑戰，讓學童以直覺有趣的方式學會正宗的教育部台語發音。

🌐 **線上立即體驗 (GitHub Pages)**：[https://sinliongtoo.github.io/Taiwanese-5in1-Domain-Learning/](https://sinliongtoo.github.io/Taiwanese-5in1-Domain-Learning/)

---

## 🌟 核心功能與設計特色

1. **跨領域五大主題學堂 (5-in-1 Domains)**
   - **🐻 野生動物 (Wildlife)**：臺灣黑熊（烏熊 `Ōo-hîm`）、臺灣梅花鹿、臺灣石虎（山貓）、臺灣獼猴（猴仔）、櫻花鉤吻鮭（鮭魚）、臺灣藍鵲（長尾山娘）等本土代表性特有種。
   - **🦋 常見昆蟲 (Insects)**：寬尾鳳蝶（尾蝶仔）、火金姑（`Hué-kim-koo`）、臺灣油蟬（蟬仔 `Siân-á`）、獨角仙（鹿角仙 `Lo̍k-kak-sian`）、蜻蜓（田嬰 `Tshên-enn`）、蜜蜂（`Bi̍t-phang`）。
   - **🗺️ 臺灣地理 (Geography)**：包括中央山脈、玉山山脈、雪山山脈、阿里山山脈、海岸山脈等五大山脈，淡水河、濁水溪、曾文溪、高屏溪等四大河流，以及日月潭、太魯閣峽谷、澎湖群島、臺灣海峽、花東縱谷等五大地標景觀的互動式地圖，共 14 個地理詞彙，全圖標籤無遮蔽、零重疊。
   - **🫁 人體結構 (Biology)**：採用醫學圖鑑全身解剖圖，涵蓋腦、心臟、肺、胃、肝臟、腰子（腎臟）、腸仔等核心器官，以及目睭（眼睛）、耳仔（耳朵）、鼻仔（鼻子/嘴巴）、手（Tshiú）、跤（腳）、皮膚（Phuê-hu）、骨頭（Kut-thâu）等 14 個全身器官與部位，雙向連動點擊發音。
   - **⚙️ 生活機械 (Machinery)**：包含腳踏車結構（外奶/內奶、鏈仔、手擋、馬角仔）與汽機車機件（引擎、火星塞、避震器、排氣管、電瓶）的正宗黑手台語，標籤錯位交錯無碰撞。

2. **教育部標準真人發音與 Web Audio API 播放引擎 (TTS Engine)**
   - **官方真人發音鏡像**：系統串接由 ChhoeTaigi 社群開源維護的教育部《臺灣台語常用詞辭典》官方真人語音 [KipSutianDataMirror](https://github.com/ChhoeTaigi/KipSutianDataMirror)（**最新活躍鏡像 `20261019-0109`**），全庫 108 筆音檔 100% 正常播放。
   - **Web Audio API 無延遲播放**：取代舊版 HTML5 Audio 序列串接，採用 `AudioContext`，並搭載 `trimAudioBuffer` 頭尾靜音裁切技術，消除音檔前後 15~80ms 的空白，使連續變調拼音自然流暢。
   - **正宗台語連續變調 (Tone Sandhi)**：
     - `烏熊`：念 `Ōo-hîm`（使用第 7 聲變調 ID `3383(1)` + `10645(1)`）。
     - `火金姑`：直接播放教育部整詞音檔 `1247(1)`。
     - `獨角仙`：教育部正音「鹿角仙」`8106(1)` + `1303(1)`（`Lo̍k-kak-sian`）。
     - `長尾山娘`：教育部官方整詞音檔 `29552(1)`。
     - `臺灣海峽`：正宗台語變調 `代(1308) + 丸(172) + 海峽(6187)` 朗讀 `Tâi-uân hái-kiap`。
     - `人體器官`：全面使用器官本名真人發音（非醫院科別）。
   - **離線擬真備援**：支援標準 Web Speech API（`zh-TW` 語音），內建「台語諧音字對照表」替換發音；防範 iPhone/Android 語音截斷，並支援 LINE 內嵌瀏覽器 `?openExternalBrowser=1` 轉導。

3. **醫學圖鑑級視覺與無重疊膠囊標籤**
   - 人體結構圖採用全身解剖真實圖鑑，左右各配置 7 枚直覺美觀的膠囊標籤，垂直上下維持 85px 等距間隔，零文字重疊、零標籤碰撞。
   - 虛線導引線（Leader Lines）連接至器官核心高光呼吸光環（Hotspot Glow & Pulse），點擊即亮、雙向互動。

4. **互動計時測驗與集章冊**
   - **台語大挑戰**：隨機出題並播放台語語音，學童需在 20 秒內選出正確的雙語目標。答對時飄落紙花，答錯則產生卡片震動反饋。
   - **特有種集章冊**：當答對 8 題以上（80分），即可解鎖一枚臺灣本土特有種野生動植物紀念章，進度自動儲存於 `localStorage`。

---

## 🛠️ 技術架構與模組劃分

- **核心頁面結構**：[index.html](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/geo地理，動物，人體，車，蟲/index.html)
- **視覺外觀與樣式**：[style.css](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/geo地理，動物，人體，車，蟲/style.css)（支援深淺色主題與 RWD 手機版面）
- **互動資料與語音引擎**：[app.js](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/geo地理，動物，人體，車，蟲/app.js)（Web Audio API + 教育部 `20261019-0109` CDN）
- **高畫質圖片資源**：[images/](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/geo地理，動物，人體，車，蟲/images/)（野生動物、昆蟲與人體解剖圖鑑）

---

## 🚀 本地啟動與運行方式

### 方式一：直接雙擊開啟
雙擊專案目錄下的 `index.html` 即可直接在瀏覽器中執行。

### 方式二：使用本機伺服器啟動 (推薦)
在專案根目錄下使用終端機執行本機伺服器：
```bash
# 使用 Python 內建伺服器
python -m http.server 8000

# 或使用 Node.js 輕量伺服器
npx -y live-server ./
```
接著在瀏覽器中輸入 `http://localhost:8000` 即可體驗！

---

## 📄 授權條款 (License)

本專案採 MIT License 授權釋出。語音資料源自中華民國教育部《臺灣台語常用詞辭典》（依政府資料開放授權條款利用）。
