import React, { useState } from "react";
import "../styles/Modal.css";

const SongDetailModal = ({ song, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  // 텍스트 복사 기능
  const copyToClipboard = () => {
    const textToCopy = `${song.title} - ${song.artist}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // 외부 링크 열기
  const openExternalLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // 난이도에 따른 클래스 설정
  const getDifficultyClass = (level) => {
    switch (level.toLowerCase()) {
      case "쉬움":
      case "easy":
        return "easy";
      case "보통":
      case "medium":
        return "medium";
      case "어려움":
      case "hard":
        return "hard";
      default:
        return "";
    }
  };

  // 랜덤 배경색 생성 (이미지가 없을 경우 대체용)
  const getRandomColor = () => {
    const colors = ["#6b8cbb", "#8facd0", "#a3bce0", "#7d9bc6", "#5c7fb3"];
    const randomIndex = song.id % colors.length;
    return colors[randomIndex];
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>
            <span className="header-icon">🎵</span> 노래 상세 정보
          </h2>
          <button className="close-button" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="song-detail-container">
            {/* 노래 커버와 기본 정보 */}
            <div className="song-detail-header">
              <div
                className="song-detail-cover"
                style={{
                  backgroundColor: getRandomColor(),
                  backgroundImage: song.coverImage
                    ? `url(${song.coverImage})`
                    : "none",
                }}
              >
                {!song.coverImage && <span>♪</span>}
              </div>

              <div className="song-detail-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>

                <div className="song-detail-badges">
                  <span className="badge genre-badge">{song.genre}</span>
                  <span
                    className={`badge difficulty-badge ${getDifficultyClass(
                      song.difficulty
                    )}`}
                  >
                    {song.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* 상세 내용 섹션 */}
            <div className="song-detail-content">
              <h3 className="section-subtitle">링크 및 정보</h3>

              <div className="detail-actions">
                {/* 복사 버튼 */}
                <button
                  className="detail-btn copy-btn"
                  onClick={copyToClipboard}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                      fill="currentColor"
                    />
                  </svg>
                  {copySuccess ? "복사 완료!" : "노래 제목 + 가수 복사"}
                </button>

                {/* 유튜브 링크 버튼 */}
                <button
                  className="detail-btn youtube-btn"
                  onClick={() =>
                    openExternalLink(
                      song.youtubeLink ||
                        `https://www.youtube.com/results?search_query=${encodeURIComponent(
                          `${song.title} ${song.artist}`
                        )}`
                    )
                  }
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"
                      fill="currentColor"
                    />
                  </svg>
                  유튜브에서 보기
                </button>

                {/* SOOP 링크 버튼 */}
                <button
                  className="detail-btn soop-btn"
                  onClick={() =>
                    openExternalLink(
                      song.soopLink || `https://example.com/soop/${song.id}`
                    )
                  }
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14.5 8 9.5 3zm5 0L13 4.5 16.5 8 13 11.5 14.5 13 19.5 8 14.5 3z"
                      fill="currentColor"
                    />
                  </svg>
                  SOOP 플랫폼에서 보기
                </button>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetailModal;
