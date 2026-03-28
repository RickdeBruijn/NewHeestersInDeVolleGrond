<?php
header('Content-Type: application/json');

// Show errors for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Include SimpleXLS
require_once __DIR__ . '/SimpleXLS.php';

$xlsFile = __DIR__ . '/../private_data/voorraadlijst.xls';

// Check if file exists
if (!file_exists($xlsFile)) {
    http_response_code(404);
    echo json_encode(['error' => 'Data file not found']);
    exit;
}

try {
    // Use the fully qualified class name with namespace
    $xls = \Shuchkin\SimpleXLS::parse($xlsFile);

    if (!$xls) {
        throw new Exception(\Shuchkin\SimpleXLS::parseError());
    }

    // Get rows from the sheet
    $allRows = $xls->rows();

    // Initialize table data
    $tableData = [];

    // Loop through rows starting from row 11 (index 10)
    for ($i = 10; $i < count($allRows); $i++) {
        $row = $allRows[$i];

        // Skip empty rows (if the Product column is empty)
        if (empty($row[1]) || empty($row[0])) {
            continue; // Skip empty row
        }

        // Add the row data directly without processing
        $tableData[] = [
            'Product' => isset($row[1]) ? trim($row[1]) : '',
            'Planthoogte' => isset($row[2]) ? trim($row[2]) : '',
            'Aantal' => isset($row[0]) ? (int)$row[0] : 0
        ];
    }

    // Final output
    echo json_encode($tableData);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>