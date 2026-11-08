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
                name: "烏熊 (臺灣黑熊)", 
                sub: "Oo-hîm", 
                phonetic: "Tâi-oân oo-hîm", 
                speech: "烏熊", 
                description: "臺灣特有亞種黑熊，胸前有獨特的白色 V 字形斑紋，體型碩大且嗅覺敏銳，是臺灣森林生態系最頂級最具代表性的保育類野生動物。",
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
                description: "臺灣特有亞種，身上披有如梅花般的白色美麗斑點。曾在野外野性滅絕，經多年墾丁與綠島復育，現已重新奔馳於臺灣綠野。",
                audioSegments: ["梅花", "鹿"]
            },
            en: { 
                name: "Formosan Sika Deer", 
                sub: "梅花鹿", 
                phonetic: "Formosan Sika Deer", 
                speech: "Formosan Sika Deer", 
                description: "A deer subspecies endemic to Taiwan, famous for its spotted coat resembling blossoming plum petals."
            }
        },
        a_leopard: {
            tw: { 
                name: "石虎 (山貓)", 
                sub: "Tsio̍h-hóo / Suann-niau", 
                phonetic: "Tsio̍h-hóo (Suann-niau)", 
                speech: "山貓", 
                description: "臺灣現存唯一的原生貓科野生動物，雙眼兩側有兩道清晰白條紋、耳後有顯眼黑底白斑，是苗栗與中臺灣淺山丘陵的保育旗艦物種。",
                audioSegments: ["山貓"]
            },
            en: { 
                name: "Leopard Cat", 
                sub: "石虎 (山貓)", 
                phonetic: "Leopard Cat", 
                speech: "Leopard Cat", 
                description: "Taiwan's last surviving native wild felid, distinguished by facial white stripes and distinctive white spots behind its ears."
            }
        },
        a_monkey: {
            tw: { 
                name: "臺灣猴 (臺灣獼猴)", 
                sub: "Tâi-uân-kâu", 
                phonetic: "Tâi-uân-kâu", 
                speech: "臺灣猴", 
                description: "臺灣特有種靈長類動物，身披灰褐色厚毛，臉頰有頰囊可暫存果實種子，群居生活於全臺低海拔到高海拔闊葉林與岩壁間。",
                audioSegments: ["臺灣", "猴"]
            },
            en: { 
                name: "Formosan Macaque", 
                sub: "臺灣猴", 
                phonetic: "Formosan Rock Macaque", 
                speech: "Formosan Rock Macaque", 
                description: "An endemic primate species widely distributed across Taiwan's forests, living in structured social troops."
            }
        },
        a_salmon: {
            tw: { 
                name: "臺灣鮭魚 (櫻花鉤吻鮭)", 
                sub: "Tâi-uân kuê-hî", 
                phonetic: "Tâi-uân kuê-hî", 
                speech: "臺灣鮭魚", 
                description: "冰河時期孑遺國寶魚，棲息於臺中雪霸國家公園高山清澈低溫的七家灣溪上游，是臺灣生態演化史的重要見證物種。",
                audioSegments: ["臺灣", "鮭", "魚"]
            },
            en: { 
                name: "Formosan Landlocked Salmon", 
                sub: "臺灣鮭魚", 
                phonetic: "Formosan Salmon", 
                speech: "Formosan Salmon", 
                description: "A precious glacial relict freshwater salmon thriving strictly in the cold, pristine alpine headwaters of the Dajia River basin."
            }
        },
        a_muntjac: {
            tw: { 
                name: "羌 (臺灣山羌)", 
                sub: "Kiunn (Suann-khiunn)", 
                phonetic: "Kiunn", 
                speech: "羌", 
                description: "臺灣特有亞種小型鹿科動物，體披黃褐色短毛，雄羌頭頂生有短角且具長犬齒。常於林間發出如狗吠般的宏亮警戒鳴叫叫聲。",
                audioSegments: ["羌"]
            },
            en: { 
                name: "Formosan Reeve's Muntjac", 
                sub: "羌 (山羌)", 
                phonetic: "Formosan Muntjac", 
                speech: "Formosan Muntjac", 
                description: "An endemic small cervid inhabiting dense forests, known as the 'barking deer' due to its characteristic alarm call."
            }
        },
        a_boar: {
            tw: { 
                name: "山豬 (臺灣野豬)", 
                sub: "Suann-ti", 
                phonetic: "Suann-ti", 
                speech: "山豬", 
                description: "臺灣山林最具生命力的雜食哺乳動物，全身覆蓋粗硬黑褐色鬃毛，雄豬擁有銳利向上彎曲的獠牙，力大無窮擅長掘土覓食。",
                audioSegments: ["山豬"]
            },
            en: { 
                name: "Formosan Wild Boar", 
                sub: "山豬", 
                phonetic: "Wild Boar", 
                speech: "Wild Boar", 
                description: "A powerful endemic subspecies of wild pig roaming Taiwan's mountain forests, armed with prominent tusks and resilient foraging ability."
            }
        },
        a_pangolin: {
            tw: { 
                name: "鯪鯉 (穿山甲)", 
                sub: "Lâ-lí / Lâi-lí", 
                phonetic: "Lâ-lí", 
                speech: "鯪鯉", 
                description: "臺灣特有亞種鱗甲目動物，身披堅硬角質鱗片，無牙齒而有細長黏性舌頭專吃螞蟻與白蟻，遇敵害時能迅速蜷縮成堅硬球狀防禦。",
                audioSegments: ["鯪鯉"]
            },
            en: { 
                name: "Formosan Pangolin", 
                sub: "鯪鯉", 
                phonetic: "Pangolin", 
                speech: "Pangolin", 
                description: "A unique scaly mammal that rolls into a tight ball when threatened and uses its long sticky tongue to feast on ants and termites."
            }
        },
        a_buffalo: {
            tw: { 
                name: "水牛 (臺灣水牛)", 
                sub: "Tsuí-gû", 
                phonetic: "Tsuí-gû", 
                speech: "水牛", 
                description: "早期臺灣農耕開拓最忠實的夥伴，性情溫馴耐勞，皮厚毛稀喜愛泡在水塘泥淖中消暑散熱防蚊蟲，象徵臺灣人堅毅純樸的精神。",
                audioSegments: ["水牛"]
            },
            en: { 
                name: "Taiwan Water Buffalo", 
                sub: "水牛", 
                phonetic: "Water Buffalo", 
                speech: "Water Buffalo", 
                description: "Historically the primary draft animal in Taiwanese agriculture, celebrated for diligence, gentle nature, and love of mud wallows."
            }
        },
        a_whale: {
            tw: { 
                name: "海翁 (鯨魚)", 
                sub: "Hái-ang", 
                phonetic: "Hái-ang", 
                speech: "海翁", 
                description: "海洋中體型最為龐大的哺乳動物。臺灣東部花蓮、臺東與宜蘭外海黑潮洋流常有抹香鯨、大翅鯨與領航鯨壯麗躍出水面噴水換氣。",
                audioSegments: ["海翁"]
            },
            en: { 
                name: "Whale", 
                sub: "海翁", 
                phonetic: "Whale", 
                speech: "Whale", 
                description: "Majestic marine giants frequently sighted along Taiwan's eastern Kuroshio Current, including sperm whales and humpbacks."
            }
        },
        a_dolphin: {
            tw: { 
                name: "海豬 (海豚/白海豚)", 
                sub: "Hái-ti", 
                phonetic: "Hái-ti", 
                speech: "海豬", 
                description: "高智商齒鯨類海洋哺乳動物。臺灣西部沿海有瀕危極珍貴的「臺灣白海豚（媽祖魚）」，東部外海則常有飛旋海豚成群躍浪翻滾旋轉。",
                audioSegments: ["海豬"]
            },
            en: { 
                name: "Dolphin (Indo-Pacific Humpback Dolphin)", 
                sub: "海豬", 
                phonetic: "Dolphin", 
                speech: "Dolphin", 
                description: "Intelligent cetaceans including the critically endangered pinkish Taiwan white dolphin along the west coast and acrobatic spinner dolphins in the east."
            }
        },
        a_hundred_pace_snake: {
            tw: { 
                name: "百步蛇", 
                sub: "Pah-pōo-tsuâ", 
                phonetic: "Pah-pōo-tsuâ", 
                speech: "百步蛇", 
                description: "臺灣最負盛名的劇毒蝰蛇科毒蛇，頭部呈鮮明三角形、吻端翹起，身上有菱形暗褐色斑紋。在排灣族與魯凱族傳統文化中被尊為神聖守護者。",
                audioSegments: ["百步蛇"]
            },
            en: { 
                name: "Hundred-Pace Pit Viper", 
                sub: "百步蛇", 
                phonetic: "Hundred-Pace Viper", 
                speech: "Hundred-Pace Viper", 
                description: "A prominent venomous pit viper in southern and eastern Taiwan forests, revered as a sacred guardian ancestral spirit in Paiwan indigenous culture."
            }
        },
        a_civet: {
            tw: { 
                name: "果子猫 (白鼻心/果子狸)", 
                sub: "Kué-tsí-bâ (Pe̍h-phīnn-sim)", 
                phonetic: "Kué-tsí-bâ", 
                speech: "果子猫", 
                description: "臺灣特有亞種靈貓科夜行動物，鼻樑正中央貫穿一條筆直白斑直達頭頂，善於攀樹採食野果，常出沒於臺灣低中海拔闊葉森林與果園。",
                audioSegments: ["果子猫"]
            },
            en: { 
                name: "Formosan Masked Palm Civet", 
                sub: "果子猫 (白鼻心)", 
                phonetic: "Masked Palm Civet", 
                speech: "Masked Palm Civet", 
                description: "An arboreal nocturnal mammal recognizable by the distinct white stripe extending from its snout over the forehead, feeding on forest fruits."
            }
        },
        a_flying_squirrel: {
            tw: { 
                name: "飛鼠 (白面鼯鼠)", 
                sub: "Pue-tshí / Pe̍h-bīn pue-tshí", 
                phonetic: "Pue-tshí", 
                speech: "飛鼠", 
                description: "臺灣特有亞種夜行性滑翔哺乳動物，臉部純白圓潤，前後肢間連有發達皮膜，夜晚能從樹冠高處展膜優雅滑翔數十公尺遠。",
                audioSegments: ["飛鼠"]
            },
            en: { 
                name: "Formosan White-faced Flying Squirrel", 
                sub: "飛鼠", 
                phonetic: "Flying Squirrel", 
                speech: "Flying Squirrel", 
                description: "A nocturnal gliding rodent with a snowy-white face that glides gracefully between high mountain canopy trees using its skin membrane."
            }
        },
        a_frog: {
            tw: { 
                name: "水雞 (青蛙/臺灣樹蛙)", 
                sub: "Tsuí-ke (Tsiunn-koo)", 
                phonetic: "Tsuí-ke", 
                speech: "水雞", 
                description: "生活於臺灣溪流、水田與森林潮濕環境的兩棲動物，指端特化吸盤善於吸附攀爬葉面，夏夜齊聚鳴叫如交響樂，是優良水質的重要環境指標。",
                audioSegments: ["水雞"]
            },
            en: { 
                name: "Frog (Formosan Tree Frog)", 
                sub: "水雞", 
                phonetic: "Tree Frog", 
                speech: "Frog", 
                description: "Amphibians thriving in Taiwan's wetlands and misty mountain streams, singing melodic mating choruses on summer nights."
            }
        },
        a_otter: {
            tw: { 
                name: "水獺 (歐亞水獺)", 
                sub: "Tsuí-thuah", 
                phonetic: "Tsuí-thuah", 
                speech: "水獺", 
                description: "保育等級最高的一級瀕絕水棲哺乳動物，臺灣本島已絕跡，現僅存於金門清澈河流水系與海灣，游泳敏捷善捕魚蝦。",
                audioSegments: ["水獺"]
            },
            en: { 
                name: "Eurasian Otter", 
                sub: "水獺", 
                phonetic: "Eurasian Otter", 
                speech: "Eurasian Otter", 
                description: "A critically endangered semi-aquatic mammal surviving uniquely in Kinmen's river channels and coastal habitats."
            }
        },
        a_serow: {
            tw: { 
                name: "山羊 (臺灣長鬃山羊)", 
                sub: "Suann-iûnn", 
                phonetic: "Tâi-uân tshiâng-tsong suann-iûnn", 
                speech: "山羊", 
                description: "臺灣唯一的原生牛科草食野生動物，蹄部肉墊發達抓地力極強，善於在玉山與中央山脈近乎垂直的崩壁碎石險峰間飛躍奔馳。",
                audioSegments: ["山羊"]
            },
            en: { 
                name: "Taiwan Serow", 
                sub: "山羊", 
                phonetic: "Taiwan Serow", 
                speech: "Taiwan Serow", 
                description: "Taiwan's sole native bovid, possessing exceptional hoof grip that allows it to scale sheer cliffs in the central mountain highlands."
            }
        },
        a_sea_turtle: {
            tw: { 
                name: "海龜 (綠蠵龜)", 
                sub: "Hái-ku", 
                phonetic: "Hái-ku", 
                speech: "海龜", 
                description: "悠游於熱帶與亞熱帶大洋的大型海洋爬蟲類。小琉球、澎湖望安與墾丁是臺灣最重要的海龜覓食與登陸產卵保育天堂。",
                audioSegments: ["海龜"]
            },
            en: { 
                name: "Green Sea Turtle", 
                sub: "海龜", 
                phonetic: "Sea Turtle", 
                speech: "Sea Turtle", 
                description: "Majestic marine turtles grazing on seagrass and nesting on protected beaches around Xiaoliuqiu and Penghu Islands."
            }
        },
        a_squirrel: {
            tw: { 
                name: "膨鼠 (赤腹松鼠)", 
                sub: "Phòng-tshí", 
                phonetic: "Phòng-tshí", 
                speech: "膨鼠", 
                description: "臺灣森林與都會公園最常見的特有亞種松鼠，腹部呈紅褐色，蓬鬆長尾巴極具辨識度，在樹梢間蹦跳自如採食堅果與嫩芽。",
                audioSegments: ["膨鼠"]
            },
            en: { 
                name: "Red-bellied Tree Squirrel", 
                sub: "膨鼠", 
                phonetic: "Pallas's Squirrel", 
                speech: "Pallas Squirrel", 
                description: "An endemic subspecies with a chestnut-red belly and a bushy tail, agilely leaping through tree branches in forests and city parks."
            }
        },
        a_krait: {
            tw: { 
                name: "雨傘節", 
                sub: "Hōo-suànn-tsat", 
                phonetic: "Hōo-suànn-tsat", 
                speech: "雨傘節", 
                description: "臺灣六大毒蛇之一，身軀布滿黑白相間的環紋，宛如老式油紙雨傘的黑白傘骨節段。具強烈神經性毒素，性情內向羞怯隱蔽。",
                audioSegments: ["雨傘節"]
            },
            en: { 
                name: "Many-banded Krait", 
                sub: "雨傘節", 
                phonetic: "Banded Krait", 
                speech: "Many-banded Krait", 
                description: "One of Taiwan's six major venomous snakes, patterned with distinct alternating black and white bands resembling an umbrella frame."
            }
        },
        a_crab: {
            tw: { 
                name: "毛蟹 (臺灣扁絨螯蟹)", 
                sub: "Môo-hē", 
                phonetic: "Môo-hē", 
                speech: "毛蟹", 
                description: "臺灣原生重要淡水降海產卵螃蟹，雙螯密生濃密絨毛，生長於未受污染的純淨溪流中，秋天隨流水洄游至河口繁衍下一代。",
                audioSegments: ["毛蟹"]
            },
            en: { 
                name: "Taiwan Mitten Crab", 
                sub: "毛蟹", 
                phonetic: "Mitten Crab", 
                speech: "Mitten Crab", 
                description: "A native freshwater crab species living in unpolluted rivers, recognizable by dense furry mittens on its claws."
            }
        },
        a_softshell_turtle: {
            tw: { 
                name: "鱉 (甲魚/水魚)", 
                sub: "Pih", 
                phonetic: "Pih", 
                speech: "鱉", 
                description: "棲息於淡水湖沼池塘底層的淡水爬行動物，背甲覆蓋柔軟革質皮膜無堅硬骨質角板，吻端如小象鼻伸出水面呼吸，動作敏捷潛水耐力長。",
                audioSegments: ["鱉"]
            },
            en: { 
                name: "Chinese Softshell Turtle", 
                sub: "鱉", 
                phonetic: "Softshell Turtle", 
                speech: "Softshell Turtle", 
                description: "A freshwater turtle featuring a leathery flexible carapace and an elongated snorkel-like snout adapted for muddy river bottoms."
            }
        },
        a_grouper: {
            tw: { 
                name: "鮢鱖 (龍膽石斑/石斑魚)", 
                sub: "Tsu-kuè", 
                phonetic: "Tsu-kuè", 
                speech: "鮢鱖", 
                description: "珊瑚礁魚類中體型最為魁梧的「石斑之王」，最大體長可達 2.7 公尺。臺灣擁有領先全球的石斑魚人工繁養殖技術，馳名國際。",
                audioSegments: ["鮢鱖"]
            },
            en: { 
                name: "Giant Grouper (King of Groupers)", 
                sub: "鮢鱖", 
                phonetic: "Giant Grouper", 
                speech: "Giant Grouper", 
                description: "The largest reef-dwelling fish species in the Indo-Pacific, celebrated in Taiwan for advanced aquaculture techniques."
            }
        },
        a_milkfish: {
            tw: { 
                name: "虱目魚 (麻豆魚/國寶魚)", 
                sub: "Sat-ba̍k-hî", 
                phonetic: "Sat-ba̍k-hî", 
                speech: "虱目魚", 
                description: "南臺灣歷史逾四百年的代表性養殖水產，體表銀亮、肉質鮮美細嫩，傳說鄭成功來臺時品嚐激賞，為臺南庶民飲食文化不可或缺的核心。",
                audioSegments: ["虱目魚"]
            },
            en: { 
                name: "Milkfish", 
                sub: "虱目魚", 
                phonetic: "Milkfish", 
                speech: "Milkfish", 
                description: "The quintessential marine fish of southern Taiwan with over 400 years of cultivation history and cultural heritage in Tainan gastronomy."
            }
        }
    },
    bird: {
        b_magpie: {
            tw: {
                name: "長尾山娘 (臺灣藍鵲)",
                sub: "Tn̂g-bué-suann-niû",
                phonetic: "Tn̂g-bué-suann-niû",
                speech: "長尾山娘",
                description: "臺灣特有種鳥類，羽色豔藍、嘴爪鮮紅，長長尾羽優雅飄逸。群居於低海拔闊葉林中，有極具社會性的「巢邊幫手」家族育雛行為。",
                audioSegments: ["長尾山娘"]
            },
            en: {
                name: "Taiwan Blue Magpie",
                sub: "長尾山娘",
                phonetic: "Blue Magpie",
                speech: "Taiwan Blue Magpie",
                description: "An endemic bird of Taiwan known for its striking royal blue plumage, bright crimson beak, and extraordinary communal helper breeding system."
            }
        },
        b_barbet: {
            tw: {
                name: "花仔和尚 (五色鳥)",
                sub: "Hue-á-huê-siūnn",
                phonetic: "Hue-á-huê-siūnn",
                speech: "花仔和尚",
                description: "臺灣特有種鳥類（臺灣擬啄木）。全身翠綠並綴有黃、藍、紅、黑五彩斑紋，叫聲「叩、叩、叩」猶如和尚敲擊木魚，常在枯木上啄洞築巢。",
                audioSegments: ["花仔和尚"]
            },
            en: {
                name: "Taiwan Barbet (Five-colored Bird)",
                sub: "花仔和尚",
                phonetic: "Taiwan Barbet",
                speech: "Taiwan Barbet",
                description: "An endemic barbet adorned with vibrant green, blue, yellow, and red feathers. Its rhythmic hollow call earned it the nickname 'Flower Monk'."
            }
        },
        b_bulbul: {
            tw: {
                name: "白頭鵠仔 (白頭翁)",
                sub: "Pe̍h-thâu-khok-á",
                phonetic: "Pe̍h-thâu-khok-á",
                speech: "白頭鵠仔",
                description: "臺灣「城市三俠」之一。頭頂後方長有一撮標誌性的白色羽毛，性情活潑外向，叫聲清脆嘹亮「巧口巧口」，常成群於庭院樹梢嬉戲啄食漿果。",
                audioSegments: ["白頭鵠仔"]
            },
            en: {
                name: "Light-vented Bulbul",
                sub: "白頭鵠仔",
                phonetic: "Light-vented Bulbul",
                speech: "Light-vented Bulbul",
                description: "One of Taiwan's most cheerful urban birds, recognized by the prominent white patch on the nape of its head and melodious bubbling song."
            }
        },
        b_white_eye: {
            tw: {
                name: "青苔仔 (綠繡眼/青笛仔)",
                sub: "Tshenn-tî-á (Tshenn-ti̍k-á)",
                phonetic: "Tshenn-tî-á",
                speech: "青苔仔",
                description: "臺灣都市公園極常見的玲瓏小鳥，城市三俠之一。全身亮綠如青苔，眼周有一圈鮮明白色眼圈如戴眼鏡，體型輕巧，常倒掛於花枝吸食花蜜。",
                audioSegments: ["青苔仔"]
            },
            en: {
                name: "Warbling White-eye",
                sub: "青苔仔",
                phonetic: "White-eye",
                speech: "Warbling White-eye",
                description: "A dainty olive-green passerine distinguished by a conspicuous white ring around each eye, often seen hanging upside down sipping nectar from flowers."
            }
        },
        b_night_heron: {
            tw: {
                name: "暗光鳥 (夜鷺)",
                sub: "Àm-kong-tsiáu",
                phonetic: "Àm-kong-tsiáu",
                speech: "暗光鳥",
                description: "臺灣溪畔與池塘常見的夜行性水鳥。頭頂深藍黑，後頸長有兩三根細長白飾羽，喜於黃昏夜間佇立水邊耐心伺機獵魚。臺語常借稱熬夜不睡的人為「暗光鳥」。",
                audioSegments: ["暗光鳥"]
            },
            en: {
                name: "Black-crowned Night Heron",
                sub: "暗光鳥",
                phonetic: "Night Heron",
                speech: "Night Heron",
                description: "A stocky nocturnal heron with crimson eyes and elegant white head plumes, famous in Taiwanese slang as a moniker for night owls."
            }
        },
        b_egret: {
            tw: {
                name: "白翎鷥 (白鷺鷥)",
                sub: "Pe̍h-līng-si",
                phonetic: "Pe̍h-līng-si",
                speech: "白翎鷥",
                description: "臺灣農田濕地最具代表性的水鳥。全身羽毛雪白，黑嘴黑腳配黃腳掌。臺灣經典童謠「白翎鷥，車畚箕，車到溪仔墘」唱出牠與農村水田相伴的深厚情誼。",
                audioSegments: ["白翎鷥"]
            },
            en: {
                name: "Little Egret",
                sub: "白翎鷥",
                phonetic: "Little Egret",
                speech: "Little Egret",
                description: "A graceful pure-white wading bird with black legs and striking yellow feet, eternally celebrated in traditional Taiwanese nursery rhymes."
            }
        },
        b_spoonbill: {
            tw: {
                name: "烏面抐桮 (黑面琵鷺)",
                sub: "Oo-bīn-lā-pue",
                phonetic: "Oo-bīn-lā-pue",
                speech: "烏面抐桮",
                description: "國際級瀕危珍稀候鳥。黑色的長喙扁平擴張如飯匙（抐桮），每年秋冬橫跨數千公里飛抵臺南七股濕地度冬，在淺水中左右掃動長喙捕捉魚蝦。",
                audioSegments: ["烏面抐桮"]
            },
            en: {
                name: "Black-faced Spoonbill",
                sub: "烏面抐桮",
                phonetic: "Black-faced Spoonbill",
                speech: "Black-faced Spoonbill",
                description: "A globally endangered migratory spoonbill that gathers each winter in southwestern Taiwan's coastal wetlands, sweeping its spatula-like bill."
            }
        },
        b_owl: {
            tw: {
                name: "貓頭鳥 (領角鴞/貓頭鷹)",
                sub: "Niau-thâu-tsiáu",
                phonetic: "Niau-thâu-tsiáu",
                speech: "貓頭鳥",
                description: "臺灣低海拔淺山與公園校園常見的夜行性猛禽。頭頂有一對角狀耳羽，雙眼圓大呈琥珀色，羽毛鬆軟飛行無聲無息，夜間發出低沉「勿～勿～」鳴聲。",
                audioSegments: ["貓頭鳥"]
            },
            en: {
                name: "Collared Scops Owl",
                sub: "貓頭鳥",
                phonetic: "Collared Scops Owl",
                speech: "Collared Scops Owl",
                description: "A small nocturnal raptor featuring distinctive feathered ear tufts and large forward-facing amber eyes, nesting in tree cavities across Taiwan."
            }
        },
        b_drongo: {
            tw: {
                name: "烏鶖 (大卷尾)",
                sub: "Oo-tshiu",
                phonetic: "Oo-tshiu",
                speech: "烏鶖",
                description: "全身黑亮、尾羽深分叉的強悍鳥類。領域性極強，飛行特技高超，常停在電線或牛背上偵察。繁殖季時極具護巢勇氣，敢向老鷹、烏鴉甚至行經路人俯衝示警。",
                audioSegments: ["烏鶖"]
            },
            en: {
                name: "Black Drongo",
                sub: "烏鶖",
                phonetic: "Black Drongo",
                speech: "Black Drongo",
                description: "An all-black predatory passerine with an iconic forked tail, famous for its aerial agility and fearless defense of its nesting territory against hawks."
            }
        },
        b_kite: {
            tw: {
                name: "鴟鴞 (老鷹/黑鳶)",
                sub: "Bā-hio̍h",
                phonetic: "Bā-hio̍h",
                speech: "鴟鴞",
                description: "臺灣最具盛名的港灣猛禽。雙翼寬長，尾羽呈淺凹形如魚尾，善於利用熱氣流在基隆港或翡翠水庫上空盤旋巡弋，俯衝捕捉水面浮魚，臺灣傳統俗稱「鴟鴞」。",
                audioSegments: ["鴟鴞"]
            },
            en: {
                name: "Black Kite",
                sub: "鴟鴞",
                phonetic: "Black Kite",
                speech: "Black Kite",
                description: "A medium-sized bird of prey renowned for its forked tail and majestic soaring flights over northern Taiwan's harbors and mountain reservoirs."
            }
        },
        b_dove: {
            tw: {
                name: "斑鴿 (斑鳩/珠頸斑鳩)",
                sub: "Pan-kah",
                phonetic: "Pan-kah",
                speech: "斑鴿",
                description: "臺灣鄉村與都市極親近人的鳩鴿科野鳥。頸部兩側至後頸有黑色如珠鍊般的白點花紋，性情溫和，常於草地上踱步啄食草籽，發出「咕咕～咕」溫柔鳴叫。",
                audioSegments: ["斑鴿"]
            },
            en: {
                name: "Spotted Dove",
                sub: "斑鴿",
                phonetic: "Spotted Dove",
                speech: "Spotted Dove",
                description: "A gentle wild pigeon native to Taiwan, adorned with a white-spotted black collar patch around its neck and known for its soft cooing call."
            }
        },
        b_myna: {
            tw: {
                name: "鵁鴒 (臺灣八哥/冠八哥)",
                sub: "Ka-līng",
                phonetic: "Ka-līng",
                speech: "鵁鴒",
                description: "臺灣原生種二級保育類八哥。嘴喙為象牙白、額頭有豎立的冠羽，全身黑亮。生性聰明，能模仿各種聲音，民間俗語「鵁鴒順便空」比喻善用現成資源。",
                audioSegments: ["鵁鴒"]
            },
            en: {
                name: "Crested Myna (Taiwan Native Myna)",
                sub: "鵁鴒",
                phonetic: "Crested Myna",
                speech: "Crested Myna",
                description: "Taiwan's native protected myna, characterized by an ivory beak, frontal feather crest, and remarkable vocal mimicry abilities."
            }
        },
        b_swallow: {
            tw: {
                name: "燕仔 (家燕)",
                sub: "Ìnn-á",
                phonetic: "Ìnn-á",
                speech: "燕仔",
                description: "每逢春暖花開時節造訪臺灣的候鳥。飛行極為輕盈迅捷，剪刀狀深叉尾羽，喜愛在民間傳統騎樓屋簷下銜泥築巢育雛，臺灣民間視燕子築巢為福氣吉祥的象徵。",
                audioSegments: ["燕仔"]
            },
            en: {
                name: "Barn Swallow",
                sub: "燕仔",
                phonetic: "Barn Swallow",
                speech: "Barn Swallow",
                description: "A swift migratory bird with a deeply forked tail, traditionally celebrated in Taiwanese culture as a bringer of good fortune when nesting under eaves."
            }
        },
        b_kingfisher: {
            tw: {
                name: "釣魚翁 (翠鳥/魚狗)",
                sub: "Tiò-hî-ang (Tiò-hû-ang)",
                phonetic: "Tiò-hî-ang",
                speech: "釣魚翁",
                description: "棲息於清澈溪流與池塘邊的豔麗小水鳥。背部羽毛閃爍如綠寶石金屬光澤，長喙筆直如矛。常如老翁般靜立枝頭凝視水面，發現獵物瞬間如閃電般直扎水中抓魚。",
                audioSegments: ["釣魚翁"]
            },
            en: {
                name: "Common Kingfisher",
                sub: "釣魚翁",
                phonetic: "Kingfisher",
                speech: "Common Kingfisher",
                description: "A dazzling small bird with iridescent sapphire-blue back plumage and a dagger-like bill, diving vertically into waters to snatch small fish."
            }
        },
        b_shrike: {
            tw: {
                name: "伯勞仔 (紅尾伯勞)",
                sub: "Pit-lô-á",
                phonetic: "Pit-lô-á",
                speech: "伯勞仔",
                description: "每年秋季乘落山風自北方南下過境恆春半島的著名候鳥。眼部有黑色眼罩如蒙面俠，嘴喙有鉤，生性兇猛，會將捕獲的蜥蜴或昆蟲插在荊棘枝刺上慢慢享用。",
                audioSegments: ["伯勞仔"]
            },
            en: {
                name: "Brown Shrike",
                sub: "伯勞仔",
                phonetic: "Brown Shrike",
                speech: "Brown Shrike",
                description: "A famous autumn migrant to southern Taiwan's Hengchun Peninsula, recognized by its dark bandit-mask eye stripe and habit of impaling prey on thorns."
            }
        },
        b_partridge: {
            tw: {
                name: "竹雞仔 (臺灣竹雞)",
                sub: "Tik-ke-á (Tik-kue-á)",
                phonetic: "Tik-ke-á",
                speech: "竹雞仔",
                description: "臺灣特有種雉科鳥類。體態圓胖矮壯，善於在竹林落葉堆中快步奔走與沙浴。叫聲極其響亮多變，常發出「雞狗乖～雞狗乖～」高亢哨音與同伴呼應。",
                audioSegments: ["竹雞仔"]
            },
            en: {
                name: "Taiwan Bamboo Partridge",
                sub: "竹雞仔",
                phonetic: "Bamboo Partridge",
                speech: "Taiwan Bamboo Partridge",
                description: "A plump endemic gamebird scurrying through dense bamboo thickets and forest floors, celebrated for its loud, resonant territorial calls."
            }
        },
        b_buzzard: {
            tw: {
                name: "南路鷹 (灰面鵟鷹/國慶鳥)",
                sub: "Lâm-lōo-ing",
                phonetic: "Lâm-lōo-ing",
                speech: "南路鷹",
                description: "每年雙十國慶前後大批過境八卦山與恆春半島的猛禽，俗稱「國慶鳥」。彰化俗諺「南路鷹，一萬死九千」道出早年濫捕，如今已成為臺灣生態保育與鷹季觀光焦點。",
                audioSegments: ["南路鷹"]
            },
            en: {
                name: "Grey-faced Buzzard (National Day Bird)",
                sub: "南路鷹",
                phonetic: "Grey-faced Buzzard",
                speech: "Grey-faced Buzzard",
                description: "A raptor that migrates through Taiwan in tens of thousands every October around National Day, soaring along the Baguashan and Kenting flyways."
            }
        },
        b_sparrow: {
            tw: {
                name: "厝角鳥仔 (麻雀/粟鳥仔)",
                sub: "Tshù-kak-tsiáu-á",
                phonetic: "Tshù-kak-tsiáu-á",
                speech: "厝角鳥仔",
                description: "與臺灣人生活最緊密的農村與都市留鳥，城市三俠之一。體態小巧圓潤，臉頰兩側有標誌性黑斑，生性機警好動，常在稻田、騎樓或屋角雀躍跳躍、嘰嘰喳喳。",
                audioSegments: ["厝角鳥仔"]
            },
            en: {
                name: "Eurasian Tree Sparrow",
                sub: "厝角鳥仔",
                phonetic: "Tree Sparrow",
                speech: "Tree Sparrow",
                description: "The most ubiquitous and familiar companion bird across Taiwan's towns and villages, identifiable by the distinctive black patch on each cheek."
            }
        },
    },
    insect: {
        i_butterfly: {
            tw: { 
                name: "尾蝶仔 (寬尾鳳蝶)", 
                sub: "Bóe-ia̍h-á", 
                phonetic: "Bóe-ia̍h-á", 
                speech: "尾蝶仔", 
                description: "臺灣特有種國寶蝴蝶，後翅有著極寬大的尾狀突起與鮮紅魚鱗狀斑紋，幼蟲僅吃稀有的臺灣擦樹葉子。",
                audioSegments: ["尾蝶", "仔"]
            },
            en: { 
                name: "Broad-tailed Swallowtail", 
                sub: "尾蝶仔", 
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
                name: "蜂", 
                sub: "Phang", 
                phonetic: "Phang", 
                speech: "蜂", 
                description: "社會性昆蟲，為大自然的花朵傳播花粉，生產甜美的蜂蜜。牠們跳舞來向同伴傳達花蜜的位置資訊。",
                audioSegments: ["蜂"]
            },
            en: { 
                name: "Bee", 
                sub: "蜂", 
                phonetic: "Bee", 
                speech: "Bee", 
                description: "A social insect that plays a crucial role in pollination and honey production. Communicates via the waggle dance."
            }
        },
        i_mantis: {
            tw: { 
                name: "草猴 (螳螂)", 
                sub: "Tsháu-kâu", 
                phonetic: "Tsháu-kâu", 
                speech: "草猴", 
                description: "擁有強大如鐮刀狀前足的捕食性昆蟲。擅長靜止偽裝成綠葉或枯枝埋伏，當獵物靠近時能以迅雷不及掩耳的速度出擊獵捕。",
                audioSegments: ["草猴"]
            },
            en: { 
                name: "Praying Mantis", 
                sub: "草猴", 
                phonetic: "Praying Mantis", 
                speech: "Praying Mantis", 
                description: "A predatory insect known for its prominent raptorial forelegs folded in a 'praying' stance, used to ambush other insects with lightning speed."
            }
        },
        i_grasshopper: {
            tw: { 
                name: "草蜢仔 (草螟仔/蚱蜢)", 
                sub: "Tsháu-meh-á", 
                phonetic: "Tsháu-meh-á / Tsháu-mê-á", 
                speech: "草蜢仔", 
                description: "棲息在草叢田野間的草食性昆蟲，擁有一雙強而有力的後腿跳躍力驚人。臺灣經典民謠《草螟弄雞公》唱的正是牠輕巧活潑的模樣。",
                audioSegments: ["草蜢仔"]
            },
            en: { 
                name: "Grasshopper (Katydid)", 
                sub: "草蜢仔", 
                phonetic: "Grasshopper", 
                speech: "Grasshopper", 
                description: "An herbivorous insect equipped with powerful hind legs for jumping vast distances, famous in Taiwanese folk songs."
            }
        },
        i_scarab: {
            tw: { 
                name: "金龜 (金龜子)", 
                sub: "Kim-ku", 
                phonetic: "Kim-ku", 
                speech: "金龜", 
                description: "甲蟲家族的一員，背部長著如寶石般金屬光澤的堅硬翅鞘。喜愛吸食花蜜、成熟果實與樹汁，幼蟲則生活於富含有機質的泥土中。",
                audioSegments: ["金龜"]
            },
            en: { 
                name: "Scarab Beetle (Jewel Beetle)", 
                sub: "金龜", 
                phonetic: "Scarab Beetle", 
                speech: "Scarab Beetle", 
                description: "A stout beetle celebrated for its iridescent metallic sheen, feeding on nectar, tree sap, and ripe fruit."
            }
        },
        i_ant: {
            tw: { 
                name: "狗蟻 (螞蟻)", 
                sub: "Káu-hiā", 
                phonetic: "Káu-hiā", 
                speech: "狗蟻", 
                description: "高度社會化的微型昆蟲，蟻群分工極其嚴密，由蟻后、雄蟻與工蟻各司其職。能透過信息素觸角氣味溝通，共同搬運比自身重數十倍的食物。",
                audioSegments: ["狗蟻"]
            },
            en: { 
                name: "Ant", 
                sub: "狗蟻", 
                phonetic: "Ant", 
                speech: "Ant", 
                description: "Highly organized social insects living in complex colonies, communicating through chemical pheromone trails and cooperatively carrying heavy loads."
            }
        },
        i_hornet: {
            tw: { 
                name: "虎頭蜂 (大胡蜂)", 
                sub: "Hóo-thâu-phang", 
                phonetic: "Hóo-thâu-phang", 
                speech: "虎頭蜂", 
                description: "大型掠食性蜂類，體型壯碩且腹部有鮮明警戒黑黃條紋。防禦心與護巢意識極強，築巢於樹梢或岩洞，是大自然中強悍的森林獵手。",
                audioSegments: ["虎頭蜂"]
            },
            en: { 
                name: "Hornet (Asian Giant Hornet)", 
                sub: "虎頭蜂", 
                phonetic: "Hornet", 
                speech: "Hornet", 
                description: "The largest eusocial wasps, formidable predators with distinct tiger-like stripes and potent venom used to defend their colonies."
            }
        },
        i_mole_cricket: {
            tw: { 
                name: "杜伯仔 (肚伯仔/螻蛄)", 
                sub: "Tōo-peh-á", 
                phonetic: "Tōo-peh-á", 
                speech: "杜伯仔", 
                description: "生活在田間泥土下的地棲昆蟲，前腳特化成如圓鍬般的寬扁開掘足，擅長快速挖掘地道。「灌杜伯仔」是臺灣早年鄉間孩童最熱門的童年野趣。",
                audioSegments: ["杜伯仔"]
            },
            en: { 
                name: "Mole Cricket", 
                sub: "杜伯仔", 
                phonetic: "Mole Cricket", 
                speech: "Mole Cricket", 
                description: "A subterranean insect with powerful spade-like forelegs adapted for digging through soil, central to nostalgic Taiwanese childhood memories."
            }
        },
        i_stag_beetle: {
            tw: { 
                name: "剪仔龜 (鍬形蟲)", 
                sub: "Tsián-á-ku", 
                phonetic: "Tsián-á-ku", 
                speech: "剪仔龜", 
                description: "森林甲蟲界的強悍武士，雄蟲頭部有一對如同剪刀或雄鹿巨角般發達的大顎，用於爭奪樹液地盤與求偶打鬥。",
                audioSegments: ["剪仔龜"]
            },
            en: { 
                name: "Stag Beetle", 
                sub: "剪仔龜", 
                phonetic: "Stag Beetle", 
                speech: "Stag Beetle", 
                description: "A prominent beetle renowned for its formidable antler-like mandibles in males, used to wrestle rivals for feeding territory."
            }
        },
        i_mosquito: {
            tw: { 
                name: "蠓仔 (蚊子)", 
                sub: "Báng-á", 
                phonetic: "Báng-á", 
                speech: "蠓仔", 
                description: "常見的雙翅目吸血昆蟲，雌蚊需要吸食溫血動物血液來促進卵巢發育，幼蟲「孑孓」生活在不流動的靜水容器中。",
                audioSegments: ["蠓仔"]
            },
            en: { 
                name: "Mosquito", 
                sub: "蠓仔", 
                phonetic: "Mosquito", 
                speech: "Mosquito", 
                description: "A slender flying insect with fragile legs and needle-like mouthparts. Female mosquitoes require blood meals to nurture developing eggs."
            }
        },
        i_cricket: {
            tw: { 
                name: "蟋蟀仔 (蟋蟀)", 
                sub: "Sih-sut-á", 
                phonetic: "Sih-sut-á", 
                speech: "蟋蟀仔", 
                description: "秋夜田野間的著名鳴蟲，雄蟋蟀透過相互摩擦前翅特化的音銼與刮器發出清脆唧唧聲，具有強烈的地盤防禦性。",
                audioSegments: ["蟋蟀仔"]
            },
            en: { 
                name: "Field Cricket", 
                sub: "蟋蟀仔", 
                phonetic: "Cricket", 
                speech: "Cricket", 
                description: "A nocturnal insect renowned for its melodic chirping song produced by stridulation—rubbing its textured front wings together."
            }
        },
        i_caterpillar: {
            tw: { 
                name: "刺毛蟲 (毛毛蟲)", 
                sub: "Tshì-môo-thâng", 
                phonetic: "Tshì-môo-thâng", 
                speech: "刺毛蟲", 
                description: "鱗翅目蝴蝶與飛蛾的幼蟲階段，身體表面長有細密絨毛或毒刺禦敵，食量驚人迅速生長，經過結繭化蛹完全變態羽化。",
                audioSegments: ["刺毛蟲"]
            },
            en: { 
                name: "Caterpillar", 
                sub: "刺毛蟲", 
                phonetic: "Caterpillar", 
                speech: "Caterpillar", 
                description: "The voracious larval stage of butterflies and moths, covered in protective setae, undergoing complete metamorphosis inside a pupa."
            }
        },
        i_moth: {
            tw: { 
                name: "蛾仔 (飛蛾)", 
                sub: "Ia̍h-á", 
                phonetic: "Ia̍h-á", 
                speech: "蛾仔", 
                description: "夜行性為主的鱗翅目昆蟲，多數擁有羽毛狀或梳齒狀的敏銳觸角，停棲時翅膀多平鋪或呈屋脊狀收攏，具有強烈趨光性。",
                audioSegments: ["蛾仔"]
            },
            en: { 
                name: "Moth", 
                sub: "蛾仔", 
                phonetic: "Moth", 
                speech: "Moth", 
                description: "A diverse group of predominantly nocturnal lepidopterans, characterized by feathery antennae and wings folded flat or tent-like over the back."
            }
        },
        i_termite: {
            tw: { 
                name: "大水蟻 (白蟻/飛蟻)", 
                sub: "Tuā-tsuí-hiā", 
                phonetic: "Tuā-tsuí-hiā", 
                speech: "大水蟻", 
                description: "白蟻族群中的有翅繁殖蟻。每逢夏季大雨來臨前氣壓低且濕度高的黃昏，會成千上萬集體離巢「分飛」求偶建立新王國。",
                audioSegments: ["大水蟻"]
            },
            en: { 
                name: "Flying Termite (Alate)", 
                sub: "大水蟻", 
                phonetic: "Termite Alate", 
                speech: "Termite", 
                description: "Winged reproductive termites that emerge in massive swarms on humid evenings before summer rainstorms to mate and form new colonies."
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
                audioSegments: ["花", "東", "縱", "谷"]
            },
            en: { 
                name: "East Rift Valley", 
                sub: "花東縱谷", 
                phonetic: "East Rift Valley (Huadong)", 
                speech: "East Rift Valley", 
                description: "A long, fertile valley between the Central and Coastal mountain ranges, situated on the tectonic collision suture line."
            }
        }
,
        // 擴充：海域與離島海岸特寫 (Islands & Coasts)
        g_green_island: {
            tw: { 
                name: "綠島 (火燒島)", 
                sub: "Li̍k-tó / Hué-sio-tó", 
                phonetic: "Li̍k-tó (Hué-sio-tó)", 
                speech: "綠島", 
                description: "臺灣東南方太平洋上的火山島嶼，擁有舉世罕見的朝日海底鹹水溫泉與美麗壯麗的珊瑚礁裙生態。",
                audioSegments: ["綠", "島"]
            },
            en: { 
                name: "Green Island", 
                sub: "綠島", 
                phonetic: "Green Island (Lyudao)", 
                speech: "Green Island", 
                description: "A volcanic island off Taiwan's eastern coast, world-famous for its rare saltwater hot springs and coral reefs."
            }
        },
        g_orchid_island: {
            tw: { 
                name: "蘭嶼 (紅頭嶼)", 
                sub: "Lân-sū / Âng-thâu-sū", 
                phonetic: "Lân-sū (Âng-thâu-sū)", 
                speech: "蘭嶼", 
                description: "達悟族（雅美族）世居的熱帶島嶼，保留獨特的拼板舟造船技術、飛魚祭典傳統與地下石穴屋文化。",
                audioSegments: ["蘭", "嶼"]
            },
            en: { 
                name: "Orchid Island (Lanyu)", 
                sub: "蘭嶼", 
                phonetic: "Orchid Island", 
                speech: "Orchid Island", 
                description: "A tropical island home to the Indigenous Tao people, celebrated for handcrafted tatala canoes and flying fish festivals."
            }
        },
        g_guishan_island: {
            tw: { 
                name: "龜山島", 
                sub: "Ku-suann-tó", 
                phonetic: "Ku-suann-tó", 
                speech: "龜山島", 
                description: "宜蘭頭城外海的活火山島，外形宛如海中浮龜。周圍有海底溫泉噴湧形成的 Tiffany 藍「牛奶海」與賞鯨勝景。",
                audioSegments: ["龜", "山", "島"]
            },
            en: { 
                name: "Guishan Island (Turtle Island)", 
                sub: "龜山島", 
                phonetic: "Turtle Island", 
                speech: "Guishan Island", 
                description: "An active volcanic island off Yilan shaped like a giant turtle, famous for underwater thermal vents creating Milky Sea."
            }
        },
        g_pacific_ocean: {
            tw: { 
                name: "太平洋", 
                sub: "Thài-pîng-iûnn", 
                phonetic: "Thài-pîng-iûnn", 
                speech: "太平洋", 
                description: "地球上最遼闊的海洋，緊臨臺灣東海岸斷崖，深邃深藍的黑潮暖流長年北上，滋養極為豐沛的鯨豚與魚類資源。",
                audioSegments: ["太平洋"]
            },
            en: { 
                name: "Pacific Ocean", 
                sub: "太平洋", 
                phonetic: "Pacific Ocean", 
                speech: "Pacific Ocean", 
                description: "The world's largest ocean flanking Taiwan's east coast, where the deep Kuroshio Current nurtures rich marine biodiversity."
            }
        },
        g_yehliu: {
            tw: { 
                name: "野柳女王頭", 
                sub: "Iá-liú Lú-ông-thâu", 
                phonetic: "Iá-liú Lú-ông-thâu", 
                speech: "野柳女王頭", 
                description: "北海岸萬里野柳岬角歷經千萬年海水差異侵蝕形成的蕈狀岩，維妙維肖如雍容華貴的英國女王側影。",
                audioSegments: ["野", "柳", "女王", "頭"]
            },
            en: { 
                name: "Yehliu Queen's Head", 
                sub: "野柳女王頭", 
                phonetic: "Queen's Head Rock", 
                speech: "Queen's Head Rock", 
                description: "An iconic mushroom rock hoodoo sculpted by marine erosion in Yehliu Geopark, resembling Queen Elizabeth."
            }
        },
        g_eluanbi: {
            tw: { 
                name: "鵝鑾鼻", 
                sub: "Gô-luân-phīnn", 
                phonetic: "Gô-luân-phīnn", 
                speech: "鵝鑾鼻", 
                description: "臺灣本島最南端的石灰岩岬角，矗立著「東亞之光」鵝鑾鼻燈塔，隔著巴士海峽與菲律賓隔海相望。",
                audioSegments: ["鵝", "鼻"]
            },
            en: { 
                name: "Eluanbi (Cape Eluanbi)", 
                sub: "鵝鑾鼻", 
                phonetic: "Cape Eluanbi", 
                speech: "Eluanbi", 
                description: "The southernmost point of Taiwan island with its historic lighthouse overlooking the Bashi Channel."
            }
        },
        // 擴充：名勝水體與人文古蹟 (Landmarks & Waters)
        g_dajia_river: {
            tw: { 
                name: "大甲溪", 
                sub: "Tāi-kah-khe", 
                phonetic: "Tāi-kah-khe", 
                speech: "大甲溪", 
                description: "中部重要河流，上游七家灣溪棲息國寶魚櫻花鉤吻鮭，河口的高美濕地則是世界知名的夕陽生態保護區。",
                audioSegments: ["大", "甲", "溪"]
            },
            en: { 
                name: "Dajia River", 
                sub: "大甲溪", 
                phonetic: "Dajia River", 
                speech: "Dajia River", 
                description: "A major river in central Taiwan feeding wetlands at its mouth and sheltering endangered salmon in its headwaters."
            }
        },
        g_xiuguluan_river: {
            tw: { 
                name: "秀姑巒溪", 
                sub: "Siù-koo-luân-khe", 
                phonetic: "Siù-koo-luân-khe", 
                speech: "秀姑巒溪", 
                description: "東臺灣第一大河，發源於中央山脈，深切海岸山脈形成奇岩絕壁，是臺灣最受歡迎的急流泛舟熱門勝地。",
                audioSegments: ["秀", "姑", "溪"]
            },
            en: { 
                name: "Xiuguluan River", 
                sub: "秀姑巒溪", 
                phonetic: "Xiuguluan River", 
                speech: "Xiuguluan River", 
                description: "The longest river in eastern Taiwan, carving spectacular gorges through Coastal Range, famous for whitewater rafting."
            }
        },
        g_keelung_port: {
            tw: { 
                name: "基隆港", 
                sub: "Ke-lâng-káng", 
                phonetic: "Ke-lâng-káng", 
                speech: "基隆港", 
                description: "北臺灣最著名的天然深水良港，三面環山，長年海運繁盛，也是國際頂級豪華郵輪進出臺灣最重要的門戶。",
                audioSegments: ["基隆", "港"]
            },
            en: { 
                name: "Port of Keelung", 
                sub: "基隆港", 
                phonetic: "Keelung Port", 
                speech: "Port of Keelung", 
                description: "A deepwater harbor in northern Taiwan serving as the island's primary cruise passenger and maritime trading hub."
            }
        },
        g_anping_fort: {
            tw: { 
                name: "安平古堡", 
                sub: "An-pîng kóo-pó", 
                phonetic: "An-pîng kóo-pó", 
                speech: "安平古堡", 
                description: "原名「熱蘭遮城」，1624年由荷蘭東印度公司修築於臺南，見證大航海時代臺灣與世界的首度繁盛交流。",
                audioSegments: ["安", "平", "古堡"]
            },
            en: { 
                name: "Anping Old Fort (Fort Zeelandia)", 
                sub: "安平古堡", 
                phonetic: "Anping Fort", 
                speech: "Anping Fort", 
                description: "Built in 1624 by the Dutch East India Company in Tainan, standing as the historic origin of modern Taiwan."
            }
        },
        g_lukang: {
            tw: { 
                name: "鹿港小鎮", 
                sub: "Lo̍k-káng", 
                phonetic: "Lo̍k-káng", 
                speech: "鹿港", 
                description: "清代「一府二鹿三艋舺」的臺灣第二大商港，保留壯麗的鹿港天后宮、九曲巷、摸乳巷與百年木雕錫雕傳統工藝。",
                audioSegments: ["鹿", "港"]
            },
            en: { 
                name: "Lukang Historic Town", 
                sub: "鹿港", 
                phonetic: "Lukang", 
                speech: "Lukang", 
                description: "An ancient port town famous for temples, preserved winding alleys, traditional bakeries, and heritage handicrafts."
            }
        },
        g_alishan_tree: {
            tw: { 
                name: "阿里山神木", 
                sub: "A-lí-san Sîn-bo̍k", 
                phonetic: "A-lí-san Sîn-bo̍k", 
                speech: "神木", 
                description: "高聳入雲的千年以上臺灣紅檜巨木，歷經雷擊與歲月考驗，是臺灣高山林相宏偉與生生不息的精神地標。",
                audioSegments: ["阿里山", "神木"]
            },
            en: { 
                name: "Alishan Sacred Tree", 
                sub: "阿里山神木", 
                phonetic: "Alishan Sacred Cypress", 
                speech: "Alishan Sacred Tree", 
                description: "Ancient Formosan cypress trees standing for millennia in the mist-shrouded high mountains of Alishan."
            }
        }
,
        // 新增知名都會與水庫 (Expanded Urban & Water Geography)
        g_tainan: {
            tw: { 
                name: "臺南古都 (府城)", 
                sub: "Tâi-lâm Kóo-too", 
                phonetic: "Tâi-lâm", 
                speech: "臺南", 
                description: "臺灣歷史文化的起源起點，曾為全島政治經濟中心長達兩百餘年，保留孔廟、赤崁樓、安平古堡等無數一級古蹟與豐盛美食小吃。",
                audioSegments: ["臺南"]
            },
            en: { 
                name: "Tainan Historic Capital", 
                sub: "臺南", 
                phonetic: "Tainan", 
                speech: "Tainan", 
                description: "Taiwan's ancient cultural capital for over two centuries, rich with centuries-old temples, fortresses, and culinary heritage."
            }
        },
        g_kaohsiung: {
            tw: { 
                name: "高雄港都", 
                sub: "Ko-hiông Káng-too", 
                phonetic: "Ko-hiông", 
                speech: "高雄", 
                description: "臺灣第一大國際商港與南方工業重鎮，面臨臺灣海峽，擁有美麗的愛河、駁二特區、旗津半島與繁榮熱絡的遠洋航運。",
                audioSegments: ["高雄"]
            },
            en: { 
                name: "Port of Kaohsiung", 
                sub: "高雄", 
                phonetic: "Kaohsiung", 
                speech: "Kaohsiung", 
                description: "Taiwan's primary international maritime trading port and largest southern metropolis facing the Taiwan Strait."
            }
        },
        g_taipei: {
            tw: { 
                name: "臺北盆地", 
                sub: "Tâi-pak Phûn-tē", 
                phonetic: "Tâi-pak", 
                speech: "臺北", 
                description: "北臺灣最大的河谷陷落盆地，四周由大屯火山群、雪山山脈尾稜環繞，淡水河流貫其間，是臺灣當前政治、經濟與交通心臟地帶。",
                audioSegments: ["臺北"]
            },
            en: { 
                name: "Taipei Basin", 
                sub: "臺北", 
                phonetic: "Taipei", 
                speech: "Taipei", 
                description: "The major metropolitan basin in northern Taiwan surrounded by mountains, serving as the modern nation's capital hub."
            }
        },
        g_taichung: {
            tw: { 
                name: "臺中盆地", 
                sub: "Tâi-tiong Phûn-tē", 
                phonetic: "Tâi-tiong", 
                speech: "臺中", 
                description: "中臺灣核心平原盆地，氣候四季溫暖宜人，西鄰大肚台地、東接中央山脈山麓，大甲溪與大肚溪滋養廣大沃野。",
                audioSegments: ["臺中"]
            },
            en: { 
                name: "Taichung Basin", 
                sub: "臺中", 
                phonetic: "Taichung", 
                speech: "Taichung", 
                description: "The fertile central Taiwan basin with pleasant climate, acting as the industrial and cultural nexus of central Taiwan."
            }
        },
        g_yilan: {
            tw: { 
                name: "宜蘭平原 (蘭陽平原)", 
                sub: "Gî-lân Pênn-guân", 
                phonetic: "Gî-lân", 
                speech: "宜蘭", 
                description: "依山傍海的三角洲沖積平原，面向太平洋與龜山島遙遙相對。冬山河水利發達、溫泉清澈甘純，素有「好山好水」美稱。",
                audioSegments: ["宜蘭"]
            },
            en: { 
                name: "Yilan Plain (Lanyang Plain)", 
                sub: "宜蘭", 
                phonetic: "Yilan", 
                speech: "Yilan", 
                description: "An alluvial delta plain facing the Pacific Ocean and Guishan Island, celebrated for pristine water springs and landscapes."
            }
        },
        g_zengwen_reservoir: {
            tw: { 
                name: "曾文水庫", 
                sub: "Tsan-bûn Tsuí-khòo", 
                phonetic: "Tsan-bûn Tsuí-khòo", 
                speech: "水庫", 
                description: "全臺灣蓄水量最大、湖面面積最廣的水庫，橫跨嘉義與臺南山區，兼具水力發電、防洪調節與供應南臺灣百萬民生工業用水功能。",
                audioSegments: ["水庫"]
            },
            en: { 
                name: "Zengwen Reservoir", 
                sub: "曾文水庫", 
                phonetic: "Zengwen Reservoir", 
                speech: "Zengwen Reservoir", 
                description: "The largest water storage reservoir in Taiwan by volume, playing a vital role in flood mitigation and regional water supply."
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
,
        // 擴充：頭面五官特寫 (Head & Facial Features)
        b_forehead: {
            tw: { 
                name: "額頭", 
                sub: "Hia̍h-thâu", 
                phonetic: "Hia̍h-thâu", 
                speech: "額頭", 
                description: "頭部正面雙眼上方的寬廣部位，額骨保護大腦額葉，額頭肌肉能配合表情做出挑眉、驚訝或思索的豐富動作。",
                audioSegments: ["額頭"]
            },
            en: { 
                name: "Forehead", 
                sub: "額頭", 
                phonetic: "Forehead", 
                speech: "Forehead", 
                description: "The upper frontal part of the face above the eyebrows, protecting the frontal lobe of the brain."
            }
        },
        b_eyebrow: {
            tw: { 
                name: "目眉 (眉毛)", 
                sub: "Ba̍k-bâi", 
                phonetic: "Ba̍k-bâi", 
                speech: "目眉", 
                description: "眼眶上方呈拱形排列的細密毛髮，能有效阻擋額頭流下的汗水、雨水與灰塵掉入眼睛，並具有傳神的臉部溝通功能。",
                audioSegments: ["目眉"]
            },
            en: { 
                name: "Eyebrows", 
                sub: "目眉", 
                phonetic: "Eyebrows", 
                speech: "Eyebrows", 
                description: "Arched strips of hair above the eyes that prevent sweat and debris from entering the eyes and convey expressions."
            }
        },
        b_teeth: {
            tw: { 
                name: "喙齒 (牙齒)", 
                sub: "Tshuì-khí", 
                phonetic: "Tshuì-khí", 
                speech: "喙齒", 
                description: "鑲嵌在上下顎齒槽內的堅硬鈣質器官，由極為堅硬的琺瑯質保護，負責切斷、撕裂並研磨食物，並協助咬字發音。",
                audioSegments: ["喙", "齒"]
            },
            en: { 
                name: "Teeth", 
                sub: "喙齒", 
                phonetic: "Teeth", 
                speech: "Teeth", 
                description: "Hard, calcified structures embedded in the jaws, coated in enamel for chewing food and aiding speech articulation."
            }
        },
        b_tongue: {
            tw: { 
                name: "舌 (舌頭)", 
                sub: "Chi̍h", 
                phonetic: "Chi̍h", 
                speech: "舌", 
                description: "口腔底部靈巧的肌肉感覺器官，表面密布味蕾感知酸甜苦鹹鮮，能靈活攪拌食物協助吞嚥，更是清晰說話的核心部位。",
                audioSegments: ["舌"]
            },
            en: { 
                name: "Tongue", 
                sub: "舌", 
                phonetic: "Tongue", 
                speech: "Tongue", 
                description: "A muscular sensory organ in the mouth covered in taste buds, essential for tasting, chewing, swallowing, and speech."
            }
        },
        b_chin: {
            tw: { 
                name: "下頦 (下巴)", 
                sub: "Ē-hâi", 
                phonetic: "Ē-hâi", 
                speech: "下頦", 
                description: "面部正下方由下顎骨前端構成的突出輪廓，兩側顳顎關節帶動下顎靈活開闔，支撐咀嚼、表情與言語。",
                audioSegments: ["下頦"]
            },
            en: { 
                name: "Chin", 
                sub: "下頦", 
                phonetic: "Chin", 
                speech: "Chin", 
                description: "The lower anatomical extremity of the face formed by the mandible, supporting jaw articulation and chewing."
            }
        },
        b_neck: {
            tw: { 
                name: "頷頸 (頸部/脖子)", 
                sub: "Ām-kún", 
                phonetic: "Ām-kún", 
                speech: "頷頸", 
                description: "連接頭部與軀幹的重要生命通道，包含七節頸椎、頸動脈、氣管與食道，支撐頭部重量並提供靈巧的多角度旋轉。",
                audioSegments: ["頷頸"]
            },
            en: { 
                name: "Neck", 
                sub: "頷頸", 
                phonetic: "Neck", 
                speech: "Neck", 
                description: "The vital corridor connecting head to torso, encasing the cervical spine, carotid arteries, trachea, and esophagus."
            }
        },
        // 擴充：胸腹內臟系統特寫 (Visceral System)
        b_trachea: {
            tw: { 
                name: "氣管", 
                sub: "Khì-kńg", 
                phonetic: "Khì-kńg", 
                speech: "氣管", 
                description: "由十餘個彈性 C 型軟骨環支撐的呼吸管道，內壁佈滿纖毛與黏液吸附灰塵雜質，將新鮮空氣安全引導至兩側肺葉。",
                audioSegments: ["氣管"]
            },
            en: { 
                name: "Trachea (Windpipe)", 
                sub: "氣管", 
                phonetic: "Trachea", 
                speech: "Trachea", 
                description: "A cartilaginous tube lined with cilia that filters and conducts inhaled air from the larynx into the bronchi."
            }
        },
        b_esophagus: {
            tw: { 
                name: "食道", 
                sub: "Si̍t-tō", 
                phonetic: "Si̍t-tō", 
                speech: "食道", 
                description: "位於氣管後方的長條形平滑肌肉管道，在吞嚥時藉由協調的波浪狀肌肉蠕動，迅速將食團從咽喉推進至胃中。",
                audioSegments: ["食_sit", "道"]
            },
            en: { 
                name: "Esophagus (Gullet)", 
                sub: "食道", 
                phonetic: "Esophagus", 
                speech: "Esophagus", 
                description: "A muscular tube behind the windpipe that contracts rhythmically via peristalsis to move food into the stomach."
            }
        },
        b_gallbladder: {
            tw: { 
                name: "膽 (膽囊)", 
                sub: "Tánn", 
                phonetic: "Tánn", 
                speech: "膽", 
                description: "緊貼於肝臟下方的梨形肌肉囊袋，負責暫存、濃縮肝臟分泌的苦綠色膽汁，並在吃進油脂食物時收縮排入十二指腸乳化脂肪。",
                audioSegments: ["膽"]
            },
            en: { 
                name: "Gallbladder", 
                sub: "膽", 
                phonetic: "Gallbladder", 
                speech: "Gallbladder", 
                description: "A pear-shaped organ beneath the liver that stores and concentrates bile to help digest fats in meals."
            }
        },
        b_spleen: {
            tw: { 
                name: "脾 (脾臟)", 
                sub: "Phî", 
                phonetic: "Phî", 
                speech: "脾", 
                description: "位於左上腹部的暗紅色扁橢圓形器官，是人體最大的淋巴免疫過濾器，清除老化紅血球並儲存白血球與血小板抵禦感染。",
                audioSegments: ["脾"]
            },
            en: { 
                name: "Spleen", 
                sub: "脾", 
                phonetic: "Spleen", 
                speech: "Spleen", 
                description: "The largest lymphatic organ, filtering blood to destroy old red blood cells and holding reserves of immune cells."
            }
        },
        b_pancreas: {
            tw: {
                name: "腰尺 (胰臟)",
                sub: "Io-tshioh",
                phonetic: "Io-tshioh",
                speech: "腰尺",
                description: "囥佇胃後壁、十二指腸邊仔的淡黃色長條器官，會分泌消化液共食物消化，閣會分泌胰島素調節血糖。豬的胰臟嘛叫做腰尺。",
                audioSegments: ["腰尺"]
            },
            en: {
                name: "Pancreas",
                sub: "腰尺",
                phonetic: "Pancreas",
                speech: "Pancreas",
                description: "A pale-yellow gland behind the stomach that releases digestive juices into the duodenum and insulin into the blood to control blood sugar."
            }
        },
        b_bladder: {
            tw: { 
                name: "膀胱 (尿袋)", 
                sub: "Phông-kong / Jiō-tē", 
                phonetic: "Phông-kong", 
                speech: "膀胱", 
                description: "骨盆腔底部的彈性肌肉中空囊袋，收集由雙腎排出的尿液暫時儲存，平滑肌富有高度擴展彈性，隨神經訊號控制排尿。",
                audioSegments: ["膀胱"]
            },
            en: { 
                name: "Urinary Bladder", 
                sub: "膀胱", 
                phonetic: "Bladder", 
                speech: "Bladder", 
                description: "A hollow muscular and elastic organ in the pelvis that stores urine excreted by the kidneys before urination."
            }
        },
        // 擴充：四肢關節與肢體特寫 (Limbs & Extremities)
        b_shoulder: {
            tw: { 
                name: "肩胛頭 (肩膀)", 
                sub: "King-kah-thâu", 
                phonetic: "King-kah-thâu", 
                speech: "肩胛頭", 
                description: "連接手臂與胸廓上緣的球窩關節構造，具有全身人體活動角度最大的旋轉自由度，提供上肢靈活舉起、揮擺與承重。",
                audioSegments: ["肩胛頭"]
            },
            en: { 
                name: "Shoulder", 
                sub: "肩胛頭", 
                phonetic: "Shoulder", 
                speech: "Shoulder", 
                description: "A complex ball-and-socket joint that links upper arm to torso, offering the widest range of motion in the body."
            }
        },
        b_elbow: {
            tw: { 
                name: "手肘 (手彎/手肘彎)", 
                sub: "Tshiú-uann", 
                phonetic: "Tshiú-uann", 
                speech: "手肘", 
                description: "連接上臂肱骨與前臂尺橈骨的關鍵鉸鏈關節，能做屈伸與轉動動作，讓手部能精巧地將食物送入口中或做工。",
                audioSegments: ["手", "彎"]
            },
            en: { 
                name: "Elbow", 
                sub: "手肘", 
                phonetic: "Elbow", 
                speech: "Elbow", 
                description: "A hinge joint connecting upper arm to forearm, enabling bending, extension, and forearm rotation."
            }
        },
        b_fingers: {
            tw: { 
                name: "指頭仔 (手指)", 
                sub: "Tsíng-thâu-á / Tshiú-tsí", 
                phonetic: "Tsíng-thâu-á", 
                speech: "指頭仔", 
                description: "手掌末端靈巧敏銳的五根指節，指尖神經末梢極為豐富，具備精細的觸覺感受力，能執行握筆、撫摸與繁複工藝。",
                audioSegments: ["指頭仔"]
            },
            en: { 
                name: "Fingers", 
                sub: "指頭仔", 
                phonetic: "Fingers", 
                speech: "Fingers", 
                description: "Five articulated digits of the hand with dense tactile receptors and opposable thumb control for dexterous grasping."
            }
        },
        b_knee: {
            tw: { 
                name: "跤頭趺 (膝蓋)", 
                sub: "Kha-thâu-u", 
                phonetic: "Kha-thâu-u", 
                speech: "跤頭趺", 
                description: "人體最大且構造最精密的承重鉸鏈關節，受髕骨與韌帶牢固保護，半月軟骨板如天然彈簧般吸收行走跑步的巨大衝擊。",
                audioSegments: ["跤頭趺"]
            },
            en: { 
                name: "Knee", 
                sub: "跤頭趺", 
                phonetic: "Knee", 
                speech: "Knee", 
                description: "The largest and most complex weight-bearing joint, cushioned by menisci cartilages to absorb shock while moving."
            }
        },
        b_ankle: {
            tw: { 
                name: "跤目 (腳踝)", 
                sub: "Kha-ba̍k", 
                phonetic: "Kha-ba̍k", 
                speech: "跤目", 
                description: "連接小腿脛骨、腓骨與足部距骨的關節突起部位，由強韌韌帶包裹，維持站立行走時的足底受力平衡與微調角度。",
                audioSegments: ["跤目"]
            },
            en: { 
                name: "Ankle", 
                sub: "跤目", 
                phonetic: "Ankle", 
                speech: "Ankle", 
                description: "The joint uniting the lower leg bones with the foot, providing hinge stability and balance adjustments during movement."
            }
        },
        b_sole: {
            tw: { 
                name: "跤底 (腳底)", 
                sub: "Kha-té", 
                phonetic: "Kha-té / Kha-tué", 
                speech: "跤底", 
                description: "直接與地面接觸的足底部，具有厚實耐磨的角質層與縱橫交錯的彈性足弓，能分散人體全身重量並具備避震減震機能。",
                audioSegments: ["跤底"]
            },
            en: { 
                name: "Sole (Foot Sole)", 
                sub: "跤底", 
                phonetic: "Sole", 
                speech: "Sole of Foot", 
                description: "The bottom surface of the foot featuring strong arches and thick skin cushions that absorb impact and disperse weight."
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
        },
        m_transmission: {
            tw: { 
                name: "變速箱 (齒輪變速)", 
                sub: "Piàn-sok-siunn", 
                phonetic: "Piàn-sok-siunn", 
                speech: "變速箱", 
                description: "位於引擎後方的動力傳遞中樞，內置多組不同齒比的齒輪組與同步器，依車速與負載切換前進檔、倒檔或空檔，調整輸出扭力與轉速。",
                audioSegments: ["變速", "箱"]
            },
            en: { 
                name: "Transmission (Gearbox)", 
                sub: "變速箱", 
                phonetic: "Transmission", 
                speech: "Transmission", 
                description: "The mechanical transmission system that provides controlled application of power via multiple gear ratios between the engine and drive wheels."
            }
        },
        m_car_brake: {
            tw: { 
                name: "車擋 / 碟煞 (煞車制動)", 
                sub: "Tshia-tòng (Tap-sat)", 
                phonetic: "Tshia-tòng", 
                speech: "車擋", 
                description: "車輛關鍵制動機構。由煞車踏板連動油壓總泵，推動紅色煞車卡鉗夾緊通風打孔碟盤，產生巨大摩擦阻力將行駛動能轉化為熱能降速停下。",
                audioSegments: ["車擋"]
            },
            en: { 
                name: "Disc Brake (Brake Caliper & Rotor)", 
                sub: "車擋 / 碟煞", 
                phonetic: "Disc Brake", 
                speech: "Disc Brake", 
                description: "A brake mechanism using hydraulic calipers to squeeze pairs of pads against a ventilated disc rotor, creating friction to slow wheel rotation."
            }
        },
        m_chassis: {
            tw: { 
                name: "底盤 / 車架 (鋼樑骨架)", 
                sub: "Té-puânn / Tshia-kè", 
                phonetic: "Té-puânn", 
                speech: "底盤", 
                description: "支撐全車重量與剛性的鋼質骨架平台，整合引擎、變速箱、前後懸吊系統與傳動軸，負責吸收路面衝擊力道與維繫撞擊安全結構防護。",
                audioSegments: ["底盤"]
            },
            en: { 
                name: "Vehicle Chassis (Frame)", 
                sub: "底盤 / 車架", 
                phonetic: "Chassis", 
                speech: "Chassis", 
                description: "The structural backbone and load-bearing framework of an automobile, mounting the powertrain, suspension system, and wheels."
            }
        },
        m_pedal: {
            tw: { 
                name: "跤踏仔 (腳踏板)", 
                sub: "Kha-ta̍h-á", 
                phonetic: "Kha-ta̍h-á", 
                speech: "跤踏仔", 
                description: "安裝於自行車曲柄兩端的踏腳旋轉板，由騎士雙腳施力踩踏驅動大齒盤旋轉，內裝精密滾珠軸承讓踩踏旋轉動作滑順省力。",
                audioSegments: ["跤踏仔"]
            },
            en: { 
                name: "Bicycle Pedals", 
                sub: "跤踏仔", 
                phonetic: "Bicycle Pedals", 
                speech: "Bicycle Pedals", 
                description: "The foot-operated components attached to cranks that a rider pushes to rotate the chainring and propel the bicycle forward."
            }
        },
        m_saddle: {
            tw: { 
                name: "椅仔 (自行車座墊)", 
                sub: "Í-á (Tshia-í)", 
                phonetic: "Í-á", 
                speech: "椅仔", 
                description: "支撐騎士大部分體重的自行車鞍座，具備人體工學曲線、高彈性發泡襯墊與減震弓導軌，確保長途騎乘的舒適支撐度與骨盆穩定。",
                audioSegments: ["椅仔"]
            },
            en: { 
                name: "Bicycle Saddle (Seat)", 
                sub: "椅仔", 
                phonetic: "Bicycle Saddle", 
                speech: "Bicycle Saddle", 
                description: "The ergonomic seat that supports the cyclist's weight, mounted atop the seatpost to provide comfort and efficient pedaling posture."
            }
        },
        // ===== 汽車內部與駕駛室配備 (Car Interior & Cockpit) =====
        // ===== 新增跤踏車細部配備 (Expanded Bicycle Parts) =====
        m_bike_wheel: {
            tw: { 
                name: "車輪 (輪仔/前輪後輪)", 
                sub: "Tshia-lián / Lián-á", 
                phonetic: "Tshia-lián", 
                speech: "車輪", 
                description: "腳踏車支撐車重並旋轉前進的雙輪總成，包含輪框、鋼絲幅條、軸承花鼓與外胎內胎，使踩踏旋轉平順低阻力向前滾動。",
                audioSegments: ["車輪"]
            },
            en: { 
                name: "Bicycle Wheel", 
                sub: "車輪", 
                phonetic: "Bicycle Wheel", 
                speech: "Bicycle Wheel", 
                description: "The complete circular wheel assembly comprising the rim, spokes, hub, and pneumatic tire enabling bicycle motion."
            }
        },
        m_bike_frame: {
            tw: { 
                name: "車身 (車架/鐵身幾何骨架)", 
                sub: "Tshia-sin (Tshia-kè)", 
                phonetic: "Tshia-sin", 
                speech: "車身", 
                description: "自行車由上管、下管、立管與後三角焊接組成的高剛性幾何車架。承載騎士全身體重並連接車把手、座墊、輪組與傳動組件。",
                audioSegments: ["車身"]
            },
            en: { 
                name: "Bicycle Frame (Chassis)", 
                sub: "車身", 
                phonetic: "Bicycle Frame", 
                speech: "Bicycle Frame", 
                description: "The main structural triangle and stays of the bicycle that connects the wheels and supports the rider and components."
            }
        },
        m_bike_rim: {
            tw: { 
                name: "輪框 (輪圈/鋁合金鐵框)", 
                sub: "Lián-khing", 
                phonetic: "Lián-khing", 
                speech: "輪框", 
                description: "車輪安裝輪胎的環狀金屬框圈，提供煞車邊摩擦制動並藉由鋼絲幅條維持正圓形剛性，確保行駛不晃動變形。",
                audioSegments: ["輪框"]
            },
            en: { 
                name: "Wheel Rim", 
                sub: "輪框", 
                phonetic: "Wheel Rim", 
                speech: "Wheel Rim", 
                description: "The outer metal hoop of a bicycle wheel that holds the tire and provides a braking surface for calipers."
            }
        },
        m_bike_spoke: {
            tw: { 
                name: "鋼絲 (輪輻/輪絲)", 
                sub: "Kǹg-si", 
                phonetic: "Kǹg-si", 
                speech: "鋼絲", 
                description: "連接中心輪軸（花鼓）與外圍輪圈的高拉力不鏽鋼幅條，透過交錯編織張力吸收路面微幅震動並保持車輪均勻承重。",
                audioSegments: ["鋼絲"]
            },
            en: { 
                name: "Wheel Spokes", 
                sub: "鋼絲", 
                phonetic: "Spokes", 
                speech: "Spokes", 
                description: "The thin metal tensioned wire rods radiating from the central wheel hub to the outer rim to support vehicle loads."
            }
        },
        m_bike_derailleur: {
            tw: { 
                name: "變速 (變速器/導輪齒盤組)", 
                sub: "Piàn-sok (Piàn-sok-khì)", 
                phonetic: "Piàn-sok", 
                speech: "變速", 
                description: "安裝於後輪軸心旁的後變速器與多層飛輪，透過撥動鏈條切換不同齒比大小齒輪，在平路衝刺或陡坡爬坡時調節踩踏省力節奏。",
                audioSegments: ["變速"]
            },
            en: { 
                name: "Derailleur (Gear Shifter & Cassette)", 
                sub: "變速", 
                phonetic: "Derailleur", 
                speech: "Derailleur", 
                description: "The variable-ratio gear shifting mechanism that moves the chain across sprockets on the rear wheel cassette."
            }
        },
        m_bike_grip: {
            tw: { 
                name: "手扞仔 (把手/把套)", 
                sub: "Tshiú-huānn-á", 
                phonetic: "Tshiú-huānn-á", 
                speech: "手扞仔", 
                description: "腳踏車手把上供騎士雙手穩固握持的防滑握把套或纏繞手把帶，具備吸汗防滑與吸收手部路感震動的保護功能。",
                audioSegments: ["手扞仔"]
            },
            en: { 
                name: "Handlebar Grips (Bar Tape)", 
                sub: "手扞仔", 
                phonetic: "Handlebar Grips", 
                speech: "Handlebar Grips", 
                description: "The rubber grips or cork tape covering the handlebar ends to provide tactile grip and vibration damping."
            }
        },
        m_bike_stand: {
            tw: { 
                name: "架仔 (支架/水壺架/腳架)", 
                sub: "Kè-á", 
                phonetic: "Kè-á", 
                speech: "架仔", 
                description: "安裝於車身下管上的便民水壺架或車尾側邊停車腳架，便利騎士長途騎乘隨手補充水分，或在路邊快速停放車輛。",
                audioSegments: ["架仔"]
            },
            en: { 
                name: "Bottle Cage / Kickstand", 
                sub: "架仔", 
                phonetic: "Bike Rack / Stand", 
                speech: "Bike Rack", 
                description: "The mounting bracket attached to bicycle tubes for holding water bottles or supporting the parked bicycle upright."
            }
        },
        m_bike_pump: {
            tw: { 
                name: "灌風 (打氣嘴/打氣筒/風筒)", 
                sub: "Kuàn hong / Hong-tâng", 
                phonetic: "Kuàn hong", 
                speech: "灌風", 
                description: "自行車內胎輪圈上的充氣氣閥嘴與便攜充氣筒，提供騎士打氣加壓充填氣體，維持標準胎壓確保騎乘路感輕快順暢。",
                audioSegments: ["灌風"]
            },
            en: { 
                name: "Valve Stem & Bike Pump", 
                sub: "灌風", 
                phonetic: "Tire Valve & Pump", 
                speech: "Tire Valve", 
                description: "The one-way air valve stem and inflation pump used to maintain optimal pneumatic tire pressure."
            }
        },
        m_bike_bell: {
            tw: { 
                name: "鈴仔 (車鈴/響鈴)", 
                sub: "Lîng-á", 
                phonetic: "Lîng-á", 
                speech: "鈴仔", 
                description: "安裝於車把手上的清脆金屬警示車鈴，用拇指輕撥彈簧擊錘撞擊銅蓋，發出「叮噹」悅耳響音提醒前方行人注意避讓。",
                audioSegments: ["鈴仔"]
            },
            en: { 
                name: "Bicycle Bell", 
                sub: "鈴仔", 
                phonetic: "Bicycle Bell", 
                speech: "Bicycle Bell", 
                description: "A handlebar-mounted percussive acoustic device rung with a thumb-operated hammer to warn pedestrians."
            }
        },
        m_bike_light: {
            tw: { 
                name: "車燈 (電火/前車燈)", 
                sub: "Tshia-ting (Tiān-hué)", 
                phonetic: "Tshia-ting", 
                speech: "車燈", 
                description: "固定在車頭或座管上的高亮度LED照明車燈與警示尾燈，在夜間或天候昏暗時照亮前方路況，並提升對向來車辨識度。",
                audioSegments: ["車燈"]
            },
            en: { 
                name: "Bicycle Headlight & Tail Light", 
                sub: "車燈", 
                phonetic: "Bicycle Light", 
                speech: "Bicycle Light", 
                description: "Front and rear illuminating LED safety lamps to improve nighttime roadway vision and vehicular visibility."
            }
        },
        m_bike_lock: {
            tw: { 
                name: "鎖頭 (車鎖/防盜鎖)", 
                sub: "Só-thâu (Tshia-só)", 
                phonetic: "Só-thâu", 
                speech: "鎖頭", 
                description: "保護腳踏車不被竊取的高強度鋼纜鎖或U型金屬硬鎖，將車輪與車架牢固固定在路邊欄杆或車柱上。",
                audioSegments: ["鎖頭"]
            },
            en: { 
                name: "Bicycle Lock", 
                sub: "鎖頭", 
                phonetic: "Bike Lock", 
                speech: "Bike Lock", 
                description: "A security locking mechanism used to secure the bicycle frame and wheels to stationary objects."
            }
        },
        m_bike_basket: {
            tw: { 
                name: "籃仔 (車籃/前置物籃)", 
                sub: "Nâ-á (Tshia-nâ)", 
                phonetic: "Nâ-á", 
                speech: "籃仔", 
                description: "安裝於車把龍頭前方的藤編或鐵線置物籃，方便民眾或學生隨車放置書包、公事包、採買雜物或新鮮蔬果。",
                audioSegments: ["籃仔"]
            },
            en: { 
                name: "Front Bicycle Basket", 
                sub: "籃仔", 
                phonetic: "Bicycle Basket", 
                speech: "Bicycle Basket", 
                description: "A front-mounted open wire or wicker carrier basket attached to the handlebars for transporting parcels and goods."
            }
        },
        m_steering: {
            tw: { 
                name: "ha̋n-tóo-luh (方向盤)", 
                sub: "Ha̋n-tóo-luh / Tshiú-puânn", 
                phonetic: "Ha̋n-tóo-luh", 
                speech: "ha̋n-tóo-luh", 
                description: "駕駛操控汽車行駛方向的核心圓形盤體，借自日語「ハンドル(handoru)」。藉由轉向機柱帶動轉向齒輪與拉桿，精確控制前輪轉向角度。",
                audioSegments: ["ha̋n-tóo-luh"]
            },
            en: { 
                name: "Steering Wheel (Handle)", 
                sub: "ha̋n-tóo-luh / 手盤", 
                phonetic: "Steering Wheel", 
                speech: "Steering Wheel", 
                description: "The primary circular control manipulated by the driver to steer the automobile via the steering column and rack mechanism."
            }
        },
        m_horn: {
            tw: { 
                name: "喇叭 (方向盤鳴笛)", 
                sub: "Lá-pah", 
                phonetic: "Lá-pah", 
                speech: "喇叭", 
                description: "設置於方向盤正中央的警示音鳴笛開關。按下即接通電路驅動電磁音響器，發出宏亮聲響警示周遭人車以確保行車安全。",
                audioSegments: ["喇叭"]
            },
            en: { 
                name: "Car Horn", 
                sub: "喇叭", 
                phonetic: "Car Horn", 
                speech: "Car Horn", 
                description: "The audible acoustic device positioned on the center hub of the steering wheel to alert nearby traffic."
            }
        },
        m_dashboard: {
            tw: { 
                name: "磅錶 (儀錶板/車速錶)", 
                sub: "Pōng-pió (Pió-pán)", 
                phonetic: "Pōng-pió", 
                speech: "磅錶", 
                description: "正對駕駛員的行車資訊整合儀表板，配置時速表、轉速表、油量指示錶、水溫錶與多元故障檢測警示燈號，隨時反映車況。",
                audioSegments: ["磅錶"]
            },
            en: { 
                name: "Dashboard & Instrument Cluster", 
                sub: "磅錶", 
                phonetic: "Dashboard", 
                speech: "Dashboard", 
                description: "The console mounted ahead of the steering wheel, containing speedometers, tachometers, fuel gauges, and indicator lamps."
            }
        },
        m_gearstick: {
            tw: { 
                name: "拍速 (排檔桿/變速桿)", 
                sub: "Phah-sok (Tòng-kńg)", 
                phonetic: "Phah-sok", 
                speech: "拍速", 
                description: "座艙中央排檔座上的變速控制桿，台語俗稱「拍速」（打檔）。駕駛手握排檔桿切換各前進擋位、倒退檔(R)或停車檔(P)。",
                audioSegments: ["拍速"]
            },
            en: { 
                name: "Gear Shift Lever (Gearstick)", 
                sub: "拍速", 
                phonetic: "Gearstick", 
                speech: "Gearstick", 
                description: "The hand-operated lever on the central console used to change gears in manual or automatic transmissions."
            }
        },
        m_handbrake: {
            tw: { 
                name: "手擋 (手煞車/手剎車)", 
                sub: "Tshiú-tòng", 
                phonetic: "Tshiú-tòng", 
                speech: "手擋", 
                description: "排檔桿後方的機械拉柄式或電子駐車制動器。拉起時透過鋼索將後輪煞車來令片緊緊夾死，防止停妥車輛在斜坡上溜車。",
                audioSegments: ["手擋"]
            },
            en: { 
                name: "Handbrake (Parking Brake)", 
                sub: "手擋", 
                phonetic: "Handbrake", 
                speech: "Handbrake", 
                description: "A mechanical hand lever that tensions steel cables to lock the rear brakes and secure the parked automobile."
            }
        },
        m_brake_pedal: {
            tw: { 
                name: "跤擋 (腳煞車踏板)", 
                sub: "Kha-tòng", 
                phonetic: "Kha-tòng", 
                speech: "跤擋", 
                description: "駕駛座底板居中的主煞車踏板，由駕駛右腳踩踏施力，帶動煞車倍力器推擠液壓油管，推動四輪碟煞卡鉗迅速夾緊煞停。",
                audioSegments: ["跤擋"]
            },
            en: { 
                name: "Foot Brake Pedal", 
                sub: "跤擋", 
                phonetic: "Brake Pedal", 
                speech: "Brake Pedal", 
                description: "The central foot pedal depressed to activate the hydraulic braking booster for stopping vehicular motion."
            }
        },
        m_accelerator: {
            tw: { 
                name: "油門 (油門踏板)", 
                sub: "Iû-mn̂g", 
                phonetic: "Iû-mn̂g", 
                speech: "油門", 
                description: "駕駛踏板最右側的油門加速踏板，腳踩下時開大引擎節氣門並增加噴油量，讓引擎轉速高轉提速，使車輛向前衝刺馳騁。",
                audioSegments: ["油門"]
            },
            en: { 
                name: "Accelerator (Gas Pedal)", 
                sub: "油門", 
                phonetic: "Accelerator", 
                speech: "Accelerator", 
                description: "The rightmost pedal controlling the engine intake throttle valve to regulate power delivery and acceleration."
            }
        },
        m_clutch: {
            tw: { 
                name: "khu-lá-tsih (離合器踏板)", 
                sub: "Khu-lá-tsih", 
                phonetic: "khu-lá-tsih", 
                speech: "khu-lá-tsih", 
                description: "手排車踏板最左側的離合器腳踏板，借自日語「クラッチ(kuratchi)」。左腳踩下時切斷引擎動力傳動，便於流暢變換擋位。",
                audioSegments: ["khu-lá-tsih"]
            },
            en: { 
                name: "Clutch Pedal", 
                sub: "khu-lá-tsih", 
                phonetic: "Clutch Pedal", 
                speech: "Clutch Pedal", 
                description: "The leftmost foot pedal on manual transmission cars used to disengage the clutch plate for gear shifting."
            }
        },
        m_ac: {
            tw: { 
                name: "冷氣 (空調出風口)", 
                sub: "Líng-khì", 
                phonetic: "Líng-khì", 
                speech: "冷氣", 
                description: "座艙中控台與兩側的空調出風百葉窗，由壓縮機冷凝循環輸送除濕涼風，可微調扇葉角度營造均勻涼爽的車室氣流環境。",
                audioSegments: ["冷氣"]
            },
            en: { 
                name: "Air Conditioner & Vents", 
                sub: "冷氣", 
                phonetic: "Air Conditioner", 
                speech: "Air Conditioner", 
                description: "The climate control air vents delivering cooled or dehumidified airflow to maintain passenger cabin comfort."
            }
        },
        m_seat: {
            tw: { 
                name: "椅仔 (駕駛座座椅)", 
                sub: "Í-á (Tshia-í)", 
                phonetic: "Í-á", 
                speech: "椅仔", 
                description: "符合人體工學的深包覆駕駛賽車座椅，提供腰椎靠背、頭枕與兩側肩部包覆支撐，並可多向調節前後距離與坐姿高低角度。",
                audioSegments: ["椅仔"]
            },
            en: { 
                name: "Driver's Bucket Seat", 
                sub: "椅仔", 
                phonetic: "Driver Seat", 
                speech: "Driver Seat", 
                description: "An ergonomic contour seat providing lumbar and lateral body support with multi-way adjustments."
            }
        },
        m_seatbelt: {
            tw: { 
                name: "安全帶 (三點式安全帶)", 
                sub: "An-tsuân-tuà", 
                phonetic: "An-tsuân-tuà", 
                speech: "安全帶", 
                description: "保障車內乘客生命安全的第一防線。當遇到急遽煞車或激烈衝撞時內部慣性滾軸立即咬合鎖定，緊縛人體防止拋射受創。",
                audioSegments: ["安全帶"]
            },
            en: { 
                name: "Seat Belt (Safety Belt)", 
                sub: "安全帶", 
                phonetic: "Seat Belt", 
                speech: "Seat Belt", 
                description: "The indispensable 3-point restraint safety belt that locks under sudden deceleration to protect occupants."
            }
        },
        m_door: {
            tw: { 
                name: "車門 (車門門板/開門把手)", 
                sub: "Tshia-mn̂g", 
                phonetic: "Tshia-mn̂g", 
                speech: "車門", 
                description: "座艙側邊出入車門，門內飾板整合車窗控制鍵、車門開關拉柄與儲物置杯槽，內部骨架置有高強度鋼樑抵禦側面撞擊。",
                audioSegments: ["車門"]
            },
            en: { 
                name: "Car Door & Inner Panel", 
                sub: "車門", 
                phonetic: "Car Door", 
                speech: "Car Door", 
                description: "The side vehicle door structure incorporating inner release handles, armrests, and high-strength side-impact crash beams."
            }
        },
        m_window: {
            tw: { 
                name: "車窗 (窗仔/電動車窗)", 
                sub: "Tshia-thang (Thang-á)", 
                phonetic: "Tshia-thang", 
                speech: "車窗", 
                description: "車門兩側的安全強化隔熱玻璃窗，透過電動升降馬達按鍵靈活控制升降，具備通風防雨與視野穿透功能。",
                audioSegments: ["車窗"]
            },
            en: { 
                name: "Power Window (Side Glass)", 
                sub: "車窗", 
                phonetic: "Car Window", 
                speech: "Car Window", 
                description: "Side tempered window glass with electric motors and switches for ventilation and driving visibility."
            }
        },
        m_windshield: {
            tw: { 
                name: "玻璃 (擋風玻璃)", 
                sub: "Po-lê (Tòng-hong po-lê)", 
                phonetic: "Po-lê", 
                speech: "玻璃", 
                description: "前擋風高強度雙層夾膠安全玻璃，破裂時黏附於中間PVB膠膜不飛散刺傷乘員，提供寬闊清晰的正面行車視野。",
                audioSegments: ["玻璃"]
            },
            en: { 
                name: "Windshield (Windscreen)", 
                sub: "玻璃", 
                phonetic: "Windshield", 
                speech: "Windshield", 
                description: "The front laminated safety glass offering aerodynamic protection and broad unobstructed visibility for safe driving."
            }
        },
        m_rearview: {
            tw: { 
                name: "照鏡 (照後鏡/後視鏡)", 
                sub: "Tsiò-kiànn (Hiō-tsiò-kiànn)", 
                phonetic: "Tsiò-kiànn", 
                speech: "照鏡", 
                description: "汽車的照鏡有車外兩爿門邊的「照後鏡」（圖中車窗外彼粒）佮擋風玻璃頂中央的車內後照鏡，協助駕駛毋免越頭就看會著後壁佮兩爿的來車。",
                audioSegments: ["照鏡"]
            },
            en: { 
                name: "Rear-view / Side Mirror", 
                sub: "照鏡", 
                phonetic: "Rearview Mirror", 
                speech: "Rearview Mirror", 
                description: "Cars have two door (side) mirrors - the one seen through the window in this photo - plus an interior mirror at the top of the windshield, so drivers can see traffic behind without turning around."
            }
        }

    }
};

// ==========================================================================
// 2. ChhoeTaigi Audio Map (KipSutian database entries mappings)
// ==========================================================================
const taigiAudioMap = {
    // 野生動物 (Pure Non-Bird Wildlife) & 臺灣地理 (Expanded Geography)
    "羌": "4416(1)",
    "百步蛇": "2662(1)",
    "果子猫": "4197(1)",
    "水雞": "1192(1)",
    "膨鼠": "11877(1)",
    "雨傘節": "4613(1)",
    "毛蟹": "1197(1)",
    "鱉": "13254(1)",
    "鮢鱖": "14514(1)",
    "虱目魚": "4529(1)",
    "臺北": "20637(1)",
    "臺中": "20668(1)",
    "臺南": "20696(1)",
    "高雄": "20704(1)",
    "宜蘭": "20770(1)",
    "花蓮": "20790(1)",
    "臺東": "20818(1)",
    "水庫": "1014(1)",

    // 汽車內部設備與駕駛室 (Car Interior & Cockpit)
    "ha̋n-tóo-luh": "20404(1)",
    "手擋": "1155(1)",
    "跤擋": "10127(1)",
    "車擋": "3500(1)",
    "拍速": "14093(1)",
    "油門": "26198(1)",
    "安全帶": "28624(1)",
    "車門": "24478(1)",
    "車窗": "25094(1)",
    "窗仔": "8777(1)",
    "冷氣": "2916(1)",
    "khu-lá-tsih": "20440(1)",
    "喇叭": "8189(1)",
    "椅仔": "8492(1)",
    "照鏡": "9731(1)",
    "磅錶": "11267(1)",
    "玻璃": "5284(1)",

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
    "鮭": "1837(1)", "魚": "8084(1)", 
    "長尾山娘": "29552(1)", "山娘": "531(1)",
    
    // 新增野生動物
    "山豬": "523(1)",
    "鯪鯉": "12938(1)",
    "水牛": "863(1)",
    "海翁": "6189(1)",
    "海豬": "6215(1)",
    "烏面抐桮": "6270(1)",
    "貓頭鳥": "11943(1)",
    "飛鼠": "5655(1)",
    "烏鶖": "6330(1)",
    "水獺": "1194(1)",
    "山羊": "25441(1)",
    "海龜": "23394(1)",
    
    // 臺灣鳥類專屬教育部正音
    "花仔和尚": "27448(1)",
    "白頭鵠仔": "2016(1)",
    "青苔仔": "27536(1)",
    "暗光鳥": "9585(1)",
    "白翎鷥": "1949(1)",
    "鴟鴞": "7881(1)",
    "斑鴿": "8472(1)",
    "鵁鴒": "12470(1)",
    "燕仔": "11783(1)",
    "釣魚翁": "8056(1)",
    "伯勞仔": "2922(1)",
    "竹雞仔": "2815(1)",
    "南路鷹": "4745(1)",
    "厝角鳥仔": "5822(1)",
    "鳥類": "8085(1)",
    
    // 昆蟲相關
    "尾蝶": "3121(1)", "蝴蝶": "11374(1)", 
    "火金姑": "1247(1)",    // 火金蛄 (hué-kim-koo ID 1247 一字不缺)
    "蟬仔": "12599(1)",     // 蟬仔 (siân-á ID 12599)
    "鹿角": "8106(1)", "仙": "1303(1)", // 鹿角 (lo̍k-kak ID 8106) + 仙 (sian ID 1303) -> 獨角仙
    "田嬰": "2017(1)",      // 田嬰 (tshên-enn ID 2017)
    "蜜": "10801(1)", "蜂": "9989(1)",
    "草猴": "6589(1)",       // 草猴 (tsháu-kâu ID 6589: 螳螂)
    "草蜢仔": "6605(1)",     // 草蜢仔 (tsháu-meh-á ID 6605: 蚱蜢/草螟)
    "金龜": "4652(1)",       // 金龜 (kim-ku ID 4652: 金龜子)
    "狗蟻": "4367(1)",       // 狗蟻 (káu-hiā ID 4367: 螞蟻)
    "虎頭蜂": "4651(1)",     // 虎頭蜂 (hóo-thâu-phang ID 4651: 大胡蜂)
    "杜伯仔": "3232(1)",     // 杜伯仔 (tōo-peh-á ID 3232: 螻蛄/肚伯仔)
    "剪仔龜": "14261(1)",    // 剪仔龜 (tsián-á-ku ID 14261: 鍬形蟲)
    "蠓仔": "13012(1)",      // 蠓仔 (báng-á ID 13012: 蚊子)
    "蟋蟀仔": "12366(1)",    // 蟋蟀仔 (sih-sut-á ID 12366: 蟋蟀)
    "刺毛蟲": "3617(1)",     // 刺毛蟲 (tshì-môo-thâng ID 3617: 毛毛蟲)
    "蛾仔": "10004(1)",      // 蛾仔 (ia̍h-á ID 10004: 飛蛾)
    "大水蟻": "27459(1)",    // 大水蟻 (tuā-tsuí-hiā ID 27459: 繁殖期白蟻飛蟻)
    
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
    "花": "4425(1)", "東": "4187(1)", "縱": "7140(1)", "谷": "329(1)", // 花東縱谷
    
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
    "變速": "26778(1)", "箱": "11250(1)", // 變速 (piàn-sok) + 箱 (siunn) -> 變速箱
    "車擋": "3500(1)", // 車擋 (tshia-tòng: 汽車/自行車煞車制動)
    "底盤": "24237(1)", // 底盤 (té-puânn: 車身底盤骨架)
    "跤踏仔": "10125(1)", // 跤踏仔 (kha-ta̍h-á: 踏板)
    "椅仔": "8492(1)", // 椅仔 (í-á: 坐墊)
    "車輪": "3498(1)", // 車輪 (tshia-lián)

    

    // === 擴充地理 (離島、海域、名勝、水體、古蹟) ===
    "綠": "10695(1)",
    "島": "5887(1)",
    "蘭": "13115(1)",
    "嶼": "185(1)",    // 嶼/士 (sū)
    "龜": "12093(1)",
    "太平洋": "23695(1)",
    "野": "8003(1)",
    "女王": "25994(1)", // 女王 (lú-ông)
    "頭": "12031(1)",  // 頭 (thâu)
    "柳": "10749(1)",  // 柳/綹 (liú)
    "鵝": "12759(1)",
    "鼻": "10938(1)",
    "大": "187(1)",
    "甲": "1847(1)",
    "秀": "12546(1)", "姑": "3765(1)",
    "基隆": "20752(1)",
    "港": "8544(1)",
    "安": "2281(1)",
    "安平": "2281(1)",
    "古堡": "24021(1)", // 古堡 (kóo-pó)
    "平": "1645(1)",   // 平 (pîng)
    "鹿": "8086(1)",
    "神木": "20876(1)",

    // === 擴充人體器官與部位 (頭面五官、內臟、關節四肢) ===
    "額頭": "12756(1)",
    "目眉": "1926(1)",
    "喙": "8174(1)",
    "齒": "11570(1)",
    "舌": "2599(1)",
    "下頦": "526(1)",
    "頷頸": "12082(1)",
    "氣管": "28748(1)",
    "食": "5570(1)",
    "食_sit": "10440(1)", // 食道 si̍t-tō: literary si̍t, borrows audio of 實 si̍t
    // bicycle parts (MOE KipSutian headwords, verified 2026-11-08)
    "車身": "23215(1)",
    "輪框": "11498(1)",
    "鋼絲": "26693(1)",
    "手扞仔": "909(1)",
    "架仔": "5083(1)",
    "灌風": "13101(1)",
    "鈴仔": "10262(1)",
    "車燈": "25096(1)",
    "鎖頭": "12727(1)",
    "籃仔": "12990(1)",
    "腰尺": "9881(1)", // io-tshioh 胰臟 (MOE 9881)
    "道": "10153(1)",
    "膽": "12294(1)",
    "脾": "8900(1)",
    "膀胱": "10768(1)",
    "肚": "3340(1)",
    "肩胛頭": "4450(1)",
    "彎": "13192(1)",  // 彎 (uan)
    "手曲": "905(1)",    // 手曲 (tshiú-khiau)
    "指頭仔": "5054(1)",
    "手指": "987(1)",
    "跤頭趺": "10132(1)",
    "跤目": "10073(1)",
    "跤底": "10085(1)",

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
    "寬尾鳳蝶": "寬尾鬨夜", "蝴蝶": "歐牒", "尾蝶仔": "尾夜阿", "螢火蟲": "營夥充", "火金姑": "毀金姑",
    "臺灣油蟬": "台玩油賢", "蟬仔": "賢阿", "獨角仙": "毒角先",
    "蜻蜓": "青聽", "田嬰": "纏因", "蜂": "胖", "蜜蜂": "逼胖",
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
        title: "六合一跨領域台語雙語學習 App",
        subtitle: "生物人體、生活機械、臺灣地理、野生動物與鳥類特攻隊",
        tabBird: "🦅 臺灣鳥類",
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
        title: "6-in-1 Bilingual Taiwanese Learning App",
        subtitle: "Biology, Anatomy, Machinery, Geography, Wildlife & Birds",
        tabBird: "🦅 Birds of Taiwan",
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
    updateHeaderDate();
    initCanvasZoomInteractions();
    initDiagramEngine();
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
    else if (tabId === "bird") { audioSeg = "鳥類"; fallback = "鳥類"; }
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
    const subInteriorBtn = document.getElementById("machinery-sub-interior");
    if (subInteriorBtn) subInteriorBtn.classList.remove("active");
    
    document.getElementById("machinery-bike-area").classList.remove("active");
    document.getElementById("machinery-car-area").classList.remove("active");
    const interiorArea = document.getElementById("machinery-interior-area");
    if (interiorArea) interiorArea.classList.remove("active");
    
    if (subId === "bike") {
        document.getElementById("machinery-sub-bike").classList.add("active");
        document.getElementById("machinery-bike-area").classList.add("active");
        selectedPart = "m_tire";
    } else if (subId === "car") {
        document.getElementById("machinery-sub-car").classList.add("active");
        document.getElementById("machinery-car-area").classList.add("active");
        selectedPart = "m_engine";
    } else if (subId === "interior") {
        if (subInteriorBtn) subInteriorBtn.classList.add("active");
        if (interiorArea) interiorArea.classList.add("active");
        selectedPart = "m_steering";
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
    
    document.getElementById("ui-title").textContent = t.title;
    document.getElementById("ui-subtitle").textContent = t.subtitle;
    document.getElementById("lang-toggle-btn").innerHTML = `<i class="fa-solid fa-language"></i> ${currentLang === "ZH" ? "English / 台語" : "台語 / English"}`;
    
    // Tab labels
    const romanizations = {
        animal: "Iá-sing tōng-bu̍t",
        bird: "Tâi-uân tsiáu-luī",
        insect: "Siông-kìan khun-thiông",
        geography: "Tâi-uân tē-lí",
        body: "Jîn-thé kiat-kòo",
        machinery: "Sing-ua̍h ki-hāi"
    };

    document.getElementById("tab-animal-btn").innerHTML = `
        <span class="tab-title">🐻 <span class="tab-text">${t.tabAnimal.substring(2)}</span></span>
        <span class="tab-sub">${romanizations.animal}</span>
    `;
    document.getElementById("tab-bird-btn").innerHTML = `
        <span class="tab-title">🦅 <span class="tab-text">${t.tabBird.substring(2)}</span></span>
        <span class="tab-sub">${romanizations.bird}</span>
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

    // Zoom preset buttons localization
    const isZH = currentLang === "ZH";
    const elGeoOverview = document.querySelector("#geo-preset-overview .preset-label");
    if (elGeoOverview) elGeoOverview.textContent = isZH ? "全島地形總覽" : "All Taiwan";
    const elGeoIslands = document.querySelector("#geo-preset-islands .preset-label");
    if (elGeoIslands) elGeoIslands.textContent = isZH ? "放大：海域與離島" : "Zoom: Islands";
    const elGeoLandmarks = document.querySelector("#geo-preset-landmarks .preset-label");
    if (elGeoLandmarks) elGeoLandmarks.textContent = isZH ? "放大：名勝水體古蹟" : "Zoom: Landmarks";

    const elBodyOverview = document.querySelector("#body-preset-overview .preset-label");
    if (elBodyOverview) elBodyOverview.textContent = isZH ? "全身器官總覽" : "Whole Body";
    const elBodyHead = document.querySelector("#body-preset-head .preset-label");
    if (elBodyHead) elBodyHead.textContent = isZH ? "放大：頭面五官" : "Zoom: Head & Face";
    const elBodyViscera = document.querySelector("#body-preset-viscera .preset-label");
    if (elBodyViscera) elBodyViscera.textContent = isZH ? "放大：胸腹內臟" : "Zoom: Visceral";
    const elBodyLimbs = document.querySelector("#body-preset-limbs .preset-label");
    if (elBodyLimbs) elBodyLimbs.textContent = isZH ? "放大：四肢關節" : "Zoom: Limbs";
    
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
            const bikeIds = ["m_tire", "m_chain", "m_brake", "m_handlebar", "m_pedal", "m_saddle", "m_bike_wheel", "m_bike_frame", "m_bike_rim", "m_bike_spoke", "m_bike_derailleur", "m_bike_grip", "m_bike_stand", "m_bike_pump", "m_bike_bell", "m_bike_light", "m_bike_lock", "m_bike_basket"];
            const carIds = ["m_engine", "m_sparkplug", "m_shock", "m_exhaust", "m_battery", "m_transmission", "m_car_brake", "m_chassis"];
            const interiorIds = ["m_steering", "m_horn", "m_dashboard", "m_gearstick", "m_handbrake", "m_brake_pedal", "m_accelerator", "m_clutch", "m_ac", "m_seat", "m_seatbelt", "m_door", "m_window", "m_windshield", "m_rearview"];
            
            let targetIds = bikeIds;
            if (currentMachinerySub === "car") targetIds = carIds;
            else if (currentMachinerySub === "interior") targetIds = interiorIds;
            
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
    autoZoomForQuiz(currentTab, currentCorrectAnswer);
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
        if (currentMachinerySub === "bike") {
            filteredKeys = ["m_tire", "m_chain", "m_brake", "m_handlebar", "m_pedal", "m_saddle", "m_bike_wheel", "m_bike_frame", "m_bike_rim", "m_bike_spoke", "m_bike_derailleur", "m_bike_grip", "m_bike_stand", "m_bike_pump", "m_bike_bell", "m_bike_light", "m_bike_lock", "m_bike_basket"];
        } else if (currentMachinerySub === "car") {
            filteredKeys = ["m_engine", "m_sparkplug", "m_shock", "m_exhaust", "m_battery", "m_transmission", "m_car_brake", "m_chassis"];
        } else if (currentMachinerySub === "interior") {
            filteredKeys = ["m_steering", "m_horn", "m_dashboard", "m_gearstick", "m_handbrake", "m_brake_pedal", "m_accelerator", "m_clutch", "m_ac", "m_seat", "m_seatbelt", "m_door", "m_window", "m_windshield", "m_rearview"];
        }
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


// ==========================================================================
// 8. Interactive Zoom & Smooth Pan Engine (Geography & Human Body)
// ==========================================================================
let currentGeoZoom = "overview";   // "overview" | "islands" | "landmarks"
let currentBodyZoom = "overview";  // "overview" | "head" | "viscera" | "limbs"

// --------------------------------------------------------------------------
// Diagram layout engine
// Every hotspot is stored ONCE as a pixel position on the source image
// (DIAGRAM_CONFIG[..].anchors). On every view change / zoom step the engine
// projects those anchors through the current camera, moves the dots, orders
// the label badges by height (so leader lines don't cross) and redraws the
// lines. Dots therefore stay on their real place in every view and zoom level.
// To move a dot: change its [x, y] pixel position on the image below.
// --------------------------------------------------------------------------
const DIAGRAM_CONFIG = {
    "taiwan-map-svg": {
        mode: "columns", layerId: "geo-image-layer", img: [848, 1264],
        anchors: { r_tamsui: [607, 74], l_taiwan_strait: [163, 369], l_penghu: [76, 625], r_zhuoshui: [294, 549], l_sunmoonlake: [485, 521], m_alishan: [439, 643], r_zengwen: [254, 808], m_xueshan: [544, 358], l_taroko: [663, 434], m_central: [554, 576], l_east_rift: [613, 641], m_coastal: [657, 669], m_yushan: [504, 660], r_gaoping: [315, 945], g_green_island: [654, 947], g_orchid_island: [672, 1162], g_guishan_island: [787, 193], g_pacific_ocean: [761, 652], g_yehliu: [689, 59], g_eluanbi: [450, 1212], g_dajia_river: [391, 380], g_lukang: [309, 463], g_anping_fort: [211, 830], g_keelung_port: [720, 91], g_xiuguluan_river: [657, 693], g_alishan_tree: [437, 643] }
    },
    "human-body-svg": {
        mode: "columns", layerId: "body-image-layer", img: [848, 1264],
        anchors: { b_brain: [424, 96], b_forehead: [424, 124], b_eyebrow: [400, 135], b_eyes: [448, 146], b_ear: [370, 165], b_nose: [424, 165], b_teeth: [413, 191], b_tongue: [435, 191], b_chin: [424, 215], b_neck: [398, 248], b_trachea: [424, 274], b_esophagus: [431, 304], b_lung: [374, 347], b_heart: [441, 374], b_liver: [376, 458], b_gallbladder: [378, 493], b_stomach: [463, 456], b_spleen: [498, 469], b_pancreas: [445, 490], b_kidney: [476, 510], b_intestines: [420, 569], b_bladder: [426, 656], b_shoulder: [289, 300], b_elbow: [259, 489], b_hand: [217, 684], b_fingers: [198, 734], b_skin: [561, 419], b_bone: [370, 819], b_knee: [365, 906], b_ankle: [370, 1149], b_foot: [359, 1203], b_sole: [489, 1225] }
    },
    "car-mechanics-svg": {
        mode: "rows", img: [1376, 768],
        anchors: { m_sparkplug: [318, 125], m_engine: [300, 405], m_transmission: [680, 420], m_exhaust: [1040, 160], m_shock: [915, 350], m_battery: [1070, 290], m_chassis: [1295, 490], m_car_brake: [1195, 555] }
    },
    "car-interior-svg": {
        mode: "rows", img: [720, 420],
        anchors: { m_rearview: [125, 25], m_window: [45, 55], m_door: [125, 88], m_handbrake: [232, 305], m_seatbelt: [213, 352], m_windshield: [330, 22], m_steering: [325, 175], m_horn: [382, 213], m_dashboard: [480, 145], m_gearstick: [265, 236], m_ac: [573, 213], m_clutch: [458, 268], m_brake_pedal: [492, 262], m_accelerator: [517, 273], m_seat: [350, 370] }
    }
    ,"bicycle-svg": {
        mode: "rows", img: [1376, 768],
        anchors: { m_saddle: [495, 72], m_bike_frame: [720, 215], m_handlebar: [925, 128], m_brake: [1078, 165], m_bike_grip: [995, 118], m_bike_spoke: [1150, 420], m_bike_wheel: [1040, 510], m_bike_rim: [1230, 505], m_tire: [128, 500], m_bike_derailleur: [335, 530], m_bike_pump: [352, 688], m_bike_stand: [742, 385], m_pedal: [762, 550], m_chain: [470, 628] }
    }
};

// Camera presets: c = image pixel moved to the frame centre (null = whole image), s = magnification.
const zoomViews = {
    geography: {
        overview: { c: null, s: 1 },
        islands: { c: null, s: 1 },        // the islands sit on every edge of the map, so keep all of Taiwan in view
        landmarks: { c: [467, 463], s: 1.45 }
    },
    body: {
        overview: { c: null, s: 1 },
        head: { c: [424, 200], s: 3.3 },
        viscera: { c: [428, 467], s: 2.2 },
        limbs: { c: [381, 762], s: 1.25 }
    }
};
const ZOOM_DOMAIN_SVG = { geography: "taiwan-map-svg", body: "human-body-svg" };

const canvasZoomLevels = {
    geography: 1.0,
    body: 1.0
};

const diagramCamera = {};      // svgId -> {k, cx, cy} currently shown (cx, cy in SVG units)
const diagramAnim = {};        // svgId -> requestAnimationFrame id
let measureCtx = null;

function diagramFrame(svg) {
    // Rectangle the image is actually drawn in (honours preserveAspectRatio="meet")
    const img = svg.querySelector("image");
    const cfg = DIAGRAM_CONFIG[svg.id];
    const bx = +img.getAttribute("x"), by = +img.getAttribute("y");
    const bw = +img.getAttribute("width"), bh = +img.getAttribute("height");
    const sc = Math.min(bw / cfg.img[0], bh / cfg.img[1]);
    const w = cfg.img[0] * sc, h = cfg.img[1] * sc;
    const x = bx + (bw - w) / 2, y = by + (bh - h) / 2;
    return { x, y, w, h, sc, x1: x + w, y1: y + h, ox: x + w / 2, oy: y + h / 2 };
}

function anchorToBase(svg, partId) {
    const a = DIAGRAM_CONFIG[svg.id].anchors[partId];
    if (!a) return null;
    const f = diagramFrame(svg);
    return [f.x + a[0] * f.sc, f.y + a[1] * f.sc];
}

function cameraFor(svg, domain, viewId) {
    const f = diagramFrame(svg);
    const v = (domain && zoomViews[domain][viewId]) || { c: null, s: 1 };
    const z = domain ? canvasZoomLevels[domain] : 1;
    const c = v.c ? [f.x + v.c[0] * f.sc, f.y + v.c[1] * f.sc] : [f.ox, f.oy];
    return { k: v.s * z, cx: c[0], cy: c[1] };
}

function projectPoint(svg, p, cam) {
    const f = diagramFrame(svg);
    return [f.ox + cam.k * (p[0] - cam.cx), f.oy + cam.k * (p[1] - cam.cy)];
}

function measureText(str, px, bold) {
    if (!measureCtx) measureCtx = document.createElement("canvas").getContext("2d");
    const family = getComputedStyle(document.body).fontFamily || "sans-serif";
    measureCtx.font = `${bold ? "bold " : ""}${px}px ${family}`;
    return measureCtx.measureText(str).width;
}

function shortRoman(sub) {
    return (sub || "").split(/\s+\/\s+|\s*\(/)[0].trim();
}

// Phones: the 720-unit diagram is drawn ~350px wide, so 13-unit text would be ~6px.
// There we show bigger Hàn-jī-only badges (romanisation stays in the cards / detail panel).
function isCompactDiagram() {
    return window.innerWidth <= 600;
}

function prepareBadge(node, mode) {
    const compact = isCompactDiagram();
    if (node._prepared === (compact ? "compact" : "full")) return;
    const text = node.querySelector(".badge-title");
    if (!node._partId) {
        const tspan = text.querySelector("tspan");
        let han = "";
        text.childNodes.forEach(n => { if (n.nodeType === 3) han += n.textContent; });
        let roman = tspan ? tspan.textContent.trim().replace(/^\(|\)$/g, "") : "";
        const partId = node.id.replace(/^(car-)?part-/, "");
        if (mode === "rows") {
            // Car badges: Hàn-jī on line 1, romanisation from the data on line 2
            const d = dataSource.machinery && dataSource.machinery[partId];
            if (d && d.tw && d.tw.sub) roman = shortRoman(d.tw.sub);
        }
        node._han = han.trim();
        node._roman = roman;
        node._partId = partId;
    }
    const han = node._han, roman = node._roman;
    node._prepared = compact ? "compact" : "full";
    text.textContent = "";
    if (compact) {
        const fs = mode === "rows" ? 19 : 21;
        text.appendChild(document.createTextNode(han));
        text.setAttribute("font-size", fs);
        node._w = Math.ceil(measureText(han, fs, true)) + 20;
        node._h = mode === "rows" ? 34 : 38;
        node._fs = fs;
        return;
    }
    node._fs = 13;
    const sz = mode === "rows" ? 10.5 : 11;
    text.appendChild(document.createTextNode(han + (mode === "rows" ? "" : " ")));
    const t = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    t.setAttribute("font-size", sz);
    t.setAttribute("font-weight", "normal");
    t.setAttribute("fill", "var(--text-muted)");
    t.textContent = mode === "rows" ? roman : `(${roman})`;
    text.appendChild(t);
    text.setAttribute("font-size", "13");
    if (mode === "rows") {
        node._w = Math.ceil(Math.max(measureText(han, 13, true), measureText(roman, sz, false))) + 22;
        node._h = 38;
    } else {
        node._w = Math.ceil(measureText(han + " ", 13, true) + measureText(`(${roman})`, sz, false)) + 26;
        node._h = 34;
    }
}

// 1-D spreading: keep items in order, close to where they want to be, inside [lo, hi], never overlapping.
function spreadIntervals(items, lo, hi, gap) {
    for (let i = 0; i < items.length; i++) {
        const prev = items[i - 1];
        items[i].pos = Math.max(items[i].want, lo, prev ? prev.pos + prev.size + gap : lo);
    }
    for (let i = items.length - 1; i >= 0; i--) {
        const next = items[i + 1];
        items[i].pos = Math.min(items[i].pos, next ? next.pos - gap - items[i].size : hi - items[i].size);
    }
    for (let i = 0; i < items.length; i++) {
        const prev = items[i - 1];
        items[i].pos = Math.max(items[i].pos, lo, prev ? prev.pos + prev.size + gap : lo);
    }
}

function segmentsCross(a, b, c, d) {
    const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
    return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0;
}

// Spread, then swap neighbours whose leader lines cross and spread again.
function spreadUncrossed(list, lo, hi, gap, startOf) {
    spreadIntervals(list, lo, hi, gap);
    for (let pass = 0; pass < list.length * 2; pass++) {
        let swapped = false;
        for (let i = 0; i < list.length - 1; i++) {
            const a = list[i], b = list[i + 1];
            if (segmentsCross(startOf(a), a.p, startOf(b), b.p)) {
                list[i] = b; list[i + 1] = a;
                spreadIntervals(list, lo, hi, gap);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

function activeDiagramNodes(svg) {
    let scope = svg;
    if (svg.id === "taiwan-map-svg") scope = document.getElementById(`geo-layer-${currentGeoZoom}`) || svg;
    if (svg.id === "human-body-svg") scope = document.getElementById(`body-layer-${currentBodyZoom}`) || svg;
    return Array.from(scope.querySelectorAll("g.clickable-part"));
}

function layoutBadges(svg, cam) {
    const cfg = DIAGRAM_CONFIG[svg.id];
    const f = diagramFrame(svg);
    const vb = svg.viewBox.baseVal;
    const items = [];
    activeDiagramNodes(svg).forEach(node => {
        prepareBadge(node, cfg.mode);
        const base = anchorToBase(svg, node._partId);
        if (!base) return;
        const p = projectPoint(svg, base, cam);
        const inside = p[0] >= f.x + 4 && p[0] <= f.x1 - 4 && p[1] >= f.y + 4 && p[1] <= f.y1 - 4;
        node.style.display = inside ? "" : "none";   // zoomed out of the frame → hide its badge too
        if (inside) items.push({ node, p, w: node._w, h: node._h });
    });

    const gap = 6;
    if (cfg.mode === "columns") {
        const lo = 6, hi = vb.height - 6;
        const cap = Math.floor((hi - lo + gap) / (items[0] ? items[0].h + gap : 40));
        const left = items.filter(it => it.p[0] < f.ox).sort((a, b) => a.p[0] - b.p[0]);
        const right = items.filter(it => it.p[0] >= f.ox).sort((a, b) => a.p[0] - b.p[0]);
        while (left.length > cap) right.unshift(left.pop());
        while (right.length > cap) left.push(right.shift());
        // keep both columns roughly balanced so neither side gets crowded
        while (left.length - right.length > 2) right.unshift(left.pop());
        while (right.length - left.length > 2) left.push(right.shift());
        [[left, true], [right, false]].forEach(([col, isLeft]) => {
            col.forEach(it => { it.size = it.h; it.want = it.p[1] - it.h / 2; });
            col.sort((a, b) => a.want - b.want);
            const colX = it => isLeft ? Math.max(4, f.x - 10 - it.w) : Math.min(vb.width - 4 - it.w, f.x1 + 10);
            spreadUncrossed(col, lo, hi, gap, it => [isLeft ? colX(it) + it.w : colX(it), it.pos + it.h / 2]);
            col.forEach(it => {
                const x = colX(it);
                placeBadge(it.node, x, it.pos, it.w, it.h, "columns");
                it.node._lineStart = isLeft ? [x + it.w, it.pos + it.h / 2] : [x, it.pos + it.h / 2];
                it.node._lineElbowX = isLeft ? Math.max(x + it.w, f.x) : Math.min(x, f.x1);
            });
        });
    } else {
        const lo = 6, hi = vb.width - 6;
        const fits = row => row.reduce((s, it) => s + it.w, 0) + gap * Math.max(0, row.length - 1) <= hi - lo;
        let top = items.filter(it => it.p[1] < f.oy);
        let bottom = items.filter(it => it.p[1] >= f.oy);
        const nearestMid = row => row.slice().sort((a, b) => Math.abs(a.p[1] - f.oy) - Math.abs(b.p[1] - f.oy))[0];
        while (!fits(top) && fits(bottom.concat([nearestMid(top)]))) {
            const mv = nearestMid(top); top = top.filter(i => i !== mv); bottom.push(mv);
        }
        while (!fits(bottom) && fits(top.concat([nearestMid(bottom)]))) {
            const mv = nearestMid(bottom); bottom = bottom.filter(i => i !== mv); top.push(mv);
        }
        [[top, true], [bottom, false]].forEach(([row, isTop]) => {
            row.forEach(it => { it.size = it.w; it.want = it.p[0] - it.w / 2; });
            row.sort((a, b) => a.want - b.want);
            const rowY = it => isTop ? Math.max(4, f.y - 12 - it.h) : Math.min(vb.height - 4 - it.h, f.y1 + 12);
            spreadUncrossed(row, lo, hi, gap, it => [it.pos + it.w / 2, isTop ? rowY(it) + it.h : rowY(it)]);
            row.forEach(it => {
                const y = rowY(it);
                placeBadge(it.node, it.pos, y, it.w, it.h, "rows");
                it.node._lineStart = [it.pos + it.w / 2, isTop ? y + it.h : y];
                it.node._lineElbowX = null;
            });
        });
    }
}

function placeBadge(node, x, y, w, h, mode) {
    const rect = node.querySelector(".badge-bg");
    const text = node.querySelector(".badge-title");
    rect.setAttribute("x", x.toFixed(1));
    rect.setAttribute("y", y.toFixed(1));
    rect.setAttribute("width", w);
    rect.setAttribute("height", h);
    rect.setAttribute("rx", h / 2);
    rect.setAttribute("ry", h / 2);
    const cx = (x + w / 2).toFixed(1);
    text.setAttribute("x", cx);
    const tspan = text.querySelector("tspan");
    if (!tspan) {   // compact (phone) badge: one centred line
        text.setAttribute("y", (y + h / 2 + node._fs * 0.36).toFixed(1));
    } else if (mode === "rows") {
        text.setAttribute("y", (y + 16).toFixed(1));
        tspan.setAttribute("x", cx);
        tspan.setAttribute("dy", "14");
    } else {
        text.setAttribute("y", (y + h / 2 + 4.5).toFixed(1));
    }
}

function drawLeaderLines(svg, cam) {
    activeDiagramNodes(svg).forEach(node => {
        if (node.style.display === "none" || !node._lineStart) return;
        const base = anchorToBase(svg, node._partId);
        if (!base) return;
        const p = projectPoint(svg, base, cam);
        node.querySelectorAll(".hotspot-pulse, .hotspot-core").forEach(c => {
            c.setAttribute("cx", p[0].toFixed(1));
            c.setAttribute("cy", p[1].toFixed(1));
        });
        const [sx, sy] = node._lineStart;
        const line = node.querySelector(".leader-line");
        const d = node._lineElbowX !== null
            ? `M ${sx.toFixed(1)},${sy.toFixed(1)} L ${node._lineElbowX.toFixed(1)},${sy.toFixed(1)} L ${p[0].toFixed(1)},${p[1].toFixed(1)}`
            : `M ${sx.toFixed(1)},${sy.toFixed(1)} L ${p[0].toFixed(1)},${p[1].toFixed(1)}`;
        if (line) line.setAttribute("d", d);
    });
}

function applyImageCamera(svg, cam) {
    const cfg = DIAGRAM_CONFIG[svg.id];
    if (!cfg.layerId) return;
    const layer = document.getElementById(cfg.layerId);
    if (!layer) return;
    const f = diagramFrame(svg);
    layer.style.transition = "none";
    layer.style.transformOrigin = "0 0";
    layer.style.transform = `matrix(${cam.k},0,0,${cam.k},${f.ox - cam.k * cam.cx},${f.oy - cam.k * cam.cy})`;
}

function ensureFrameClip(svg) {
    // A zoomed image must stay inside its rounded frame instead of spilling under the labels.
    const cfg = DIAGRAM_CONFIG[svg.id];
    if (!cfg.layerId || document.getElementById(`${svg.id}-frame-clip`)) return;
    const layer = document.getElementById(cfg.layerId);
    if (!layer) return;
    const f = diagramFrame(svg);
    const ns = "http://www.w3.org/2000/svg";
    const clip = document.createElementNS(ns, "clipPath");
    clip.id = `${svg.id}-frame-clip`;
    const r = document.createElementNS(ns, "rect");
    [["x", f.x], ["y", f.y], ["width", f.w], ["height", f.h], ["rx", 16], ["ry", 16]].forEach(([k, v]) => r.setAttribute(k, v));
    clip.appendChild(r);
    (svg.querySelector("defs") || svg).appendChild(clip);
    const wrap = document.createElementNS(ns, "g");
    wrap.setAttribute("clip-path", `url(#${clip.id})`);
    layer.parentNode.insertBefore(wrap, layer);
    wrap.appendChild(layer);
}

function renderDiagram(svgId, domain, viewId, animate) {
    const svg = document.getElementById(svgId);
    if (!svg || !DIAGRAM_CONFIG[svgId]) return;
    ensureFrameClip(svg);
    const target = cameraFor(svg, domain, viewId);
    layoutBadges(svg, target);
    cancelAnimationFrame(diagramAnim[svgId]);
    const from = diagramCamera[svgId];
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || !from || reduce) {
        diagramCamera[svgId] = target;
        applyImageCamera(svg, target);
        drawLeaderLines(svg, target);
        return;
    }
    const t0 = performance.now(), dur = 550;
    const step = now => {
        const t = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - t, 3);
        const cam = {
            k: from.k + (target.k - from.k) * e,
            cx: from.cx + (target.cx - from.cx) * e,
            cy: from.cy + (target.cy - from.cy) * e
        };
        diagramCamera[svgId] = cam;
        applyImageCamera(svg, cam);
        drawLeaderLines(svg, cam);
        if (t < 1) diagramAnim[svgId] = requestAnimationFrame(step);
    };
    diagramAnim[svgId] = requestAnimationFrame(step);
}

function renderZoomDomain(domain, animate = true) {
    const viewId = domain === "geography" ? currentGeoZoom : currentBodyZoom;
    renderDiagram(ZOOM_DOMAIN_SVG[domain], domain, viewId, animate);
}

function initDiagramEngine() {
    renderZoomDomain("geography", false);
    renderZoomDomain("body", false);
    renderDiagram("car-mechanics-svg", null, null, false);
    renderDiagram("car-interior-svg", null, null, false);
    renderDiagram("bicycle-svg", null, null, false);
    let wasCompact = isCompactDiagram(), resizeTimer = null;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (isCompactDiagram() === wasCompact) return;
            wasCompact = isCompactDiagram();
            renderZoomDomain("geography", false);
            renderZoomDomain("body", false);
            renderDiagram("car-mechanics-svg", null, null, false);
            renderDiagram("car-interior-svg", null, null, false);
            renderDiagram("bicycle-svg", null, null, false);
        }, 150);
    });
}

