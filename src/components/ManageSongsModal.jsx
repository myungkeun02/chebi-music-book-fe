import React, { useState } from "react";
import "../styles/Modal.css";
import EditSongModal from "./EditSongModal";

const ManageSongsModal = ({ songs, onClose, onDeleteSong, onUpdateSong }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 5;
  const [editingSong, setEditingSong] = useState(null);

  // 검색 필터링
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 페이지네이션
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색할 때 첫 페이지로 이동
  };

  // 노래 삭제 핸들러
  const handleDelete = (id) => {
    if (window.confirm("정말로 이 노래를 삭제하시겠습니까?")) {
      onDeleteSong(id);
    }
  };

  // 노래 편집 핸들러
  const handleEdit = (song) => {
    setEditingSong(song);
  };

  // 노래 업데이트 핸들러
  const handleUpdateSong = (updatedSong) => {
    onUpdateSong(updatedSong);
    setEditingSong(null);
  };

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-header">
            <h2>노래 관리</h2>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="modal-content">
            {/* 검색 영역 */}
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="노래 제목, 가수, 장르로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* 노래 목록 테이블 */}
            <div className="table-container">
              <table className="songs-table">
                <thead>
                  <tr>
                    <th>노래 제목</th>
                    <th>가수</th>
                    <th>장르</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSongs.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="empty-message">
                        일치하는 노래가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    currentSongs.map((song, index) => (
                      <tr
                        key={song.id}
                        className={index % 2 === 0 ? "even" : "odd"}
                      >
                        <td>{song.title}</td>
                        <td>{song.artist}</td>
                        <td>
                          <span className="badge genre-badge">
                            {song.genre}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="action-btn edit-btn"
                              onClick={() => handleEdit(song)}
                              aria-label="노래 편집"
                            >
                              ✎
                            </button>
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDelete(song.id)}
                              aria-label="노래 삭제"
                            >
                              ×
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ◀
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ▶
                </button>
              </div>
            )}

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 노래 편집 모달 */}
      {editingSong && (
        <EditSongModal
          song={editingSong}
          onClose={() => setEditingSong(null)}
          onUpdateSong={handleUpdateSong}
        />
      )}
    </>
  );
};

export default ManageSongsModal;
