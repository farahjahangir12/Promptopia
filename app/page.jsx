import "@styles/globals.css";
import Feed from "@components/Feed.jsx"
const Home = () => {
  return (
    <section className="flex-col w-full flex-center"> 
      <h1 className="head_text text-center">Discover,Test & Share<br/>
      <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">Promptopia is an open-source AI
        promting tool for modern word to discover, create
        and share creative prompts
      </p>
      <Feed/>
    </section>
  )
}

export default Home
