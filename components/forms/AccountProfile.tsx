"use client"
import {Form} from '@/components/ui/form'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserValidation} from "@/lib/validations/user";
import {Button} from "@/components/ui/button"
import * as z from "zod"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import Image from "next/image";
import {ChangeEvent} from "react";
import {isBase64Image} from "@/lib/utils";
import {useUploadThing} from "@/lib/uploadthing";

interface Props {
    user?: {
        id?: string,
        name?: string,
        bio?: string,
        username?: string,
        objectId?: string,
        image?: string,
    };
    btnTitle?: string;
}

const AccountProfile = ({user, btnTitle}: Props) => {
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || "",
        }
    });

    function onSubmit(values: z.infer<typeof UserValidation>) {
        const blob = values.profile_photo;
        const hasImageChanged = isBase64Image(blob);

        if (hasImageChanged) {
            const imgRes = useUploadThing()
        }

        console.log(values)
    }

    const handleImage = (e: ChangeEvent, fieldChange: (value: string) => void) => {
        e.preventDefault();
    }

    return (
        <Form {...form}>
            <form className={'flex flex-col justify-start gap-10'} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({field}) => (
                        <FormItem className={'flex items-center gap-4'}>
                            <FormLabel className={'account-form_image-label'}>
                                {field.value ?
                                    (
                                        <Image
                                            src={field.value}
                                            alt='profile_icon'
                                            width={96}
                                            height={96}
                                            priority
                                            className='rounded-full object-contain'
                                        />) :
                                    (
                                        <Image
                                            src='/assets/profile.svg'
                                            alt='profile_icon'
                                            width={24}
                                            height={24}
                                            className='object-contain'
                                        />)
                                }
                            </FormLabel>
                            <FormControl className={'flex-1 text-base-semibold text-gray-200'}>
                                <Input
                                    type={'file'}
                                    accept={'image/'}
                                    placeholder={'Upload a photo'}
                                    className={"account-form_image-input"}
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem className={'flex flex-col justify-start  gap-3 w-full'}>
                            <FormLabel className={'text-base-semibold text-light-2'}>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type={'text'}
                                    className={"account-form_input no-focus"}
                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem className={'flex flex-col justify-start  gap-3 w-full'}>
                            <FormLabel className={'text-base-semibold text-light-2'}>
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type={'text'}
                                    className={"account-form_input no-focus"}
                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                /><FormField
                control={form.control}
                name="bio"
                render={({field}) => (
                    <FormItem className={'flex flex-col justify-start  gap-3 w-full'}>
                        <FormLabel className={'text-base-semibold text-light-2'}>
                            Bio
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                className={"account-form_input no-focus"}
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
                <Button type="submit" className={'bg-primary-500'}>Submit</Button>
            </form>
        </Form>
    );
};

export default AccountProfile;
