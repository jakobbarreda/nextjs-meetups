import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

// new meetup page
const NewMeetupPage = () => {
  const router = useRouter();

  // add meetup handler
  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "post",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Add a meetup</title>
        <meta name="description" content="add a new meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
};

export default NewMeetupPage;
