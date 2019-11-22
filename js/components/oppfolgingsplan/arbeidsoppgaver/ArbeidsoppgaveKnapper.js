import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Hovedknapp,
    Knapp,
} from 'nav-frontend-knapper';
import {
    arbeidsoppgavePt,
    arbeidsoppgaverReducerPt,
} from '../../../propTypes/opproptypes';

const texts = {
    buttonAbort: 'Avbryt',
    buttonCreate: 'Lagre og legg til ny',
    buttonUpdate: 'Lagre',
};

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
        const {
            arbeidsoppgave,
            avbryt,
        } = this.props;
        const submitButton = arbeidsoppgave
            ? (
                <Knapp
                    disabled={this.state.spinner}
                    spinner={this.state.spinner}
                    htmlType="submit">
                    {texts.buttonUpdate}
                </Knapp>
            ) : (
                <Hovedknapp
                    disabled={this.state.spinner}
                    spinner={this.state.spinner}
                    htmlType="submit">
                    {texts.buttonCreate}
                </Hovedknapp>
            );
        return (
            <div className="knapperad knapperad--justervenstre">
                <div className="knapperad__element">
                    {submitButton}
                </div>
                <div className="knapperad__element">
                    <Knapp
                        htmlType="button"
                        onKeyPress={(e) => {
                            handleKeyPress(avbryt, e);
                        }}
                        onMouseDown={avbryt}>
                        {texts.buttonAbort}
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
