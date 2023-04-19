import { Comment } from "../typings";
import {Comments} from '../constants/constants';

export const fetchComments = async (tweetId: string) =>{
    const res = await fetch(`api/getComments?tweetId=${tweetId}`);

    const comments: Comment[] = await res.json();

    console.log('comments:', comments);
   
    return comments


    // return Comments.filter(comment => comment.tweetId === tweetId);
}