import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './variables.css';
import ReactQueryProviders from '@/utils/ReactQueryProviders';
import Header from './_components/layout/Header';
import Footer from './_components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Puppy Ground',
  description: '유기견 분양, 반려동물 용품 판매'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`;

  return (
    <html lang="ko">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Script strategy="beforeInteractive" src={KAKAO_SDK_URL} />
        <ReactQueryProviders>
          <ReactQueryDevtools initialIsOpen={false} />
          <Header />
          {children}
          <ToastContainer />
          <Footer />
        </ReactQueryProviders>
      </body>
    </html>
  );
}
