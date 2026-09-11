$ErrorActionPreference = 'SilentlyContinue'

# Write body to file to avoid PowerShell interpolation
$bodyJson = @"
{"email":"muhammadtahafarooq22@gmail.com","password":"T6a6ha6$$"}
"@
$bodyJson | Out-File -FilePath "D:\Projects\[protfolio]\body.json" -Encoding ascii -NoNewline

# Login
$loginResp = curl.exe -s -c "D:\Projects\[protfolio]\cf_cookies.txt" -X POST "https://portfolio-d94.pages.dev/api/auth/login" -H "Content-Type: application/json" -d "@D:\Projects\[protfolio]\body.json"
Write-Host "Login: $loginResp"

# Test profile page
$profileResp = curl.exe -s -b "D:\Projects\[protfolio]\cf_cookies.txt" "https://portfolio-d94.pages.dev/admin/profile"
Write-Host "Profile length: $($profileResp.Length)"
if ($profileResp -match 'image-upload') { Write-Host "FOUND: ImageUpload" } else { Write-Host "NOT FOUND: ImageUpload" }
if ($profileResp -match 'Drop image') { Write-Host "FOUND: Drop image text" } else { Write-Host "NOT FOUND: Drop image text" }
if ($profileResp -match 'Profile') { Write-Host "FOUND: Profile page" } else { Write-Host "NOT FOUND: Profile page" }
