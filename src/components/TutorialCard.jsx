import { useNavigate } from "react-router-dom";
import "../styles/list.css";

function TutorialCard({ id, title, image }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/tutorial/${id}`)}>
      <img src={image} alt={title} />
      <div className="card-info">
        <h4>{title}</h4>
        <p>1 jam yang lalu</p>
      </div>
    </div>
  );
}

export default TutorialCard;
