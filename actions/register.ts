"use server"

import * as z from "zod";
import bcrypt from "bcrypt"

import { ResgiterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUSerByEmail } from "@/data/user";

export const register =  async (values: z.infer<typeof ResgiterSchema>) => {
    const validatedFields = ResgiterSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Invalid fields!"};
    }

    const { email, password, name} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUSerByEmail(email);

    if (existingUser) {
        return { error: "Email aleady in use!"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // TODO: end verification token email

    return { success: "User Created!"}
}