// src/pages/VoorraadLijst.tsx
import { useState, useEffect, Suspense } from 'react';
import {
  Table,
  ScrollArea,
  NumberInput,
  Button,
  Flex,
  TextInput,
  Container,
} from '@mantine/core';
import { excelResource, type TableRow } from '../../utils/excelResource';
import styles from './page.module.scss';

function VoorraadLijstContent() {
  const { tableData, header, fuse } = excelResource.read();
  const [filteredData, setFilteredData] = useState<TableRow[]>(tableData);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), 200); // 200ms debounce
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Apply search filter when debounced term changes
  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setFilteredData(tableData);
      return;
    }

    const results = fuse.search(debouncedTerm);
    setFilteredData(results.map((r) => r.item));
  }, [debouncedTerm, tableData, fuse]);

  // Handle user input for quantity
  const handleInputChange = (index: number, value: number) => {
    setFilteredData((prev) =>
      prev.map((row, i) => (i === index ? { ...row, UserAantal: value } : row))
    );
  };

  // Send email
  const sendEmail = async () => {
    const selectedOrders = filteredData.filter((item) => item.UserAantal! > 0);
    if (selectedOrders.length === 0) return alert('Geen producten geselecteerd!');

    try {
      const response = await fetch('/send_mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: selectedOrders }),
      });

      const result = await response.json();

      if (response.ok) alert('Bestelling succesvol verzonden!');
      else alert(`Fout bij verzenden: ${result.message}`);
    } catch (error) {
      console.error(error);
      alert('Fout bij het verzenden van de bestelling');
    }
  };

  // Render table rows
  const renderRows = () =>
    filteredData.length > 0 ? (
      filteredData.map((item, index) => (
        <Table.Tr key={index}>
          <Table.Td>{item.Product}</Table.Td>
          <Table.Td>{item.Planthoogte}</Table.Td>
          <Table.Td>{item.Aantal}</Table.Td>
          <Table.Td w={80}>
            <NumberInput
              w={80}
              allowDecimal={false}
              min={0}
              value={item.UserAantal}
              onChange={(value) => handleInputChange(index, Number(value))}
            />
          </Table.Td>
        </Table.Tr>
      ))
    ) : (
      <Table.Tr>
        <Table.Td colSpan={4}>Geen resultaten gevonden</Table.Td>
      </Table.Tr>
    );

  return (
    <>
      {/* Desktop / tablet version */}
      <div className={styles.desktopContainer}>
        <Container size="responsive" className={styles.main}>
          <h1>Sortiment</h1>
          <TextInput
            placeholder="Zoek product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb="md"
          />

          <ScrollArea className={styles.tableScrollArea}>
            <Table highlightOnHover withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{header[1]}</Table.Th>
                  <Table.Th>{header[2]}</Table.Th>
                  <Table.Th>{header[0]}</Table.Th>
                  <Table.Th>Bestelling</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{renderRows()}</Table.Tbody>
            </Table>
          </ScrollArea>

          <Flex justify="flex-end" w="100%" pt={10}>
            <Button onClick={sendEmail}>Bestelling Verzenden</Button>
          </Flex>
        </Container>
      </div>

      {/* Mobile version: full-width */}
      <div className={styles.mobileContainer}>
        <div className={styles.fullWidthContainer}>
          <div style={{ paddingLeft: 10, paddingRight: 10 }}>
            <h1>Sortiment</h1>
            <TextInput
              placeholder="Zoek product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              mb="md"
            />
          </div>

          <ScrollArea className={styles.tableScrollArea}>
            <Table highlightOnHover withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{header[1]}</Table.Th>
                  <Table.Th>{header[2]}</Table.Th>
                  <Table.Th>{header[0]}</Table.Th>
                  <Table.Th>Bestelling</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{renderRows()}</Table.Tbody>
            </Table>
          </ScrollArea>

          <Flex justify="flex-end" w="100%" pt={10} pb={150} style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Button onClick={sendEmail}>Bestelling Verzenden</Button>
          </Flex>
        </div>
      </div>
    </>
  );
}

export default function VoorraadLijst() {
  return (
    <Suspense fallback={<p>Voorraadlijst laden...</p>}>
      <VoorraadLijstContent />
    </Suspense>
  );
}