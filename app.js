// LINE in-app browser redirect for full audio permissions
if (/\bLine\//i.test(navigator.userAgent) && !/[?&]openExternalBrowser=1/.test(location.search)) {
    location.replace(location.pathname + "?openExternalBrowser=1" + location.hash);
}

// ==========================================================================
// 1. Unified 5-in-1 Domain Database (Hanji, POJ, English, Audio IDs)
// ==========================================================================
const dataSource = {
    animal: {
        a_bear: {
            tw: { 
                name: "烏熊", 
                sub: "Oo-hîm", 
                phonetic: "Tâi-oân oo-hîm", 
                speech: "烏熊", 
                description: "臺灣特有亞種黑熊，胸前有獨特的白色 V 字形斑紋，是臺灣最具代表性的保育類野生動物。",
                audioSegments: ["烏_sandhi", "熊"]
            },
            en: { 
                name: "Formosan Black Bear", 
                sub: "烏熊", 
                phonetic: "Formosan Black Bear", 
                speech: "Formosan Black Bear", 
                description: "An endemic subspecies of the Asiatic black bear native to Taiwan, characterized by a white V-shaped patch on its chest."
            }
        },
        a_deer: {
            tw: { 
                name: "梅花鹿", 
                sub: "Muî-hue-lo̍k", 
                phonetic: "Tâi-uân muî-hue-lo̍k", 
                speech: "梅花鹿", 
                description: "臺灣特有亞種，身上有漂亮的梅花斑點。曾在野外絕跡，現已於墾丁國家公園與綠島復育成功。",
                audioSegments: ["梅花", "鹿"]
            },
            en: { 
                name: "Formosan Sika Deer", 
                sub: "梅花鹿", 
                phonetic: "Formosan Sika Deer", 
                speech: "Formosan Sika Deer", 
                description: "A deer subspecies endemic to Taiwan, famous for its white spots resembling plum blossoms."
            }
        },
        a_leopard: {
            tw: { 
                name: "石虎 (山貓)", 
                sub: "Tsio̍h-hóo / Suann-niau", 
                phonetic: "Tsio̍h-hóo (Suann-niau)", 
                speech: "山貓", 
                description: "臺灣僅存的貓科野生動物，額頭有兩條明顯的白色條紋，屬於瀕臨絕種的國家一級保育類。",
                audioSegments: ["山貓"]
            },
            en: { 
                name: "Leopard Cat", 
                sub: "石虎 (山貓)", 
                phonetic: "Leopard Cat", 
                speech: "Leopard Cat", 
                description: "Taiwan's last remaining native wild cat. It is an endangered species with beautiful spotted patterns like a leopard."
            }
        },
        a_monkey: {
            tw: { 
                name: "臺灣獼猴 (猴仔)", 
                sub: "Tâi-uân kâu (Kâu-á)", 
                phonetic: "Tâi-uân kâu (Kâu-á)", 
                speech: "猴仔", 
                description: "臺灣特有的唯二靈長類動物（另一為人類），群居在山林中，聰明好動，雙頰有儲存食物的頰囊。",
                audioSegments: ["猴", "仔"]
            },
            en: { 
                name: "Formosan Rock Macaque", 
                sub: "臺灣獼猴", 
                phonetic: "Formosan Rock Macaque", 
                speech: "Formosan Rock Macaque", 
                description: "A macaque species endemic to Taiwan, living in mountainous forests. Highly social and intelligent."
            }
        },
        a_salmon: {
            tw: { 
                name: "櫻花鉤吻鮭 (鮭魚)", 
                sub: "Kue-hî", 
                phonetic: "In-hua-kau-bún-kue / Kue-hî", 
                speech: "鮭魚", 
                description: "冰河時期遺留下來的「國寶魚」，是陸封型的鮭魚，棲息於大甲溪上游七家灣溪的清冷溪水中。",
                audioSegments: ["鮭", "魚"]
            },
            en: { 
                name: "Formosan Landlocked Salmon", 
                sub: "鮭魚", 
                phonetic: "Formosan Landlocked Salmon", 
                speech: "Formosan Landlocked Salmon", 
                description: "A precious glacial relic salmon species landlocked in high-altitude streams of Taiwan."
            }
        },
        a_magpie: {
            tw: { 
                name: "臺灣藍鵲 (長尾山娘)", 
                sub: "Tn̂g-bué-suann-niû", 
                phonetic: "Tn̂g-bué-suann-niû (Suann-niû)", 
                speech: "長尾山娘", 
                description: "臺灣特有種鳥類，擁有豔藍的身軀、鮮紅的嘴與長尾巴。習慣群體活動，有特殊的「巢邊幫手」家族育雛行為。",
                audioSegments: ["長尾山娘"]
            },
            en: { 
                name: "Formosan Blue Magpie", 
                sub: "長尾山娘", 
                phonetic: "Formosan Blue Magpie", 
                speech: "Formosan Blue Magpie", 
                description: "A stunning bird species endemic to Taiwan, known for its long tail, bright blue body, and red bill."
            }
        }
    },
    insect: {
        i_butterfly: {
            tw: { 
                name: "寬尾鳳蝶 (尾蝶仔)", 
                sub: "Kuan-bué hōng-ia̍h (Bué-ia̍h-á)", 
                phonetic: "Bué-ia̍h-á", 
                speech: "尾蝶仔", 
                description: "臺灣特有種國寶蝴蝶，後翅有著極寬大的尾狀突起與鮮紅魚鱗狀斑紋，幼蟲僅吃稀有的臺灣擦樹葉子。",
                audioSegments: ["尾蝶", "仔"]
            },
            en: { 
                name: "Broad-tailed Swallowtail", 
                sub: "寬尾鳳蝶", 
                phonetic: "Broad-tailed Swallowtail", 
                speech: "Broad-tailed Swallowtail", 
                description: "A magnificent swallowtail butterfly endemic to Taiwan, featuring a distinct broad red tail."
            }
        },
        i_firefly: {
            tw: { 
                name: "火金姑", 
                sub: "Hué-kim-koo", 
                phonetic: "Hué-kim-koo", 
                speech: "火金姑", 
                description: "尾部會發出亮光的昆蟲，棲息在乾淨沒有污染的溪流草叢中，是夏夜裡最美麗的天然螢光綠燈籠。",
                audioSegments: ["火金姑"]
            },
            en: { 
                name: "Firefly (Lightning Bug)", 
                sub: "火金姑", 
                phonetic: "Firefly", 
                speech: "Firefly", 
                description: "A nocturnal beetle that produces light chemically from its abdomen. An indicator of a clean environment."
            }
        },
        i_cicada: {
            tw: { 
                name: "臺灣油蟬 (蟬仔)", 
                sub: "Siân-á", 
                phonetic: "Siân-á", 
                speech: "蟬仔", 
                description: "夏天在樹梢大聲鳴唱的昆蟲，雄蟬拍動腹部的發音器來吸引雌蟬，牠們一生大多時間都在泥土中成長。",
                audioSegments: ["蟬仔"]
            },
            en: { 
                name: "Formosan Oil Cicada", 
                sub: "蟬仔", 
                phonetic: "Formosan Oil Cicada", 
                speech: "Formosan Oil Cicada", 
                description: "An insect famous for its loud buzzing song in summer. It lives underground as a nymph for years before emerging."
            }
        },
        i_beetle: {
            tw: { 
                name: "獨角仙 (鹿角仙)", 
                sub: "Lo̍k-kak-sian", 
                phonetic: "Lo̍k-kak-sian", 
                speech: "鹿角仙", 
                description: "大型甲蟲，雄蟲頭部長有像鹿角般的壯觀犄角。喜愛吸食光蠟樹的樹液，是森林中的大力士。",
                audioSegments: ["鹿角", "仙"]
            },
            en: { 
                name: "Rhinoceros Beetle", 
                sub: "獨角仙", 
                phonetic: "Rhinoceros Beetle", 
                speech: "Rhinoceros Beetle", 
                description: "A strong, armored beetle named after the horn-like structures on the male's head, used for wrestling rivals."
            }
        },
        i_dragonfly: {
            tw: { 
                name: "蜻蜓 (田嬰)", 
                sub: "Tshên-enn", 
                phonetic: "Tshên-enn / Tshên-inn", 
                speech: "田嬰", 
                description: "擁有複眼與四片透明翅膀的飛行高手，能在空中懸停甚至倒飛，常在水面上點水產卵（蜻蜓點水）。",
                audioSegments: ["田嬰"]
            },
            en: { 
                name: "Dragonfly", 
                sub: "田嬰", 
                phonetic: "Dragonfly", 
                speech: "Dragonfly", 
                description: "An agile flying insect with large compound eyes and transparent wings. It is a highly efficient aerial predator."
            }
        },
        i_bee: {
            tw: { 
                name: "蜜蜂", 
                sub: "Bi̍t-phang", 
                phonetic: "Bi̍t-phang", 
                speech: "蜜蜂", 
                description: "社會性昆蟲，為大自然的花朵傳播花粉，生產甜美的蜂蜜。牠們跳舞來向同伴傳達花蜜的位置資訊。",
                audioSegments: ["蜜", "蜂"]
            },
            en: { 
                name: "Honeybee", 
                sub: "蜜蜂", 
                phonetic: "Honeybee", 
                speech: "Honeybee", 
                description: "A social insect that plays a crucial role in pollination and honey production. Communicates via the waggle dance."
            }
        }
    },
    geography: {
        m_central: {
            tw: { 
                name: "中央山脈", 
                sub: "Tiong-iong suann-me̍h", 
                phonetic: "Tiong-iong suann-me̍h", 
                speech: "中央山脈", 
                description: "縱貫整個臺灣島的核心山脈，被稱為「臺灣的屋脊」，也是天然的護國神山，阻擋太平洋強烈颱風。",
                audioSegments: ["中央", "山脈"]
            },
            en: { 
                name: "Central Mountain Range", 
                sub: "中央山脈", 
                phonetic: "Central Mountain Range", 
                speech: "Central Mountain Range", 
                description: "The main mountain range running from north to south of Taiwan, acting as the island's geological backbone."
            }
        },
        m_yushan: {
            tw: { 
                name: "玉山山脈 (玉山)", 
                sub: "Gio̍k-san suann-me̍h", 
                phonetic: "Gio̍k-san suann-me̍h", 
                speech: "玉山山脈", 
                description: "玉山主峰海拔 3,952 公尺，是臺灣與東北亞第一高峰，高山氣候涼冷，山頂冬季積雪耀眼如白玉。",
                audioSegments: ["玉山", "山脈"]
            },
            en: { 
                name: "Yushan Range (Mt. Jade)", 
                sub: "玉山山脈", 
                phonetic: "Yushan Range", 
                speech: "Yushan Range", 
                description: "The highest mountain range in Northeast Asia, featuring Yushan Main Peak rising 3,952 meters above sea level."
            }
        },
        m_xueshan: {
            tw: { 
                name: "雪山山脈", 
                sub: "Suat-suann suann-me̍h", 
                phonetic: "Suat-suann suann-me̍h", 
                speech: "雪山山脈", 
                description: "位於臺灣北部的山脈，主峰雪山擁有發達的冰斗冰河地形，冬季常降雪，生態多樣性極為豐富。",
                audioSegments: ["雪", "山", "山脈"]
            },
            en: { 
                name: "Xueshan Range", 
                sub: "雪山山脈", 
                phonetic: "Xueshan Mountain Range", 
                speech: "Xueshan Mountain Range", 
                description: "A major mountain range in northern Taiwan, home to Mt. Snow and beautiful glacial cirques."
            }
        },
        m_alishan: {
            tw: { 
                name: "阿里山山脈", 
                sub: "A-lí-san suann-me̍h", 
                phonetic: "A-lí-san suann-me̍h", 
                speech: "阿里山山脈", 
                description: "以巨木群、日出、雲海與高山小火車聞名的山區，檜木林資源曾被大量開採，現為觀光生態教育重鎮。",
                audioSegments: ["阿里山", "山脈"]
            },
            en: { 
                name: "Alishan Range", 
                sub: "阿里山山脈", 
                phonetic: "Alishan Range", 
                speech: "Alishan Range", 
                description: "Famous mountain resort region celebrated for its sunrise, sea of clouds, forest railway, and ancient cypress forests."
            }
        },
        m_coastal: {
            tw: { 
                name: "海岸山脈", 
                sub: "Hái-huānn suann-me̍h", 
                phonetic: "Hái-huānn suann-me̍h", 
                speech: "海岸山脈", 
                description: "緊鄰太平洋的狹長山脈，由菲律賓海板塊撞擊歐亞板塊所推擠而成，與中央山脈隔著花東縱谷遙遙相對。",
                audioSegments: ["海岸", "山脈"]
            },
            en: { 
                name: "Coastal Range", 
                sub: "海岸山脈", 
                phonetic: "Coastal Mountain Range", 
                speech: "Coastal Mountain Range", 
                description: "The easternmost mountain range on Taiwan island, formed by plates collision, facing the Pacific Ocean directly."
            }
        },
        r_tamsui: {
            tw: { 
                name: "淡水河", 
                sub: "Tām-tsuí-hô", 
                phonetic: "Tām-tsuí-hô", 
                speech: "淡水河", 
                description: "流經大臺北盆地的主要河流，匯集大漢溪、新店溪與基隆河，是北臺灣歷史航運與現代生活最重要的母親河。",
                audioSegments: ["淡水", "河"]
            },
            en: { 
                name: "Tamsui River", 
                sub: "淡水河", 
                phonetic: "Tamsui River", 
                speech: "Tamsui River", 
                description: "The primary river of the Taipei Metropolitan Basin, historically vital for northern Taiwan shipping and water supply."
            }
        },
        r_zhuoshui: {
            tw: { 
                name: "濁水溪", 
                sub: "Lô-tsuí-khe", 
                phonetic: "Lô-tsuí-khe", 
                speech: "濁水溪", 
                description: "全長約 186 公里，是臺灣最長的河流。因夾帶大量板岩黑泥沙而水色混濁，沖積出肥沃的彰化平原與濁水米。",
                audioSegments: ["濁水", "溪"]
            },
            en: { 
                name: "Zhuoshui River", 
                sub: "濁水溪", 
                phonetic: "Zhuoshui River", 
                speech: "Zhuoshui River", 
                description: "Taiwan's longest river (approx. 186 km), named for its murky water rich in dark slate silt that nourishes the Changhua plain."
            }
        },
        r_zengwen: {
            tw: { 
                name: "曾文溪", 
                sub: "Tsan-bûn-khe", 
                phonetic: "Tsan-bûn-khe", 
                speech: "曾文溪", 
                description: "南臺灣重要河川，上游建有臺灣蓄水量最大的曾文水庫，河口黑面琵鷺保護區是國際級候鳥度冬重要棲地。",
                audioSegments: ["曾", "文", "溪"]
            },
            en: { 
                name: "Zengwen River", 
                sub: "曾文溪", 
                phonetic: "Zengwen River", 
                speech: "Zengwen River", 
                description: "A major river in southern Taiwan, home to Tsengwen Reservoir and world-famous wintering wetlands for black-faced spoonbills."
            }
        },
        r_gaoping: {
            tw: { 
                name: "高屏溪", 
                sub: "Ko-pîn-khe", 
                phonetic: "Ko-pîn-khe", 
                speech: "高屏溪", 
                description: "流域面積最大的臺灣河川，發源於玉山東南麓，滋養了廣闊的高屏平原，也是高雄與屏東重要的民生水資源。",
                audioSegments: ["高", "憑", "溪"]
            },
            en: { 
                name: "Gaoping River", 
                sub: "高屏溪", 
                phonetic: "Gaoping River", 
                speech: "Gaoping River", 
                description: "The largest river in Taiwan by drainage basin area, flowing through and nurturing the expansive Kaohsiung-Pingtung plains."
            }
        },
        l_sunmoonlake: {
            tw: { 
                name: "日月潭", 
                sub: "Ji̍t-gua̍t-thâm", 
                phonetic: "Ji̍t-gua̍t-thâm (Ji̍t-gue̍h-thâm)", 
                speech: "日月潭", 
                description: "臺灣最知名的天然半淡水高山湖泊，東側形如日輪，西側狀如月鉤，四周青山環抱，是邵族世代生活的聖地。",
                audioSegments: ["日月潭"]
            },
            en: { 
                name: "Sun Moon Lake", 
                sub: "日月潭", 
                phonetic: "Sun Moon Lake", 
                speech: "Sun Moon Lake", 
                description: "Taiwan's most renowned scenic alpine lake, named because its eastern part looks like a sun and western part like a crescent moon."
            }
        },
        l_taroko: {
            tw: { 
                name: "太魯閣 (太魯閣峽)", 
                sub: "Thài-lóo-koh", 
                phonetic: "Thài-lóo-koh", 
                speech: "太魯閣", 
                description: "由立霧溪歷經千萬年深切大理石岩層所形成的世界級壯麗大峽谷，峭壁千仞，景色雄偉險峻。",
                audioSegments: ["太", "魯", "閣"]
            },
            en: { 
                name: "Taroko Gorge", 
                sub: "太魯閣", 
                phonetic: "Taroko Gorge", 
                speech: "Taroko Gorge", 
                description: "A world-class marble gorge carved through the mountains over millions of years by the torrential Liwu River."
            }
        },
        l_penghu: {
            tw: { 
                name: "澎湖 (澎湖群島)", 
                sub: "Phînn-ôo", 
                phonetic: "Phînn-ôo", 
                speech: "澎湖", 
                description: "臺灣海峽上由近百座火山島嶼組成的璀璨群島，擁有壯觀的玄武岩方山柱狀節理與傳統石滬捕魚文化。",
                audioSegments: ["鼻_澎", "湖"]
            },
            en: { 
                name: "Penghu Islands (Pescadores)", 
                sub: "澎湖", 
                phonetic: "Penghu Archipelago", 
                speech: "Penghu Archipelago", 
                description: "An archipelago of 90 islands in the Taiwan Strait, famous for dramatic columnar basalt cliffs and ancient twin-heart stone weirs."
            }
        },
        l_taiwan_strait: {
            tw: { 
                name: "臺灣海峽", 
                sub: "Tâi-uân hái-kiap", 
                phonetic: "Tâi-uân hái-kiap", 
                speech: "臺灣海峽", 
                description: "分隔臺灣本島與歐亞大陸的寬闊海峽，平均深度約 60 公尺，是東亞國際海運航道與富饒的海洋漁場。",
                audioSegments: ["代_台", "丸_灣", "海峽"]
            },
            en: { 
                name: "Taiwan Strait", 
                sub: "臺灣海峽", 
                phonetic: "Taiwan Strait", 
                speech: "Taiwan Strait", 
                description: "The 180-kilometer-wide strait separating the island of Taiwan from the Asian mainland, a vital global shipping corridor."
            }
        },
        l_east_rift: {
            tw: { 
                name: "花東縱谷", 
                sub: "Hua-tang tsiòng-kok", 
                phonetic: "Hua-tang tsiòng-kok", 
                speech: "花東縱谷", 
                description: "夾在中央山脈與海岸山脈之間的狹長構造谷地，剛好位處歐亞板塊與菲律賓海板塊縫合線上，稻浪沃野千里。",
                audioSegments: ["花", "東", "獎_縱", "國_谷"]
            },
            en: { 
                name: "East Rift Valley", 
                sub: "花東縱谷", 
                phonetic: "East Rift Valley (Huadong)", 
                speech: "East Rift Valley", 
                description: "A long, fertile valley between the Central and Coastal mountain ranges, situated on the tectonic collision suture line."
            }
        }
    },
    body: {
        b_brain: {
            tw: { 
                name: "腦", 
                sub: "Náu", 
                phonetic: "Náu", 
                speech: "腦", 
                description: "人體的神經中樞與指揮官，控制思考、記憶、語言、情感，並調節全身各器官系統的日常運作。",
                audioSegments: ["腦"]
            },
            en: { 
                name: "Brain", 
                sub: "腦", 
                phonetic: "Brain", 
                speech: "Brain", 
                description: "The central organ of the human nervous system, controlling thought, memory, emotion, touch, and motor skills."
            }
        },
        b_heart: {
            tw: { 
                name: "心臟", 
                sub: "Sim-tsōng", 
                phonetic: "Sim-tsōng", 
                speech: "心臟", 
                description: "強而有力的肌肉幫浦，日夜不停收縮跳動，將充滿氧氣與養分的血液推送到全身每一個微小細胞。",
                audioSegments: ["心臟"]
            },
            en: { 
                name: "Heart", 
                sub: "心臟", 
                phonetic: "Heart", 
                speech: "Heart", 
                description: "A muscular organ that pumps blood throughout the circulatory system, supplying oxygen and nutrients to tissues."
            }
        },
        b_lung: {
            tw: { 
                name: "肺", 
                sub: "Hì", 
                phonetic: "Hì", 
                speech: "肺", 
                description: "呼吸系統的核心器官，位於胸腔兩側，由數億個微小肺泡組成，負責將新鮮氧氣吸入血液並排出二氧化碳。",
                audioSegments: ["肺"]
            },
            en: { 
                name: "Lungs", 
                sub: "肺", 
                phonetic: "Lungs", 
                speech: "Lungs", 
                description: "The primary organs of the respiratory system, facilitating gas exchange between the bloodstream and the air."
            }
        },
        b_stomach: {
            tw: { 
                name: "胃", 
                sub: "Uī", 
                phonetic: "Uī", 
                speech: "胃", 
                description: "強壯的肌肉囊狀消化器官，能分泌強酸性胃液與消化酵素，磨碎食物並初步分解蛋白質成食糜。",
                audioSegments: ["胃"]
            },
            en: { 
                name: "Stomach", 
                sub: "胃", 
                phonetic: "Stomach", 
                speech: "Stomach", 
                description: "A muscular organ located in the upper abdomen that secretes acid and enzymes to digest food thoroughly."
            }
        },
        b_liver: {
            tw: { 
                name: "肝臟 (肝)", 
                sub: "Kuann-tsōng / Kuann", 
                phonetic: "Kuann-tsōng", 
                speech: "肝臟", 
                description: "人體內最大的實質解毒與代謝器官，負責製造膽汁分解脂肪、合成凝血因子，並儲存肝醣提供能量。",
                audioSegments: ["肝臟"]
            },
            en: { 
                name: "Liver", 
                sub: "肝臟", 
                phonetic: "Liver", 
                speech: "Liver", 
                description: "The largest internal organ, responsible for detoxifying chemicals, processing drugs, and secreting bile."
            }
        },
        b_kidney: {
            tw: { 
                name: "腰子 (腎臟)", 
                sub: "Io-tsí (Sīn-tsōng)", 
                phonetic: "Io-tsí", 
                speech: "腰子", 
                description: "形如蠶豆的排泄器官，位於後腰兩側，如同精密濾水器過濾血液代謝廢物，產生尿液並調節體液水分平衡。",
                audioSegments: ["腰子"]
            },
            en: { 
                name: "Kidneys", 
                sub: "腰子 (腎臟)", 
                phonetic: "Kidneys", 
                speech: "Kidneys", 
                description: "Bean-shaped organs located in the flank that filter waste products, excess water, and impurities from blood to form urine."
            }
        },
        b_intestines: {
            tw: { 
                name: "腸仔 (小腸與大腸)", 
                sub: "Tn̂g-á", 
                phonetic: "Tn̂g-á", 
                speech: "腸仔", 
                description: "長達數公尺的消化管道。小腸負責吸收絕大部分營養素，大腸則吸收水分、電解質並形成糞便排出體外。",
                audioSegments: ["腸仔"]
            },
            en: { 
                name: "Intestines", 
                sub: "腸仔", 
                phonetic: "Intestines", 
                speech: "Intestines", 
                description: "The lower part of the gastrointestinal tract, comprising the small and large intestines for nutrient and water absorption."
            }
        },
        b_eyes: {
            tw: { 
                name: "目睭", 
                sub: "Ba̍k-tsiu", 
                phonetic: "Ba̍k-tsiu", 
                speech: "目睭", 
                description: "視覺感覺器官，透過角膜與水晶體聚焦光線至視網膜，將光信號轉化為神經訊號傳送至大腦形成清晰影像。",
                audioSegments: ["目睭"]
            },
            en: { 
                name: "Eyes", 
                sub: "目睭", 
                phonetic: "Eyes", 
                speech: "Eyes", 
                description: "Organs of the visual system that detect light and convert it into electrochemical impulses in neurons."
            }
        },
        b_ear: {
            tw: { 
                name: "耳仔", 
                sub: "Hīnn-á", 
                phonetic: "Hīnn-á", 
                speech: "耳仔", 
                description: "聽覺與平衡感覺器官，耳廓收集聲波經耳膜與聽小骨傳至內耳耳蝸，半規管則負責感知身體方位與動態平衡。",
                audioSegments: ["耳仔"]
            },
            en: { 
                name: "Ears", 
                sub: "耳仔", 
                phonetic: "Ears", 
                speech: "Ears", 
                description: "Organs of hearing and balance, consisting of outer, middle, and inner sections that sense sound vibrations and equilibrium."
            }
        },
        b_nose: {
            tw: { 
                name: "鼻仔 (鼻仔/喙)", 
                sub: "Phīnn-á", 
                phonetic: "Phīnn-á", 
                speech: "鼻仔", 
                description: "呼吸道的入口與嗅覺器官，鼻腔內黏膜可溫暖、濕潤並過濾吸入的空氣，嗅神經細胞能分辨數千種氣味。",
                audioSegments: ["鼻仔"]
            },
            en: { 
                name: "Nose & Mouth", 
                sub: "鼻仔", 
                phonetic: "Nose", 
                speech: "Nose", 
                description: "The primary organ for smell and the entry point for the respiratory tract, warming and filtering inhaled air."
            }
        },
        b_hand: {
            tw: { 
                name: "手", 
                sub: "Tshiú", 
                phonetic: "Tshiú", 
                speech: "手", 
                description: "人類靈巧的上肢末端，擁有對生的大拇指與指尖豐富的觸覺神經，能精準抓取工具、寫字與進行細膩操作。",
                audioSegments: ["手"]
            },
            en: { 
                name: "Hand", 
                sub: "手", 
                phonetic: "Hand", 
                speech: "Hand", 
                description: "The distal part of the upper limb, featuring opposable thumbs and highly sensitive fingertips for grasping and manipulation."
            }
        },
        b_foot: {
            tw: { 
                name: "跤 (腳與腿)", 
                sub: "Kha", 
                phonetic: "Kha", 
                speech: "跤", 
                description: "支撐全身重量並負責站立、行走、奔跑的下肢構造，腳底足弓具有極佳的避震緩衝效果。",
                audioSegments: ["跤"]
            },
            en: { 
                name: "Foot & Leg", 
                sub: "跤", 
                phonetic: "Foot / Leg", 
                speech: "Foot", 
                description: "The lower limb structure that bears body weight, enables bipedal locomotion, and absorbs shock while walking."
            }
        },
        b_skin: {
            tw: { 
                name: "皮膚 (皮)", 
                sub: "Phuê-hu (Phuê)", 
                phonetic: "Phuê-hu", 
                speech: "皮膚", 
                description: "人體面積最大的器官，構成抵禦病原體與物理損傷的第一道天然屏障，並負責調節體溫與感受觸覺冷熱。",
                audioSegments: ["皮膚"]
            },
            en: { 
                name: "Skin", 
                sub: "皮膚", 
                phonetic: "Skin", 
                speech: "Skin", 
                description: "The outer protective covering of the body, functioning as the primary barrier against environmental pathogens and regulating body temperature."
            }
        },
        b_bone: {
            tw: { 
                name: "骨頭 (人體骨骼)", 
                sub: "Kut-thâu", 
                phonetic: "Kut-thâu", 
                speech: "骨頭", 
                description: "人體全身 206 塊堅硬骨骼組成的框架結構，支撐身體、保護脆弱內臟，骨髓腔更具備關鍵的造血機能。",
                audioSegments: ["骨頭"]
            },
            en: { 
                name: "Bones (Skeleton)", 
                sub: "骨頭", 
                phonetic: "Bones", 
                speech: "Bones", 
                description: "The rigid structural framework of 206 bones that protects internal organs, enables movement, and produces blood cells in bone marrow."
            }
        }
    },
    machinery: {
        m_tire: {
            tw: { 
                name: "外奶/內奶 (外胎/內胎)", 
                sub: "Guā-ling / Lāi-ling", 
                phonetic: "Guā-ling / Lāi-ling", 
                speech: "外奶內奶", 
                description: "跤踏車與機車的輪胎。外胎（外奶）刻有深淺胎紋提供抓地力，內胎（內奶）充填高壓空氣提供彈性緩衝。",
                audioSegments: ["外", "奶", "內奶"]
            },
            en: { 
                name: "Tires (Outer & Inner)", 
                sub: "外奶/內奶", 
                phonetic: "Tires", 
                speech: "Tires", 
                description: "The outer tire with tread patterns provides traction and puncture protection, while the inner tube holds pressurized air."
            }
        },
        m_chain: {
            tw: { 
                name: "鏈仔 (鏈條)", 
                sub: "Liān-á", 
                phonetic: "Liān-á", 
                speech: "鏈仔", 
                description: "串接大齒盤與後輪飛輪的金屬傳動鏈條，負責將騎士腳踩踏板的機械動力高效傳遞至後輪推進車輛前進。",
                audioSegments: ["鏈仔"]
            },
            en: { 
                name: "Bicycle Chain", 
                sub: "鏈仔", 
                phonetic: "Chain", 
                speech: "Chain", 
                description: "A roller chain that transfers power from the pedals and chainring to the rear drive-wheel sprocket."
            }
        },
        m_brake: {
            tw: { 
                name: "手擋 (煞車)", 
                sub: "Tshiú-tòng", 
                phonetic: "Tshiú-tòng", 
                speech: "手擋", 
                description: "手把上的煞車把手與制動系統，騎士握下煞車把手拉動煞車線，帶動夾器摩擦輪圈或碟盤降速停下車輛。",
                audioSegments: ["手擋"]
            },
            en: { 
                name: "Bicycle Hand Brake", 
                sub: "手擋", 
                phonetic: "Hand Brake", 
                speech: "Hand Brake", 
                description: "The handlebar lever and braking mechanism that clamps brake pads against the rim or rotor to stop the bicycle."
            }
        },
        m_handlebar: {
            tw: { 
                name: "馬角仔 (車把手)", 
                sub: "Bé-kak-á", 
                phonetic: "Bé-kak-á", 
                speech: "馬角仔", 
                description: "車龍頭兩側延伸的操控把手，狀如奔馬雙角。控制前輪轉向角度、維持車身平衡，並安裝煞車把與變速撥桿。",
                audioSegments: ["馬", "角", "仔"]
            },
            en: { 
                name: "Handlebars", 
                sub: "馬角仔", 
                phonetic: "Handlebars", 
                speech: "Handlebars", 
                description: "The steering control structure of a bicycle or motorbike, providing mounting points for brakes, shifters, and bells."
            }
        },
        m_engine: {
            tw: { 
                name: "引擎 (發動機)", 
                sub: "Ián-jín", 
                phonetic: "Ián-jín", 
                speech: "引擎", 
                description: "汽機車的心臟，透過進氣、壓縮、燃燒膨脹、排氣四行程，將汽油燃燒的化學能量轉化為旋轉機械動力推動車輛。",
                audioSegments: ["引擎_煙", "引擎_恁"]
            },
            en: { 
                name: "Engine (Motor)", 
                sub: "引擎", 
                phonetic: "Engine", 
                speech: "Engine", 
                description: "The internal combustion power unit that converts thermal energy from fuel combustion into mechanical motion."
            }
        },
        m_sparkplug: {
            tw: { 
                name: "火星塞", 
                sub: "Hué-tshenn-sai", 
                phonetic: "Hué-tshenn-sai", 
                speech: "火星塞", 
                description: "安裝於汽缸頂部的關鍵點火組件，利用高壓電在電極間隙釋放數萬伏特的強烈電火花，點燃汽缸內的霧化混合氣體。",
                audioSegments: ["火星", "塞_西"]
            },
            en: { 
                name: "Spark Plug", 
                sub: "火星塞", 
                phonetic: "Spark Plug", 
                speech: "Spark Plug", 
                description: "An electrical device fitted into the cylinder head of an engine to ignite compressed fuel with an electric spark."
            }
        },
        m_shock: {
            tw: { 
                name: "避震器", 
                sub: "Pī-tsìn-khì", 
                phonetic: "Pī-tsìn-khì", 
                speech: "避震器", 
                description: "由金屬彈簧與液壓阻尼器構成的懸吊系統，能迅速吸收路面顛簸衝擊，確保行車平穩舒適並維持輪胎貼地抓地力。",
                audioSegments: ["避_閉", "震_進", "器"]
            },
            en: { 
                name: "Shock Absorber", 
                sub: "避震器", 
                phonetic: "Shock Absorber", 
                speech: "Shock Absorber", 
                description: "A mechanical or hydraulic device designed to absorb and dampen shock impulses from uneven road surfaces."
            }
        },
        m_exhaust: {
            tw: { 
                name: "排氣管", 
                sub: "Pâi-khì-kńg", 
                phonetic: "Pâi-khì-kńg", 
                speech: "排氣管", 
                description: "引擎排氣系統管路，內建觸媒轉化器消除有害廢氣分子，並透過消音器腔室大幅降低引擎劇烈爆燃所產生的巨大噪音。",
                audioSegments: ["排氣", "管"]
            },
            en: { 
                name: "Exhaust Pipe (Muffler)", 
                sub: "排氣管", 
                phonetic: "Exhaust Pipe", 
                speech: "Exhaust Pipe", 
                description: "Piping used to guide exhaust gases away from a controlled combustion engine while reducing emissions and sound volume."
            }
        },
        m_battery: {
            tw: { 
                name: "電瓶 (蓄電池)", 
                sub: "Tiān-pân", 
                phonetic: "Tiān-pân", 
                speech: "電瓶", 
                description: "車輛的可重複充電鉛酸或鋰蓄電池，提供啟動馬達發動引擎時所需的瞬間強大電流，並在熄火時供應全車電氣設備電力。",
                audioSegments: ["電", "瓶"]
            },
            en: { 
                name: "Automotive Battery", 
                sub: "電瓶", 
                phonetic: "Battery", 
                speech: "Battery", 
                description: "A rechargeable battery that supplies electrical current to the starting motor to ignite the vehicle's chemical engine."
            }
        }
    }
};

