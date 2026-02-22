import '@mantine/core/styles.css';
import { MantineProvider, Container } from '@mantine/core';
import { theme } from '../../theme';
import styles from './layout.module.scss';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './globals.scss';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <MantineProvider theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.headerwrapper}>
          <Header />
        </div>

        <main className={styles.content}>
          <Container fluid p={0}>
            <Outlet />
          </Container>
        </main>

        <div className={styles.footerwrapper}>
          <Footer />
        </div>
      </div>
    </MantineProvider>
  );
}
