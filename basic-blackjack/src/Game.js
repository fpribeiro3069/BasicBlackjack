import Card from "./Card";

//const decisions = ['Hit', 'Stand', 'Double', 'Split'];

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
    let hand;

    do {
        hand = [];
        let suit = Math.floor(Math.random() * Card.suits.length);
        let ace = new Card('Ace', Card.suits[suit]);

        suit = Math.floor(Math.random() * Card.suits.length);
        let rank = Math.floor(Math.random() * Card.ranks.length);
        let secondCard = new Card(Card.ranks[rank], Card.suits[suit]);

        while (secondCard.equals(ace) || secondCard.rank === 'Ace') {
            suit = Math.floor(Math.random() * Card.suits.length);
            rank = Math.floor(Math.random() * Card.ranks.length);
            secondCard = new Card(Card.ranks[rank], Card.suits[suit]);
        }

        hand.push(ace);
        hand.push(secondCard);
    } while (checkPlayerBlackjack(hand))

    return hand;
}

export function generateRandomSplitHand() {
    let hand;

    do {
        hand = [];
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

    } while (checkPlayerBlackjack(hand))

    return hand;
}

export function checkPlayerBlackjack(playerCards) {
    return (playerCards[0].value() + playerCards[1].value()) === 21;
}

export function isSplitAllowed(playerCards) {
    return playerCards[0].rank === playerCards[1].rank;
}

export function checkDecision(playerCards, dealerCard, decision) {

    // First check split decision
    if (playerCards[0].rank === playerCards[1].rank) {
        const splitDecision = checkSplitDecision(playerCards[0].rank, dealerCard);
        if (splitDecision && decision === 'Split') {
            // player made the right choice
            return [true, 'Split'];
        } else if (splitDecision && decision !== 'Split') {
            return [false, 'Split'];
        }
    }
    // Second, check if soft hand decision
    if (playerCards[0].rank === 'Ace' || playerCards[1].rank === 'Ace') {
        const rightDecision = checkSoftDecision(playerCards, dealerCard);
        if (rightDecision === decision) {
            return [true, rightDecision];
        } else {
            return [false, rightDecision];
        }
    } 
    // Finally, hard hands
    let playerScore = 0;
    for (let i=0; i < 2; i++) {
        playerScore += playerCards[i].value();
    }

    const hardDecision = checkHardDecision(playerScore, dealerCard);
    if (hardDecision === decision) {
        return [true, hardDecision];
    } else {
        return [false, hardDecision];
    }

    
}

function checkSplitDecision(playerRank, dealerCard) {
    switch(playerRank) {
        case 'Ace':
        case '8':
            return true;
        
        case 'King':
        case 'Queen':
        case 'Jack':
        case '10':
        case '5':
            return false;

        case '9': 
            if (dealerCard.value() === 7 || dealerCard.value() >= 10) {
                return false;
            } else {
                return true;
            }
        
        case '7': 
        case '3':
        case '2':
            return dealerCard.value() >= 8 ? false : true;

        case '6':
            return dealerCard.value() >= 7 ? false : true;
        
        case '4':
            return dealerCard.value() === 5 || dealerCard.value() === 6 ? true : false;

    }
}

function checkSoftDecision(playerHand, dealerCard) {
    let rank = playerHand[0].rank === 'Ace' ? playerHand[1].rank : playerHand[0].rank;

    switch(rank) {
        case 'King':
        case 'Queen':
        case 'Jack':
        case '10':
            return 'Blackjack';

        case '9':
            return 'Stand';

        case '8':
            return dealerCard.value() === 6 ? 'Double' : 'Stand';
        
        case '7':
            if (dealerCard.value() <= 6) {
                return 'Double';
            } else if (dealerCard.value() === 7 || dealerCard.value() === 8) {
                return 'Stand';
            } else {
                return 'Hit';
            }
        
        case '6':
            return dealerCard.value() >= 3 && dealerCard.value() <= 6 ? 'Double' : 'Hit';

        case '5':
        case '4':
            return dealerCard.value() >= 4 && dealerCard.value() <= 6 ? 'Double' : 'Hit';
        
        case '3':
        case '2':
            return dealerCard.value() >= 5 && dealerCard.value() <= 6 ? 'Double' : 'Hit';
    }
}

function checkHardDecision(playerScore, dealerCard) {
    switch (playerScore) {
        case 20:
        case 19:
        case 18:
        case 17:
            return 'Stand';

        case 16:
        case 15:
        case 14:
        case 13:
            return dealerCard.value() <= 6 ? 'Stand' : 'Hit';
        
        case 12: 
            return dealerCard.value() >= 4 && dealerCard.value() <= 6 ? 'Stand' : 'Hit';
        
        case 11:
            return 'Double';

        case 10:
            return dealerCard.value() <= 9 ? 'Double' : 'Hit';

        case 9:
            return dealerCard.value() >= 3 && dealerCard.value() <= 6 ? 'Double' : 'Hit';
        
        case 8: 
        case 7: 
        case 6: 
        case 5: 
        case 4:
            return 'Hit'; 

    }
}