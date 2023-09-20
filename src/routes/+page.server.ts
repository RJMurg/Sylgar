import type { Actions } from './$types';
import { redirect } from "@sveltejs/kit";

// Read in info from .env file
import { config } from "dotenv";
config();

export const actions = {
	default: async ({ cookies, request }) => {
		let reqData = await request.formData();

		// Returns as format:
		// FormData {
		//  "password" => "string"
		// }

		// Check if password is correct
        if (reqData.get("password") === process.env.PASSWORD) {
            // Set cookie
            cookies.set("LoggedIn", "true", {
                path: "/",
                maxAge: 60 * 60 * 24 * 7 // 1 week
                });

            // Redirect to the page
            throw redirect(302, "/library");
        } else {
            // Set message to display
            return {
                status: 401,
                body: {
                    message: "Incorrect password"
                }
            }
        }
	}
} satisfies Actions;
