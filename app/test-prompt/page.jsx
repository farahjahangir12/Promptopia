"use client"

import React, { useState } from 'react'
import Test from "@components/Test"

const TestPrompt = () => {
  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    result: ""
  });

  const testPrompt = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
      const response = await fetch("/api/prompt/test", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify({
          prompt: post.prompt,
        }),
      });

      if (response.ok) {
        const res= await response.json(); 
        setPost(prevPost => ({ ...prevPost, result: res.result}));
      } else {
        console.error("Failed to get a valid response from the server.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setSubmit(false);
    }
  }

  return (
    <Test 
      type="Test"
      post={post}
      setPost={setPost}
      submit={submit}
      handleSubmit={testPrompt}
    />
  )
}

export default TestPrompt;
