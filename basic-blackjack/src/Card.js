class Card {
    static suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
    static ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

    constructor(rank, suit) {
        if (!Card.suits.includes(suit) || !Card.ranks.includes(rank)) {
            throw "Invalid parameters for card creation!";
        }
        
        this.rank = rank;
        this.suit = suit;
    }

    value() {
        let value = parseInt(this.rank);
        if (isNaN(value)) {
            if (this.rank === 'Ace') {
                value = 11;
            } else {
                value = 10;
            }
        }
        return value;
    }

    equals(card) {
        return this.rank === card.rank && this.suit === card.suit;
    }

    toString() {
        return this.rank + ' of ' + this.suit;
    }
}

export default Card;