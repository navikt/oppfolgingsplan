import React from "react";
import { Flatknapp } from "nav-frontend-knapper";

const tekster = {
  knapp: "Lagre og avslutt",
};

const lagreOgAvslutt = () => {
  history.push(`${getContextRoot()}/oppfolgingsplaner`);
};

const handleKeyPress = (lagreOgAvslutt, e) => {
  e.preventDefault();
  if (e.nativeEvent.keyCode === 13) {
    lagreOgAvslutt();
  }
};

const LagreOgAvslutt = () => {
  return (
    <nav className="lagreOgAvslutt">
      <Flatknapp
        onKeyPress={(e) => { handleKeyPress(lagreOgAvslutt, e); }}
        onMouseDown={() => { lagreOgAvslutt(); }}>
        {tekster.knapp}
      </Flatknapp>
    </nav>
  );
};

export default LagreOgAvslutt;
