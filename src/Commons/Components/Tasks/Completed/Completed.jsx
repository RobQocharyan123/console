import "./Completed.css";
import image from "../../../../Assets/Tasks/task-youtube.svg";
import completedSuccess from "../../../../Assets/Tasks/completed-success.svg";

const arr = [
  {
    id: "1",
    img: image,
    title: "Boost Mining 5 Times",
    description: "+30.000 points"
  },
  {
    id: "2",
    img: image,
    title: "Boost Mining 5 Times",
    description: "+30.000 points"
  },
  {
    id: "3",
    img: image,
    title: "Boost Mining 5 Times",
    description: "+30.000 points"
  },
  {
    id: "4",
    img: image,
    title: "Boost Mining 5 Times",
    description: "+30.000 points"
  },
  {
    id: "5",
    img: image,
    title: "Boost Mining 5 Times",
    description: "+30.000 points"
  },
  {
    id: "6",
    img: image,
    title: "Boost Mining 5 Times",
    description: "+30.000 points"
  }
];

const Completed = () => {
  return (
    <div className="completed">
      <div className="completedContent">
        {arr.map((item) => (
          <div className="completedItem" key={item.id}>
            <img src={item.img} alt="img" />
            <div className="completedText">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>

            <button>
              <img src={completedSuccess} alt="completedSuccess" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Completed;
