#!/bin/bash
# MERN Form Builder - Development Setup Script

echo "🚀 Starting MERN Form Builder..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-deps

# Start MongoDB (if not running)
echo "🍃 Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB manually."
    echo "   - Windows: Start MongoDB service"
    echo "   - Mac/Linux: sudo systemctl start mongod"
fi

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start backend:  npm run server"
echo "2. Start frontend: npm run frontend"
echo "3. Open http://localhost:3000"
echo ""
echo "Or run both together: npm run dev"