// ==========================================================================
// 2. ChhoeTaigi Audio Map (KipSutian database entries mappings)
// ==========================================================================
const taigiAudioMap = {
    // 數字及常用基礎詞
    "一_quantity": "1(1)", "一_digit": "2(1)", "二": "44(1)", "三": "163(1)", "四": "1408(1)", 
    "五": "565(1)", "六": "578(1)", "七": "40(1)", "八": "49(1)", "九": "41(1)", "十": "54(1)",
    "兩": "3584(1)", "百": "2585(1)", "千": "180(1)",
    
    // 動物相關 (Tone Sandhi 嚴格變調與 MOE 正音)
    "烏_sandhi": "3383(1)", // 烏 (oo1 -> ōo7 變調 ID 3383)
    "熊": "10645(1)",        // 熊 (hîm ID 10645) -> 烏熊 (Ōo-hîm)
    "梅花": "7451(1)", "鹿": "8086(1)", 
    "山貓": "531(1)", "石虎": "10190(1)",
    "猴": "8571(1)", "仔": "1300(1)", 
    "鮭": "3364(1)", "魚": "8084(1)", 
    "長尾山娘": "29552(1)", "山娘": "531(1)",
    
    // 昆蟲相關
    "尾蝶": "3121(1)", "蝴蝶": "11374(1)", 
    "火金姑": "1247(1)",    // 火金蛄 (hué-kim-koo ID 1247 一字不缺)
    "蟬仔": "12599(1)",     // 蟬仔 (siân-á ID 12599)
    "鹿角": "8106(1)", "仙": "1303(1)", // 鹿角 (lo̍k-kak ID 8106) + 仙 (sian ID 1303) -> 獨角仙
    "田嬰": "2017(1)",      // 田嬰 (tshên-enn ID 2017)
    "蜜": "10801(1)", "蜂": "9989(1)",
    
    // 地理相關
    "中央": "22306(1)", "山脈": "25998(1)", 
    "玉山": "26092(1)", 
    "雪": "8012(1)", "山": "198(1)", // 雪 (suat ID 8012) + 山 (suann ID 198) + 山脈 -> 雪山山脈
    "阿里山": "20877(1)", 
    "海岸": "6175(1)", 
    "淡水": "7521(1)", "河": "4253(1)", 
    "濁水": "20855(1)", 
    "曾": "12287(1)", "文": "796(1)", "溪": "9642(1)", 
    "高": "6801(1)", "憑": "11637(1)", // 高 (ko ID 6801) + 憑 (pîn ID 11637) + 溪 -> 高屏溪
    "日月潭": "24425(1)", // 日月潭 (Ji̍t-gua̍t-thâm ID 24425)
    "太": "785(1)", "魯": "11567(1)", "閣": "10906(1)", // 太魯閣
    "鼻_澎": "10938(1)", "湖": "8546(1)", // 鼻 (phīnn7 ID 10938, phînn5之第7聲變調) + 湖 (ôo ID 8546) -> 澎湖
    "代_台": "1308(1)", "丸_灣": "172(1)", "海峽": "6187(1)", // 代 (tāi7) + 丸 (uân5) + 海峽 (hái-kiap) -> 臺灣海峽
    "花": "4425(1)", "東": "4187(1)", "獎_縱": "11205(1)", "國_谷": "7071(1)", // 花東縱谷
    
    // 人體器官 (本尊器官名稱，非醫院科別！)
    "腦": "9855(1)",
    "心臟": "1204(1)",
    "肺": "4422(1)",
    "胃": "5372(1)",
    "肝臟": "28741(1)", "肝": "3343(1)",
    "腰子": "9871(1)", "腎": "8901(1)",
    "腸仔": "9884(1)",
    "目睭": "1975(1)",
    "耳仔": "2633(1)",
    "鼻仔": "10943(1)",
    "手": "794(1)",
    "跤": "10059(1)",
    "皮": "1853(1)", "皮膚": "2003(1)",
    "骨頭": "23932(1)",
    
    // 機械相關
    "外": "1410(1)", "奶": "1637(1)", "內奶": "634(1)",
    "鏈仔": "12420(1)", // 鏈仔 (liān-á ID 12420)
    "手擋": "1155(1)",  // 手擋 (tshiú-tòng ID 1155)
    "馬": "6798(1)", "角": "3386(1)",
    "引擎_煙": "9690(1)", "引擎_恁": "5950(1)", // 煙 (ian1變調) + 恁 (lín2) -> 引擎 (Ián-jín)
    "火星": "1252(1)", "塞_西": "2831(1)", // 火星 (hué-tshenn) + 西 (sai) -> 火星塞
    "避_閉": "8006(1)", "震_進": "9104(1)", "器": "11593(1)", // 閉 (pì) + 進 (tsìn) + 器 (khì) -> 避震器
    "排氣": "22804(1)", "管": "10686(1)", // 排氣 (pâi-khì) + 管 (kńg) -> 排氣管
    "電": "10283(1)", "瓶": "7628(1)",    // 電 (tiān) + 瓶 (pân) -> 電瓶
    "鐵馬": "13148(1)", "汽車": "22244(1)",
    
    // 大分類
    "動物": "7040(1)", "昆蟲": "29449(1)", "地理": "2363(1)", "人體": "22371(1)", "機械": "11718(1)",
    
    // 文法及答題反饋
    "著": "8981(1)", "矣": "3336(1)", "毋著": "1089(1)", "喔": "8172(1)"
};

