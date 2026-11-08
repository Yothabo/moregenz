from pathlib import Path
import hashlib
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
REGISTER = DOCS / "governance" / "PLATFORM_DOCUMENTATION_REGISTER_AND_IMPLEMENTATION_DEPENDENCY_MAP.md"

START = "<!-- BEGIN GENERATED DOCUMENT REGISTER -->"
END = "<!-- END GENERATED DOCUMENT REGISTER -->"

def normalise(value):
    return re.sub(r"[^a-z0-9]", "", value.lower())

def extract_metadata(path):
    lines = path.read_text(encoding="utf-8").splitlines()
    metadata = {}

    for line in lines[:120]:
        table = re.match(r"^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|", line)
        if table:
            metadata[normalise(table.group(1))] = table.group(2).strip()

        bold = re.match(r"^\*\*([^*]+):\*\*\s*(.*)$", line)
        if bold:
            metadata[normalise(bold.group(1))] = bold.group(2).strip()

    def get(*keys):
        for key in keys:
            value = metadata.get(normalise(key))
            if value:
                return value
        return "Not recorded"

    title = next(
        (line.lstrip("#").strip() for line in lines if line.startswith("# ")),
        path.stem.replace("_", " ").title()
    )

    return {
        "title": title,
        "document_id": get("Document ID", "Document Identifier"),
        "owner": get("Document Owner", "Owner"),
        "version": get("Version", "Document Version"),
        "status": get("Document Status", "Status", "Lifecycle Status"),
        "effective": get("Effective Date"),
        "approval": get("Approval Status", "Review Status"),
        "content": "\n".join(lines),
    }

documents = sorted(DOCS.rglob("*.md"))
records = []
by_name = {}

for path in documents:
    relative = path.relative_to(ROOT).as_posix()
    metadata = extract_metadata(path)
    record = {
        "path": relative,
        "category": path.parent.name,
        **metadata,
    }
    records.append(record)
    by_name.setdefault(path.name.lower(), []).append(relative)

def related_documents(record):
    source = record["content"]
    found = set()

    for target in re.findall(r"\[[^\]]+\]\(([^)]+\.md)(?:#[^)]*)?\)", source):
        if target.startswith(("http://", "https://")):
            continue
        resolved = (ROOT / record["path"]).parent.joinpath(target.split("#")[0])
        try:
            relative = resolved.resolve().relative_to(ROOT.resolve()).as_posix()
            if relative in {item["path"] for item in records}:
                found.add(relative)
        except (ValueError, OSError):
            pass

    for filename in re.findall(r"(?<![\w/.-])([A-Za-z0-9_.-]+\.md)", source):
        matches = by_name.get(filename.lower(), [])
        if len(matches) == 1 and matches[0] != record["path"]:
            found.add(matches[0])

    return sorted(found)

def cell(value):
    return str(value).replace("|", r"\|").replace("\n", " ").strip()

rows = [
    "| Registry Ref | Document ID | Title | Category | Status | Owner | Version | Effective Date | Approval / Review | Related Documents | Repository Path |",
    "|---|---|---|---|---|---|---|---|---|---|---|",
]

for record in records:
    digest = hashlib.sha256(record["path"].encode()).hexdigest()[:10].upper()
    registry_ref = f"REG-{digest}"

    related = related_documents(record)
    related_text = (
        "<br>".join(f"`{item}`" for item in related)
        if related else "Not explicitly linked"
    )

    values = [
        registry_ref,
        record["document_id"],
        record["title"],
        record["category"],
        record["status"],
        record["owner"],
        record["version"],
        record["effective"],
        record["approval"],
        related_text,
        f"`{record['path']}`",
    ]
    rows.append("| " + " | ".join(cell(value) for value in values) + " |")

section = "\n".join([
    START,
    "## 12. Live Document Register",
    "",
    "This index is generated from the Markdown files currently present under `docs/`.",
    "",
    "Registry references are deterministic identifiers derived from repository paths. They are catalogue references, not substitutes for document IDs embedded in individual documents.",
    "",
    "`Not recorded` means the source document does not expose that metadata in its document-control section. It does not imply approval or assign an owner.",
    "",
    "Related documents are included only where identifiable through explicit Markdown references or unambiguous document filenames.",
    "",
    f"**Indexed documents:** {len(records)}",
    "",
    *rows,
    END,
])

existing = REGISTER.read_text(encoding="utf-8")

if START in existing and END in existing:
    before = existing.split(START, 1)[0].rstrip()
    after = existing.split(END, 1)[1].lstrip()
    updated = before + "\n\n" + section
    if after:
        updated += "\n\n" + after
else:
    updated = existing.rstrip() + "\n\n" + section + "\n"

REGISTER.write_text(updated, encoding="utf-8")

print(f"Documentation register generated: {len(records)} documents")
print(f"Updated: {REGISTER.relative_to(ROOT)}")
print("Existing document statuses and approval states were not changed.")
