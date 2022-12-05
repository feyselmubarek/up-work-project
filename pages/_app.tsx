import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/layout";

import { QueryClient, QueryClientProvider } from "react-query";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

const queryClient = new QueryClient();

interface InitialProps {}

function MyApp({ Component, pageProps }: AppProps & InitialProps) {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  return {};
};

export default appWithTranslation(MyApp);