// Offline Homophone Fallback Table (For Web Speech API zh-TW emulation)
const twHomophones = {
    // 大分類與特殊字備援
    "動物": "棟物", "昆蟲": "滾闖", "地理": "碟里", "人體": "林鐵", "機械": "給嗨", "鐵馬": "踢杯", "車": "七",
    "外奶": "瓦林", "內奶": "賴林", "外胎": "瓦退", "內胎": "賴退", "鏈仔": "連阿", "手擋": "手動", "馬角仔": "杯角阿",
    
    // 野生動物
    "臺灣黑熊": "台玩歐鬨", "烏熊": "鬨", "臺灣梅花鹿": "台玩美花露", "梅花鹿": "美花露",
    "臺灣石虎": "台玩幾厚", "山貓": "三妞", "臺灣獼猴": "台玩彌高", "烏肢猴": "歐給高",
    "櫻花鉤吻鮭": "應花高門貴", "鮭魚": "貴黑", "臺灣藍鵲": "台玩藍去", "山娘": "山妞",
    // 昆蟲
    "寬尾鳳蝶": "寬尾鬨夜", "蝴蝶": "歐牒", "螢火蟲": "營夥充", "火金姑": "毀金姑",
    "臺灣油蟬": "台玩油賢", "蟬仔": "賢阿", "獨角仙": "毒角先",
    "蜻蜓": "青聽", "田嬰": "纏因", "蜜蜂": "逼胖",
    // 地理
    "中央山脈": "丁央山脈", "玉山山脈": "玉山山脈", "雪山山脈": "些山山脈",
    "阿里山山脈": "阿里山山脈", "海岸山脈": "還岸山脈",
    "淡水河": "淡水河", "濁水溪": "漏水溪", "曾文溪": "詹問溪", "高屏溪": "高屏溪", "台灣海峽": "台玩嗨蓋",
    // 人體科別
    "腦": "老", "腦神經科": "老先經科", "心臟": "心臟", "心臟科": "心臟科",
    "肺": "互", "胸腔科": "鬨空科", "胃": "胃", "腸胃科": "騰胃科",
    "肝": "甘", "肝膽科": "甘膽科", "腎臟": "信臟", "腎臟科": "信臟科",
    "大腸": "大騰", "小腸": "小騰", "直腸科": "碟騰科", "腸仔": "騰阿", "器官": "器官",
    // 生活機械
    "輪胎": "戀貼", "車輪": "車戀", "鏈條": "戀底偶", "鍊仔": "戀阿",
    "煞車": "沙庫", "把手": "杯手", "手動": "手冬",
    "引擎": "演進", "火星塞": "毀星塞", "避震器": "比震器",
    "排氣管": "拍氣滾", "電瓶": "電攀", "電池": "電底",
    // 助詞
    "看病": "垮冰", "掛號": "誇好", "醫生": "醫生", "科": "科", "門診": "門金", "黑手": "黑手",
    "著矣": "丟啊", "毋著喔": "嗯丟喔", "答對了": "丟啊", "答錯了": "嗯丟喔"
};

