import React from 'react';

const texts = {
    infolist: {
        ingress: 'Arbeidsgiveren din kan enten godkjenne eller gjøre endringer i oppfølgingsplanen:',
        noChangesApproval: 'Godkjenner arbeidsgiveren vil du motta et varsel om at har dere opprettet en gjeldende plan.',
        changesWithAproval: 'Gjør arbeisgiveren endringer og sender den tilbake til deg for godkjenning, vil du motta et varsel om å ta stilling dette.',
        changesNoApproval: `
            Mottar du ikke varsel knyttet til planen har ikke arbeidsgiveren din tatt stilling til den. 
            For å komme videre kan du ta kontakt med din arbeidsgiver eller logge inn på Ditt NAV og se om det er gjort endringer i oppfølgingsplanen. 
        `,
    },
};


const GodkjennPlanVenterInfo = () => {
    return (
        <React.Fragment>
            <p>{texts.infolist.ingress}</p>
            <ul>
                <li>{texts.infolist.noChangesApproval}</li>
                <li>{texts.infolist.changesWithAproval}</li>
                <li>{texts.infolist.changesNoApproval}</li>
            </ul>
        </React.Fragment>);
};

export default GodkjennPlanVenterInfo;
