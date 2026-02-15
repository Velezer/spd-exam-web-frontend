import TutorialCard from "../components/TutorialCard";
import "../styles/list.css";

function TutorialList() {
  const tutorials = [
    {
      id: 1,
      title: "Cara Panen Tomat",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
    },
    {
      id: 2,
      title: "Cara Tanam Tomat",
      image: "https://source.unsplash.com/400x300/?tomato,plant",
    },
  ];

  return (
    <div className="list-container">
      <h2>Tutorial</h2>

      <div className="card-list">
        {tutorials.map((item) => (
          <TutorialCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default TutorialList;
