import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";


export const action = async ({ request, params }) => {

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}


const EditContact = () => {
  const contact = useLoaderData();
  const navigate = useNavigate();

  const onClickHandler = () => {
    return navigate(-1);
  }

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input type="text" name="first" aria-label="First name" placeholder="First" defaultValue={contact.first} />
        <input type="text" name="last" aria-label="Last name" placeholder="Last" defaultValue={contact.last} />
      </p>
      <label>
        <span>Twitter</span>
        <input type="text" name="twitter" placeholder="@jack" defaultValue={contact.twitter} />
      </label>
      <label>
        <span>Avatar URL</span>
        <input type="text" name="avatar" aria-label="Avatar URL" placeholder="https://example.com/avatar.jpg" defaultValue={contact.avatar} />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" rows={6} defaultValue={contact.notes} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={onClickHandler}>Cancel</button>
      </p>
    </Form>
  );
}

export default EditContact;