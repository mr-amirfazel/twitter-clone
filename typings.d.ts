export interface Tweet extends TweetBody{
    _id: string;
    _createdAt: string;
    _updated:string;
    _rev:string;
    _type: 'tweet',
    blockTweet: boolean;
}

export type TweetBody = {
    text: string,
    username: string,
    profileImg: string,
    image?: string
}

export type CommentBody = {
    comment: string,
    username: string,
    profileImg: string,
    tweetId: string
}

export interface Comment extends CommentBody{
    _id: string;
    _createdAt: string;
    _rev:string;
    _type: 'comment',
    _updatedAt: string;
    tweet: {
        _ref: string;
        _type: "reference"
    }
}