function switchGeoZoomView(viewId, autoPlay = true) {
    currentGeoZoom = viewId;
    document.querySelectorAll("#geo-zoom-toolbar .zoom-preset-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`geo-preset-${viewId}`);
    if (activeBtn) activeBtn.classList.add("active");

    document.querySelectorAll(".geo-zoom-layer").forEach(layer => {
        layer.style.display = "none";
        layer.classList.remove("active");
    });
    const targetLayer = document.getElementById(`geo-layer-${viewId}`);
    if (targetLayer) {
        targetLayer.style.display = "block";
        setTimeout(() => targetLayer.classList.add("active"), 10);
    }

    canvasZoomLevels.geography = 1.0;
    updateZoomBadge("geography");
    renderZoomDomain("geography");

    const layerParts = targetLayer ? Array.from(targetLayer.querySelectorAll(".clickable-part")).map(el => el.id.replace("part-", "")) : [];
    if (layerParts.length > 0) {
        selectedPart = layerParts[0];
        updateDisplay();
        if (autoPlay && currentMode === "learn") {
            speakCurrentWord();
        }
    }
}

function switchBodyZoomView(viewId, autoPlay = true) {
    currentBodyZoom = viewId;
    document.querySelectorAll("#body-zoom-toolbar .zoom-preset-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`body-preset-${viewId}`);
    if (activeBtn) activeBtn.classList.add("active");

    document.querySelectorAll(".body-zoom-layer").forEach(layer => {
        layer.style.display = "none";
        layer.classList.remove("active");
    });
    const targetLayer = document.getElementById(`body-layer-${viewId}`);
    if (targetLayer) {
        targetLayer.style.display = "block";
        setTimeout(() => targetLayer.classList.add("active"), 10);
    }

    canvasZoomLevels.body = 1.0;
    updateZoomBadge("body");
    renderZoomDomain("body");

    const layerParts = targetLayer ? Array.from(targetLayer.querySelectorAll(".clickable-part")).map(el => el.id.replace("part-", "")) : [];
    if (layerParts.length > 0) {
        selectedPart = layerParts[0];
        updateDisplay();
        if (autoPlay && currentMode === "learn") {
            speakCurrentWord();
        }
    }
}

function stepZoom(domain, delta) {
    const minScale = 0.8;
    const maxScale = 2.5;
    canvasZoomLevels[domain] = Math.min(maxScale, Math.max(minScale, +(canvasZoomLevels[domain] + delta).toFixed(2)));
    updateZoomBadge(domain);
    renderZoomDomain(domain);
}

function resetCanvasZoom(domain) {
    canvasZoomLevels[domain] = 1.0;
    updateZoomBadge(domain);
    renderZoomDomain(domain);
}

function updateZoomBadge(domain) {
    const badgeId = domain === "geography" ? "geo-zoom-badge" : "body-zoom-badge";
    const badge = document.getElementById(badgeId);
    if (badge) {
        const pct = Math.round(canvasZoomLevels[domain] * 100);
        badge.textContent = `${pct}%`;
    }
}

// Auto camera tracking for Quiz Mode
function autoZoomForQuiz(domain, itemKey) {
    if (domain === "geography") {
        const islandKeys = ["g_green_island", "g_orchid_island", "g_guishan_island", "g_pacific_ocean", "g_yehliu", "g_eluanbi", "l_penghu", "l_taiwan_strait"];
        const landmarkKeys = ["g_dajia_river", "g_xiuguluan_river", "g_keelung_port", "g_anping_fort", "g_lukang", "g_alishan_tree", "l_sunmoonlake", "l_taroko", "l_east_rift"];
        if (islandKeys.includes(itemKey)) {
            switchGeoZoomView("islands", false);
        } else if (landmarkKeys.includes(itemKey)) {
            switchGeoZoomView("landmarks", false);
        } else {
            switchGeoZoomView("overview", false);
        }
    } else if (domain === "body") {
        const headKeys = ["b_forehead", "b_eyebrow", "b_teeth", "b_tongue", "b_chin", "b_neck", "b_eyes", "b_nose", "b_ear", "b_brain"];
        const visceraKeys = ["b_heart", "b_lung", "b_trachea", "b_esophagus", "b_stomach", "b_liver", "b_gallbladder", "b_spleen", "b_pancreas", "b_kidney", "b_intestines", "b_bladder"];
        const limbKeys = ["b_shoulder", "b_elbow", "b_hand", "b_fingers", "b_skin", "b_bone", "b_knee", "b_ankle", "b_sole", "b_foot"];
        if (headKeys.includes(itemKey)) {
            switchBodyZoomView("head", false);
        } else if (visceraKeys.includes(itemKey)) {
            switchBodyZoomView("viscera", false);
        } else if (limbKeys.includes(itemKey)) {
            switchBodyZoomView("limbs", false);
        } else {
            switchBodyZoomView("overview", false);
        }
    }
}


function initCanvasZoomInteractions() {
    const geoCard = document.querySelector("#visual-geography .anatomy-map-card");
    if (geoCard) {
        geoCard.addEventListener("wheel", (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.15 : -0.15;
            stepZoom("geography", delta);
        }, { passive: false });
    }
    const bodyCard = document.querySelector("#visual-body .anatomy-map-card");
    if (bodyCard) {
        bodyCard.addEventListener("wheel", (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.15 : -0.15;
            stepZoom("body", delta);
        }, { passive: false });
    }
}


function updateHeaderDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const el = document.getElementById("current-date-text");
    if (el) el.textContent = dateStr;
}
