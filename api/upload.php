<?php

$uploads_dir = "uploads";

header("Content-Type: text/plain");

if ($_FILES["file"]["error"] != UPLOAD_ERR_OK) {
    http_response_code(400);
    echo "File upload failed";
    exit;
}

if (!file_exists("../" . $uploads_dir)) mkdir("../" . $uploads_dir);

$tmp_name = $_FILES["file"]["tmp_name"];
$name = $_FILES["file"]["name"];

$size = getimagesize($tmp_name);
switch ($size[2]) {
    case IMAGETYPE_JPEG: $type = 'jpeg'; break;
    case IMAGETYPE_GIF: $type = 'gif'; break;
    case IMAGETYPE_PNG: $type = 'png'; break;
    default:
        http_response_code(400);
        echo "Invalid file type";
        exit;
}

$fn_in = 'imagecreatefrom' . $type;
$fn_out = 'image' . $type;

$dest = imagecreatetruecolor($_POST['width'], $_POST['width']);
$src = $fn_in($tmp_name);

imagecopyresampled($dest, $src,
    0, 0, $_POST['x'] * $_POST['scale'], $_POST['y'] * $_POST['scale'],
    $_POST['width'], $_POST['height'], $_POST['width'] * $_POST['scale'], $_POST['height'] * $_POST['scale']);

$fn_out($dest, "../$uploads_dir/$name");

echo "$uploads_dir/$name";
