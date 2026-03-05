import type { Metadata } from "next";
import { AppProvider } from "../shared/providers/AppProvider";
import "../styles/index.css";

export const metadata: Metadata = {
    title: "PETtfolio",
    description: "Your Pet Portfolio",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className="antialiased bg-gray-50 min-h-screen">
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}
