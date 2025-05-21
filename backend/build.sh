#!/bin/bash
npm install
npx prisma generate
npx tsc
cp -r prisma build/prisma 