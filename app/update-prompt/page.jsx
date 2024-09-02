"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter,useSearchParams } from 'next/navigation'

import Form from "@components/Form"

const EditPrompt = () => {
  const router =useRouter();
  const [submit,setSubmit]=useState(false);
  const [post,setPost]=useState({
    prompt:"",
    tag:"",
  })
  const searchParams=useSearchParams();
  const promptId=searchParams.get('id')

  useEffect(()=>{
  const getPromptDetails= async()=>{
    const response =await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();
    setPost(
        {
        prompt:data.prompt,
        tag:data.tag
        }
    )
  }
  getPromptDetails();
  
  },[promptId])

  const updatePrompt= async (e)=>{
   e.preventDefault();
   setSubmit(true);
    if(!promptId) return alert("Prompt Id not found!")
        try{
            const response = await fetch(`/api/prompt/${promptId}`,{
              method:'PATCH',
              body:JSON.stringify({
                prompt:post.prompt,
                tag:post.tag,
              })
            })
            if(response.ok){
              router.push("/")
            }
           }
           catch(error){
            console.log(error)
           }
           finally{
            setSubmit(false)
           }
  
  }
  return (
   <Form type="Edit"
    post={post}
    setPost={setPost}
    submit={submit}
    handleSubmit={updatePrompt}
   />

  
  )
}

export default EditPrompt
