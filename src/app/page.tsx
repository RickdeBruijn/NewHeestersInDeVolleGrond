import { Image, Container, Stack } from '@mantine/core';
import styles from './page.module.scss';
import ImageTextCard from '../components/imageWithText/ImageWithText';
import heroImage from '../assets/Linkedin-cover-big.jpg';
import bloemenImage from '../assets/20210611_161239.webp';
import potenImage from '../assets/poten.webp';


export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.imageWrapper}>
          <Image
            src={heroImage}
            alt="Boomkwekerij William de Bruijn"
            w="100%"
            className={styles.heroImage}
          />
        </div>

        <Container size='responsive' className={styles.mainContainer}>
          <h2>Welkom bij Boomkwekerij William de Bruijn</h2>
          <p>
            Sterke vollegrond planten met oog voor natuur, klimaat en milieu
            Wilt u plantmateriaal dat écht aanslaat en krachtig doorgroeit? Dan kiest u voor de kracht van de volle grond. Als broers en rasechte kwekers delen wij, William en Barrie de Bruijn, een duidelijke passie: op onze Boskoopse sierheesterkwekerij kweken wij kerngezonde, weerbare planten. Wij leveren aan professionals die de superieure kwaliteit van vollegronds planten kennen en eisen.
          </p>
        </Container>
      </section>

      <Container size="responsive" className={styles.pageContainer}>
        <Stack className={styles.contentContainer}>
          <ImageTextCard
            imageSrc={bloemenImage}
            alt="Onze specialismen"
            title="Onze specialismen:"
            description=
            {
              <ul className={styles.specialismsList}>
                <li>
                  Trots op PlanetProof gecertificeerde planten. Wij zijn enorm trots dat
                  onze planten het certificaat On the way to PlanetProof dragen...
                </li>

                <li>
                  Beplanting voor openbaar groen, plantsoenen, tuinen en parken...
                </li>

                <li>
                  Doorkweekmateriaal voor volle grond & potten...
                </li>
              </ul>
            }
          />

          <ImageTextCard
            imageSrc={potenImage}
            alt="Vakmanschap door de broers de Bruijn"
            title="Vakmanschap door de broers de Bruijn"
            description=
            {
              <p>
                Samen staan wij garant voor gezonde planten, korte lijnen en betrouwbare leveringen. Wij begrijpen wat een kweker of groenvoorziener nodig heeft om succesvol te zijn. Zoekt u de hoogste kwaliteit vollegrond planten met een minimale impact op onze planeet? Dan bent u bij ons aan het juiste adres.
              </p>
            }
            imageRight
          />
        </Stack>
      </Container>
    </>
  );
}