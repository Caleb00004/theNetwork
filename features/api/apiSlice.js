import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'

export const globalState = {
    userData: {},
    postData: [],
    currentUser: {},
    // loggedIn: true
}

export const loggedIn = false

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['post', 'getPostData'],
    baseQuery: fetchBaseQuery({baseUrl: `http://localhost:3500/`}),
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => ({
                url: '/all-post',
                method: 'GET',
                credentials: 'include'
            }),
            transformResponse: res => {
                globalState.postData = res
                return res
            },
            providesTags: ['getPostData']
        }),
        getLoggedInStatus: builder.query({
            query: () => ({
                url: '/logged-in',
                method: 'GET',
                credentials: 'include',
            }),
            transformResponse: res => {
                console.log(res)
                globalState.currentUser = res.userData
                return res
                // console.log(res)
                // globalState.loggedIn = res
            },
            providesTags: ['post']
        }),
        getLogOut: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
                credentials: 'include'
            }),
            providesTags: (result) => {
                console.log(result)
            },
            invalidatesTags: ['post']

        }),
        getSignUp: builder.mutation({
            query: (user) => {
                console.log(user)
                return {
                    url: '/sign-up',
                    method: 'POST',
                    credentials: 'include',
                    body: user
                }
            },
            // providesTags: (result) => {
            //     console.log(result)
            // },
            invalidatesTags: ['post']

        }),
        addComment: builder.mutation({
            query: (commentData) => {
                console.log(commentData)
                // let post;
                // let nested = post = comment
                // console.log(nested)
                return {
                    url: '/add-comment',
                    method: 'PATCH',
                    credentials: 'include',
                    body: commentData
                }
            },
            // providesTags: (result) => {
            //     console.log(result)
            // },
            invalidatesTags: ['getPostData', 'post']

        }),
        addPost: builder.mutation({
            query: (post) => {
                console.log(post)
                // let post;
                // let nested = post = comment
                // console.log(nested)
                return {
                    url: '/new-post',
                    method: 'POST',
                    credentials: 'include',
                    body: post
                }
            },
            transformResponse: res => {
                console.log('POST ADDED')
                console.log(res)
                globalState.currentUser = res.userData
                // return res
                // console.log(document.cookie)
            },
            // providesTags: (result) => {
            //     console.log(result)
            // },
            invalidatesTags: ['getPostData']

        }),
        getLogIn: builder.mutation({
            query: (user) => {
                console.log(user)
                return {
                    url: '/log-in',
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: user
                }

            },
            transformResponse: res => {
                console.log('Log In requested')
                console.log(res)
                globalState.currentUser = res.userData
                // return res
                // console.log(document.cookie)
            },
            invalidatesTags: ['post']
        })


    })
})

export const {
    useGetPostsQuery,
    useGetLoggedInStatusQuery,
    useGetLogInMutation,
    useGetLogOutMutation,
    useGetSignUpMutation,
    useAddCommentMutation,
    useAddPostMutation

} = apiSlice
