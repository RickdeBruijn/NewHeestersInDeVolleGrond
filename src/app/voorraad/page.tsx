import { useState, useEffect, Suspense } from 'react';
import {
  Table,
  ScrollArea,
  Button,
  Flex,
  TextInput,
  Container,
  useMantineTheme,
} from '@mantine/core';
import Fuse from 'fuse.js';
import styles from './page.module.scss';
import { useMediaQuery } from '@mantine/hooks';
import QuantityInput from '../../components/quantityInput/quantityinput';

export type TableRow = {
  Product: string;
  Planthoogte: string;
  Aantal: string | number;
  UserAantal: number;
};

function VoorraadLijstContent() {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [filteredData, setFilteredData] = useState<TableRow[]>([]);
  const [fuse, setFuse] = useState<Fuse<TableRow> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  // Fetch data from PHP endpoint
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}scripts/getVoorraadlijst.php`)
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          // Map rows to TableRow and set initial table and filtered data
          const rows: TableRow[] = res.map((r: any) => ({
            Product: r.Product ?? '',
            Planthoogte: r.Planthoogte ?? '',
            Aantal: r.Aantal ?? 0,
            UserAantal: 0,
          }));

          setTableData(rows);
          setFilteredData(rows);

          // Setup Fuse.js for search
          setFuse(new Fuse(rows, { keys: ['Product', 'Planthoogte'] }));
        }
      })
      .catch((err) => {
        console.error('Error fetching voorraadlijst:', err);
      });
  }, []);

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), 200);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Apply search filter
  useEffect(() => {
    if (!fuse) return;

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

  // Send email (placeholder for now)
  const sendEmail = async () => {
    alert("WIP needs to be implemented");
    // const selectedOrders = filteredData.filter((item) => item.UserAantal! > 0);
    // if (selectedOrders.length === 0) return alert('Geen producten geselecteerd!');

    // try {
    //   const response = await fetch('/send_mail.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ orders: selectedOrders }),
    //   });

    //   const result = await response.json();

    //   if (response.ok) alert('Bestelling succesvol verzonden!');
    //   else alert(`Fout bij verzenden: ${result.message}`);
    // } catch (error) {
    //   console.error(error);
    //   alert('Fout bij het verzenden van de bestelling');
    // }
  };

  // Render table rows
  const renderRows = () =>
    filteredData.length > 0 ? (
      filteredData.map((item, index) => (
        <Table.Tr key={index}>
          <Table.Td>{item.Product}</Table.Td>
          <Table.Td>{item.Planthoogte}</Table.Td>
          <Table.Td>{item.Aantal}</Table.Td>
          <Table.Td w={isMobile ? 100 : 180}>
            {isMobile ? (
              <input
                style={{ width: "100%", textAlign: "center", fontSize: 16 }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={item.UserAantal === 0 ? "" : item.UserAantal}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  handleInputChange(index, Number(val || 0));
                }}
                placeholder="0"
                autoComplete="off" 
              />
            ) : (
              <QuantityInput
                value={item.UserAantal}
                onChange={(val) => handleInputChange(index, val)}
              />
            )}
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
                  <Table.Th>Product</Table.Th>
                  <Table.Th>Planthoogte</Table.Th>
                  <Table.Th>Aantal</Table.Th>
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
                  <Table.Th>Product</Table.Th>
                  <Table.Th>Planthoogte</Table.Th>
                  <Table.Th>Aantal</Table.Th>
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