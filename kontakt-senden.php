<?php
// Automatisch erzeugt aus src/pages/kontakt-senden.php.ts – hier nicht bearbeiten.
declare(strict_types=1);

const RECIPIENT = 'info@webagentur-wuethrich.com';
const SENDER = 'info@webagentur-wuethrich.com';
const SITE_NAME = 'Webagentur Wüthrich';
const PHONE = '+41 76 426 61 44';
const SUCCESS_URL = '/danke/';
const ERROR_URL = '/fehler/';
const MIN_SECONDS = 3;
const MAX_LINKS = 3;
const RATE_LIMIT = 5;

header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');

$wantsJson = strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond(bool $ok, string $message, int $status = 200): void
{
    global $wantsJson;
    http_response_code($status);
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: ' . ($ok ? SUCCESS_URL : ERROR_URL), true, 303);
    }
    exit;
}

function field(string $name, int $max): string
{
    $value = isset($_POST[$name]) && is_string($_POST[$name]) ? trim($_POST[$name]) : '';
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $max, 'UTF-8');
    }
    return substr($value, 0, $max);
}

function oneLine(string $value): string
{
    // Zeilenumbrüche und Steuerzeichen entfernen (Schutz vor Header-Injection)
    return trim((string) preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value));
}

function encodeHeader(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /#kontakt', true, 303);
    exit;
}

// Anfragen von fremden Websites ablehnen
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $parts = parse_url($origin) ?: [];
    $originHost = strtolower(($parts['host'] ?? '') . (isset($parts['port']) ? ':' . $parts['port'] : ''));
    if ($originHost !== strtolower($_SERVER['HTTP_HOST'] ?? '')) {
        respond(false, 'Ungültige Anfrage.', 403);
    }
}

// Honeypot ausgefüllt oder zu schnell abgeschickt → vermutlich Bot: still «erfolgreich»
if (field('website', 200) !== '') {
    respond(true, 'Vielen Dank.');
}
$ts = field('ts', 20);
if ($ts !== '' && ctype_digit($ts) && (microtime(true) * 1000 - (float) $ts) < MIN_SECONDS * 1000) {
    respond(true, 'Vielen Dank.');
}

if (RECIPIENT === '') {
    respond(false, 'Das Formular ist noch nicht aktiv. Bitte rufen Sie an: ' . PHONE, 503);
}

$name = oneLine(field('name', 120));
$company = oneLine(field('company', 120));
$email = oneLine(field('email', 160));
$phone = oneLine(field('phone', 40));
$topic = oneLine(field('topic', 80));
$message = str_replace("\r\n", "\n", field('message', 4000));

$errors = [];
if ($name === '') {
    $errors[] = 'Bitte geben Sie Ihren Namen ein.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
}
if ($phone !== '' && !preg_match('/^[0-9+()\/.\s-]{6,40}$/', $phone)) {
    $errors[] = 'Bitte prüfen Sie die Telefonnummer.';
}
if ((function_exists('mb_strlen') ? mb_strlen($message, 'UTF-8') : strlen($message)) < 10) {
    $errors[] = 'Bitte beschreiben Sie Ihr Anliegen kurz (mindestens 10 Zeichen).';
}
if (preg_match_all('#https?://|www\.#i', $message) > MAX_LINKS) {
    $errors[] = 'Ihre Nachricht enthält zu viele Links.';
}
if ($errors) {
    respond(false, implode(' ', $errors), 422);
}

// Einfache Begrenzung: höchstens RATE_LIMIT Anfragen pro Stunde und IP-Adresse
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unbekannt';
$file = rtrim(sys_get_temp_dir(), '/') . '/kontakt_' . hash('sha256', $ip . SITE_NAME) . '.json';
$now = time();
$hits = [];
if (is_readable($file)) {
    $hits = json_decode((string) file_get_contents($file), true) ?: [];
}
$hits = array_values(array_filter($hits, function ($t) use ($now) {
    return is_int($t) && $t > $now - 3600;
}));
if (count($hits) >= RATE_LIMIT) {
    respond(false, 'Zu viele Anfragen. Bitte versuchen Sie es später erneut oder rufen Sie an: ' . PHONE, 429);
}
$hits[] = $now;
@file_put_contents($file, json_encode($hits), LOCK_EX);

$subject = 'Neue Anfrage über die Website – ' . $name;
$body = "Neue Anfrage über das Kontaktformular von " . SITE_NAME . "\n"
    . str_repeat('-', 48) . "\n"
    . "Name:      " . $name . "\n"
    . "Firma:     " . ($company !== '' ? $company : '–') . "\n"
    . "E-Mail:    " . $email . "\n"
    . "Telefon:   " . ($phone !== '' ? $phone : '–') . "\n"
    . "Interesse: " . ($topic !== '' ? $topic : '–') . "\n"
    . str_repeat('-', 48) . "\n\n"
    . $message . "\n";

$headers = [
    'From: ' . encodeHeader(SITE_NAME) . ' <' . SENDER . '>',
    'Reply-To: ' . encodeHeader($name) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = mail(RECIPIENT, encodeHeader($subject), $body, implode("\r\n", $headers), '-f' . SENDER);

if (!$sent) {
    respond(false, 'Leider konnte die Nachricht nicht gesendet werden. Bitte rufen Sie an: ' . PHONE, 500);
}

respond(true, 'Vielen Dank! Ihre Anfrage ist eingegangen.');
