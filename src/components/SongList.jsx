import React, { useState, useEffect, useRef } from "react";
import SongCard from "./SongCard";
import "../styles/SongList.css";

const SongList = ({
  songs,
  isAdmin,
  onDeleteSong,
  onEditSong,
  onSongClick,
}) => {
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(30);
  const contentRef = useRef(null);

  // 현재 페이지 노래 계산
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(songs.length / songsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    // 스크롤을 먼저 처리한 후 페이지 변경
    if (contentRef.current) {
      // 기본 스크롤 메서드 사용
      contentRef.current.scrollIntoView({ block: "start" });

      // 또는 모든 방법을 시도
      window.scrollTo(0, 0);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    // 그 다음 페이지 변경
    setCurrentPage(pageNumber);
  };

  // 페이지 그룹 계산 (한 번에 5개의 페이지 버튼만 표시)
  const pageGroupSize = 5;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const pageStart = currentGroup * pageGroupSize + 1;
  const pageEnd = Math.min(pageStart + pageGroupSize - 1, totalPages);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = pageStart; i <= pageEnd; i++) {
    pageNumbers.push(i);
  }

  // 페이지 변경 시 강제로 맨 위로 스크롤
  useEffect(() => {
    // DOM이 업데이트된 후 실행
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ block: "start" });
      }
      window.scrollTo(0, 0);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, 0);
  }, [currentPage]);

  // 노래가 없을 경우
  if (songs.length === 0) {
    return (
      <div className="empty-state" ref={contentRef}>
        <div className="empty-icon">♪</div>
        <p className="empty-text">노래가 없습니다.</p>
        {isAdmin && (
          <p className="empty-subtext">
            노래 추가 버튼을 눌러 노래를 추가해보세요!
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="song-list-container" ref={contentRef}>
      <div className="song-grid">
        {currentSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            isAdmin={isAdmin}
            onEdit={onEditSong}
            onDelete={onDeleteSong}
            onClick={() => onSongClick(song)}
          />
        ))}
      </div>

      {/* 페이지네이션 컨트롤 */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            처음
          </button>

          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            이전
          </button>

          <div className="pagination-numbers">
            {pageNumbers.map((number) => (
              <button
                key={number}
                className={`pagination-number ${
                  number === currentPage ? "active" : ""
                }`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            다음
          </button>

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            마지막
          </button>
        </div>
      )}

      {/* 페이지 정보 */}
      <div className="page-info">
        {totalPages > 0 && (
          <span>
            총 {songs.length}곡 중 {indexOfFirstSong + 1}-
            {Math.min(indexOfLastSong, songs.length)}곡 표시 (페이지{" "}
            {currentPage}/{totalPages})
          </span>
        )}
      </div>
    </div>
  );
};

export default SongList;
