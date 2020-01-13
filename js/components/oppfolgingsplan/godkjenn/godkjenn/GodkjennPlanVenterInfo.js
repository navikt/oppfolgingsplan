import React from 'react';

const texts = {
    infolist: {
        ingress: 'Arbeidsgiveren din kan enten godkjenne eller gjøre endringer i oppfølgingsplanen:',
        noChangesApproval: 'Godkjenner arbeidsgiveren, har dere opprettet en gjeldende plan.',
        changesWithAproval: 'Gjør arbeisgiveren endringer og sender den tilbake til deg for godkjenning, vil du motta et varsel om å ta stilling dette.',
        changesNoApproval: `
            Mottar du ikke varsel knyttet til planen er det mulig at arbeidsgiveren din ikke har tatt stilling til den.
            For å se om det er skjedd noe kan du gå inn på denne oppfølgingsplanen igjen.
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
