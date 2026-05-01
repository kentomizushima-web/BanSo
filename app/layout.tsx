import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'BanSo | 経営の未来を、AIと共に', template: '%s | BanSo' },
  description: 'AIを活用した日本企業向け経営支援SaaS。財務管理・KPI・施策管理を一元化。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className={`${notoSansJP.className} antialiased bg-white text-[#1A2016]`}>
        {children}
      </body>
    </html>
  );
}
