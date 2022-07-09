import Card from "./Card";

export function generateRandomCard() {
    const suit = Math.floor(Math.random() * Card.suits.length);
    const rank = Math.floor(Math.random() * Card.ranks.length);

    return new Card(Card.ranks[rank], Card.suits[suit]);
}

export function generateRandomHand() {
    let hand = [];

    let suit = Math.floor(Math.random() * Card.suits.length);
    let rank = Math.floor(Math.random() * Card.ranks.length);
    const firstCard = new Card(Card.ranks[rank], Card.suits[suit]);
    
    suit = Math.floor(Math.random() * Card.suits.length);
    rank = Math.floor(Math.random() * Card.ranks.length);
    let secondCard = new Card(Card.ranks[rank], Card.suits[suit]);

    while (firstCard.equals(secondCard)) {
        suit = Math.floor(Math.random() * Card.suits.length);
        rank = Math.floor(Math.random() * Card.ranks.length);
        secondCard = new Card(Card.ranks[rank], Card.suits[suit]);
    }
    
    hand.push(firstCard);
    hand.push(secondCard);

    return hand;
}

export function generateRandomSoftHand() {
    let hand = [];

    let suit = Math.floor(Math.random() * Card.suits.length);
    let ace = new Card('Ace', Card.suits[suit]);

    suit = Math.floor(Math.random() * Card.suits.length);
    let rank = Math.floor(Math.random() * Card.ranks.length);
    let secondCard = new Card(Card.ranks[rank], Card.suits[suit]);

    while (secondCard.equals(ace)) {
        suit = Math.floor(Math.random() * Card.suits.length);
        rank = Math.floor(Math.random() * Card.ranks.length);
        secondCard = new Card(Card.ranks[rank], Card.suits[suit]);
    }

    hand.push(ace);
    hand.push(secondCard);

    return hand;
}

export function generateRandomSplitHand() {
    let hand = [];

    let rank = Math.floor(Math.random() * Card.ranks.length);
    let suit = Math.floor(Math.random() * Card.suits.length);
    let firstCard = new Card(Card.ranks[rank], Card.suits[suit]);

    let secondSuit = Math.floor(Math.random() * Card.suits.length);

    while(secondSuit === suit) {
        secondSuit = Math.floor(Math.random() * Card.suits.length);
    }

    let secondCard = new Card(Card.ranks[rank], Card.suits[secondSuit]);

    hand.push(firstCard);
    hand.push(secondCard);

    return hand;
}

