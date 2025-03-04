import React from "react";
import "../styles/SongCard.css";

const SongCard = ({ song, isAdmin, onEdit, onDelete, onClick }) => {
  // 난이도에 따른 배지 색상 설정
  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case "쉬움":
      case "easy":
        return "#2ecc71";
      case "보통":
      case "medium":
        return "#f39c12";
      case "어려움":
      case "hard":
        return "#e74c3c";
      default:
        return "#95a5a6";
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
    if (e.target.closest('.song-actions')) {
      return;
    }
    onClick();
  };

  return (
    <div className="song-card" onClick={handleClick}>
      <div
        className="song-cover"
        style={{
          backgroundColor: getRandomColor(),
          backgroundImage: song.coverImage ? `url(${song.coverImage})` : "none",
          cursor: "pointer"
        }}
      >
        {!song.coverImage && <span className="music-note">♪</span>}
      </div>

      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>

        <div className="song-tags">
          <span className="badge genre-badge">{song.genre}</span>
          <span
            className="badge difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(song.difficulty) }}
          >
            {song.difficulty}
          </span>
        </div>

        {isAdmin && (
          <div className="song-actions">
            <button
              className="action-btn edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(song);
              }}
              aria-label="노래 편집"
            >
              ✎
            </button>
            <button
              className="action-btn delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(song.id);
              }}
              aria-label="노래 삭제"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongCard;