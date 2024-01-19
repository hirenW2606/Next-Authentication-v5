"use server"

import { signOut } from "@/auth"

export const Logout = async () => {
    //we can do some server things here
    await signOut();
};