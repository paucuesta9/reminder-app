import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getReminders } from '../services/reminders';
import jwt from 'jsonwebtoken';
import Plus from '../components/Plus';
import Link from 'next/link';

export default function Home({ reminders }) {

  const handleClick = (i) => (e) => {
    e.preventDefault();
    location.href = `/${i}`
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Recordatoris</title>
        <meta name="description" content="Recordatoris personals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className='text-2xl font-bold'>
          Recordatoris
        </h1>
        {reminders?.map((reminder) => (
          <div key={reminder.id} className={styles.card} onClick={handleClick(reminder.id)}>
            <h3>{reminder.title}</h3>
            <p>{reminder.description}</p>
            <p>{reminder.date}</p>
            <p>{reminder.done ? "Fet" : "Pendent"}</p>
          </div>
        ))}
        <Link className='font-bold flex fixed right-0 bottom-0 m-8 bg-blue-300 p-4 rounded-xl' href="/new"><div><Plus /> Afegir</div></Link>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://paucuesta.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pau Cuesta Arcos
        </a>
      </footer>
    </div>
  )
}

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

  const reminders = await getReminders(token);

  return {
    props: { reminders },
  };
}
