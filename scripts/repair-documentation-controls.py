from pathlib import Path
import argparse
import hashlib
import re
import subprocess
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
REGISTER_GENERATOR = ROOT / "scripts" / "update-documentation-register.py"
REPORT = ROOT / "DOCUMENTATION_CONTROL_REMEDIATION_REPORT.md"

CATEGORY_MAP = {
    "architecture": ("Architecture", "ARCH"),
    "decisions": ("Architecture", "DEC"),
    "design": ("Design", "DES"),
    "governance": ("Governance", "GOV"),
    "identity-access": ("Security", "SEC"),
    "implementation": ("Implementation", "IMP"),
    "operations": ("Operations", "OPS"),
    "product": ("Product requirements", "PRD"),
    "stores": ("User guidance", "USR"),
}

FIELDS = [
    ("Document ID", ("documentid", "documentidentifier")),
    ("Category", ("category", "documentcategory")),
    ("Version", ("version", "documentversion")),
    ("Status", ("status", "documentstatus", "lifecyclestatus")),
    ("Document Owner", ("documentowner", "owner")),
    ("Approving Authority", ("approvingauthority",)),
    ("Creation Date", ("creationdate", "createddate", "datecreated")),
    ("Last Revision Date", (
        "lastrevisiondate", "lastrevised", "lastupdated"
    )),
    ("Effective Date", ("effectivedate",)),
    ("Review Date", ("reviewdate", "nextreviewdate")),
]

ALIASES = {
    "approvingauthority": (
        "approvingauthority", "approvalauthority"
    ),
}

def normalise(value):
    return re.sub(r"[^a-z0-9]", "", value.lower())

def git_date(path, first=False):
    path = Path(path)
    args = ["git", "log", "--follow", "--format=%as"]
    if first:
        args += ["--diff-filter=A"]
    args += ["--", path.as_posix()]

    try:
        result = subprocess.run(
            args,
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=True,
        )
        dates = [x.strip() for x in result.stdout.splitlines() if x.strip()]
        if not dates:
            return "Not recorded"
        return dates[-1] if first else dates[0]
    except (subprocess.CalledProcessError, FileNotFoundError):
        return "Not recorded"

def read_metadata(lines):
    metadata = {}

    for line in lines[:120]:
        bold = re.match(r"^\*\*([^*]+):\*\*\s*(.*)$", line)
        if bold:
            metadata[normalise(bold.group(1))] = bold.group(2).strip()

    table = find_control_table(lines)
    if table:
        start, end = table
        for line in lines[start + 2:end]:
            if not line.startswith("|"):
                continue

            cells = [cell.strip() for cell in line.strip("|").split("|")]
            if len(cells) >= 2 and cells[0] and cells[1]:
                metadata[normalise(cells[0])] = cells[1]

    return metadata


def existing_value(metadata, aliases):
    for alias in aliases:
        value = metadata.get(normalise(alias))
        if value:
            return value
    return None

def find_control_table(lines):
    heading_index = None

    for i, line in enumerate(lines[:100]):
        if re.match(r"^#{1,3}\s+Document Control\s*$", line, re.I):
            heading_index = i
            break

    if heading_index is None:
        return None

    search_end = min(len(lines), heading_index + 35)

    for i in range(heading_index + 1, search_end):
        if not lines[i].startswith("|"):
            continue

        cells = [cell.strip().lower() for cell in lines[i].strip("|").split("|")]
        if len(cells) >= 2 and cells[0] == "field" and cells[1] == "value":
            end = i + 1
            while end < len(lines) and lines[end].startswith("|"):
                end += 1
            return i, end

    return None


def make_document_id(path):
    folder = path.parent.name.lower()
    prefix = CATEGORY_MAP.get(folder, ("Reference", "REF"))[1]
    digest = hashlib.sha256(
        path.relative_to(ROOT).as_posix().encode()
    ).hexdigest()[:10].upper()
    return f"DOC-{prefix}-{digest}"

