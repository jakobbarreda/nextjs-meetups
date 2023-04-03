import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="React meetups around the world" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// pre render page with props needed to display to the page
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://jakobbarreda:cg4YNEB9Yix0bSLm@cluster0.nnihrit.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // returns a object
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // how often to update this static page in secs
    revalidate: 10,
  };
}
export default HomePage;
