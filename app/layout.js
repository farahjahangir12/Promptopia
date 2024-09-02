
import "@styles/globals.css";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider"
export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html>
    <body>
      <Provider>
    <div>
      <Navbar/>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="app">{children}</main>
    </div>
    </Provider>
    </body>
    </html>
  );
};

export default RootLayout;
