import { Image, Container, Stack } from '@mantine/core';
import styles from './page.module.scss';
import ImageTextCard from '../components/imageWithText/ImageWithText';

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.imageWrapper}>
          <Image
            src="/img/Linkedin-cover-big.jpg"
            alt="Boomkwekerij William de Bruijn"
            w="100%"
            className={styles.heroImage}
          />
        </div>

        <Container size='responsive' className={styles.mainContainer}>
          <h2 className={styles.vollegrond}>
            <span className={styles.line}>Volle grond...&nbsp;</span>
            <span className={styles.line}>ja natuurlijk!</span>
          </h2>

          <p className={styles.maintext}>
            Boomkwekerij William de Bruijn is een sierheesterkwekerij in Boskoop.
            Wij kweken een breed sortiment heesters in de volle grond. Wij stekken
            en enten ons eigen uitgangsmateriaal wat we opkweken in de volle grond.
            Met ons sortiment richten we ons op kwekerijen die onze planten
            doorkweken in pot of volle grond en op vakbeplanting als in openbaar
            groen (plantsoenen, bedrijfsterreinen), aanleg tuinen en parken door
            hoveniers. Doordat we kweken in de volle grond zijn wij ook zeer
            afhankelijk van de bodem. Met de bodem en het bodemleven moet goed
            omgegaan worden, om die reden zijn wij terughoudend met inzetten van
            kunstmest en bestrijdingsmiddelen maar kiezen wij voor een natuurlijke
            manier om ziekten en plagen te voorkomen en zo duurzame planten te
            kweken.
          </p>
        </Container>
      </section>

      <Container size='responsive'>
        <Stack className={styles.contentContainer}>
          <ImageTextCard
            imageSrc="/img/20210611_161239.webp"
            alt="Bloemen"
            title="Bloemen"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae faucibus massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
          />

          <ImageTextCard
            imageSrc="/img/poten.webp"
            alt="Poten"
            title="Poten"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae faucibus massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            imageRight
          />
        </Stack>
      </Container>
    </>
  );
}