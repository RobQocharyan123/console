import "./New.css";

import image from "../../../../Assets/Tasks/task-youtube.svg";

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

const New = () => {
  return (
    <div className="new">
      <div className="newContent">
        {arr.map((item) => (
          <div className="newItem" key={item.id}>
            <img src={item.img} alt="img" />
            <div className="newText">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>

            <button>Start</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default New;
