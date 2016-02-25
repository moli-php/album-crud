<?php
$scheme = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443 ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'];
$path = dirname($_SERVER['PHP_SELF']);
define('BASE_PATH', $scheme . $host . $path . '/');
?>
<!DOCTYPE html>
<html>
<head>
<link type="text/css" rel="stylesheet" href="<?php echo BASE_PATH; ?>bootstrap/css/bootstrap.min.css" />
<link type="text/css" rel="stylesheet" href="<?php echo BASE_PATH; ?>css/style.css" />

<script data-main="<?php echo BASE_PATH; ?>js/main-built.js" src="<?php echo BASE_PATH; ?>js/require.js"></script>
</head>
<body>
<div class="container">