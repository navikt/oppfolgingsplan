import React from 'react';
import { oppfolgingsplanPt } from '@/propTypes/opproptypes';
import { toDateMedMaanedNavn } from '@/utils/datoUtils';
import BildeTekstLinje from '../../../app/BildeTekstLinje';
import { CalendarImage } from '@/images/imageComponents';

const textOppfolgingsplanDuration = (dateFrom, dateTo) => {
  return `Planens varighet: ${dateFrom} – ${dateTo}`;
};

const GodkjentPlanAvbruttTidspunkt = ({ oppfolgingsplan }) => {
  return (
    <div className="blokk godkjentPlanAvbruttTidspunkt">
      <BildeTekstLinje
        imgUrl={CalendarImage}
        imgAlt=""
        tekst={textOppfolgingsplanDuration(
          toDateMedMaanedNavn(oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.fom),
          toDateMedMaanedNavn(oppfolgingsplan.godkjentPlan.avbruttPlan.tidspunkt)
        )}
      />
    </div>
  );
};

GodkjentPlanAvbruttTidspunkt.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
};

export default GodkjentPlanAvbruttTidspunkt;
