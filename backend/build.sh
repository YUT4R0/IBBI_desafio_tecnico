#!/bin/bash
npm install
npx prisma generate
npx tsc
mkdir -p build/prisma 
cp -r prisma/dev.db build/prisma/