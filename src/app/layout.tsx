import { Header } from "./components";
import "./globals.scss";
import { UserFeedbackProvider } from "./provider/user-feedback/user-feedback";

export const metadata = {
  title: "Duolarry",
  description: "Aplicação para estudar idiomas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <UserFeedbackProvider>
          <Header />
          <div className="layout">{children}</div>
        </UserFeedbackProvider>
      </body>
    </html>
  );
}