// UI Localization dictionary (Bilingual support)
const uiStrings = {
    ZH: {
        title: "五合一跨領域台語雙語學習 App",
        subtitle: "生物人體、生活機械、地理與特有種特攻隊",
        tabAnimal: "🐻 野生動物",
        tabInsect: "🦋 常見昆蟲",
        tabGeography: "🗺️ 臺灣地理",
        tabBody: "🫁 人體結構",
        tabMachinery: "⚙️ 生活機械",
        btnPlayReplay: "🔊 重播台語發音 (Pronounce)",
        dictTitle: "跨領域學堂",
        dictInstruction: "點擊左側圖示或地圖部位，探索雙語稱呼與本土讀音！",
        detailLabel: "補充介紹 (Info)",
        modeLearn: "學習探索 (Learning)",
        modeQuiz: "遊戲挑戰進行中 (Challenge)",
        btnToQuiz: "切換至遊戲挑戰",
        btnToLearn: "切換至學習模式",
        badgeMOE: "🔊 真人發音 (教育部)",
        badgeLocal: "🔊 本地合成 (擬真備援)",
        quizTitle: "台語問答遊戲",
        scoreLabel: "得分:",
        stampsTitle: "我的特有種集章冊 (Stamps)",
        stampsDesc: "挑戰「遊戲模式」獲得 8 題（80分）以上，即可解鎖臺灣本土特有種野生動植物紀念章！",
        currentModeLabel: "當前模式：",
        quizQPromptAnimal: "請點擊對應的生物：",
        quizQPromptInsect: "請點擊對應的昆蟲：",
        quizQPromptGeo: "請在地圖找看覓：",
        quizQPromptBody: "請在人體圖上點出：",
        quizQPromptMachine: "請在機械圖上點出：",
        feedbackCorrect: "🎉 誠讚！你答對囉！ (Tio̍h ah!)",
        feedbackWrong: "❌ 毋對喔！加油！ (M̄-tio̍h--ooh!)",
        feedbackTimeout: "⏰ 時間到！再試一擺！",
        unlockedCongrats: "恭喜解鎖【{0}】特有種紀念章！已加入您的集章冊！",
        achievementCompleted: "🏆 恭喜！你已經收集完全部特有種印章！台語特攻隊畢業囉！"
    },
    EN: {
        title: "5-in-1 Bilingual Hokkien Learning",
        subtitle: "Biology, Machinery, Geography & Endemic Wildlife",
        tabAnimal: "🐻 Wildlife",
        tabInsect: "🦋 Insects",
        tabGeography: "🗺️ Geography",
        tabBody: "🫁 Human Body",
        tabMachinery: "⚙️ Machinery",
        btnPlayReplay: "🔊 Pronounce (Taiwanese)",
        dictTitle: "Bilingual Dictionary",
        dictInstruction: "Click on any graphics to learn the pronunciation and details!",
        detailLabel: "Detailed Info",
        modeLearn: "Learning Mode",
        modeQuiz: "Quiz Challenge Active!",
        btnToQuiz: "Play Quiz Game",
        btnToLearn: "Back to Learn",
        badgeMOE: "🔊 Human Audio (MOE)",
        badgeLocal: "🔊 Local TTS (Fallback)",
        quizTitle: "Taiwanese Quiz Challenge",
        scoreLabel: "Score:",
        stampsTitle: "My Endemic Stamps Collection",
        stampsDesc: "Score 80+ (8+ correct answers) in the Quiz to unlock endemic stamps of Taiwan wildlife!",
        currentModeLabel: "Current Mode:",
        quizQPromptAnimal: "Where is the: ",
        quizQPromptInsect: "Where is the: ",
        quizQPromptGeo: "Find on the map: ",
        quizQPromptBody: "Point on the body: ",
        quizQPromptMachine: "Point on the machine: ",
        feedbackCorrect: "🎉 Excellent! That's correct!",
        feedbackWrong: "❌ Incorrect! Keep trying!",
        feedbackTimeout: "⏰ Time's up! Let's try another!",
        unlockedCongrats: "Congrats! You unlocked the [{0}] stamp! Check your album!",
        achievementCompleted: "🏆 Wow! You collected all endemic stamps! You are a Taiwanese Master!"
    }
};

