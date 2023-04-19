import React, { Dispatch, FC, PropsWithChildren, SetStateAction, useRef, useState } from 'react'
import { 
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
    SearchCircleIcon,
} from '@heroicons/react/outline';
import { TweetBody, Tweet } from '../../typings';
import { fetchTweets } from '../../utils/fetchTweets';
import toast from 'react-hot-toast';

interface TweetBoxProps extends PropsWithChildren{
  setTweets: Dispatch<SetStateAction<Tweet []>>
}


const TweetBox:FC<TweetBoxProps> = ({setTweets}) => {
    const [input, setInput] = useState<string>('')
    const [imageBoxIsOpen, setImageBoxIsOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');

    const imageInputRef= useRef<HTMLInputElement>(null);

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value);
        imageInputRef.current.value = '';
        setImageBoxIsOpen(false);
    }

    const postTweet = async () => {
      const tweetBody: TweetBody = {
        text: input,
        username: "Random User",
        profileImg: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        image: image
      }

      const result = await fetch('/api/addTweet',{
        body: JSON.stringify(tweetBody),
        method: 'POST'
      })

      const json = await  result.json();

      const updatedtweets = await fetchTweets();
      setTweets(updatedtweets)


      toast('Tweet Posted',{
          icon: '🦾'
      })

      return json;
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        postTweet();
        setInput('');
        setImage('');
        setImageBoxIsOpen(false);
    }

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 object-cover rounded-full mt-4"
        src="https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
        alt="profile photo"
      />

      <div className="w-full flex flex-1 items-center pl-2">
        <form className="w-full flex flex-col felx-1">
          <input
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            type="text"
            placeholder="Whats poppin?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          {image && (
            <img className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg' src={image} alt="" />
          )
          
          }
          <div className="flex items-center">
            <div className="flex space-x-2 text-twitter flex-1">
              <PhotographIcon onClick={() => setImageBoxIsOpen(!imageBoxIsOpen)} className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button 
            // onClick={handleSubmit} 
            disabled={!input} className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40">
              Tweet
            </button>
          </div>
          {imageBoxIsOpen && (
            <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
              <input ref={imageInputRef} className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white" type="text" placeholder='Enter image Url'/>
              <button onClick={addImageToTweet} type='submit' className='font-bold text-white'>Add Image</button>
            </form>
          )
          }
        </form>
      </div>
    </div>
  );
}

export default TweetBox;