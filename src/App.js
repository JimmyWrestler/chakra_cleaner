import React, { useState, useRef } from "react";
import Modal from "react-modal";
import "./App.css";
Modal.setAppElement("#root");


const ImageWithButtons = () => {
  const [modalIsOpen, setModalIsOpen] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [floatingMessage, setFloatingMessage] = useState(null);
  const timerRef = useRef(null);
  const explosionIntervalRef = useRef(null);
  const holdTime = 2500;
  // 🔥 СОСТОЯНИЕ ЧАКР
  const [chakraState, setChakraState] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  // 🔥 Создание взрыва
const spawnExplosion = (x, y) => {
  const el = document.createElement("div");
  el.className = "particle-explosion";

  document.body.appendChild(el);

  // получаем реальные размеры создаваемого элемента
  const rect = el.getBoundingClientRect();

  el.style.left = `${x - rect.width / 2}px`;
  el.style.top = `${y - rect.height / 2}px`;

  setTimeout(() => el.remove(), 1200);
};

  // 🔥 Начало удержания кнопки
  const startHold = (btn) => {
    setActiveButton(btn.id);

    setFloatingMessage({
      id: btn.id,
      text: `Чистим: ${btn.label}`,
      top: btn.top,
      left: btn.left,
    });

    const wrapper = document.getElementById(`chakra-btn-${btn.id}`);
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      spawnExplosion(cx, cy);

      explosionIntervalRef.current = setInterval(() => {
        spawnExplosion(cx, cy);
      }, 300);
    }

    timerRef.current = setTimeout(() => {
      setModalIsOpen(btn.id);

      // 🌟 ЧАКРА ОЧИСТИЛАСЬ 
      setChakraState((prev) => ({
        ...prev,
        [btn.id]: true,
      }));

      setActiveButton(null);
      setFloatingMessage(null);
      clearInterval(explosionIntervalRef.current);
    }, holdTime);
  };

  const cancelHold = () => {
    clearTimeout(timerRef.current);
    clearInterval(explosionIntervalRef.current);
    setActiveButton(null);
    setFloatingMessage(null);
  };

  const buttons = [
    { id: 1, top: "10%", left: "50%", label: "Стратастраха", content: "Вы почистили Стратастраху!" },
    { id: 2, top: "22%", left: "50%", label: "Аджна", content: "Вы почистили Аджну!" },
    { id: 3, top: "39%", left: "50%", label: "ДВишудха", content: "Вы почистили ДВишудху!" },
    { id: 4, top: "48%", left: "50%", label: "Анахата", content: "Вы почистили Анахату!" },
    { id: 5, top: "60%", left: "50%", label: "Манипура", content: "Вы почистили Манипуру!" },
    { id: 6, top: "69%", left: "50%", label: "Свадхистана", content: "Вы почистили Свадхистану!" },
    { id: 7, top: "79%", left: "50%", label: "Муладхара", content: "Вы почистили Муладхару!" },
  ];

  return (
    <div style={{ width: "100%", margin: "5% auto" }}>

      {/* ===========================
       СТИЛИ
      ============================ */}
      <style>{`
        .layout-container {
          display: flex;
          gap: 20px;
          width: 100%;
          justify-content: center;
          align-items: flex-start;
         
          border:10px;
          border-radius:15px;
          background: url("/images/bg.jpg") center / cover no-repeat;
            
        }

        .side-block {
        
          flex: 1;
          padding: 15px;
          min-width: 200px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 12px;
          color: #eee;
          backdrop-filter: blur(6px);
        }

        @media (max-width: 768px) {
          .layout-container {
            flex-direction: column;
            align-items: stretch;
            
          }
        }

        .button-wrapper {
          position: absolute;
          transform: translate(-50%, -50%);
        }

        @keyframes glow {
          0% { box-shadow: 0 0 8px rgba(0,255,255,0.2); }
          50% { box-shadow: 0 0 16px rgba(0,255,255,0.8); }
          100% { box-shadow: 0 0 8px rgba(0,255,255,0.2); }
        }

        .particle-explosion {
          position: absolute;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #4ffaff, #00caff, transparent);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: explode 1.2s ease-out forwards;
          z-index: 9999;
        }


    

  @keyframes explode {
  0%   { opacity: 1; transform: scale(0.1); }
  50%  { opacity: 1; transform: scale(3.5); }
  100% { opacity: 0; transform: scale(6); }
}
      `}</style>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Чакроочиститель v0.9</h1>

      {/* FLEX-обертка */}
      <div className="layout-container">

        {/* Левый текстовый блок */}
        <div className="side-block">
          <h3>Инструкция</h3>
          <p>Нажмите и удерживайте кнопку нужной чакры, чтобы очистить её.</p>
        </div>

        {/* Центр — картинка + кнопки */}
        <div style={{ position: "relative", maxWidth: 500, width: "100%" }}>
        <img
  src={`${process.env.PUBLIC_URL}/chakraS.png`}
  alt="чакеры"
  style={{ width: "100%", display: "block" }}
/>

          {floatingMessage && (
            <div
              style={{
                position: "absolute",
                top: floatingMessage.top,
                left: floatingMessage.left,
                transform: "translate(-50%, -50%)",
                background: "rgba(255,255,255,0.9)",
                padding: "8px 12px",
                borderRadius: 8,
                pointerEvents: "none",
              }}
            >
              {floatingMessage.text}
            </div>
          )}

          {buttons.map((btn) => (
            <div
              key={btn.id}
              id={`chakra-btn-${btn.id}`}
              className="button-wrapper"
              style={{ top: btn.top, left: btn.left }}
            >
              <button
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: chakraState[btn.id]
                    ? "rgba(0,255,0,0.6)"      // очищено
                    : activeButton === btn.id
                    ? "rgba(0,255,255,0.4)"    // удерживается
                    : "rgba(255,255,255,0.15)",

                  animation:
                    chakraState[btn.id] || activeButton === btn.id
                      ? "none"
                      : "glow 3s infinite",
                }}
                onMouseDown={() => startHold(btn)}
                onMouseUp={cancelHold}
                onMouseLeave={cancelHold}
                onTouchStart={() => startHold(btn)}
                onTouchEnd={cancelHold}
              />
            </div>
          ))}
        </div>

        {/* Правый блок — состояние */}
        <div className="side-block">
          <h3>Состояние чакр</h3>

          {buttons.map((btn) => (
            <p
              key={btn.id}
              style={{
                color: chakraState[btn.id] ? "#4aff4a" : "#bbb",
                fontWeight: chakraState[btn.id] ? "bold" : "normal",
              }}
            >
              {btn.label}: {chakraState[btn.id] ? "Очищена ✓" : "Грязная ✖"}
            </p>
          ))}
        </div>

      </div>

      {/* Модалки */}
      {buttons.map((btn) => (
        <Modal
          key={btn.id}
          isOpen={modalIsOpen === btn.id}
          onRequestClose={() => setModalIsOpen(null)}
        >
          <h2>{btn.label}</h2>
          <p>{btn.content}</p>
          <button onClick={() => setModalIsOpen(null)}>Закрыть</button>
        </Modal>
      ))}
    </div>
  );
};

export default ImageWithButtons;
