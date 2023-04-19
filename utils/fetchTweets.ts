import { Tweet } from "../typings";
import { tweets as Tcol } from "../constants/constants";

export const fetchTweets = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`)

    const data = await res.json();
    const tweets: Tweet[] = data.tweets;

    console.log('tweets:', tweets);
    return tweets;
    // return Tcol
}