import { useState } from 'react';
import { Container, Group, Title, ActionIcon, Button } from '@mantine/core';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Link } from 'react-router-dom'; 
import styles from './header.module.scss';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Voorraad', to: '/voorraad' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Container h={60} fluid>
        <Group className={styles.inner}>
          <Title order={3} className={styles.logo}>
            Heesters
          </Title>

          <ActionIcon
            size="lg"
            variant="subtle"
            className={styles.burger}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
          >
            <IconMenu2 />
          </ActionIcon>

          <Group className={styles.links}>
            {links.map((link) => (
              <Link key={link.label} to={link.to} className={styles.headerlink}>
                {link.label}
              </Link>
            ))}
          </Group>
        </Group>
      </Container>

      <div
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.drawerHeader}>
          <Button
            color="yellow"
            variant="filled"
            size="xs"
            onClick={() => setDrawerOpen(false)}
            className={styles.drawerCloseBtn}
          >
            <IconX />
          </Button>
        </div>

        {links.map(link => (
          <Link
            key={link.label}
            to={link.to}
            className={styles.drawerLink}
            onClick={() => setDrawerOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {drawerOpen && (
        <div className={styles.overlay} onClick={() => setDrawerOpen(false)}></div>
      )}
    </header>
  );
}
