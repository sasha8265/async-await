const baseURL = "http://deckofcardsapi.com/api/deck";

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

async function newDeck() {
    let shuffledDeck = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')

    deckId = shuffledDeck.data.deck_id

    let drawCard = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/`)

    let card = drawCard.data.cards[0]
    console.log(`${card.value} of ${card.suit}`)
}

newDeck()


// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.

async function twoCards() {
    let shuffledDeck = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')

    deckId = shuffledDeck.data.deck_id
    
    let card1 = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/`)
    card1 = card1.data.cards[0]

    let card2 = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/`)
    card2 = card2.data.cards[0]
    
    let cards = [card1, card2]

    cards.forEach(function (card) {
        console.log(`${card.value} of ${card.suit}`);
    });
}

twoCards()