import React, { useState } from "react";
import "../styles/SongCard.css";

const SongCard = ({ song, isAdmin, onEdit, onDelete, onClick }) => {
  // 호버 상태 관리
  const [isHovered, setIsHovered] = useState(false);

  // 난이도에 따른 색상 설정
  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case "쉬움":
      case "easy":
        return {
          background: "#2ecc71",
          backgroundImage: "linear-gradient(to right, #2ecc71, #27ae60)",
        };
      case "보통":
      case "medium":
        return {
          background: "#f39c12",
          backgroundImage: "linear-gradient(to right, #f39c12, #e67e22)",
        };
      case "어려움":
      case "hard":
        return {
          background: "#e74c3c",
          backgroundImage: "linear-gradient(to right, #e74c3c, #c0392b)",
        };
      default:
        return {
          background: "#95a5a6",
          backgroundImage: "none",
        };
    }
  };

  // 랜덤 배경색 생성 (이미지가 없을 경우 대체용)
  const getRandomColor = () => {
    const colors = ["#6b8cbb", "#8facd0", "#a3bce0", "#7d9bc6", "#5c7fb3"];
    const randomIndex = song.id % colors.length;
    return colors[randomIndex];
  };

  // 클릭 이벤트 처리
  const handleClick = (e) => {
    // 이벤트가 편집/삭제 버튼에서 발생한 경우는 상세보기로 연결하지 않음
    if (e.target.closest(".song-actions")) {
      return;
    }
    onClick();
  };

  // 카드 스타일 - 인라인으로 직접 적용
  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "visible",
    boxShadow: isHovered
      ? "0 12px 28px rgba(0, 0, 0, 0.25), 0 8px 10px rgba(0, 0, 0, 0.22)"
      : "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    filter: "none",
    border: "1px solid #e9ecef",
    transition: "all 0.3s ease",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transform: isHovered ? "translateY(-5px)" : "none",
    zIndex: 5,
    margin: "4px",
  };

  // 아이콘 스타일
  const iconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    color: "white",
    textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
    fontWeight: "bold",
  };

  // 배지 스타일
  const badgeStyle = {
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    color: "white",
    letterSpacing: "0.5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginRight: "8px",
  };

  // 장르 배지 스타일
  const genreBadgeStyle = {
    ...badgeStyle,
    backgroundColor: "#4a6fa5",
    backgroundImage: "linear-gradient(to right, #4a6fa5, #5a7db5)",
  };

  // 난이도 배지 스타일
  const difficultyBadgeStyle = {
    ...badgeStyle,
    ...getDifficultyColor(song.difficulty),
  };

  return (
    <div
      className="song-card"
      onClick={handleClick}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="song-cover"
        style={{
          backgroundColor: getRandomColor(),
          backgroundImage: song.coverImage ? `url(${song.coverImage})` : "none",
          cursor: "pointer",
          height: "180px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "12px 12px 0 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!song.coverImage && (
          <span
            style={{
              fontSize: "42px",
              position: "relative",
              zIndex: 2,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            ♪
          </span>
        )}
      </div>

      <div
        style={{
          padding: "18px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#343a40",
            marginBottom: "8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.3,
          }}
        >
          {song.title}
        </h3>

        <p
          style={{
            fontSize: "16px",
            color: "#495057",
            marginBottom: "14px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: 500,
          }}
        >
          {song.artist}
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <span style={genreBadgeStyle}>{song.genre}</span>
          <span style={difficultyBadgeStyle}>{song.difficulty}</span>
        </div>

        {isAdmin && (
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(song);
              }}
              aria-label="노래 편집"
              style={{
                backgroundColor: "#4a6fa5",
                backgroundImage: "linear-gradient(to right, #4a6fa5, #5a7db5)",
                border: "2px solid white",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)",
              }}
            >
              <span style={iconStyle}>✎</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(song.id);
              }}
              aria-label="노래 삭제"
              style={{
                backgroundColor: "#dc3545",
                backgroundImage: "linear-gradient(to right, #dc3545, #c82333)",
                border: "2px solid white",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)",
              }}
            >
              <span style={iconStyle}>✕</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongCard;
