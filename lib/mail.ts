import { Resend } from "resend"

const domain = process.env.NEXT_PUBLIC_APP_URL

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail =async (
    email:string,
    token: string
    ) => {
    await resend.emails.send({
        from: "onboading@resend.dev",
        to: email,
        subject: "2FA code email",
        html: `<p>Your 2FA code: ${token}</p>`
    });
};

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const  confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboading@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">Here</a> to confirm email.</p>`
    });
};


export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const  resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboading@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">Here</a> to Reset your password.</p>`
    });
};