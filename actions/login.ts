"use server"

import * as z from "zod";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken, generateTwofactorToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login=  async (
    values: z.infer<typeof LoginSchema>, 
    callbackUrl?: string | null,
    ) => {
    const validatedFields = LoginSchema.safeParse(values);
    
    if(!validatedFields.success){
        return { error: "Invalid fields!"};
    }
    
    const {email, password, code} = validatedFields.data; 

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!"}
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email,
        )

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return { success: "Confirmation email send"}
    }

    if(existingUser.isTwoFactorEnabled && existingUser.email){
        if(code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

            if(!twoFactorToken) {
                return { eror: "Invalid code!"};
            }

            if (twoFactorToken.token !== code){
                return { eror: "Invalid code!"};
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if(hasExpired) {
                return { error: "Code Expired!"};
            }

            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id}
            });

            const existinfConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if(existinfConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existinfConfirmation.id }
                });
            }

            await db.twoFactorConfirmation.create({
                data:{
                    userId: existingUser.id,
                }
            });
            
        }else {
            const twoFactorToken = await generateTwofactorToken(existingUser.email)

            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token,
            );
        
            return { twoFactor: true };
        }
    }

    try{
        await signIn("credentials", {
            email, 
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })

    }catch (error) {
        if (error instanceof AuthError) {
            switch (error.type){
                case "CredentialsSignin":
                    return { error: "Invalid Credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }
};