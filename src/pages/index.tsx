import { GetStaticProps } from 'next';
import Head from 'next/head';
import { formatMoney } from '../utils';
import { stripe } from '../services/stripe';
import { SubscribeButton } from '../components/SubscribeButton';

import styles from '../styles/home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

const TWENTY_FOUR_HOURS_IN_SECONDS = 60 * 60 * 24; // 86400 seconds, 24 hours;

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head><title>Home | ig.news</title></Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about <br /> the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Ih1mQFqwl6ta6aVByUzTPjf');

  const product = {
    priceId: price.id,
    amount: formatMoney(price.unit_amount / 100),

  }

  return {
    props: {
      product,
    },
    revalidate: TWENTY_FOUR_HOURS_IN_SECONDS
  }
}