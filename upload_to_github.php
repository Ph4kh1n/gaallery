<?php

// รับไฟล์ที่ถูกอัพโหลดจากผู้ใช้
$file = $_FILES['file'];

// ข้อมูลสำหรับการเชื่อมต่อกับ GitHub API
$username = 'Ph4kh1n';
$repository = 'gallery';
$token = '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';

// สร้าง URL สำหรับอัพโหลดไฟล์ไปยัง GitHub repository
$url = "https://api.github.com/repos/{$username}/{$repository}/contents/images/{$file['name']}";

// สร้างข้อมูลที่จะส่งไปยัง GitHub API
$data = array(
    'message' => 'Upload file',
    'content' => base64_encode(file_get_contents($file['tmp_name'])) // เข้ารหัสเนื้อหาของไฟล์เป็น Base64
);

// กำหนด HTTP headers
$headers = array(
    'Authorization: token ' . $token,
    'Content-Type: application/json',
    'Accept: application/vnd.github.v3+json'
);

// สร้างคำขอ HTTP POST ไปยัง GitHub API
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
$response = curl_exec($ch);
curl_close($ch);

// แปลงข้อมูลที่ได้กลับมาเป็น JSON และแสดงผลลัพธ์
$result = json_decode($response, true);
if (isset($result['content']['html_url'])) {
    echo "File uploaded successfully. You can access it <a href='{$result['content']['html_url']}' target='_blank'>here</a>.";
} else {
    echo "Failed to upload file.";
}

?>
