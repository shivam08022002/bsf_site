import React from 'react';
import PropTypes from 'prop-types';
import './css/LedgerDetails.css';

const LedgerDetails = ({ text, coins, textColor, blockMargin }) => {
    const titleStyle = {
        // background: bgColor || '#3a61a2',
        // color: color || 'white',
        // fontSize: fontSize || '14px',
        // width: width || '100%',
        // height: height || 'auto',
        // marginLeft: marginLeft || '0px',
        // marginRight: marginRight || '0px',
        // marginBottom: marginBottom || '0px',
        // paddingLeft: paddingLeft || '20px',
        // lineHeight: '20px',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: textAlign === 'left' ? 'flex-start' :
        //     textAlign === 'right' ? 'flex-end' : 'center',
    };

    textColor = coins >= 0 ? 'green' : 'red';
    const valueText = coins >= 0 ? 'You Won ' + coins + '/- Coins' : 'You Lost ' + coins + '/- Coins';
    const valueStyle = {
        color: textColor,
        // fontSize: fontSize || '14px',
        // width: width || '100%',
        // height: height || 'auto',
        // marginLeft: marginLeft || '0px',
        // marginRight: marginRight || '0px',
        // marginBottom: marginBottom || '0px',
        // paddingLeft: paddingLeft || '20px',
        // display: 'flex',
        // alignItems: 'center',
        // fontWeight: '300',
        // justifyContent: textAlign === 'left' ? 'flex-start':
        //     textAlign === 'right' ? 'flex-end' : 'center',
    };

    return (
        <div className={blockMargin ? 'ledger-details-block-bottom-margin' : 'ledger-details-block'}>
            <div className="ledger-details-title" style={titleStyle}>
                {text}
            </div>
            <div className="ledger-details-value" style={valueStyle}>
                {valueText}
            </div>
        </div>
    );
};

LedgerDetails.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    textAlign: PropTypes.oneOf(['left', 'center', 'right']),
    width: PropTypes.string,
    height: PropTypes.string,
    marginLeft: PropTypes.string,
    marginRight: PropTypes.string,
    paddingLeft: PropTypes.string,
};

export default LedgerDetails;