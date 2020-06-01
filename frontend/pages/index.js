import Head from "next/head";
import ComponentRenderer from "./componentRenderer.js";
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ComponentRenderer />
    </div>
  );
}