// Endemic stamps list (Achievements)
const endemicStamps = [
    { id: "stamp_bear", name: "烏熊", emoji: "🐻", desc: "Formosan Black Bear" },
    { id: "stamp_deer", name: "梅花鹿", emoji: "🦌", desc: "Sika Deer" },
    { id: "stamp_leopard", name: "山貓", emoji: "🐱", desc: "Leopard Cat" },
    { id: "stamp_monkey", name: "獼猴", emoji: "🐒", desc: "Formosan Macaque" },
    { id: "stamp_salmon", name: "鮭魚", emoji: "🐟", desc: "Formosan Salmon" },
    { id: "stamp_magpie", name: "山娘", emoji: "🐦", desc: "Blue Magpie" }
];

// ==========================================================================
// 3. App State Variables
// ==========================================================================
let currentLang = "ZH";
let currentTab = "animal"; // animal, insect, geography, body, machinery
let currentMachinerySub = "bike"; // bike, car
let currentMode = "learn"; // learn, quiz
let selectedPart = "";
let quizScore = 0;
let quizQuestions = [];
let quizCurrentIndex = 0;
let quizTimeLeft = 20;
let quizTimerInterval = null;
let currentCorrectAnswer = null;
let quizHasAnswered = false;

// Audio engine variables
let activeAudio = null;
let activeQueueAudio = null;
let queueCancelToken = 0;

