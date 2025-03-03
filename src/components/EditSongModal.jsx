import React, { useState, useEffect } from "react";
import "../styles/Modal.css";

const EditSongModal = ({ song, onClose, onUpdateSong }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [albumSearch, setAlbumSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 장르 옵션
  const genreOptions = [
    "K-POP",
    "POP",
    "Rock",
    "Jazz",
    "Hip-Hop",
    "R&B",
    "발라드",
    "트로트",
    "클래식",
    "기타",
  ];

  // 난이도 옵션
  const difficultyOptions = ["쉬움", "보통", "어려움"];

  // 초기 상태 설정
  useEffect(() => {
    if (song) {
      setTitle(song.title || "");
      setArtist(song.artist || "");
      setGenre(song.genre || "K-POP");
      setDifficulty(song.difficulty || "보통");
      setCoverImage(song.coverImage || null);
    }
  }, [song]);

  // 앨범 커버 검색 시뮬레이션
  const handleSearchAlbum = (e) => {
    e.preventDefault();

    // 실제로는 백엔드 API 호출
    setIsSearching(true);

    // 검색 결과 목업 (실제로는 API 응답을 사용)
    setTimeout(() => {
      // 검색어에 따른 결과 필터링 예시
      const mockResults = [
        {
          id: 1,
          title: "뱅뱅뱅",
          artist: "빅뱅",
          coverUrl: null,
          color: "#6b8cbb",
        },
        {
          id: 2,
          title: "Map of the Soul",
          artist: "방탄소년단",
          coverUrl: null,
          color: "#8facd0",
        },
        {
          id: 3,
          title: "Celebrity",
          artist: "아이유",
          coverUrl: null,
          color: "#a3bce0",
        },
        {
          id: 4,
          title: "OMG",
          artist: "뉴진스",
          coverUrl: null,
          color: "#6b8cbb",
        },
        {
          id: 5,
          title: "Next Level",
          artist: "에스파",
          coverUrl: null,
          color: "#7d9bc6",
        },
      ];

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  // 앨범 커버 선택
  const handleSelectCover = (album) => {
    setCoverImage(album.coverUrl);
  };

  // 노래 수정 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!title || !artist) {
      alert("노래 제목과 가수는 필수입니다.");
      return;
    }

    // 노래 업데이트
    onUpdateSong({
      ...song,
      title,
      artist,
      genre,
      difficulty,
      coverImage,
    });

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>노래 수정</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <h3 className="section-subtitle">노래 정보</h3>

            <div className="form-group">
              <label htmlFor="title" className="form-label">
                노래 제목
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="artist" className="form-label">
                가수
              </label>
              <input
                type="text"
                id="artist"
                className="form-control"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="genre" className="form-label">
                  장르
                </label>
                <select
                  id="genre"
                  className="form-control"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  {genreOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group half">
                <label htmlFor="difficulty" className="form-label">
                  난이도
                </label>
                <select
                  id="difficulty"
                  className="form-control"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  {difficultyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <h3 className="section-subtitle">앨범 커버 검색</h3>

            <div className="form-group search-group">
              <input
                type="text"
                className="form-control"
                placeholder="앨범명 또는 가수명으로 검색..."
                value={albumSearch}
                onChange={(e) => setAlbumSearch(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary search-btn"
                onClick={handleSearchAlbum}
              >
                검색
              </button>
            </div>

            {/* 앨범 커버 검색 결과 */}
            <div className="album-results">
              {isSearching ? (
                <div className="loading">검색 중...</div>
              ) : (
                <div className="album-grid">
                  {searchResults.map((album) => (
                    <div
                      key={album.id}
                      className={`album-item ${
                        coverImage === album.coverUrl ? "selected" : ""
                      }`}
                      onClick={() => handleSelectCover(album)}
                    >
                      <div
                        className="album-cover"
                        style={{
                          backgroundColor: album.color,
                          backgroundImage: album.coverUrl
                            ? `url(${album.coverUrl})`
                            : "none",
                        }}
                      >
                        {!album.coverUrl && (
                          <span className="music-note">♪</span>
                        )}
                      </div>
                      <div className="album-title">{album.title}</div>
                      <div className="album-artist">{album.artist}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                취소
              </button>
              <button type="submit" className="btn btn-primary">
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSongModal;
