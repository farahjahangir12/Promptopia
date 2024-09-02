import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connection } from "@utils/database";
import User from "@models/user";

console.log({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            try {
                // Ensure the database connection is established
                await connection();
                const sessionUser = await User.findOne({ email: session.user.email });

                if (!sessionUser) {
                    throw new Error("User not found in session callback");
                }

                session.user.id = sessionUser._id.toString();
                return session;
            } catch (error) {
                console.error("Session callback error:", error);
                return null; // Handle the error gracefully or return a fallback session object
            }
        },

        async signIn({ profile }) {
            try {
                // Ensure the database connection is established
                await connection();

                const findUser = await User.findOne({ email: profile.email });

                if (!findUser) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s/g, "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.error("SignIn callback error:", error);
                return false; // Return false to deny access if there's an error
            }
        },
    },
});

export { handler as GET, handler as POST };
