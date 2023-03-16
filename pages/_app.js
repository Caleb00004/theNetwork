import '../styles/globals.css'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { apiSlice } from '../features/api/apiSlice'
import Layout from '../components/Layout'

function MyApp({ Component, ...pageProps }) {

  return (
    <ApiProvider api={apiSlice}>
        <Layout>
          <Component test={'mark'} {...pageProps} />
        </Layout>
    </ApiProvider>
  )
}

export default MyApp

// {/* <Provider store={store}>
// <Component {...pageProps} />
// </Provider> */}

// // export default wrapper.withRedux(MyApp)
// export default MyApp

// import '../styles/globals.css'
// // import { wrapper } from '../store/store'
// import { Provider } from 'react-redux'
// import {store} from '../store/store'
// // import { fetchPostData } from '../store/slices/commentSlice'

// import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
// import { apiSlice } from '../features/api/apiSlice'

// function MyApp({ Component, ...pageProps }) {
// /*  const {makeStore, props} = wrapper.useWrappedStore(rest)
//   const {pageProps} = props
// */
//   // store.dispatch(fetchPostData())

//   return (
//     <ApiProvider api={apiSlice}>
//         <Component {...pageProps} />
//     </ApiProvider>
//   )
// }

// {/* <Provider store={store}>
// <Component {...pageProps} />
// </Provider> */}

// // export default wrapper.withRedux(MyApp)
// export default MyApp

