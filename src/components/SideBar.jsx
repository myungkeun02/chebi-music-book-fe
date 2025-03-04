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
  onUserManagement
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

  // 드롭다운 아이템이 선택되었는지 확인
  const [hasGenreSelection, setHasGenreSelection] = useState(false);
  const [hasArtistSelection, setHasArtistSelection] = useState(false);

  // props가 변경될 때 내부 상태 업데이트
  useEffect(() => {
    if (propSelectedGenre) {
      setSelectedGenre(propSelectedGenre);
      setHasGenreSelection(activeMenu === "byGenre");
    }
  }, [propSelectedGenre, activeMenu]);

  useEffect(() => {
    if (propSelectedArtist) {
      setSelectedArtist(propSelectedArtist);
      setHasArtistSelection(activeMenu === "byArtist");
    }
  }, [propSelectedArtist, activeMenu]);

  // activeMenu 변경 감지하여 드롭다운 상태 업데이트
  useEffect(() => {
    // 메뉴가 장르/가수 관련이 아니면 드롭다운을 닫고 선택 상태 초기화
    if (activeMenu !== "byGenre" && activeMenu !== "byArtist") {
      setGenreDropdownOpen(false);
      setArtistDropdownOpen(false);
      setHasGenreSelection(false);
      setHasArtistSelection(false);
    } else if (activeMenu === "byGenre") {
      setHasGenreSelection(true);
      setHasArtistSelection(false);
    } else if (activeMenu === "byArtist") {
      setHasArtistSelection(true);
      setHasGenreSelection(false);
    }
  }, [activeMenu]);

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
    setSelectedGenre(genre);
    onGenreSelect(genre);
    setHasGenreSelection(true);
    setHasArtistSelection(false);
  };

  // 가수 선택 핸들러
  const handleArtistSelect = (artist) => {
    setSelectedArtist(artist);
    onArtistSelect(artist);
    setHasArtistSelection(true);
    setHasGenreSelection(false);
  };

  // 다른 메뉴 선택 핸들러
  const handleMenuChange = (menu) => {
    // 다른 메뉴 선택 시 드롭다운 선택 상태 초기화
    if (menu !== "byGenre" && menu !== "byArtist") {
      setHasGenreSelection(false);
      setHasArtistSelection(false);
    }
    onMenuChange(menu);
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

  // 외부 링크 열기 함수
  const openExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside className="sidebar">
      {/* 주요 메뉴 */}
      <nav className="main-menu">
        <ul className="menu-list">
          <li
            className={`menu-item ${
              activeMenu === "allSongs" && !hasGenreSelection && !hasArtistSelection
                ? "active"
                : ""
            }`}
          >
            <button onClick={() => handleMenuChange("allSongs")}>
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>전체 노래</span>
            </button>
          </li>

          {/* 장르별 보기 (드롭다운) */}
          <li
            className={`menu-item ${
              hasGenreSelection ? "has-dropdown-active" : ""
            } ${activeMenu === "byGenre" && !hasGenreSelection ? "active" : ""}`}
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
                    hasGenreSelection && selectedGenre === genre ? "selected" : ""
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
            className={`menu-item ${
              hasArtistSelection ? "has-dropdown-active" : ""
            } ${activeMenu === "byArtist" && !hasArtistSelection ? "active" : ""}`}
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
                    hasArtistSelection && selectedArtist === artist ? "selected" : ""
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
              activeMenu === "byDifficulty" && !hasGenreSelection && !hasArtistSelection
                ? "active"
                : ""
            }`}
          >
            <button onClick={() => handleMenuChange("byDifficulty")}>
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>난이도별 보기</span>
            </button>
          </li>

          <li
            className={`menu-item ${
              activeMenu === "favorites" && !hasGenreSelection && !hasArtistSelection
                ? "active"
                : ""
            }`}
          >
            <button onClick={() => handleMenuChange("favorites")}>
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
              <button onClick={onUserManagement} className="admin-btn">
                <svg className="menu-icon" viewBox="0 0 24 24">
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>사용자 관리</span>
              </button>
            </li>
          </ul>
        </div>
      )}
      
      {/* 외부 링크 버튼 영역 */}
      <div className="sidebar-link">
        <button 
          className="youtube-button"
          onClick={() => openExternalLink("https://www.youtube.com/@chebi333")}
        >
          <svg className="link-icon" viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"
              fill="currentColor"
            />
          </svg>
          유튜브
        </button>
        <button 
          className="soop-button"
          onClick={() => openExternalLink("https://ch.sooplive.co.kr/chebi2")}
        >
          <svg className="link-icon" viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14.5 8 9.5 3zm5 0L13 4.5 16.5 8 13 11.5 14.5 13 19.5 8 14.5 3z"
              fill="currentColor"
            />
          </svg>
          SOOP
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;