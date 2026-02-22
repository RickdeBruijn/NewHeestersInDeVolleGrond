<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "bestelling@bedrijf.com"; // Change to your email
    $subject = "Nieuwe Bestelling";

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || empty($data['orders'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Geen data ontvangen"]);
        exit;
    }

    // Construct email message
    $message = "Nieuwe bestelling:\n\n";
    foreach ($data['orders'] as $order) {
        $message .= "Product: " . htmlspecialchars($order['Product']) . "\n";
        $message .= "Hoogte: " . htmlspecialchars($order['Planthoogte']) . "\n";
        $message .= "Aantal: " . intval($order['UserAantal']) . "\n\n";
    }

    // Email headers
    $headers = "From: webshop@bedrijf.com\r\n"; // Change to your sender email
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Bestelling verzonden"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Fout bij het verzenden van de e-mail"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Ongeldige aanvraag"]);
}
?>
