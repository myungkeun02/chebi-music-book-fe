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
                  {copySuccess ? "복사됨!" : "노래 제목 복사"}
                </button>

                {song.youtubeLink && (
                  <button
                    className="detail-btn youtube-btn"
                    onClick={() => openExternalLink(song.youtubeLink)}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path
                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                        fill="currentColor"
                      />
                    </svg>
                    유튜브에서 보기
                  </button>
                )}

                {song.africaLink && (
                  <button
                    className="detail-btn soop-btn"
                    onClick={() => openExternalLink(song.africaLink)}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path
                        d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14.5 8 9.5 3zm5 0L13 4.5 16.5 8 13 11.5 14.5 13 19.5 8 14.5 3z"
                        fill="currentColor"
                      />
                    </svg>
                    아프리카TV에서 보기
                  </button>
                )}
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
