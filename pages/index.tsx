import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar'
import Feed from '../components/feed'
import Widgets from '../components/widgets'
import { fetchTweets } from '../utils/fetchTweets'
import { Tweet } from '../typings'
import { FC } from 'react'
import { Toaster } from 'react-hot-toast'

interface Props{
  tweets: Tweet[]
}

const Home:FC<Props> = ({tweets}) => {
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main className="grid grid-cols-9 ">
        <div className="col-span-2">
          <Sidebar />
        </div>

        <div className="col-span-7 lg:col-span-5">
          <Feed tweets={tweets} />
        </div>


        <div className="col-span-2 hidden lg:inline">
          <Widgets />
        </div>
      </main>

    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context)=>{
  const tweets = await fetchTweets();
  return{
    props:{
        tweets
    }
  }
}
