#!/bin/bash
pnpm run build
cd ~/mable/mable-new-dashboard
pnpm update @Mable-AI/hound
pnpm run dev