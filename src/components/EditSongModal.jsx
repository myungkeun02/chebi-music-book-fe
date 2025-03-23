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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [africaLink, setAfricaLink] = useState("");

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
      setYoutubeLink(song.youtubeLink || "");
      setAfricaLink(song.africaLink || "");
    }
  }, [song]);

  // 앨범 커버 검색 API 호출
  const handleAlbumSearch = async () => {
    if (!albumSearch.trim()) {
      setError("검색어를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://141.164.54.157:8080/api/vi/crawl/${encodeURIComponent(
          albumSearch
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok || responseData.statusCode !== 200) {
        throw new Error(responseData.message || "검색 중 오류가 발생했습니다.");
      }

      // API 응답의 data 배열을 파싱하여 UI에 맞게 변환
      const formattedResults = responseData.data.map((imageUrl, index) => ({
        id: index + 1,
        title: `검색 결과 ${index + 1}`,
        artist: albumSearch,
        coverUrl: imageUrl,
        color: "#6b8cbb",
      }));

      setSearchResults(formattedResults);
    } catch (error) {
      console.error("앨범 검색 오류:", error);
      alert(error.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 앨범 커버 선택
  const handleSelectCover = (album) => {
    setCoverImage(album.coverUrl);
    // 선택한 앨범의 정보가 제한적이므로 검색어를 아티스트로 사용
    if (!artist) setArtist(albumSearch);
  };

  // 노래 수정 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSong = {
      ...song,
      title,
      artist,
      genre,
      difficulty,
      coverImage,
      youtubeLink,
      africaLink,
    };
    onUpdateSong(updatedSong);
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

            <h3 className="section-subtitle">링크 정보</h3>
            <div className="form-group">
              <label htmlFor="youtubeLink" className="form-label">
                유튜브 링크
              </label>
              <input
                type="url"
                id="youtubeLink"
                className="form-control"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="africaLink" className="form-label">
                아프리카TV 링크
              </label>
              <input
                type="url"
                id="africaLink"
                className="form-control"
                value={africaLink}
                onChange={(e) => setAfricaLink(e.target.value)}
                placeholder="https://afreecatv.com/..."
              />
            </div>

            <h3 className="section-subtitle">앨범 커버 검색</h3>

            <div className="form-group search-group">
              <input
                type="text"
                className="form-control"
                placeholder="앨범명 또는 가수명으로 검색..."
                value={albumSearch}
                onChange={(e) => setAlbumSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAlbumSearch();
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-primary search-btn"
                onClick={handleAlbumSearch}
              >
                <i className="fas fa-search"></i>
                검색
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* 앨범 커버 검색 결과 */}
            <div className="album-results">
              {loading ? (
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
