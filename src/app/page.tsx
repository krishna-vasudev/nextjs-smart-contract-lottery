// import Image from "next/image";
import Header from "./components/Header";
import LotteryEntrance from "./components/LotteryEntrance";
// import ClientNotificationProvider from "./components/ClientNotificationProvider";
// import ManualHeader from "./components/ManualHeader";

export default function Home() {
  return (
    // <ClientNotificationProvider>
      <div>
        <Header/>
        <LotteryEntrance/>
      </div>
    // </ClientNotificationProvider>
  );
}
