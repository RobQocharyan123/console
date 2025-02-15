import "./Free.css";

const arr = [
  { id: "1", title: "Block Boost", text: "Farming Booster: x50 for 2 hour." },
  { id: "2", title: "Block Boost", text: "Farming Booster: x50 for 2 hour." },
  { id: "3", title: "Block Boost", text: "Farming Booster: x50 for 2 hour." },
  { id: "4", title: "Block Boost", text: "Farming Booster: x50 for 2 hour." },
  { id: "5", title: "Block Boost", text: "Farming Booster: x50 for 2 hour." },
  { id: "6", title: "Block Boost", text: "Farming Booster: x50 for 2 hour." },
];

const Free = () => {
  return (
    <div className="free">
      {arr.map((i, index) => {
        return (
          <div key={index} className="freeItem">
            <div>
              <h2>{i.title}</h2>
              <p>{i.text}</p>
            </div>

            <button>Claim</button>
          </div>
        );
      })}
    </div>
  );
};
export default Free;
