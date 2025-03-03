import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";

const Sidebar = ({
  isAdmin,
  activeMenu,
  selectedGenre: propSelectedGenre,
  selectedArtist: propSelectedArtist,
  onMenuChange,
  onAddSong,
  onManageSongs,
  onGenreSelect,
  onArtistSelect,
}) => {
  // 드롭다운 상태 관리
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);

  // 선택된 장르와 가수 상태 관리 (props에서 받은 값을 기본값으로 사용)
  const [selectedGenre, setSelectedGenre] = useState(
    propSelectedGenre || "K-POP"
  );
  const [selectedArtist, setSelectedArtist] = useState(
    propSelectedArtist || "방탄소년단"
  );

  // props가 변경될 때 내부 상태 업데이트
  useEffect(() => {
    if (propSelectedGenre) {
      setSelectedGenre(propSelectedGenre);
    }
  }, [propSelectedGenre]);

  useEffect(() => {
    if (propSelectedArtist) {
      setSelectedArtist(propSelectedArtist);
    }
  }, [propSelectedArtist]);

  // 샘플 장르 목록
  const genres = [
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

  // 샘플 가수 목록
  const artists = [
    "빅뱅",
    "방탄소년단",
    "아이유",
    "뉴진스",
    "에스파",
    "블랙핑크",
    "트와이스",
    "아이브",
    "지코",
    "이무진",
  ];

  // 장르 선택 핸들러
  const handleGenreSelect = (genre) => {
    onGenreSelect(genre);
    // 드롭다운 닫기 (선택 후에도 열려있게 하려면 주석 처리)
    // setGenreDropdownOpen(false);
  };

  // 가수 선택 핸들러
  const handleArtistSelect = (artist) => {
    onArtistSelect(artist);
    // 드롭다운 닫기 (선택 후에도 열려있게 하려면 주석 처리)
    // setArtistDropdownOpen(false);
  };

  // 장르 드롭다운 토글 (메뉴 변경 없이 단순 토글)
  const toggleGenreDropdown = (e) => {
    e.preventDefault(); // 기본 동작 방지
    setGenreDropdownOpen(!genreDropdownOpen);
    // 다른 드롭다운이 열려있으면 닫기
    if (artistDropdownOpen) setArtistDropdownOpen(false);
  };

  // 가수 드롭다운 토글 (메뉴 변경 없이 단순 토글)
  const toggleArtistDropdown = (e) => {
    e.preventDefault(); // 기본 동작 방지
    setArtistDropdownOpen(!artistDropdownOpen);
    // 다른 드롭다운이 열려있으면 닫기
    if (genreDropdownOpen) setGenreDropdownOpen(false);
  };

  return (
    <aside className="sidebar">
      {/* 주요 메뉴 */}
      <nav className="main-menu">
        <ul className="menu-list">
          <li
            className={`menu-item ${activeMenu === "allSongs" ? "active" : ""}`}
          >
            <button onClick={() => onMenuChange("allSongs")}>
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>전체 노래</span>
            </button>
          </li>

          {/* 장르별 보기 (드롭다운) */}
          <li
            className={`menu-item ${activeMenu === "byGenre" ? "active" : ""}`}
          >
            <button onClick={toggleGenreDropdown} className="dropdown-toggle">
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span>장르별 보기</span>
              <svg
                className={`dropdown-arrow ${genreDropdownOpen ? "open" : ""}`}
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* 장르 드롭다운 메뉴 */}
            <div className={`dropdown-menu ${genreDropdownOpen ? "open" : ""}`}>
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`dropdown-item ${
                    selectedGenre === genre ? "selected" : ""
                  }`}
                  onClick={() => handleGenreSelect(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </li>

          {/* 가수별 보기 (드롭다운) */}
          <li
            className={`menu-item ${activeMenu === "byArtist" ? "active" : ""}`}
          >
            <button onClick={toggleArtistDropdown} className="dropdown-toggle">
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>가수별 보기</span>
              <svg
                className={`dropdown-arrow ${artistDropdownOpen ? "open" : ""}`}
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* 가수 드롭다운 메뉴 */}
            <div
              className={`dropdown-menu ${artistDropdownOpen ? "open" : ""}`}
            >
              {artists.map((artist) => (
                <button
                  key={artist}
                  className={`dropdown-item ${
                    selectedArtist === artist ? "selected" : ""
                  }`}
                  onClick={() => handleArtistSelect(artist)}
                >
                  {artist}
                </button>
              ))}
            </div>
          </li>

          <li
            className={`menu-item ${
              activeMenu === "byDifficulty" ? "active" : ""
            }`}
          >
            <button onClick={() => onMenuChange("byDifficulty")}>
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>난이도별 보기</span>
            </button>
          </li>

          <li
            className={`menu-item ${
              activeMenu === "favorites" ? "active" : ""
            }`}
          >
            <button onClick={() => onMenuChange("favorites")}>
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>자주 부르는 노래</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* 관리자 메뉴 */}
      {isAdmin && (
        <div className="admin-menu">
          <h3 className="menu-section-title">관리자 메뉴</h3>
          <ul className="menu-list">
            <li className="menu-item">
              <button onClick={onAddSong} className="admin-btn">
                <svg className="menu-icon" viewBox="0 0 24 24">
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>노래 추가하기</span>
              </button>
            </li>

            <li className="menu-item">
              <button onClick={onManageSongs} className="admin-btn">
                <svg className="menu-icon" viewBox="0 0 24 24">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>노래 관리</span>
              </button>
            </li>

            <li className="menu-item">
              <button className="admin-btn">
                <svg className="menu-icon" viewBox="0 0 24 24">
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>사용자 관리</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
