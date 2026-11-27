import { useRef, useState } from "react";
import "./Heros.css";
import MacPork from "../assets/macPork.png";
import MacMusic from "../assets/macMusic.mp3";

function Heros() {

  const [selected, setSelected] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [showSpeaker, setShowSpeaker] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState("ja");

  const audioRef = useRef(new Audio(MacMusic));
  const handleBurger = () =>{
    setClickCount((prev) =>{
        const next = prev + 1;

        if(next >= 3){
            setShowSpeaker(true);
        }
        return next;
    });

    setSelected(null);
  }

  const StartMusic = async () =>{

    const audio = audioRef.current;

    if(isPlaying){
        audio.pause();
        setIsPlaying(false);
    }else{
        audio.currentTime = 0;

        try{
            await audio.play();
            setIsPlaying(true);
        }catch(error){
            console.error("音楽再生失敗:", error);
        }
    }
  };

  const information = [
    {
        id: "allergen",
        title: { ja: "アレルゲン", en: "ALLERGENS" },
        subtitle: { ja: "アレルゲン情報", en: "ALLERGEN INFORMATION" },
        text: {
            ja: "アレルゲンに関する情報",
            en: "Information about allergens"
        },
        items: {
            ja: ["小麦", "卵", "乳", "牛肉", "ごま", "大豆", "鶏肉", "豚肉"],
            en: ["Wheat", "Egg", "Milk", "Beef", "Sesame", "Soy", "Chicken", "Pork"]
        },
        color: "#F0A44B"
    },
    {
        id: "nutrition",
        title: { ja: "栄養成分", en: "NUTRITION" },
        subtitle: { ja: "各成分情報", en: "NUTRITION FACTS" },
        text: {
            ja: "約一食分の栄養成分に関する情報",
            en: "Nutritional information per serving"
        },
        items: {
            ja: [
                "エネルギー :409kcal",
                "脂質: 23.8g",
                "タンパク質: 14.8g",
                "飽和脂肪酸: 8.57g",
                "炭水化物: 34.2g",
                "糖類: 8g",
                "食塩相当量: 2.0g"
            ],
            en: [
                "Energy: 409kcal",
                "Fat: 23.8g",
                "Protein: 14.8g",
                "Saturated Fat: 8.57g",
                "Carbohydrates: 34.2g",
                "Sugars: 8g",
                "Salt: 2.0g"
            ]
        },
        color: "#55B8F5"
    },
    {
        id: "ingredients",
        title: { ja: "原材料", en: "INGREDIENTS" },
        subtitle: { ja: "原材料情報", en: "INGREDIENT INFORMATION" },
        text: {
            ja: "原材料に関する情報",
            en: "Information about ingredients"
        },
        items: {
            ja: ["バンズ", "ポークパティ", "ソース"],
            en: ["Bun", "Pork patty", "Sauce"]
        },
        color: "#65C98B"
    },
    {
        id: "price",
        title: { ja: "価格", en: "PRICE" },
        subtitle: { ja: "価格情報", en: "PRICE INFORMATION" },
        text: {
            ja: "商品の価格",
            en: "Product price"
        },
        items: {
            ja: ["単品価格: 230円"],
            en: ["Price: ¥230"]
        },
        color: "#C084FC"
    }
];

  return (
    <>
    <div className="Heros-container">

        <div className="language-switch">
            <button onClick={() => setLanguage("ja")} className={language === "ja" ? "active" : ""}>JP</button>
            <button onClick={() => setLanguage("en")} className={language === "en" ? "active" : ""}>EN</button>
        </div>

      {/* 左側の情報 */}
      <div className="Heros-info">
        <h6>{language === "ja" ? "商品名" : "PRODUCT"}</h6>
        <h1>{language === "ja" ? "マックポーク" : "McPork"}</h1>

        {selected !== null ? (
            <div className="information-panel">

                <span className="information-subtitle">
                    {information[selected].subtitle[language]}
                </span>

                <h2 className="information-title">
                    {information[selected].title[language]}
                </h2>

                <p className="information-discription">
                    {information[selected].text[language]}
                </p>

                <div className="information-items">
                    {information[selected].items[language].map((item, index) =>(
                        <span className=" information-tag" key={index}>
                             {item}
                        </span>
                    ))}
                </div>
            </div>
        ) : (
          <p>{language === "ja" ? "ポークパティの味にシャキシャキキャベツが合わさる贅沢な味わい" : "A delicious combination of a pork patty and crisp cabbage."}</p>

        )}
      </div>

      {/* 右側の円形UI */}
      <div className="circle-container">

        {/* 円形の装飾 */}
        <div className="orbit"></div>

        {/* 商品画像 */}
        <img
          className="macpork-image"
          src={MacPork}
          alt = {language === "ja" ? "マックポーク" : "McPork"}
          onClick={handleBurger}
        />

        {/* 円形ボタン */}
        {information.map((item, index) => {

          const angle = index * 90 - 90;

          const isSelected = selected === index;

          return (
            <button
              key={item.id}
              className={`circle-button ${isSelected ? "selected" : ""}`}
              style={{
                "--angle": `${angle}deg`,
                "--item-color": item.color
              }}
              onClick={() => setSelected(index)}
            >
              {item.title[language]}
            </button>
          );
        })}

    {showSpeaker && (
    <button
        className="circle-button speaker-button"
        style={{
            "--angle": "45deg",
            "--item-color": "#F5B731"
        }}
        onClick={StartMusic}
    >
         {isPlaying ? "🔇" : "🔊"}
    </button>
)}

      </div>

    </div>

    <footer className="product-footer">
            <p>
                {language === "ja" 
                    ? "情報提供元" 
                    : "SOURCES"}
            </p>

            <a
                href="https://www.mcdonalds.co.jp/"
                target="_blank"
                rel="noopener noreferrer"
            >
                McDonald's Japan Official Website ↗
            </a>
            <a href="https://www.mcdonalds.co.jp/products/1270/"
            target="_blank"
            rel="noopener noreferrer">McPork – McDonald's Official Website ↗</a>

            <span className="footer-copy">
                © McDonald's product information
            </span>
    </footer>
    </>
  );
}


export default Heros;