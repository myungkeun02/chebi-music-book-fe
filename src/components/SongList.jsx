import React from "react";
import SongCard from "./SongCard";
import "../styles/SongList.css";

const SongList = ({ songs, isAdmin, onDeleteSong, onEditSong, onSongClick }) => {
  // 노래가 없을 경우
  if (songs.length === 0) {
    return (
      <div className="empty-state">
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
    <div className="song-grid">
      {songs.map((song) => (
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
  );
};

export default SongList;