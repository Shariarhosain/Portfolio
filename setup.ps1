# Portfolio Website Setup Script
# Run this script to install all dependencies and start the development server

Write-Host "🚀 Starting Portfolio Website Setup..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "🎨 Portfolio Website is ready!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Update your personal information in src/data/portfolio.js" -ForegroundColor White
    Write-Host "2. Add your projects in src/components/Projects.jsx" -ForegroundColor White
    Write-Host "3. Customize colors in tailwind.config.js" -ForegroundColor White
    Write-Host ""
    Write-Host "To start the development server, run:" -ForegroundColor Yellow
    Write-Host "npm start" -ForegroundColor Green
    Write-Host ""
    
    $response = Read-Host "Do you want to start the development server now? (Y/N)"
    if ($response -eq 'Y' -or $response -eq 'y') {
        Write-Host ""
        Write-Host "🌟 Starting development server..." -ForegroundColor Cyan
        npm start
    }
} else {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    Write-Host "Please check the error messages above and try again." -ForegroundColor Yellow
}
