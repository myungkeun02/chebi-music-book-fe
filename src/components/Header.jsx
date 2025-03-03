import React, { useState } from "react";
import "../styles/Header.css";

const Header = ({ isLoggedIn, isAdmin, onSearch, onLogin, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-circle">
          <img src="/src/assets/image.png" alt="노래책 로고" />
        </div>
        <h1 className="logo-text">노래책</h1>
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
