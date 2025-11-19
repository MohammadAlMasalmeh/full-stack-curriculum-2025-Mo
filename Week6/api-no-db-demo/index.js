// install
const express = require('express');
const app = express();


require('dotenv').config()

app.use(express.json())

//fake database

const tweets = [
    {id: '1', user: "Ryan", content: "ChatGPT"},
    {id: '2', user: "Mohammad", content: "Hello World!"},
];

// get tweet by id
app.get("/api/tweets/:user", (req, res) => {
    let target = tweets.find((t) => t.user == req.params.user);
    if (!target) {
        res.status(404).send("User not found");
    } else{
        res.status(200).send(target);
    }
})

//middleware
const validateInput = (req,res,next) =>{
    const user = req.body.user;
    const tweet = req.body.tweet;
    if(!tweet || !user) {
        return res.status(400).send("User and tweet content are required");
    }
    else{
        next();
    }
}

//post a tweet
app.post("/api/tweets", validateInput, (req, res) => {
    //validate input
    let previous_tweet_id = tweets[tweets.length - 1].id;
    let tweet = {
        id: previous_tweet_id + 1,
        user: req.body.user,
        tweet: red.body.tweet
    }
    tweets.push(tweet);
    res.status(201).send(tweet);
})

//delete a tweet
app.delete("/api/tweets", (req, res) => {
    let tweetIndex = tweets.findIndex((tweet) => tweet.id == req.body.id);
    if(tweetIndex === -1){
        res.status(404).send("Tweet not found");
    }
    else{
        // Remove the tweet
        let removed = tweets[tweetIndex];
        console.log(removed);
        tweets.splice(tweetIndex, 1);
        res.json(removed);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
