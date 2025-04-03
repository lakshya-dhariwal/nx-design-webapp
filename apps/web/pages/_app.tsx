import "@mable/design/styles/globals.css";
import { AppProps } from "next/app";

import Head from "next/head";

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
    ...appProps
}: AppProps) {
    return (
        <>
            <Head>
                <title>Mable : Campaign Hero AI</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </Head>
            <main className="">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
