const baseURL = "http://deckofcardsapi.com/api/deck";

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

async function newDeck() {
    let shuffledDeck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)

    deckId = shuffledDeck.data.deck_id

    let drawCard = await axios.get(`${baseURL}/${deckId}/draw/`)

    let card = drawCard.data.cards[0]
    console.log(`${card.value} of ${card.suit}`)
}
newDeck()


// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.

async function twoCards() {
    let shuffledDeck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)

    deckId = shuffledDeck.data.deck_id
    
    let card1 = await axios.get(`${baseURL}/${deckId}/draw/`)
    card1 = card1.data.cards[0]

    let card2 = await axios.get(`${baseURL}/${deckId}/draw/`)
    card2 = card2.data.cards[0]
    
    let cards = [card1, card2]

    cards.forEach(function (card) {
        console.log(`${card.value} of ${card.suit}`);
    });
}
twoCards()


// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

async function deckSetup() {
    let deckId
    let $btn = $('#get-card')
    let $cardBlock = $('#card-block')
    let $cardsLeft = $('#cards-left')

    let newDeck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
    deckId = newDeck.data.deck_id

    $btn.on('click', async function () {
        let cardData = await axios.get(`${baseURL}/${deckId}/draw/`);
        let imgSource = cardData.data.cards[0].image;
        let moveX = Math.random() * 50 - 20;
        let moveY = Math.random() * 50 - 20;

        $cardBlock.append(
            $(`<img>`, {
                src: imgSource,
                css: {
                    transform: `translate(${moveX}px, ${moveY}px)`
                }
            })
        );
        cardsRemaining = cardData.data.remaining
        $cardsLeft.text(cardsRemaining)

        if (cardsRemaining === 0) {
            $btn.text("Start Over?")
                .on('click', async function () {
                    location.reload()
                });
        }
    })
}

deckSetup()