"use client"

import { newVerification } from "@/actions/new-verification";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader} from "react-spinners";
import { CardWrapper } from "@/components/auth/card-warpper";
import { useSearchParams } from "next/navigation";
import { FromError } from "@/components/form-error"
import { FromSuccess } from "@/components/form-success"



export const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParasms = useSearchParams();
    const token = searchParasms.get("token");

    const onSubmit = useCallback(() => {
        

        if(!token) {
            setError("Missing token!");
            return;
        }

        newVerification(token)
         .then((data) => {
            setSuccess(data.success);
            setError(data.error);
         })
         .catch(() => {
            setError("Something went wrong!")
         })
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
    
        <CardWrapper
        headerLable="Confirming your verification"
        backButtonLable="Back to login"
        backButtonHref="/auth/login"
        >
            <div className="flex items-center justify-center w-full">
                {!success && !error && (<BeatLoader />)}
                
                <FromSuccess message={success}/>
                <FromError message={error}/>
            </div>
        </CardWrapper>
    );
}