#!/usr/bin/env python3
"""
GoSkill — CLI Search Entry Point

Usage:
    # Domain search
    python3 search.py "functional options config" --domain pattern
    python3 search.py "web api authentication" --domain package
    python3 search.py "goroutine channel pipeline" --domain concurrency

    # Stack search
    python3 search.py "middleware authentication" --stack web-gin
    python3 search.py "cobra subcommands" --stack cli

    # Auto-detect domain
    python3 search.py "goroutine leak detection"

    # Architecture system
    python3 search.py "rest api with postgres auth" --arch-system -p "MyAPI"
    python3 search.py "cli tool config management" --arch-system --persist -p "MyCLI"

    # Options
    -n, --max-results    Max results (default: 5)
    -p, --project        Project name for arch-system
    --format             Output format: text, markdown (default: text)
    --persist            Save architecture to file
    --page               Page number for multi-page persist
    --output-dir         Directory for persisted files
"""

import argparse
import sys
import os

# Add scripts directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core import (
    search_domain, search_stack, detect_domain,
    format_results, multi_domain_search, CSV_CONFIG, STACK_CONFIG
)
from arch_system import generate_arch_system


def main():
    parser = argparse.ArgumentParser(
        description="GoSkill - Search Go best practices, patterns, and architecture",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 search.py "functional options" --domain pattern
  python3 search.py "web framework" --domain package
  python3 search.py "goroutine leak" --domain concurrency
  python3 search.py "middleware auth" --stack web-gin
  python3 search.py "rest api postgres" --arch-system -p "MyAPI"
        """
    )

    parser.add_argument("query", help="Search query")
    parser.add_argument("--domain", "-d", choices=list(CSV_CONFIG.keys()),
                        help="Search domain (auto-detected if not specified)")
    parser.add_argument("--stack", "-s", choices=list(STACK_CONFIG.keys()),
                        help="Search stack-specific guidelines")
    parser.add_argument("--arch-system", action="store_true",
                        help="Generate architecture system recommendation")
    parser.add_argument("--max-results", "-n", type=int, default=5,
                        help="Maximum number of results (default: 5)")
    parser.add_argument("--project", "-p", default="MyProject",
                        help="Project name for architecture system")
    parser.add_argument("--format", "-f", choices=["text", "markdown"], default="text",
                        help="Output format (default: text)")
    parser.add_argument("--persist", action="store_true",
                        help="Save architecture to file")
    parser.add_argument("--page", type=int, default=1,
                        help="Page number for multi-page persist")
    parser.add_argument("--output-dir", "-o", default=None,
                        help="Output directory for persisted files")

    args = parser.parse_args()

    # Architecture System mode
    if args.arch_system:
        fmt = "markdown" if args.persist or args.format == "markdown" else "box"
        output, saved_path = generate_arch_system(
            query=args.query,
            project_name=args.project,
            format_type=fmt,
            persist=args.persist,
            page=args.page,
            output_dir=args.output_dir
        )
        print(output)
        if saved_path:
            print(f"\nSaved to: {saved_path}")
        return

    # Stack search mode
    if args.stack:
        results = search_stack(args.query, args.stack, max_results=args.max_results)
        if results:
            output = format_results(results, domain=f"stack:{args.stack}", format_type=args.format)
            print(output)
        else:
            print(f"No results found in stack '{args.stack}' for query: {args.query}")
        return

    # Domain search mode
    domain = args.domain
    if not domain:
        domain = detect_domain(args.query)
        if domain:
            print(f"[Auto-detected domain: {domain}]")
            print()
        else:
            # Search across all domains
            print("[No specific domain detected, searching all domains...]")
            print()
            all_results = multi_domain_search(args.query, max_results=args.max_results)
            if all_results:
                for d, results in all_results.items():
                    output = format_results(results, domain=d, format_type=args.format)
                    print(output)
                    print()
            else:
                print(f"No results found for query: {args.query}")
            return

    results = search_domain(args.query, domain, max_results=args.max_results)
    if results:
        output = format_results(results, domain=domain, format_type=args.format)
        print(output)
    else:
        print(f"No results found in domain '{domain}' for query: {args.query}")


if __name__ == "__main__":
    main()
