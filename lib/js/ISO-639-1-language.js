//Modified from: https://gist.github.com/jrnk/8eb57b065ea0b098d571

const LANGUAGES = {"ab":"Abkhaz","aa":"Afar","af":"Afrikaans","ak":"Akan","sq":"Albanian","am":"Amharic","ar":"Arabic","an":"Aragonese","hy":"Armenian","as":"Assamese","av":"Avaric","ae":"Avestan","ay":"Aymara","az":"South Azerbaijani","bm":"Bambara","ba":"Bashkir","eu":"Basque","be":"Belarusian","bn":"Bengali; Bangla","bh":"Bihari","bi":"Bislama","bs":"Bosnian","br":"Breton","bg":"Bulgarian","my":"Burmese","ca":"Catalan; Valencian","ch":"Chamorro","ce":"Chechen","ny":"Chichewa; Chewa; Nyanja","zh":"Chinese","cv":"Chuvash","kw":"Cornish","co":"Corsican","cr":"Cree","hr":"Croatian","cs":"Czech","da":"Danish","dv":"Divehi; Dhivehi; Maldivian;","nl":"Dutch","dz":"Dzongkha","en":"English","eo":"Esperanto","et":"Estonian","ee":"Ewe","fo":"Faroese","fj":"Fijian","fi":"Finnish","fr":"French","ff":"Fula; Fulah; Pulaar; Pular","gl":"Galician","ka":"Georgian","de":"German","el":"Greek, Modern","gn":"GuaranÃ­","gu":"Gujarati","ht":"Haitian; Haitian Creole","ha":"Hausa","he":"Hebrew (modern)","hz":"Herero","hi":"Hindi","ho":"Hiri Motu","hu":"Hungarian","ia":"Interlingua","id":"Indonesian","ie":"Interlingue","ga":"Irish","ig":"Igbo","ik":"Inupiaq","io":"Ido","is":"Icelandic","it":"Italian","iu":"Inuktitut","ja":"Japanese","jv":"Javanese","kl":"Kalaallisut, Greenlandic","kn":"Kannada","kr":"Kanuri","ks":"Kashmiri","kk":"Kazakh","km":"Khmer","ki":"Kikuyu, Gikuyu","rw":"Kinyarwanda","ky":"Kyrgyz","kv":"Komi","kg":"Kongo","ko":"Korean","ku":"Kurdish","kj":"Kwanyama, Kuanyama","la":"Latin","lb":"Luxembourgish, Letzeburgesch","lg":"Ganda","li":"Limburgish, Limburgan, Limburger","ln":"Lingala","lo":"Lao","lt":"Lithuanian","lu":"Luba-Katanga","lv":"Latvian","gv":"Manx","mk":"Macedonian","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese","mi":"MÄori","mr":"Marathi (MarÄá¹­hÄ«)","mh":"Marshallese","mn":"Mongolian","na":"Nauru","nv":"Navajo, Navaho","nb":"Norwegian BokmÃ¥l","nd":"North Ndebele","ne":"Nepali","ng":"Ndonga","nn":"Norwegian Nynorsk","no":"Norwegian","ii":"Nuosu","nr":"South Ndebele","oc":"Occitan","oj":"Ojibwe, Ojibwa","cu":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic","om":"Oromo","or":"Oriya","os":"Ossetian, Ossetic","pa":"Panjabi, Punjabi","pi":"PÄli","fa":"Persian (Farsi)","pl":"Polish","ps":"Pashto, Pushto","pt":"Portuguese","qu":"Quechua","rm":"Romansh","rn":"Kirundi","ro":"Romanian, [])","ru":"Russian","sa":"Sanskrit (Saá¹ská¹›ta)","sc":"Sardinian","sd":"Sindhi","se":"Northern Sami","sm":"Samoan","sg":"Sango","sr":"Serbian","gd":"Scottish Gaelic; Gaelic","sn":"Shona","si":"Sinhala, Sinhalese","sk":"Slovak","sl":"Slovene","so":"Somali","st":"Southern Sotho","es":"Spanish; Castilian","su":"Sundanese","sw":"Swahili","ss":"Swati","sv":"Swedish","ta":"Tamil","te":"Telugu","tg":"Tajik","th":"Thai","ti":"Tigrinya","bo":"Tibetan Standard, Tibetan, Central","tk":"Turkmen","tl":"Tagalog","tn":"Tswana","to":"Tonga (Tonga Islands)","tr":"Turkish","ts":"Tsonga","tt":"Tatar","tw":"Twi","ty":"Tahitian","ug":"Uyghur, Uighur","uk":"Ukrainian","ur":"Urdu","uz":"Uzbek","ve":"Venda","vi":"Vietnamese","vo":"VolapÃ¼k","wa":"Walloon","cy":"Welsh","wo":"Wolof","fy":"Western Frisian","xh":"Xhosa","yi":"Yiddish","yo":"Yoruba","za":"Zhuang, Chuang","zu":"Zulu"};

