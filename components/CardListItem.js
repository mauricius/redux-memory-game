import React from 'react';
import classNames from 'classnames';

export default ({
    card,
    flipCard
}) => {

    let cardClass = classNames({
        'flipper' : true,
        'flipped' : card.flipped || card.discovered
    });

    return (
        <li className="flip-container">
            <div className={cardClass}>
                <div className="front" onClick={() => flipCard(card.id)}></div>
        		<div className="back">
                    <img src={card.url} />
        		</div>
        	</div>
        </li>
    );
}
