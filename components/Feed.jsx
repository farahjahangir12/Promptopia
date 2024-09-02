"use client"

import React from 'react'
import PromptCard from "@components/PromptCard"
import {useState,useEffect} from "react"

const PromptCardList=({data,handleTagClick})=>{
    return(
        <div className="mt-16 prompt_layout">
       {data.map((post)=>(
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick}/>
       ))}
        </div>
    )
}
const Feed = () => {
    const [posts,setPosts]=useState([])
    const [searchQuery,setSearchQuery]=useState("");
    const [timeout,setTimeout]=useState(null);
    const [results,setResults]=useState([]);
    

    const handleTagClick=(tag) =>{
      setSearchQuery(tag);
      const list = queriedPrompts(tag);
      setResults(list);
    }
    const queriedPrompts=(searchQuery)=>{
      const regex =new RegExp(searchQuery,"i")
      return posts.filter(
        (item)=>
          regex.test(item.creator.username) ||
          regex.test(item.tag)||
          regex.test(item.prompt)
      )
    }
    const handleSearchQuery=(e)=>{
      clearTimeout(timeout);
      setSearchQuery(e.target.value);

      setTimeout(()=>{
        const response =queriedPrompts(e.target.value);
        setResults(response)
      },500)
       
    }

    const fetchPosts = async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json();
    
        setPosts(data);
      };
    
      useEffect(() => {
        fetchPosts();
      }, []);
  return (
    <section className='feed'>
    <form className='relative w-full flex-center'>
      <input
        type='text'
        placeholder='Search for a tag or a username'
        value={searchQuery}
        onChange={handleSearchQuery}
        required
        className='search_input peer'
      />
    </form>

    {searchQuery ? (
      <PromptCardList
        data={results}
        handleTagClick={handleTagClick}
      />
    ) : (
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    )}
  </section>
  )
}

export default Feed