// let LANGUAGES = [
//   {
//     "code": "ab",
//     "name": "Abkhaz"
//   },
//   {
//     "code": "aa",
//     "name": "Afar"
//   },
//   {
//     "code": "af",
//     "name": "Afrikaans"
//   },
//   {
//     "code": "ak",
//     "name": "Akan"
//   },
//   {
//     "code": "sq",
//     "name": "Albanian"
//   },
//   {
//     "code": "am",
//     "name": "Amharic"
//   },
//   {
//     "code": "ar",
//     "name": "Arabic"
//   },
//   {
//     "code": "an",
//     "name": "Aragonese"
//   },
//   {
//     "code": "hy",
//     "name": "Armenian"
//   },
//   {
//     "code": "as",
//     "name": "Assamese"
//   },
//   {
//     "code": "av",
//     "name": "Avaric"
//   },
//   {
//     "code": "ae",
//     "name": "Avestan"
//   },
//   {
//     "code": "ay",
//     "name": "Aymara"
//   },
//   {
//     "code": "az",
//     "name": "Azerbaijani"
//   },
//   {
//     "code": "bm",
//     "name": "Bambara"
//   },
//   {
//     "code": "ba",
//     "name": "Bashkir"
//   },
//   {
//     "code": "eu",
//     "name": "Basque"
//   },
//   {
//     "code": "be",
//     "name": "Belarusian"
//   },
//   {
//     "code": "bn",
//     "name": "Bengali; Bangla"
//   },
//   {
//     "code": "bh",
//     "name": "Bihari"
//   },
//   {
//     "code": "bi",
//     "name": "Bislama"
//   },
//   {
//     "code": "bs",
//     "name": "Bosnian"
//   },
//   {
//     "code": "br",
//     "name": "Breton"
//   },
//   {
//     "code": "bg",
//     "name": "Bulgarian"
//   },
//   {
//     "code": "my",
//     "name": "Burmese"
//   },
//   {
//     "code": "ca",
//     "name": "Catalan; Valencian"
//   },
//   {
//     "code": "ch",
//     "name": "Chamorro"
//   },
//   {
//     "code": "ce",
//     "name": "Chechen"
//   },
//   {
//     "code": "ny",
//     "name": "Chichewa; Chewa; Nyanja"
//   },
//   {
//     "code": "zh",
//     "name": "Chinese"
//   },
//   {
//     "code": "cv",
//     "name": "Chuvash"
//   },
//   {
//     "code": "kw",
//     "name": "Cornish"
//   },
//   {
//     "code": "co",
//     "name": "Corsican"
//   },
//   {
//     "code": "cr",
//     "name": "Cree"
//   },
//   {
//     "code": "hr",
//     "name": "Croatian"
//   },
//   {
//     "code": "cs",
//     "name": "Czech"
//   },
//   {
//     "code": "da",
//     "name": "Danish"
//   },
//   {
//     "code": "dv",
//     "name": "Divehi; Dhivehi; Maldivian;"
//   },
//   {
//     "code": "nl",
//     "name": "Dutch"
//   },
//   {
//     "code": "dz",
//     "name": "Dzongkha"
//   },
//   {
//     "code": "en",
//     "name": "English"
//   },
//   {
//     "code": "eo",
//     "name": "Esperanto"
//   },
//   {
//     "code": "et",
//     "name": "Estonian"
//   },
//   {
//     "code": "ee",
//     "name": "Ewe"
//   },
//   {
//     "code": "fo",
//     "name": "Faroese"
//   },
//   {
//     "code": "fj",
//     "name": "Fijian"
//   },
//   {
//     "code": "fi",
//     "name": "Finnish"
//   },
//   {
//     "code": "fr",
//     "name": "French"
//   },
//   {
//     "code": "ff",
//     "name": "Fula; Fulah; Pulaar; Pular"
//   },
//   {
//     "code": "gl",
//     "name": "Galician"
//   },
//   {
//     "code": "ka",
//     "name": "Georgian"
//   },
//   {
//     "code": "de",
//     "name": "German"
//   },
//   {
//     "code": "el",
//     "name": "Greek, Modern"
//   },
//   {
//     "code": "gn",
//     "name": "GuaranÃ­"
//   },
//   {
//     "code": "gu",
//     "name": "Gujarati"
//   },
//   {
//     "code": "ht",
//     "name": "Haitian; Haitian Creole"
//   },
//   {
//     "code": "ha",
//     "name": "Hausa"
//   },
//   {
//     "code": "he",
//     "name": "Hebrew (modern)"
//   },
//   {
//     "code": "hz",
//     "name": "Herero"
//   },
//   {
//     "code": "hi",
//     "name": "Hindi"
//   },
//   {
//     "code": "ho",
//     "name": "Hiri Motu"
//   },
//   {
//     "code": "hu",
//     "name": "Hungarian"
//   },
//   {
//     "code": "ia",
//     "name": "Interlingua"
//   },
//   {
//     "code": "id",
//     "name": "Indonesian"
//   },
//   {
//     "code": "ie",
//     "name": "Interlingue"
//   },
//   {
//     "code": "ga",
//     "name": "Irish"
//   },
//   {
//     "code": "ig",
//     "name": "Igbo"
//   },
//   {
//     "code": "ik",
//     "name": "Inupiaq"
//   },
//   {
//     "code": "io",
//     "name": "Ido"
//   },
//   {
//     "code": "is",
//     "name": "Icelandic"
//   },
//   {
//     "code": "it",
//     "name": "Italian"
//   },
//   {
//     "code": "iu",
//     "name": "Inuktitut"
//   },
//   {
//     "code": "ja",
//     "name": "Japanese"
//   },
//   {
//     "code": "jv",
//     "name": "Javanese"
//   },
//   {
//     "code": "kl",
//     "name": "Kalaallisut, Greenlandic"
//   },
//   {
//     "code": "kn",
//     "name": "Kannada"
//   },
//   {
//     "code": "kr",
//     "name": "Kanuri"
//   },
//   {
//     "code": "ks",
//     "name": "Kashmiri"
//   },
//   {
//     "code": "kk",
//     "name": "Kazakh"
//   },
//   {
//     "code": "km",
//     "name": "Khmer"
//   },
//   {
//     "code": "ki",
//     "name": "Kikuyu, Gikuyu"
//   },
//   {
//     "code": "rw",
//     "name": "Kinyarwanda"
//   },
//   {
//     "code": "ky",
//     "name": "Kyrgyz"
//   },
//   {
//     "code": "kv",
//     "name": "Komi"
//   },
//   {
//     "code": "kg",
//     "name": "Kongo"
//   },
//   {
//     "code": "ko",
//     "name": "Korean"
//   },
//   {
//     "code": "ku",
//     "name": "Kurdish"
//   },
//   {
//     "code": "kj",
//     "name": "Kwanyama, Kuanyama"
//   },
//   {
//     "code": "la",
//     "name": "Latin"
//   },
//   {
//     "code": "lb",
//     "name": "Luxembourgish, Letzeburgesch"
//   },
//   {
//     "code": "lg",
//     "name": "Ganda"
//   },
//   {
//     "code": "li",
//     "name": "Limburgish, Limburgan, Limburger"
//   },
//   {
//     "code": "ln",
//     "name": "Lingala"
//   },
//   {
//     "code": "lo",
//     "name": "Lao"
//   },
//   {
//     "code": "lt",
//     "name": "Lithuanian"
//   },
//   {
//     "code": "lu",
//     "name": "Luba-Katanga"
//   },
//   {
//     "code": "lv",
//     "name": "Latvian"
//   },
//   {
//     "code": "gv",
//     "name": "Manx"
//   },
//   {
//     "code": "mk",
//     "name": "Macedonian"
//   },
//   {
//     "code": "mg",
//     "name": "Malagasy"
//   },
//   {
//     "code": "ms",
//     "name": "Malay"
//   },
//   {
//     "code": "ml",
//     "name": "Malayalam"
//   },
//   {
//     "code": "mt",
//     "name": "Maltese"
//   },
//   {
//     "code": "mi",
//     "name": "MÄori"
//   },
//   {
//     "code": "mr",
//     "name": "Marathi (MarÄá¹­hÄ«)"
//   },
//   {
//     "code": "mh",
//     "name": "Marshallese"
//   },
//   {
//     "code": "mn",
//     "name": "Mongolian"
//   },
//   {
//     "code": "na",
//     "name": "Nauru"
//   },
//   {
//     "code": "nv",
//     "name": "Navajo, Navaho"
//   },
//   {
//     "code": "nb",
//     "name": "Norwegian BokmÃ¥l"
//   },
//   {
//     "code": "nd",
//     "name": "North Ndebele"
//   },
//   {
//     "code": "ne",
//     "name": "Nepali"
//   },
//   {
//     "code": "ng",
//     "name": "Ndonga"
//   },
//   {
//     "code": "nn",
//     "name": "Norwegian Nynorsk"
//   },
//   {
//     "code": "no",
//     "name": "Norwegian"
//   },
//   {
//     "code": "ii",
//     "name": "Nuosu"
//   },
//   {
//     "code": "nr",
//     "name": "South Ndebele"
//   },
//   {
//     "code": "oc",
//     "name": "Occitan"
//   },
//   {
//     "code": "oj",
//     "name": "Ojibwe, Ojibwa"
//   },
//   {
//     "code": "cu",
//     "name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic"
//   },
//   {
//     "code": "om",
//     "name": "Oromo"
//   },
//   {
//     "code": "or",
//     "name": "Oriya"
//   },
//   {
//     "code": "os",
//     "name": "Ossetian, Ossetic"
//   },
//   {
//     "code": "pa",
//     "name": "Panjabi, Punjabi"
//   },
//   {
//     "code": "pi",
//     "name": "PÄli"
//   },
//   {
//     "code": "fa",
//     "name": "Persian (Farsi)"
//   },
//   {
//     "code": "pl",
//     "name": "Polish"
//   },
//   {
//     "code": "ps",
//     "name": "Pashto, Pushto"
//   },
//   {
//     "code": "pt",
//     "name": "Portuguese"
//   },
//   {
//     "code": "qu",
//     "name": "Quechua"
//   },
//   {
//     "code": "rm",
//     "name": "Romansh"
//   },
//   {
//     "code": "rn",
//     "name": "Kirundi"
//   },
//   {
//     "code": "ro",
//     "name": "Romanian, [])"
//   },
//   {
//     "code": "ru",
//     "name": "Russian"
//   },
//   {
//     "code": "sa",
//     "name": "Sanskrit (Saá¹ská¹›ta)"
//   },
//   {
//     "code": "sc",
//     "name": "Sardinian"
//   },
//   {
//     "code": "sd",
//     "name": "Sindhi"
//   },
//   {
//     "code": "se",
//     "name": "Northern Sami"
//   },
//   {
//     "code": "sm",
//     "name": "Samoan"
//   },
//   {
//     "code": "sg",
//     "name": "Sango"
//   },
//   {
//     "code": "sr",
//     "name": "Serbian"
//   },
//   {
//     "code": "gd",
//     "name": "Scottish Gaelic; Gaelic"
//   },
//   {
//     "code": "sn",
//     "name": "Shona"
//   },
//   {
//     "code": "si",
//     "name": "Sinhala, Sinhalese"
//   },
//   {
//     "code": "sk",
//     "name": "Slovak"
//   },
//   {
//     "code": "sl",
//     "name": "Slovene"
//   },
//   {
//     "code": "so",
//     "name": "Somali"
//   },
//   {
//     "code": "st",
//     "name": "Southern Sotho"
//   },
//   {
//     "code": "az",
//     "name": "South Azerbaijani"
//   },
//   {
//     "code": "es",
//     "name": "Spanish; Castilian"
//   },
//   {
//     "code": "su",
//     "name": "Sundanese"
//   },
//   {
//     "code": "sw",
//     "name": "Swahili"
//   },
//   {
//     "code": "ss",
//     "name": "Swati"
//   },
//   {
//     "code": "sv",
//     "name": "Swedish"
//   },
//   {
//     "code": "ta",
//     "name": "Tamil"
//   },
//   {
//     "code": "te",
//     "name": "Telugu"
//   },
//   {
//     "code": "tg",
//     "name": "Tajik"
//   },
//   {
//     "code": "th",
//     "name": "Thai"
//   },
//   {
//     "code": "ti",
//     "name": "Tigrinya"
//   },
//   {
//     "code": "bo",
//     "name": "Tibetan Standard, Tibetan, Central"
//   },
//   {
//     "code": "tk",
//     "name": "Turkmen"
//   },
//   {
//     "code": "tl",
//     "name": "Tagalog"
//   },
//   {
//     "code": "tn",
//     "name": "Tswana"
//   },
//   {
//     "code": "to",
//     "name": "Tonga (Tonga Islands)"
//   },
//   {
//     "code": "tr",
//     "name": "Turkish"
//   },
//   {
//     "code": "ts",
//     "name": "Tsonga"
//   },
//   {
//     "code": "tt",
//     "name": "Tatar"
//   },
//   {
//     "code": "tw",
//     "name": "Twi"
//   },
//   {
//     "code": "ty",
//     "name": "Tahitian"
//   },
//   {
//     "code": "ug",
//     "name": "Uyghur, Uighur"
//   },
//   {
//     "code": "uk",
//     "name": "Ukrainian"
//   },
//   {
//     "code": "ur",
//     "name": "Urdu"
//   },
//   {
//     "code": "uz",
//     "name": "Uzbek"
//   },
//   {
//     "code": "ve",
//     "name": "Venda"
//   },
//   {
//     "code": "vi",
//     "name": "Vietnamese"
//   },
//   {
//     "code": "vo",
//     "name": "VolapÃ¼k"
//   },
//   {
//     "code": "wa",
//     "name": "Walloon"
//   },
//   {
//     "code": "cy",
//     "name": "Welsh"
//   },
//   {
//     "code": "wo",
//     "name": "Wolof"
//   },
//   {
//     "code": "fy",
//     "name": "Western Frisian"
//   },
//   {
//     "code": "xh",
//     "name": "Xhosa"
//   },
//   {
//     "code": "yi",
//     "name": "Yiddish"
//   },
//   {
//     "code": "yo",
//     "name": "Yoruba"
//   },
//   {
//     "code": "za",
//     "name": "Zhuang, Chuang"
//   },
//   {
//     "code": "zu",
//     "name": "Zulu"
//   }
// ];

// //convert to obj
// LANGUAGES = (function() {
//   const obj = {};
//   for (language of LANGUAGES) {
//     obj[language.code] = language.name;
//   }

//   console.log(JSON.stringify(obj));
//   return obj;
// })();