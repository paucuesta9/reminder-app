import { getReminder } from "../services/reminders";
import jwt from 'jsonwebtoken';

const Index = ({ reminder }) => {

  return (
    <div key={reminder.id} className='border-gray-100'>
      <h3>{reminder.title}</h3>
      <p>{reminder.description}</p>
      <p>{reminder.date}</p>
      <p>{reminder.done ? "Fet" : "Pendent"}</p>
    </div>
  )
}

export default Index

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = req.cookies.token;

  if (!token) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }


  try {
    jwt.verify(token, process.env.JWT_SECRET);
  }
  catch (error) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  const { index } = context.query;

  const reminder = await getReminder(token, index)


  return {
    props: { reminder },
  };
}
