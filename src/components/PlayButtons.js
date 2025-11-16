import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCircleStop } from "react-icons/fa6";
import { IoMusicalNotes } from "react-icons/io5";
import { TbMusicOff } from "react-icons/tb";

function PlayButtons({ onPlay, onStop, isPlaying }){
  return (
      <div className="card bg-dark text-light border-0 rounded-4 px-5 py-4 mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <FaRegCircleStop className="control-icon" onClick={onStop}/>
          <FaRegCirclePlay className="control-icon" onClick={onPlay}/>
           {isPlaying ? (
        <span className="status-pill live-label"><IoMusicalNotes /> LIVE</span>
      ) : (
        <span className="status-pill off-label"><TbMusicOff /> OFF</span>
      )}

        </div>
      </div>
  )
}
export default PlayButtons;