// ==========================================================================
// 4. Initialization (On Load)
// ==========================================================================
window.onload = () => {
    // Load local storage preferences
    if (localStorage.getItem("5in1_lang")) {
        currentLang = localStorage.getItem("5in1_lang");
    }
    if (localStorage.getItem("5in1_theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.querySelector("#theme-toggle-btn i").className = "fa-solid fa-sun";
    }
    
    // Choose default selected part
    selectedPart = Object.keys(dataSource[currentTab])[0];
    
    updateUI();
    updateDisplay();
    renderStampsAlbum();
};

// ==========================================================================
// 5. Tabs and Panels switching
// ==========================================================================
function switchTab(tabId) {
    if (currentMode === "quiz") {
        clearInterval(quizTimerInterval);
    }
    
    currentTab = tabId;
    
    // Update tabs active state
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`tab-${tabId}-btn`).classList.add("active");
    
    // Update left panel visual wrappers
    document.querySelectorAll(".visual-wrapper").forEach(wrap => wrap.classList.remove("active"));
    document.getElementById(`visual-${tabId}`).classList.add("active");
    
    // Reset selected part
    const availableParts = Object.keys(dataSource[currentTab]);
    selectedPart = availableParts[0];
    
    clearVisualHighlights();
    
    // Play tab sound
    let audioSeg = "";
    let fallback = "";
    if (tabId === "animal") { audioSeg = "動物"; fallback = "動物"; }
    else if (tabId === "insect") { audioSeg = "昆蟲"; fallback = "昆蟲"; }
    else if (tabId === "geography") { audioSeg = "地理"; fallback = "地理"; }
    else if (tabId === "body") { audioSeg = "人體"; fallback = "人體"; }
    else if (tabId === "machinery") { audioSeg = "機械"; fallback = "機械"; }
    
    if (audioSeg) {
        const audioId = taigiAudioMap[audioSeg];
        if (audioId) {
            playAudioQueue([audioId], fallback);
        } else {
            playOfflineVoiceFallback(fallback);
        }
    }
    
    if (currentMode === "learn") {
        updateDisplay();
    } else {
        startQuiz();
    }
}

function switchMachinerySub(subId) {
    currentMachinerySub = subId;
    
    document.getElementById("machinery-sub-bike").classList.remove("active");
    document.getElementById("machinery-sub-car").classList.remove("active");
    
    if (subId === "bike") {
        document.getElementById("machinery-sub-bike").classList.add("active");
        document.getElementById("machinery-bike-area").classList.add("active");
        document.getElementById("machinery-car-area").classList.remove("active");
        selectedPart = "m_tire";
    } else {
        document.getElementById("machinery-sub-car").classList.add("active");
        document.getElementById("machinery-bike-area").classList.remove("active");
        document.getElementById("machinery-car-area").classList.add("active");
        selectedPart = "m_engine";
    }
    
    clearVisualHighlights();
    
    // Play subcategory sound
    const audioSeg = subId === "bike" ? "鐵馬" : "汽車";
    const fallback = subId === "bike" ? "鐵馬" : "汽車";
    const audioId = taigiAudioMap[audioSeg];
    if (audioId) {
        playAudioQueue([audioId], fallback);
    } else {
        playOfflineVoiceFallback(fallback);
    }
    
    if (currentMode === "learn") {
        updateDisplay();
    } else if (currentMode === "quiz") {
        // regenerate questions for machinery
        generateQuizPool();
        loadQuizQuestion();
    }
}

// Clear all active outline highlighting
function clearVisualHighlights() {
    // Clear grid cards
    document.querySelectorAll(".svg-card").forEach(c => c.classList.remove("active"));
    // Clear custom SVG outlines/paths
    document.querySelectorAll(".clickable-part").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".river-part").forEach(r => r.classList.remove("active"));
}

// Highlight the active SVG node
function highlightActiveNode(partId) {
    clearVisualHighlights();
    
    // Highlight primary element (card or inline SVG element)
    const el = document.getElementById(`part-${partId}`);
    if (el) {
        el.classList.add("active");
    }
    
    // Highlight secondary car SVG element if it exists
    const carEl = document.getElementById(`car-part-${partId}`);
    if (carEl) {
        carEl.classList.add("active");
    }
}

// Handle part click in SVG
function handlePartClick(partId) {
    if (currentMode === "learn") {
        selectedPart = partId;
        updateDisplay();
        speakCurrentWord();
    } else if (currentMode === "quiz") {
        submitQuizAnswer(partId);
    }
}

// Evaluate direct clicks on SVG parts in quiz mode
function submitQuizAnswer(partId) {
    if (quizHasAnswered) return;
    quizHasAnswered = true; // Set immediately to block double clicking during play
    clearInterval(quizTimerInterval); // Freeze timer immediately
    
    // Disable option buttons immediately
    document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
    
    // Auto speak the name of the clicked item!
    selectedPart = partId;
    speakCurrentWord();
    
    // Find the corresponding option button if it is displayed
    let targetBtn = null;
    document.querySelectorAll(".option-btn").forEach(btn => {
        if (btn.dataset.key === partId) {
            targetBtn = btn;
        }
    });
    
    // Delay evaluation slightly to let the clicked item voice finish playing
    setTimeout(() => {
        quizHasAnswered = false; // Reset temporarily so evaluateChoice doesn't exit early
        evaluateChoice(partId, targetBtn);
    }, 1000);
}

// ==========================================================================
// 6. UI Updates and Translation Renderers
// ==========================================================================
function updateUI() {
    const t = uiStrings[currentLang];
    
    document.getElementById("ui-title").innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${t.title}`;
    document.getElementById("ui-subtitle").textContent = t.subtitle;
    document.getElementById("lang-toggle-btn").innerHTML = `<i class="fa-solid fa-language"></i> ${currentLang === "ZH" ? "English / 台語" : "台語 / English"}`;
    
    // Tab labels
    const romanizations = {
        animal: "Iá-sing tōng-bu̍t",
        insect: "Siông-kìan khun-thiông",
        geography: "Tâi-uân tē-lí",
        body: "Jîn-thé kiat-kòo",
        machinery: "Sing-ua̍h ki-hāi"
    };

    document.getElementById("tab-animal-btn").innerHTML = `
        <span class="tab-title">🐻 <span class="tab-text">${t.tabAnimal.substring(2)}</span></span>
        <span class="tab-sub">${romanizations.animal}</span>
    `;
    document.getElementById("tab-insect-btn").innerHTML = `
        <span class="tab-title">🦋 <span class="tab-text">${t.tabInsect.substring(2)}</span></span>
        <span class="tab-sub">${romanizations.insect}</span>
    `;
    document.getElementById("tab-geography-btn").innerHTML = `
        <span class="tab-title">🗺️ <span class="tab-text">${t.tabGeography.substring(2)}</span></span>
        <span class="tab-sub">${romanizations.geography}</span>
    `;
    document.getElementById("tab-body-btn").innerHTML = `
        <span class="tab-title">🫁 <span class="tab-text">${t.tabBody.substring(2)}</span></span>
        <span class="tab-sub">${romanizations.body}</span>
    `;
    document.getElementById("tab-machinery-btn").innerHTML = `
        <span class="tab-title">⚙️ <span class="tab-text">${t.tabMachinery.substring(2)}</span></span>
        <span class="tab-sub">${romanizations.machinery}</span>
    `;
    
    // Right panel labels
    document.getElementById("ui-dict-title").textContent = t.dictTitle;
    document.getElementById("ui-dict-instruction").textContent = t.dictInstruction;
    document.getElementById("ui-detail-label").textContent = t.detailLabel;
    document.getElementById("ui-btn-replay").textContent = t.btnPlayReplay.substring(2);
    
    document.getElementById("ui-quiz-panel-title").textContent = t.quizTitle;
    document.getElementById("ui-score-label").textContent = t.scoreLabel;
    
    // Stamps
    document.getElementById("ui-stamps-title").innerHTML = `<i class="fa-solid fa-bookmark"></i> ${t.stampsTitle}`;
    document.getElementById("ui-stamps-desc").textContent = t.stampsDesc;
    
    document.getElementById("ui-current-mode-label").textContent = t.currentModeLabel;
    
    // Toggle Mode Button innerText
    if (currentMode === "learn") {
        document.getElementById("toggleModeBtn").innerHTML = `<i class="fa-solid fa-gamepad"></i> ${t.btnToQuiz}`;
        document.getElementById("current-mode-badge").textContent = t.modeLearn;
        document.getElementById("current-mode-badge").className = "mode-badge learn-mode";
    } else {
        document.getElementById("toggleModeBtn").innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${t.btnToLearn}`;
        document.getElementById("current-mode-badge").textContent = t.modeQuiz;
        document.getElementById("current-mode-badge").className = "mode-badge quiz-mode";
    }
}

function updateDisplay() {
    const availableParts = Object.keys(dataSource[currentTab]);
    if (!selectedPart || !availableParts.includes(selectedPart)) {
        selectedPart = availableParts[0];
    }
    
    const langKey = currentLang === "ZH" ? "tw" : "en";
    const data = dataSource[currentTab][selectedPart][langKey];
    const isBilingual = currentLang === "ZH";
    
    if (currentLang === "ZH") {
        document.getElementById("displayMain").textContent = `${data.name} (${data.sub})`;
    } else {
        document.getElementById("displayMain").textContent = data.name;
    }
    document.getElementById("displaySub").textContent = data.sub;
    
    // Render phonetic
    const phoneticEl = document.getElementById("displayPhonetic");
    if (currentLang === "ZH") {
        phoneticEl.textContent = data.phonetic;
        phoneticEl.style.display = "inline-block";
    } else {
        phoneticEl.style.display = "none";
    }
    
    document.getElementById("displayDescription").textContent = data.description;
    
    highlightActiveNode(selectedPart);
}

