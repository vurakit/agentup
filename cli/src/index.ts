#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { Command } from "commander";
import { initCommand } from "./commands/init.js";

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8")
);

const program = new Command();

program
  .name("agentup")
  .description("AgentUp — AI skills for production-grade code (Go, Node.js, Rust, Frontend)")
  .version(pkg.version);

program
  .command("init")
  .description("Install AgentUp skills into your AI coding environment")
  .option("--platform <platform>", "Target platform: claude, cursor, windsurf, antigravity", "claude")
  .option("--lang <languages>", "Languages to install (comma-separated): go, nodejs, rust")
  .option("--no-frontend", "Skip installing the UI/UX Frontend skill")
  .option("--dir <directory>", "Target directory", ".")
  .action(initCommand);

program.parse();
