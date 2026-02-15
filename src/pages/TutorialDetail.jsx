import { useParams } from "react-router-dom";
import "../styles/detail.css";

function TutorialDetail() {
  const { id } = useParams();

  return (
    <div className="detail-container">
      <h2>Cara Panen Tomat</h2>

      <img
        src="https://source.unsplash.com/800x400/?tomato"
        alt="detail"
      />

      <div className="description-box">
        <h4>Deskripsi</h4>
        <p>
          Tutorial cara panen tomat yang benar agar hasil maksimal dan tidak
          merusak tanaman.
        </p>
      </div>
    </div>
  );
}

export default TutorialDetail;
