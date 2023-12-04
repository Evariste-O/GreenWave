"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      address: "",
      thread: "",
      accountId: userId,
    },
  });

  const convertAdress = async (values: z.infer<typeof ThreadValidation>) =>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(values.address)}.json?storeResult=false&view=Unified&key=y6iNviLgqreGrV6LI3E7LjrT7dVoi3fa`)
    xhr.onload = function() {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText) 
        onSubmit(values, result.results[0].position.lat, result.results[0].position.lon )
      }
    };
    xhr.send();
  }

  const onSubmit = async (values: z.infer<typeof ThreadValidation>, lat : Number, long : Number) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      location: [lat,long],
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(convertAdress)}
      >
        <FormField
         control={form.control}
         name='address'
         render={({ field }) => (
           <FormItem className='flex w-full flex-col gap-3'>
             <FormLabel className='text-base-semibold text-light-2'>
               Adress
             </FormLabel>
             <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
               <Textarea rows={0} {...field} />               
             </FormControl>
             <FormMessage />
           </FormItem>           
         )}
       />
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Content
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={15} {...field} />               
              </FormControl>
              <FormMessage />
            </FormItem>           
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;