"use client"

import * as z from "zod"

import { CardWrapper } from "@/components/auth/card-warpper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { ResgiterSchema } from "@/schemas"
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
import { register } from "@/actions/register"




export const ResgiterForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResgiterSchema>>({
        resolver: zodResolver(ResgiterSchema),
        defaultValues:{
            email: "",
            password: "",
            name: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ResgiterSchema>) => {
        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
        
    } 

    return (
        <CardWrapper 
            headerLable="Create an account"
            backButtonHref="/auth/login"
            backButtonLable="Already have and account?"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit((onSubmit))}
                className="space-y-6"
                >
                    <div className="space-y-4">  
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="John Doe"
                                            
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
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
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="********"
                                            type="password"
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
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}