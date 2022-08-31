let myNumber = 12;
let fiveNumbers = [8, 60, 31, 15, 72]
const baseURL = "http://numbersapi.com/";

// 1. Make a request to the Numbers API(http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

async function getFact(num) {
    try {
        let url = `${baseURL}${num}?json`;
        let res = await axios.get(url);
        console.log(res.data.text);
        $("#question-1").append(`<h2 class="card-title text-primary">#${myNumber}</h2>`)
        $("#question-1").append(`<p class="card-text text-secondary">${res.data.text}</p>`)
    } catch (e) {
        console.log("Something went wrong!");
    }
}

getFact(myNumber)



// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

function getFiveFacts(nums) {
    nums.forEach(async function (num) {
        let url = `${baseURL}${num}?json`;
        let res = await axios.get(url);
        $("#question-2").append(
            `<div class="my-4 card" id="card-${res.data.number}">
                    <div class="card-body">
                        <h2 class="card-title text-primary">#${res.data.number}</h2>
                        <p class="card-text text-secondary">${res.data.text}</p>
                    </div>
                </div>`)
    })
}

getFiveFacts(fiveNumbers)



// 3. Use the API to get 4 facts on your favorite number.Once you have them all, put them on the page.It’s okay if some of the facts are repeats.

async function getFourFacts(num) {
    let url = `${baseURL}${num}?json`;
    let factsArray = await Promise.all([
        axios.get(url),
        axios.get(url),
        axios.get(url),
        axios.get(url)
    ]);

    for (fact of factsArray) {
        console.log(fact.data.text)
        $("#q-3-list").append(`<li class="card-text text-secondary mt-3">${fact.data.text}</li>`)
    }
}

getFourFacts(myNumber);
