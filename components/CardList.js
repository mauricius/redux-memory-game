import React from 'react';

import CardListItem from './CardListItem';

export default ({
    cards,
    flipCard
}) => (
    <ul className="cards">
        {
            cards.map(card =>
                <CardListItem
                    key={card.id}
                    card={card}
                    flipCard={flipCard}
                />
            )
        }
    </ul>
)
