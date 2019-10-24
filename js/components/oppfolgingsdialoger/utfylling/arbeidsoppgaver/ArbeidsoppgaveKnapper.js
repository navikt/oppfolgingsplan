import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { getLedetekst } from 'digisyfo-npm';
import { arbeidsoppgavePt, arbeidsoppgaverReducerPt } from '../../../../propTypes/opproptypes';

const handleKeyPress = (avbryt, e) => {
    e.preventDefault();
    if (e.nativeEvent.keyCode === 13) {
        avbryt();
    }
};

class ArbeidsoppgaveKnapper extends Component {
    constructor() {
        super();
        this.state = {
            spinner: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.arbeidsoppgaverReducer && nextProps.arbeidsoppgaverReducer.lagrer && !nextProps.arbeidsoppgaverReducer.arbeidsoppgaveId && !this.props.arbeidsoppgave) ||
            (this.props.arbeidsoppgave
                && nextProps.arbeidsoppgaverReducer.arbeidsoppgaveId > 0
                && nextProps.arbeidsoppgaverReducer.arbeidsoppgaveId === this.props.arbeidsoppgave.arbeidsoppgaveId)
        ) {
            this.setState({
                spinner: nextProps.arbeidsoppgaverReducer.lagrer,
            });
        } else {
            this.setState({
                spinner: false,
            });
        }
    }

    render() {
        const { arbeidsoppgave, avbryt } = this.props;
        if (arbeidsoppgave) {
            return (
                <div className="knapperad knapperad--justervenstre">
                    <div className="knapperad__element">
                        <Knapp
                            disabled={this.state.spinner}
                            spinner={this.state.spinner}
                            htmlType="submit">
                            {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.lagre-arbeidsoppgave')}
                        </Knapp>
                    </div>
                    <div className="knapperad__element">
                        <Knapp
                            htmlType="button"
                            onKeyPress={(e) => {
                                handleKeyPress(avbryt, e);
                            }}
                            onMouseDown={avbryt}>
                            {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
                        </Knapp>
                    </div>
                </div>
            );
        }
        return (
            <div className="knapperad knapperad--justervenstre">
                <div className="knapperad__element">
                    <Hovedknapp
                        disabled={this.state.spinner}
                        spinner={this.state.spinner}
                        htmlType="submit">
                        {getLedetekst('oppfolgingsdialog.arbeidstaker.knapp.ny-arbeidsoppgave')}
                    </Hovedknapp>
                </div>
                <div className="knapperad__element">
                    <Knapp
                        htmlType="button"
                        onKeyPress={(e) => {
                            handleKeyPress(avbryt, e);
                        }}
                        onMouseDown={avbryt}>
                        {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
                    </Knapp>
                </div>
            </div>
        );
    }
}
ArbeidsoppgaveKnapper.propTypes = {
    arbeidsoppgave: arbeidsoppgavePt,
    avbryt: PropTypes.func,
    arbeidsoppgaverReducer: arbeidsoppgaverReducerPt,
};

export default ArbeidsoppgaveKnapper;
