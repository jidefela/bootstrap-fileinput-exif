<?php

$uploads_dir = "../uploads";

header("Content-Type: text/plain");

if ($_FILES["file"]["error"] != UPLOAD_ERR_OK) {
    http_response_code(400);
    echo "File upload failed";
    exit;
}

if (!file_exists($uploads_dir)) mkdir($uploads_dir);

$tmp_name = $_FILES["file"]["tmp_name"];
$name = $_FILES["file"]["name"];
move_uploaded_file($tmp_name, "$uploads_dir/$name");

echo "$uploads_dir/$name";
