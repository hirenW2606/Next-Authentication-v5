"use client"

import * as z from "zod"

import { ResetSchema } from "@/schemas"
import { CardWrapper } from "@/components/auth/card-warpper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FromError } from "@/components/form-error"
import { FromSuccess } from "@/components/form-success"
import { useState, useTransition } from "react"

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { reset } from "@/actions/reset"




export const ResetForm = () => {
    

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues:{
            email: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            reset(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });

       
        
    } 

    return (
        <CardWrapper 
            headerLable="Forgot your password?"
            backButtonHref="/auth/login"
            backButtonLable="Back to login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit((onSubmit))}
                className="space-y-6"
                >
                    <div className="space-y-4">   
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FromError message={error}/>
                    <FromSuccess message={success}/>
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Sent reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}