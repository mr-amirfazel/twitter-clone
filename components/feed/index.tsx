import { RefreshIcon } from '@heroicons/react/outline'
import React, { FC, PropsWithChildren, useState } from 'react'
import TweetBox from './TweetBox'
import { Tweet } from '../../typings';
import TweetComponent from './Tweet'
import { fetchTweets } from '../../utils/fetchTweets';
import toast from 'react-hot-toast';

interface FeedProps extends PropsWithChildren{
tweets: Tweet[];
}

const Feed:FC<FeedProps> = ({tweets: propTweets}) => {
  
  const [tweets, setTweets] = useState<Tweet []>(propTweets)
  console.log(tweets)

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...')
    const tweets = await fetchTweets();
    setTweets(tweets);

    toast.success('Feed updated!', {
      id: refreshToast
    })
  }
  return (
    <div className="border-x max-h-screen overflow-scroll scrollbar-hide">
        <div className="flex items-center justify-between">
            <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
            <RefreshIcon onClick={handleRefresh} className='w-8 h-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125'/>
        </div>
        {/* tweetbox */}
        <div>
            <TweetBox  setTweets={setTweets}/>
        </div>


        {/* feed */}
          <div>
            {tweets.map(tweet => (
              <TweetComponent key={tweet._id} tweet={tweet} />
            ))}
          </div>
    </div>
  )
}

export default Feed