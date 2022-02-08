import type { NextPage } from "next";
import Head from "next/head";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import CardHeader from "../components/CardHeader";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Task tracker component</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card>
          <CardHeader title="Card titlte" />
          <CardContent>Card content</CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Home;
