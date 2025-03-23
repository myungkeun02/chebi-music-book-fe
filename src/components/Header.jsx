import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const Header = ({
  isLoggedIn,
  isAdmin,
  onSearch,
  searchQuery: propSearchQuery,
  onLogin,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState(propSearchQuery || "");

  // 부모 컴포넌트의 검색어 상태 변화에 따라 로컬 상태 동기화
  useEffect(() => {
    setSearchQuery(propSearchQuery || "");
  }, [propSearchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/images/logo.png" alt="Chebi Music Book" className="logo" />
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="노래 제목, 가수, 장르로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          검색
        </button>
      </form>

      <div className="user-section">
        {isLoggedIn ? (
          <>
            <span className="user-greeting">
              {isAdmin ? "관리자" : "일반 사용자"}님 환영합니다
            </span>
            <button className="btn btn-secondary logout-btn" onClick={onLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <button className="btn btn-primary login-btn" onClick={onLogin}>
            로그인
          </button>
        )}

        <div className="user-avatar">
          <span>{isAdmin ? "A" : "U"}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
