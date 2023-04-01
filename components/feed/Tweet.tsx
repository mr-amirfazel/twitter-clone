import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../../typings'
import TimeAgo from 'react-timeago';
import { 
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon
} from '@heroicons/react/outline';
import { fetchComments } from '../../utils/fetchComments';
import toast from 'react-hot-toast';


interface Tweetprops extends PropsWithChildren{
    tweet: Tweet
}
const TweetComponent:FC<Tweetprops> = ({tweet}) => {
    const [comments, setComments] = useState<Comment []>([])
    const [commentBoxVisible, setCommentBoxVisible] = useState<Boolean>(false)
    const [input, setInput] = useState<string>('')

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id);
        setComments(comments)
    }

    useEffect( ()=> {
        refreshComments();
    }
    ,[]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const commentToast = toast.loading('Posting Comment...')

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: 'Random User',
      profileImg: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: 'POST',
    })

    console.log('WOOHOO we made it', result)
    toast.success('Comment Posted!', {
      id: commentToast,
    })

    setInput('')
    setCommentBoxVisible(false)
    refreshComments()
        
    }

  return (
    <div className='flex flex-col space-x-3 border-y p-5 border-gray-100'>
        <div className="flex space-x-3">
            <img className='h-10 w-10 rounded-full object-cover' src={tweet.profileImg} alt="" />
            <div>
                <div className='flex items-center space-x-1'>
                    <p className='mr-1 font-bold'>{tweet.username}</p>
                    <p className='hidden text-sm text-gray-500 sm:inline'>@{tweet.username.replace(/\s+/g, '').toLowerCase()}.</p>

                    <TimeAgo date={tweet._createdAt} className='text-sm text-gray-500' />
                </div>
                <p className='pt-1'>{tweet.text}</p>

                {tweet.image && (
                    <img className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm' src={tweet.image} alt="" />
                )}
            </div>
        </div>
        <div className='mt-5 flex justify-between'>
            <div onClick={() => setCommentBoxVisible(!commentBoxVisible)} className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                <ChatAlt2Icon  className='h-5 w-5'/>
                <p>{comments?.length | 0}</p>
            </div>
            <div className='flex cursor-pointer items-center space-x-3 text-gray-400'><SwitchHorizontalIcon className='h-5 w-5'/></div>
            <div className='flex cursor-pointer items-center space-x-3 text-gray-400'><HeartIcon className='h-5 w-5'/></div>
            <div className='flex cursor-pointer items-center space-x-3 text-gray-400'><UploadIcon className='h-5 w-5'/></div>
        </div>

        {/* comment box */}
        {
            commentBoxVisible && (
                <form onSubmit={handleSubmit} className='mt-3 flex space-x-3 '>
                    <input value={input} onChange={e => setInput(e.target.value)} className='flex-1 outline-none rounded-lg bg-gray-100 p-2' type="text" placeholder="write a comment..." />
                    <button disabled={!input} type="submit" className='text-twitter disabled:text-gray-200'>Post</button>
                </form>
            )
        }
        {comments?.length > 0 && (
            <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5'>
                {
                    comments.map(comment => (
                        <div key={comment._id} className='relative space-x-2 flex'>
                            <hr className='absolute left-5 top-10 h-8 border-x border-twitter/30'/>
                            <img src={comment.profileImg} className='mt-2 h-7 w-7 object-cover rounded-full' alt="" />
                            <div>
                                <div className='flex items-center space-x-1'>
                                    <p className='mr-1 font-bold'>{comment.username}</p>
                                    <p className='hidden text-sm text-gray-500 lg:inline'>@{tweet.username.replace(/\s+/g, '').toLowerCase()}.</p>
                                </div>

                                <TimeAgo date={comment._createdAt} className='text-sm text-gray-500' />
                                <p>{comment.comment}</p>
                            </div>
                            
                        </div>
                    ))
                }
            </div>
        )}
    </div>
  )
}

export default TweetComponent