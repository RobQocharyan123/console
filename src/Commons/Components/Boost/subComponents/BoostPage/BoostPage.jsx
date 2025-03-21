import './BoostPage.css';
import boostRocketIcon from '../../../../../Assets/Home/boost-roket-icon.svg';
import boostSuccessIcon from '../../../../../Assets/Home/boost-success-icon.svg';
import boostCristalIcon from '../../../../../Assets/Home/cristal-icon.svg';
import BotModal from './../Bot/BotModal';
import { useState } from 'react';

const arr = [
  {
    id: '1',
    img: null,
    title: 'Block Boost',
    description: 'Farming Booster:',
    descriptionSmall: 'x2 for  3 days.',
    imgText: 'X2',
    boostPrice: '1',
  },
];

const BoostPage = ({ data }) => {
  const [selectedBoost, setSelectedBoost] = useState(null);

  return (
    <div className="boostPage">
      <div className="boostPageSuccess">
        <img src={boostSuccessIcon} alt="boostSuccessIcon" />
        <div className="boostTexts">
          <p>Boost your CP farming with a powerful booster!</p>
          <p>
            You can use only one booster at a time. While one is active, others
            will be disabled.
          </p>
        </div>
      </div>

      <div className="boostPageContent">
        {arr.map((item) => (
          <div className="boostItem" key={item.id}>
            {item.img && (
              <img src={item.img} alt={item.img} className="rocket" />
            )}

            <div className="boostDoubling">{item.imgText}</div>
            <div className="boostItemText">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>{item.descriptionSmall}</p>
            </div>

            <div className="boostPrice">
              <div>
                <img src={boostCristalIcon} alt="boostCristalIcon" />
                <p>{item.boostPrice}</p>
              </div>
              <button onClick={() => setSelectedBoost(item)}>Buy</button>
            </div>
          </div>
        ))}
      </div>

      {selectedBoost && (
        <BotModal
          setShowModal={() => setSelectedBoost(null)}
          title={selectedBoost.title}
          description={
            selectedBoost.description + ' ' + selectedBoost.descriptionSmall
          }
          price={selectedBoost.boostPrice}
        />
      )}
    </div>
  );
};

export default BoostPage;
