#!/bin/bash
set -e

echo "Building VeryBudget web application..."
cd web
npm install
npm run build
echo "Build completed successfully!"