// ==========================================================================
// 7. High-Performance Web Audio API Engine & Web Speech Fallback
// (Compliant with taiwanese-moe-audio & web-speech-tts skills)
// ==========================================================================
const MOE_AUDIO_CDN_VERSION = "20261019-0109";
const MOE_AUDIO_CDN_BASE = `https://chhoetaigi.github.io/KipSutianDataMirror/public/${MOE_AUDIO_CDN_VERSION}/imtong/sutiau/`;

let globalAudioCtx = null;
const audioBufferCache = new Map();
let activeSourceNodes = [];

function getAudioContext() {
    if (!globalAudioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        globalAudioCtx = new AudioContextClass();
    }
    if (globalAudioCtx.state === "suspended") {
        globalAudioCtx.resume();
    }
    return globalAudioCtx;
}

// Leading & Trailing silence trimmer for seamless natural playback
function trimAudioBuffer(ctx, buffer, threshold = 0.015) {
    const channelData = buffer.getChannelData(0);
    const len = channelData.length;
    let start = 0;
    let end = len - 1;

    while (start < len && Math.abs(channelData[start]) < threshold) start++;
    while (end > start && Math.abs(channelData[end]) < threshold) end--;

    const margin = Math.floor(buffer.sampleRate * 0.015);
    start = Math.max(0, start - margin);
    end = Math.min(len, end + margin);

    const trimmedLength = end - start;
    if (trimmedLength <= 0) return buffer;

    const trimmed = ctx.createBuffer(buffer.numberOfChannels, trimmedLength, buffer.sampleRate);
    for (let c = 0; c < buffer.numberOfChannels; c++) {
        trimmed.copyToChannel(buffer.getChannelData(c).subarray(start, end), c);
    }
    return trimmed;
}

