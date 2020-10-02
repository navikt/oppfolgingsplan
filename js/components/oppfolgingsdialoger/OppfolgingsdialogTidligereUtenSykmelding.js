import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { oppfolgingsplanPt } from '../../propTypes/opproptypes';
import { finnOppfolgingsdialogMotpartNavn } from '../../utils/oppfolgingsdialogUtils';
import { hentStatusUtenAktivSykmelding } from '../../utils/teaserUtils';
import getContextRoot from '../../utils/getContextRoot';

const OppfolgingsdialogTidligereUtenSykmelding = ({ oppfolgingsdialog }) => {
    const planStatus = hentStatusUtenAktivSykmelding(oppfolgingsdialog);
    return (
        <LenkepanelBase
            href={`${getContextRoot()}/oppfolgingsplaner/${oppfolgingsdialog.id}`}
            border>
            <div className="inngangspanel">
                <span className="oppfolgingsplanInnhold__ikon">
                    <img alt="status" src={`${getContextRoot()}/img/svg/${planStatus.img}`} />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsdialog.id}`}>
                            <span className="inngangspanel__tittel">
                                {finnOppfolgingsdialogMotpartNavn(oppfolgingsdialog)}
                            </span>
                        </h3>
                    </header>
                    <p className="mute inngangspanel__avsnitt" dangerouslySetInnerHTML={{ __html: planStatus.tekst }} />
                </div>
            </div>
        </LenkepanelBase>);
};

OppfolgingsdialogTidligereUtenSykmelding.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
};

export default OppfolgingsdialogTidligereUtenSykmelding;
