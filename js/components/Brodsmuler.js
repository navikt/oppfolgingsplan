import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import getContextRoot from '../utils/getContextRoot';
import { brodsmule as brodsmuleProptype } from '../propTypes';
import { getSykefravaerUrl } from '@/utils/urlUtils';
import { PersonImage } from '@/images/imageComponents';

const Brodsmule = ({ sti, tittel, sisteSmule, erKlikkbar }) => {
  const nySti = sti && sti.indexOf('/sykefravaer') > -1 ? getSykefravaerUrl() : sti;
  const root = sti && sti.indexOf('/sykefravaer') > -1 ? '' : getContextRoot();
  const link =
    root === '' ? (
      <a className="js-smule js-smule-a brodsmuler__smule" href={nySti}>
        {tittel}
      </a>
    ) : (
      <Link className="js-smule brodsmuler__smule" to={root + nySti}>
        {tittel}
      </Link>
    );
  if (sisteSmule) {
    return (
      <span className="js-smuletekst">
        <span className="vekk">Du er her:</span> <span className="brodsmule">{tittel}</span>
      </span>
    );
  } else if (erKlikkbar) {
    return (
      <span className="js-smuletekst">
        {link}
        <span className="brodsmule__skille"> / </span>
      </span>
    );
  }
  return (
    <span>
      <span className="brodsmuler__smule">{tittel}</span>
      <span className="brodsmule__skille"> / </span>
    </span>
  );
};

Brodsmule.propTypes = {
  sti: PropTypes.string,
  tittel: PropTypes.string,
  sisteSmule: PropTypes.bool,
  erKlikkbar: PropTypes.bool,
};

const ToggleLink = ({ onClick }) => {
  return (
    <span>
      <a
        role="button"
        aria-label="Vis hele brødsmulestien"
        className="js-toggle brodsmuler__smule"
        href="#"
        onClick={onClick}
      >
        ...
      </a>
      <span className="brodsmule__skille"> / </span>
    </span>
  );
};

ToggleLink.propTypes = {
  onClick: PropTypes.func,
};

class Brodsmuler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visCollapsed: true,
    };
  }

  getSynligeBrodsmuler() {
    const { brodsmuler } = this.props;
    if (this.visCollapsed()) {
      return [brodsmuler[brodsmuler.length - 2], brodsmuler[brodsmuler.length - 1]];
    }
    return brodsmuler;
  }

  visCollapsed() {
    return this.props.brodsmuler.length > 3 && this.state.visCollapsed;
  }

  visAlleBrodsmuler() {
    this.setState({
      visCollapsed: false,
    });
  }

  render() {
    const { brodsmuler } = this.props;
    const synligeBrodsmuler = this.getSynligeBrodsmuler();
    return (
      <nav className="brodsmuler" aria-label="Du er her: ">
        <img src={PersonImage} alt="" className="brodsmuler__ikon" />
        <div className="brodsmuler__smuler">
          <a href={process.env.DITTNAV_URL} className="js-smule brodsmuler__smule">
            Min side
          </a>
          {brodsmuler.length > 0 && <span className="brodsmule__skille"> / </span>}
          {this.visCollapsed() && (
            <ToggleLink
              onClick={(e) => {
                e.preventDefault();
                this.visAlleBrodsmuler();
              }}
            />
          )}
          {synligeBrodsmuler
            .map((smule, index) => {
              return {
                ...smule,
                sisteSmule: synligeBrodsmuler.length === index + 1,
              };
            })
            .map((smule, index) => {
              return <Brodsmule key={index} {...smule} />;
            })}
        </div>
      </nav>
    );
  }
}

Brodsmuler.propTypes = {
  brodsmuler: PropTypes.arrayOf(brodsmuleProptype),
};

export default Brodsmuler;
