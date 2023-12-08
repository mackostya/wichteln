import React from 'react';
import HarryImage from '../images/harry.jpeg';
import HermioneImage from '../images/hermione.jpeg';
import RonImage from '../images/ron.jpeg';
import NevilImage from '../images/nevil.jpeg';
import LunaImage from '../images/luna.jpeg';
import {GeneratedUserContext } from "../context/Context";

const images = {
  Harry: HarryImage,
  Hermione: HermioneImage,
  Ron: RonImage,
  Nevil: NevilImage,
  Luna: LunaImage,
};

const ResultPage = () => {
  const [generatedUser, ] = React.useContext(GeneratedUserContext);
  return (
    <div>
      <img src={images[generatedUser]} className="Result-logo" alt="logo" />
        <h2>
            Super, du hast {generatedUser} gewonnen!
        </h2>
        <h5>
          Durch sehr komplizierte Auswertungen, die sowohl künstliche Intelligenz als auch Quantenmechanik beinhalten, haben wir herausgefunden, dass {generatedUser} dein Wichtel ist!
        </h5>
    </div>
  );
};

export default ResultPage;
