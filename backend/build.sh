#!/bin/bash
npm install
npx prisma generate
npx tsc
mkdir -p /var/lib/render/project/volume/data
cp prisma/dev.db /var/lib/render/project/volume/data/a/