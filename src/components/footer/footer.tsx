'use client';

import { Group, Stack, Text } from '@mantine/core';
import { Image } from '@mantine/core';
import styles from './footer.module.scss';
import planetproof from "../../assets/SGS12016_diap.png"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Group justify="space-between">
        <Stack gap={2} className={styles.linkstack}>
          <Text size="sm">Boomkwekerij William de Bruijn</Text>
          <Text size="sm">Insteek 83 2771 AA Boskoop (NL)</Text>
          <Text size="sm">T 0172-212648 F 0172-215503</Text>
        </Stack>

        <Image
          src={planetproof}
          alt="PlanetProof logo"
          w={80}
          h={80}
        />
      </Group>
    </footer>
  );
}
