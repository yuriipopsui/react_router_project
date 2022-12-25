
import { Form, useLoaderData } from "react-router-dom";
import { getContact, updateContact } from "../contacts";


export const loader = async ({ params }) => {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  return contact;
}

export const action = async ({ request, params }) => {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}


const Contact = () => {

  const contact = useLoaderData();

  // const contact = {
  //   first: "Your",
  //   last: "Name",
  //   avatar: "https://placekitten.com/g/200/200",
  //   twitter: "your_handle",
  //   notes: "some notes",
  //   favorite: true,
  // };

  const onSubmitHandler = (event) => {
    if (!confirm("Please confirm you want to delete this record.")) {
      event.preventDefault();
    }
  }
  const Favorite = ({ contact }) => {
    let favorite = contact.favorite;

    return (
      <Form method="post">
        <button name="favorite"
          value={favorite ? false : true}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}>
          {favorite ? "★" : "☆"}
        </button>
      </Form>
    )
  }

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || "https://placekitten.com/g/200/200" || null} />
      </div>
      <div>
        <h1>
          {
            contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form method="post" action="destroy"
            onSubmit={onSubmitHandler}>
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Contact;