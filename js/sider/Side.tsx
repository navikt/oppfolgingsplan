import { Row } from 'nav-frontend-grid';
import React, { ReactElement } from 'react';
import DocumentTitle from 'react-document-title';
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import Brodsmuler from '@/components/Brodsmuler';

interface SideProps {
  tittel: string;
  brodsmuler: never;
  children: ReactElement;
}

const texts = {
    errorMsg: "Det er en teknisk feil med oppfølgingsplanen. Vi jobber med å løse problemet. Prøv igjen senere.",
}

const Side = ({ tittel, brodsmuler, children }: SideProps): ReactElement => {
  return (
    <DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
      <div className={'side__innhold side__innhold--begrenset'}>
        <Brodsmuler brodsmuler={brodsmuler} />
          <AlertStripeFeil className="margin-bottom" >
              {texts.errorMsg}
          </AlertStripeFeil>
        <Row>{children}</Row>
      </div>
    </DocumentTitle>
  );
};

export default Side;
