"use client";
import React from 'react';
import Suspense from "@components/Suspense"
import Form from "@components/Form";
import { useSearchParams } from 'next/navigation';
import {useState} from "react"

const EditPrompt = () => {

  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag
      });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmit(true);
    if (!promptId) return alert("Prompt Id not found!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      });
      
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <Suspense>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submit={submit}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
};

export default EditPrompt;