// Fetch and decode with in-memory AudioBuffer caching
async function fetchAndDecodeAudio(id) {
    const cleanId = String(id).includes('(') ? id : `${id}(1)`;
    if (audioBufferCache.has(cleanId)) {
        return audioBufferCache.get(cleanId);
    }

    const url = `${MOE_AUDIO_CDN_BASE}${cleanId}.mp3`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for MOE audio ID: ${cleanId}`);
    
    const arrayBuffer = await res.arrayBuffer();
    const ctx = getAudioContext();
    const decoded = await ctx.decodeAudioData(arrayBuffer);
    const trimmed = trimAudioBuffer(ctx, decoded);
    audioBufferCache.set(cleanId, trimmed);
    return trimmed;
}

// Seamless gapless scheduler supporting variable playback speeds
async function playAudioQueue(audioIds, fallbackText, speed = 1.0) {
    queueCancelToken++;
    const token = queueCancelToken;

    // Stop active audio nodes
    activeSourceNodes.forEach(node => {
        try { node.stop(); } catch(e) {}
    });
    activeSourceNodes = [];

    // Stop speech synthesis if speaking
    if ('speechSynthesis' in window && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) {
        window.speechSynthesis.cancel();
    }

    const cleanIds = (audioIds || []).filter(Boolean);
    if (cleanIds.length === 0) {
        playOfflineVoiceFallback(fallbackText);
        return;
    }

    updateEngineBadge("google");

    try {
        const ctx = getAudioContext();
        // Load buffers in parallel
        const buffers = await Promise.all(cleanIds.map(id => fetchAndDecodeAudio(id)));
        if (token !== queueCancelToken) return;

        let startTime = ctx.currentTime + 0.05;
        buffers.forEach((buf) => {
            const source = ctx.createBufferSource();
            source.buffer = buf;
            source.playbackRate.value = speed;
            source.connect(ctx.destination);
            source.start(startTime);
            activeSourceNodes.push(source);
            startTime += (buf.duration / speed);
        });
    } catch (err) {
        console.warn('Web Audio playback failed, routing to speech synthesis fallback:', err);
        if (token === queueCancelToken) {
            playOfflineVoiceFallback(fallbackText);
        }
    }
}

// Mobile-resilient speech synthesis fallback (per web-speech-tts)
const NOVELTY_VOICE = /^(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|fred|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley)/i;

function playOfflineVoiceFallback(text) {
    if (!('speechSynthesis' in window)) return;
    updateEngineBadge("local");

    // Homophone translation
    let phoneticText = text || "";
    const sortedKeys = Object.keys(twHomophones).sort((a, b) => b.length - a.length);
    sortedKeys.forEach(key => {
        phoneticText = phoneticText.replace(new RegExp(key, 'g'), twHomophones[key]);
    });

    const utterance = new SpeechSynthesisUtterance(phoneticText);
    utterance.lang = "zh-TW";
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices().filter(v => !NOVELTY_VOICE.test(v.name));
    const twVoice = voices.find(v => v.lang.includes("zh-TW") && v.localService !== false) 
                 || voices.find(v => v.lang.includes("zh-TW"));
    if (twVoice) utterance.voice = twVoice;

    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
}

function updateEngineBadge(mode) {
    const badge = document.getElementById("speech-engine-badge");
    if (!badge) return;
    const t = uiStrings[currentLang];
    
    if (mode === "google") {
        badge.innerText = t.badgeMOE;
        badge.className = "speech-badge badge-google";
    } else {
        badge.innerText = t.badgeLocal;
        badge.className = "speech-badge badge-local";
    }
}

function speakCurrentWord() {
    if (!selectedPart) return;
    const item = dataSource[currentTab][selectedPart];
    
    if (currentLang === "ZH") {
        const ids = [];
        const segs = item.tw.audioSegments || [];
        segs.forEach(seg => {
            if (taigiAudioMap[seg]) {
                ids.push(taigiAudioMap[seg]);
            }
        });
        
        playAudioQueue(ids, item.tw.speech);
    } else {
        // Mobile-safe English speech
        if ('speechSynthesis' in window) {
            if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
                window.speechSynthesis.cancel();
            }
            const utterance = new SpeechSynthesisUtterance(item.en.speech);
            utterance.lang = "en-US";
            utterance.rate = 0.9;
            const voices = window.speechSynthesis.getVoices().filter(v => !NOVELTY_VOICE.test(v.name));
            const enVoice = voices.find(v => /^en[-_]/i.test(v.lang) && v.localService !== false)
                         || voices.find(v => /^en[-_]/i.test(v.lang));
            if (enVoice) utterance.voice = enVoice;
            if (window.speechSynthesis.paused) window.speechSynthesis.resume();
            window.speechSynthesis.speak(utterance);
        }
    }
}

// ==========================================================================
// 8. Quiz Engine (Multiple Choice, Timer, Feedback & Animation hooks)
// ==========================================================================
function toggleAppMode() {
    if (currentMode === "learn") {
        currentMode = "quiz";
        document.getElementById("learningContainer").classList.remove("active");
        document.getElementById("quizContainer").classList.add("active");
        startQuiz();
    } else {
        currentMode = "learn";
        document.getElementById("quizContainer").classList.remove("active");
        document.getElementById("learningContainer").classList.add("active");
        clearInterval(quizTimerInterval);
        clearVisualHighlights();
        updateDisplay();
    }
    updateUI();
}

function startQuiz() {
    quizScore = 0;
    quizCurrentIndex = 0;
    document.getElementById("scoreValue").textContent = quizScore;
    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("quizFeedback").className = "feedback-box";
    
    generateQuizPool();
    loadQuizQuestion();
}

function generateQuizPool() {
    quizQuestions = [];
    const keys = Object.keys(dataSource[currentTab]);
    
    // Shuffle keys or create 10 randomized pools
    const pool = [];
    while (pool.length < 10) {
        // For subcategories in machinery, only query items belonging to that subcategory
        if (currentTab === "machinery") {
            const bikeIds = ["m_tire", "m_chain", "m_brake", "m_handlebar"];
            const carIds = ["m_engine", "m_sparkplug", "m_shock", "m_exhaust", "m_battery"];
            
            const targetIds = currentMachinerySub === "bike" ? bikeIds : carIds;
            const randomId = targetIds[Math.floor(Math.random() * targetIds.length)];
            pool.push(randomId);
        } else {
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            pool.push(randomKey);
        }
    }
    
    quizQuestions = pool;
}

function loadQuizQuestion() {
    quizHasAnswered = false;
    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("quizFeedback").className = "feedback-box";
    
    currentCorrectAnswer = quizQuestions[quizCurrentIndex];
    const data = dataSource[currentTab][currentCorrectAnswer];
    
    // Render question prompt
    const t = uiStrings[currentLang];
    let qPrompt = t.quizQPromptAnimal;
    if (currentTab === "insect") qPrompt = t.quizQPromptInsect;
    else if (currentTab === "geography") qPrompt = t.quizQPromptGeo;
    else if (currentTab === "body") qPrompt = t.quizQPromptBody;
    else if (currentTab === "machinery") qPrompt = t.quizQPromptMachine;
    
    const cleanName = currentLang === "ZH" 
        ? `${data.tw.name.split(' ')[0]} (${data.tw.sub})` 
        : `${data.en.name}`;
        
    document.getElementById("quizQuestion").textContent = `${qPrompt} "${cleanName}"`;
    
    // Render 4 options randomly
    const options = [currentCorrectAnswer];
    const keys = Object.keys(dataSource[currentTab]);
    
    // Filter keys for machinery subcategories
    let filteredKeys = keys;
    if (currentTab === "machinery") {
        filteredKeys = currentMachinerySub === "bike" 
            ? ["m_tire", "m_chain", "m_brake", "m_handlebar"] 
            : ["m_engine", "m_sparkplug", "m_shock", "m_exhaust", "m_battery"];
    }
    
    while (options.length < Math.min(4, filteredKeys.length)) {
        const altKey = filteredKeys[Math.floor(Math.random() * filteredKeys.length)];
        if (!options.includes(altKey)) {
            options.push(altKey);
        }
    }
    options.sort(() => Math.random() - 0.5);
    
    const container = document.getElementById("quiz-options-container");
    container.innerHTML = "";
    
    options.forEach(optKey => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.dataset.key = optKey;
        const optData = dataSource[currentTab][optKey];
        btn.textContent = currentLang === "ZH" 
            ? `${optData.tw.name} (${optData.tw.sub})` 
            : optData.en.name;
            
        btn.onclick = () => evaluateChoice(optKey, btn);
        container.appendChild(btn);
    });
    
    // Play pronunciation of the question automatically
    setTimeout(() => {
        playQuizQuestionAudio();
    }, 450);
    
    // Start countdown timer (20 seconds)
    quizTimeLeft = 20;
    document.getElementById("quiz-timer-display").innerHTML = `<i class="fa-solid fa-hourglass-half animate-pulse"></i> ${quizTimeLeft}s`;
    
    const bar = document.getElementById("quiz-timer-bar");
    bar.style.transition = "none";
    bar.style.width = "100%";
    
    clearInterval(quizTimerInterval);
    setTimeout(() => {
        bar.style.transition = "width 20s linear";
        bar.style.width = "0%";
    }, 50);
    
    quizTimerInterval = setInterval(() => {
        quizTimeLeft--;
        document.getElementById("quiz-timer-display").innerHTML = `<i class="fa-solid fa-hourglass-half"></i> ${quizTimeLeft}s`;
        
        if (quizTimeLeft <= 0) {
            clearInterval(quizTimerInterval);
            handleQuizTimeout();
        }
    }, 1000);
}

function playQuizQuestionAudio() {
    if (!currentCorrectAnswer) return;
    const item = dataSource[currentTab][currentCorrectAnswer];
    
    if (currentLang === "ZH") {
        const ids = [];
        const segs = item.tw.audioSegments || [];
        segs.forEach(seg => {
            if (taigiAudioMap[seg]) {
                ids.push(taigiAudioMap[seg]);
            }
        });
        playAudioQueue(ids, item.tw.speech);
    } else {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(item.en.speech);
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);
        }
    }
}

function evaluateChoice(selectedKey, selectedBtn) {
    if (quizHasAnswered) return;
    quizHasAnswered = true;
    clearInterval(quizTimerInterval);
    
    // Freeze timer bar
    const bar = document.getElementById("quiz-timer-bar");
    const computedWidth = window.getComputedStyle(bar).width;
    bar.style.transition = "none";
    bar.style.width = computedWidth;
    
    document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
    
    const feedback = document.getElementById("quizFeedback");
    const t = uiStrings[currentLang];
    
    if (selectedKey === currentCorrectAnswer) {
        quizScore += 10;
        document.getElementById("scoreValue").textContent = quizScore;
        feedback.textContent = t.feedbackCorrect;
        feedback.className = "feedback-box correct";
        if (selectedBtn) selectedBtn.classList.add("correct");
        
        // Bounce animation
        const panel = document.querySelector(".panel-right");
        panel.classList.add("bounce-effect");
        setTimeout(() => panel.classList.remove("bounce-effect"), 600);
        
        // Confetti effect
        triggerConfetti();
        
        // Play correct audio
        playAudioQueue([taigiAudioMap["著"], taigiAudioMap["矣"]], "著矣");
    } else {
        feedback.textContent = t.feedbackWrong;
        feedback.className = "feedback-box wrong";
        if (selectedBtn) selectedBtn.classList.add("wrong");
        
        // Highlight correct button
        document.querySelectorAll(".option-btn").forEach(btn => {
            if (btn.dataset.key === currentCorrectAnswer) {
                btn.classList.add("correct");
            }
        });
        
        // Shake animation
        const panel = document.querySelector(".panel-right");
        panel.classList.add("shake");
        setTimeout(() => panel.classList.remove("shake"), 500);
        
        // Play wrong audio
        playAudioQueue([taigiAudioMap["毋著"], taigiAudioMap["喔"]], "毋著喔");
    }
    
    // Draw target part highlight on SVG
    const partEl = document.getElementById(`part-${currentCorrectAnswer}`);
    if (partEl) partEl.classList.add("active");
    
    setTimeout(nextQuestion, 1800);
}

function handleQuizTimeout() {
    if (quizHasAnswered) return;
    quizHasAnswered = true;
    
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.key === currentCorrectAnswer) {
            btn.classList.add("correct");
        }
    });
    
    const feedback = document.getElementById("quizFeedback");
    const t = uiStrings[currentLang];
    feedback.textContent = t.feedbackTimeout;
    feedback.className = "feedback-box wrong";
    
    playAudioQueue([taigiAudioMap["毋著"], taigiAudioMap["喔"]], "毋著喔");
    
    setTimeout(nextQuestion, 1800);
}

function nextQuestion() {
    clearVisualHighlights();
    quizCurrentIndex++;
    
    if (quizCurrentIndex < 10) {
        loadQuizQuestion();
    } else {
        finishQuizPool();
    }
}

function finishQuizPool() {
    clearInterval(quizTimerInterval);
    const t = uiStrings[currentLang];
    
    if (quizScore >= 80) {
        // Unlock stamp
        let unlockedStamps = JSON.parse(localStorage.getItem("5in1_stamps")) || [];
        const lockedStamps = endemicStamps.filter(st => !unlockedStamps.includes(st.id));
        
        let unlockedStamp = null;
        if (lockedStamps.length > 0) {
            unlockedStamp = lockedStamps[Math.floor(Math.random() * lockedStamps.length)];
            unlockedStamps.push(unlockedStamp.id);
            localStorage.setItem("5in1_stamps", JSON.stringify(unlockedStamps));
            
            // Render congratulations popup
            const congratsMsg = t.unlockedCongrats.replace("{0}", unlockedStamp.name);
            alert(`🎉 ${congratsMsg}`);
        } else {
            alert(`🏆 ${t.achievementCompleted}`);
        }
        
        triggerConfetti();
        renderStampsAlbum();
    } else {
        alert(currentLang === "ZH" 
            ? `💡 還差一點點！得到 ${quizScore} 分。需要 80 分以上才能解鎖特有種印章喔，再接再厲！`
            : `💡 Nice try! You got ${quizScore} points. Score 80+ to unlock a rare endemic stamp!`);
    }
    
    toggleAppMode(); // Switch back to learning mode
}

// ==========================================================================
// 9. Stamp Achievement Persistence (localStorage)
// ==========================================================================
function renderStampsAlbum() {
    const container = document.getElementById("stamps-container");
    container.innerHTML = "";
    
    const unlockedStamps = JSON.parse(localStorage.getItem("5in1_stamps")) || [];
    
    endemicStamps.forEach(stamp => {
        const isUnlocked = unlockedStamps.includes(stamp.id);
        const el = document.createElement("div");
        el.className = `stamp-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        el.title = isUnlocked 
            ? `點擊聆聽【${stamp.name}】台語發音` 
            : (currentLang === "ZH" ? "尚未解鎖" : "Locked");
            
        el.innerHTML = `
            <span class="stamp-icon">${isUnlocked ? stamp.emoji : "🔒"}</span>
            <span class="stamp-name">${stamp.name}</span>
            <span class="stamp-label">${stamp.desc}</span>
        `;
        
        el.onclick = () => {
            if (isUnlocked) {
                // Play stamp pronunciation using KipSutian IDs
                let audioSegs = [];
                if (stamp.id === "stamp_bear") audioSegs = [taigiAudioMap["烏_sandhi"], taigiAudioMap["熊"]];
                else if (stamp.id === "stamp_deer") audioSegs = [taigiAudioMap["梅花"], taigiAudioMap["鹿"]];
                else if (stamp.id === "stamp_leopard") audioSegs = [taigiAudioMap["山貓"]];
                else if (stamp.id === "stamp_monkey") audioSegs = [taigiAudioMap["猴"], taigiAudioMap["仔"]];
                else if (stamp.id === "stamp_salmon") audioSegs = [taigiAudioMap["鮭"], taigiAudioMap["魚"]];
                else if (stamp.id === "stamp_magpie") audioSegs = [taigiAudioMap["長尾山娘"]];
                
                playAudioQueue(audioSegs, stamp.name);
                
                el.classList.add("bounce-effect");
                setTimeout(() => el.classList.remove("bounce-effect"), 600);
            }
        };
        
        container.appendChild(el);
    });
}

// Trigger micro-confetti particles on correct answer
function triggerConfetti() {
    const main = document.querySelector("main");
    for (let i = 0; i < 35; i++) {
        const p = document.createElement("div");
        p.className = "confetti-particle";
        p.style.left = `${Math.random() * 100}%`;
        p.style.bottom = "15%";
        p.style.backgroundColor = `hsl(${Math.random() * 360}, 90%, 65%)`;
        p.style.setProperty("--x", `${(Math.random() - 0.5) * 350}px`);
        p.style.setProperty("--rot", `${Math.random() * 360}deg`);
        
        main.appendChild(p);
        setTimeout(() => p.remove(), 1200);
    }
}

// ==========================================================================
// 10. Theme & Language Utilities
// ==========================================================================
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme");
    const targetTheme = currentTheme === "dark" ? "light" : "dark";
    
    root.setAttribute("data-theme", targetTheme);
    localStorage.setItem("5in1_theme", targetTheme);
    
    const icon = document.querySelector("#theme-toggle-btn i");
    icon.className = targetTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

function toggleLanguage() {
    currentLang = currentLang === "ZH" ? "EN" : "ZH";
    localStorage.setItem("5in1_lang", currentLang);
    
    updateUI();
    updateDisplay();
    renderStampsAlbum();
    
    if (currentMode === "quiz") {
        clearInterval(quizTimerInterval);
        startQuiz();
    }
}
