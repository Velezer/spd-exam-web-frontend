import { useNavigate } from "react-router-dom";
import { formatRelativeTime } from "../utils/dateFormatter";
import "../styles/list.css";

function TutorialCard({ id, title, image, createdAt }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/tutorial/${id}`)}>
      <img src={image} alt={title} />
      <div className="card-info">
        <h4>{title}</h4>
        <p>{formatRelativeTime(createdAt)}</p>
      </div>
    </div>
  );
}

export default TutorialCard;
