import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    // new Date(evtA.date) < new Date(evtB.date) ? -1 : 1 event le plus récent au plus vieux

);
  const nextCard = () => {
    setTimeout(
      // () => setIndex(index < byDateDesc.length ? index + 1 : 0),
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });


  return (
    <div className="SlideCardList">   
      {/* Suppresion des <></> qui encapsulait 2 éléments différents */}   
      {byDateDesc?.map((event, idx) => (
        // Changement de la key pour qu'elle soit unique pour chaque slide
        // modification du alt pour avoir une description de l image personnalisé pour chaque image //

        <div key={event.date}>
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Changement de la key pour qu'elle match à la slide en cours
                  key={_.title}
                  type="radio"
                  name="radio-button"
                  /*
                    Remplacement de idx par index pour indiquer sur quelle image on se trouve 
                  */
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
