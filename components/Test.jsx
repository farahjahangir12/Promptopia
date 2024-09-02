"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

const Test = ({type,post,submit,setPost,handleSubmit}) => {
  const [copied,setCopied]=useState("");
  const handleCopy=()=>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>setCopied(""),3000)
}
  return (
    <section className="w-full max-w-full flex-start flex-col">
        <h1 className="head_text text_left">
        <span className="blue_gradient">{type} Prompt</span>
        </h1>
       <p className="desc text-left max-w-md">{type} and improve your prompt through this platform!</p>

       <form onSubmit={handleSubmit}
       className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">

          <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Result
          </span>
          <textarea
            value={post.result}
            onChange={(e) => setPost({ ...post, result: e.target.value })}
            placeholder='Your results will appear here...'
            readOnly 
            className='form_textarea '
          />
          <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
        </label>


        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submit}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submit ? `${type}ing...` : type}
          </button>
        </div>
       </form>

    </section>
  )
}

export default Test
