import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import SongList from "./components/SongList";
import AddSongModal from "./components/AddSongModal";
import ManageSongsModal from "./components/ManageSongsModal";
import EditSongModal from "./components/EditSongModal";
import LoginModal from "./components/LoginModal";
import "./App.css";
import "./index.css";

const App = () => {
  // 사용자 인증 상태
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 모달 상태
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [editingSong, setEditingSong] = useState(null);

  // 메뉴 상태
  const [activeMenu, setActiveMenu] = useState("allSongs");
  const [selectedGenre, setSelectedGenre] = useState("K-POP");
  const [selectedArtist, setSelectedArtist] = useState("방탄소년단");

  // 검색 상태
  const [searchQuery, setSearchQuery] = useState("");

  // 모든 곡을 저장할 원본 배열과 필터링된 배열
  const [allSongs, setAllSongs] = useState([
    {
      id: 1,
      title: "뱅뱅뱅",
      artist: "빅뱅",
      genre: "K-POP",
      difficulty: "쉬움",
      coverImage: null,
    },
    {
      id: 2,
      title: "다이너마이트",
      artist: "방탄소년단",
      genre: "K-POP",
      difficulty: "보통",
      coverImage: null,
    },
    {
      id: 3,
      title: "Fly Me To The Moon",
      artist: "Frank Sinatra",
      genre: "Jazz",
      difficulty: "어려움",
      coverImage: null,
    },
    {
      id: 4,
      title: "아무노래",
      artist: "지코",
      genre: "Hip-Hop",
      difficulty: "보통",
      coverImage: null,
    },
    {
      id: 5,
      title: "롤린",
      artist: "브레이브걸스",
      genre: "K-POP",
      difficulty: "쉬움",
      coverImage: null,
    },
    {
      id: 6,
      title: "Celebrity",
      artist: "아이유",
      genre: "K-POP",
      difficulty: "보통",
      coverImage: null,
    },
    {
      id: 7,
      title: "신호등",
      artist: "이무진",
      genre: "K-POP",
      difficulty: "쉬움",
      coverImage: null,
    },
    {
      id: 8,
      title: "Next Level",
      artist: "에스파",
      genre: "K-POP",
      difficulty: "보통",
      coverImage: null,
    },
  ]);

  const [filteredSongs, setFilteredSongs] = useState([]);

  // 세션 관리 (로컬 스토리지)
  useEffect(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    const savedAdminState = localStorage.getItem("isAdmin");

    if (savedLoginState === "true") {
      setIsLoggedIn(true);
    }

    if (savedAdminState === "true") {
      setIsAdmin(true);
    }
  }, []);

  // 로그인 처리
  const handleLogin = (username, password) => {
    // 임시 계정 관리 (실제로는 서버 인증으로 대체)
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      setIsAdmin(true);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", "true");
      setShowLoginModal(false);
      return { success: true };
    } else {
      return {
        success: false,
        message: "사용자명 또는 비밀번호가 잘못되었습니다.",
      };
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
  };

  // 검색 처리
  const handleSearch = (query) => {
    setSearchQuery(query);
    // 검색 시 전체 노래 보기로 자동 변경
    setActiveMenu("allSongs");
  };

  // activeMenu 또는 검색어 변경 시 필터링 적용
  useEffect(() => {
    applyFilters();
  }, [activeMenu, searchQuery, selectedGenre, selectedArtist, allSongs]);

  // 필터링 로직
  const applyFilters = () => {
    let result = [...allSongs];

    // 검색어로 필터링
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (song) =>
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query) ||
          song.genre.toLowerCase().includes(query)
      );
    }

    // 메뉴 선택에 따른 추가 필터링
    if (activeMenu === "byGenre") {
      result = result.filter((song) => song.genre === selectedGenre);
    } else if (activeMenu === "byArtist") {
      result = result.filter((song) => song.artist === selectedArtist);
    } else if (activeMenu === "byDifficulty") {
      result = result.filter((song) => song.difficulty === "쉬움");
    } else if (activeMenu === "favorites") {
      // 자주 부르는 노래 기능 (예시로 첫 4개 항목)
      result = result.slice(0, 4);
    }

    setFilteredSongs(result);
  };

  // 장르 선택 핸들러
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setActiveMenu("byGenre");
  };

  // 가수 선택 핸들러
  const handleArtistSelect = (artist) => {
    setSelectedArtist(artist);
    setActiveMenu("byArtist");
  };

  // 새 노래 추가 핸들러
  const handleAddSong = (newSong) => {
    const newId =
      allSongs.length > 0 ? Math.max(...allSongs.map((s) => s.id)) + 1 : 1;
    const songToAdd = { ...newSong, id: newId };
    setAllSongs([...allSongs, songToAdd]);
    setShowAddModal(false);
  };

  // 노래 삭제 핸들러
  const handleDeleteSong = (id) => {
    setAllSongs(allSongs.filter((song) => song.id !== id));
  };

  // 노래 수정 핸들러
  const handleUpdateSong = (updatedSong) => {
    setAllSongs(
      allSongs.map((song) => (song.id === updatedSong.id ? updatedSong : song))
    );
    setEditingSong(null);
  };

  // 현재 선택된 필터 정보 (제목)
  const getActiveMenuTitle = () => {
    switch (activeMenu) {
      case "allSongs":
        return searchQuery ? `검색 결과: "${searchQuery}"` : "전체 노래";
      case "byGenre":
        return `장르별 노래: ${selectedGenre}`;
      case "byArtist":
        return `가수별 노래: ${selectedArtist}`;
      case "byDifficulty":
        return "난이도별 노래: 쉬움";
      case "favorites":
        return "자주 부르는 노래";
      default:
        return "노래 목록";
    }
  };

  return (
    <div className="app-container">
      {/* 헤더를 최상단에 배치 */}
      <Header
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onSearch={handleSearch}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <div className="main-layout">
        {/* 사이드바를 헤더 아래, 콘텐츠 영역 왼쪽에 배치 */}
        <Sidebar
          isAdmin={isAdmin}
          activeMenu={activeMenu}
          selectedGenre={selectedGenre}
          selectedArtist={selectedArtist}
          onMenuChange={setActiveMenu}
          onAddSong={() => setShowAddModal(true)}
          onManageSongs={() => setShowManageModal(true)}
          onGenreSelect={handleGenreSelect}
          onArtistSelect={handleArtistSelect}
        />

        <main className="content">
          <div className="content-header">
            <h1 className="section-title">{getActiveMenuTitle()}</h1>
            {isAdmin && (
              <button
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                + 노래 추가
              </button>
            )}
          </div>

          <SongList
            songs={filteredSongs}
            isAdmin={isAdmin}
            onDeleteSong={handleDeleteSong}
            onEditSong={setEditingSong}
          />
        </main>
      </div>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      {/* 노래 추가 모달 */}
      {showAddModal && (
        <AddSongModal
          onClose={() => setShowAddModal(false)}
          onAddSong={handleAddSong}
        />
      )}

      {/* 노래 관리 모달 */}
      {showManageModal && (
        <ManageSongsModal
          songs={allSongs}
          onClose={() => setShowManageModal(false)}
          onDeleteSong={handleDeleteSong}
          onUpdateSong={handleUpdateSong}
        />
      )}

      {/* 노래 편집 모달 (메인 화면에서 직접 편집 시) */}
      {editingSong && (
        <EditSongModal
          song={editingSong}
          onClose={() => setEditingSong(null)}
          onUpdateSong={handleUpdateSong}
        />
      )}
    </div>
  );
};

export default App;
