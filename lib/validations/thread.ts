import * as z from 'zod';

export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'minimum 3 character'}),
    address: z.string().nonempty().min(3, { message: 'minimum 3 character'}),
    accountId: z.string(),
})

export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'minimum 3 character'}),
})