def repair_document(path, apply=False):
    original = path.read_text(encoding="utf-8")
    lines = original.splitlines()
    metadata = read_metadata(lines)

    folder = path.parent.name.lower()
    category = CATEGORY_MAP.get(
        folder, ("Reference", "REF")
    )[0]

    relative = path.relative_to(ROOT).as_posix()

    values = {
        "Document ID": make_document_id(path),
        "Category": category,
        "Version": "Not recorded",
        "Status": "Not recorded",
        "Document Owner": "Not recorded",
        "Approving Authority": "Not recorded",
        "Creation Date": "Not recorded",
        "Last Revision Date": "Not recorded",
        "Effective Date": "Not recorded",
        "Review Date": "Not recorded",
    }

    missing = []

    for label, aliases in FIELDS:
        aliases = ALIASES.get(normalise(label), aliases)
        if not existing_value(metadata, aliases):
            missing.append((label, values[label]))

    if not missing:
        return False, []

    table = find_control_table(lines)

    if table:
        _, end = table
        additions = [
            f"| {label} | {value} |"
            for label, value in missing
        ]
        lines[end:end] = additions
    else:
        heading_index = next(
            (
                i for i, line in enumerate(lines)
                if line.startswith("# ")
            ),
            None
        )

        if heading_index is None:
            raise ValueError(f"No H1 heading found: {relative}")

        section = [
            "",
            "## Document Control",
            "",
            "| Field | Value |",
            "|---|---|",
        ]
        section += [
            f"| {label} | {value} |"
            for label, value in missing
        ]
        section.append("")
        lines[heading_index + 1:heading_index + 1] = section

    updated = "\n".join(lines).rstrip() + "\n"
    if apply:
        path.write_text(updated, encoding="utf-8")

    return True, missing

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Apply document-control changes."
    )
    args = parser.parse_args()

    documents = sorted(DOCS.rglob("*.md"))

    changed = []
    missing_summary = Counter()
    errors = []

    for path in documents:
        try:
            was_changed, missing = repair_document(path, apply=args.apply)

            if was_changed:
                changed.append(path.relative_to(ROOT).as_posix())

            for field, value in missing:
                if value == "Not recorded":
                    missing_summary[field] += 1

        except Exception as exc:
            errors.append(f"{path.relative_to(ROOT)}: {exc}")

    if not args.apply:
        print("DRY RUN ONLY. No files were changed.")
        print(f"Documents scanned: {len(documents)}")
        print(f"Documents requiring changes: {len(changed)}")
        print(f"Documents with errors: {len(errors)}")

        print("\nFields requiring human verification:")
        for field, count in sorted(missing_summary.items()):
            print(f"  {field}: {count}")

        if errors:
            print("\nErrors:")
            for error in errors:
                print(f"  {error}")

        print("\nRun with --apply to make the changes.")
        return


    report = [
        "# Documentation Control Remediation Report",
        "",
        f"**Documents scanned:** {len(documents)}",
        f"**Documents modified:** {len(changed)}",
        "",
        "## Changes",
        "",
        "Missing document-control fields were added without replacing "
        "existing metadata.",
        "",
        "Document IDs are generated once from repository paths and then "
        "preserved in the documents. They must not be regenerated after "
        "being assigned.",
        "",
        "Creation and last revision dates are not inferred from Git history. ""Unverified dates remain Not recorded.",
        "",
        "Existing statuses and approval decisions were not changed.",
        "",
        "## Fields Requiring Human Verification",
        "",
    ]

    if missing_summary:
        for field, count in sorted(missing_summary.items()):
            report.append(
                f"- **{field}:** {count} document(s) still have "
                "`Not recorded`."
            )
    else:
        report.append("No missing factual metadata was detected.")

    report += [
        "",
        "## Modified Documents",
        "",
    ]

    report += [f"- `{item}`" for item in changed] or ["None"]

    report += [
        "",
        "## Errors",
        "",
    ]

    report += [f"- {item}" for item in errors] or ["None"]

    REPORT.write_text("\n".join(report) + "\n", encoding="utf-8")

    if not errors:
        subprocess.run(
            ["python", str(REGISTER_GENERATOR)],
            cwd=ROOT,
            check=True
        )
    else:
        print(
            "Register generation skipped because document errors "
            "must be resolved first."
        )

    print("\nDocumentation remediation completed.")
    print(f"Documents scanned: {len(documents)}")
    print(f"Documents modified: {len(changed)}")
    print(f"Errors: {len(errors)}")
    print(f"Report: {REPORT.relative_to(ROOT)}")

if __name__ == "__main__":
    main()
