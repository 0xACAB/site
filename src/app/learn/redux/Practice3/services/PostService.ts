import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../models/IPost';
const baseUrl = (typeof window !== "undefined")?((window.location.hostname==='localhost')?'http://localhost:5000':'https://'+window.location.hostname+':5000'):('http://localhost:5000');
export const postAPI = createApi({
	reducerPath: 'postAPI',
	baseQuery: fetchBaseQuery(
		{ baseUrl }),
	tagTypes: ['Post'],
	endpoints: (build) => ({
		fetchAllPosts: build.query<IPost[], number>({
			query: (limit: number = 5) => ({
				url: `/posts`,
				params: {
					_limit: limit,
				},
			}),
			providesTags: result => ['Post'],
		}),
		createPost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: `/posts`,
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['Post'],
		}),
		updatePost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: `/posts/${post.id}`,
				method: 'PUT',
				body: post,
			}),
			invalidatesTags: ['Post'],
		}),
		deletePost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: `/posts/${post.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Post'],
		}),
	}),
});
