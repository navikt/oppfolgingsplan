import React from 'react';
import getContextRoot from '../../../../utils/getContextRoot';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';
import BildeTekstLinje from '../../../app/BildeTekstLinje';

const textOppfolgingsplanDuration = (dateFrom, dateTo) => {
  return `Planens varighet: ${dateFrom} – ${dateTo}`;
};

const GodkjentPlanAvbruttTidspunkt = ({ oppfolgingsplan }) => {
  return (
    <div className="blokk godkjentPlanAvbruttTidspunkt">
      <BildeTekstLinje
        imgUrl={`${getContextRoot()}/img/svg/calendar.svg`}
        imgAlt=""
        tekst={textOppfolgingsplanDuration(
          toDateMedMaanedNavn(
            oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.fom
          ),
          toDateMedMaanedNavn(
            oppfolgingsplan.godkjentPlan.avbruttPlan.tidspunkt
          )
        )}
      />
    </div>
  );
};

GodkjentPlanAvbruttTidspunkt.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
};

export default GodkjentPlanAvbruttTidspunkt;
