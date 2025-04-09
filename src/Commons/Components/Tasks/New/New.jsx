import "./New.css";

import image from "../../../../Assets/Tasks/task-youtube.svg";
import { Button } from "antd";
import { useState } from "react";
import { dotSpinner } from "ldrs";
dotSpinner.register();
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
  const [loading, setLoading] = useState(false);

  const handleCLick = (id) => {
    setLoading(id);
    setTimeout(() => {
      console.log(`Started task with ID: ${id}`);
      setLoading(null); // Turn off loading after task finishes
    }, 3000);
  };
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
            <Button
              size="small"
              loading={false}
              icon={
                loading === item.id ? (
                  <l-dot-spinner size="20" speed="0.9" color="black" />
                ) : null
              }
              onClick={() => handleCLick(item?.id)}
            >
              {loading === item.id ? "" : "start"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default New;
