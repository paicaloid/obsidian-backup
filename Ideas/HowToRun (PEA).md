## Prerequisite
- check **.env** (it should already set)
```
INPUT_DIR="data_a"

BASE_TARGET_DIR="s3://images/cross_default_images"
BASE_TARGET_DIR_REVERSE="s3://images/reserve_default_images"

PROJECT_DATABASE_URL=

PATH_ADAPTER_S3_ACCESS_KEY_ID=
PATH_ADAPTER_S3_SECRET_ACCESS_KEY=
PATH_ADAPTER_S3_ENDPOINT_URL=
PATH_ADAPTER_S3_INSECURE=1

INCIDENT_DATABASE_URL=

SIMULATE_UI=1
MIN_TIME_SECOND=10
MAX_TIME_SECOND=30
PROGRESS_BAR_MODE=smooth

```

- set env var
```
set -a
source .env
set +a
```

- check connection **(WARN S3 (default): SSLError is OK)**
```
uv run script_check_connectivity.py

OK PROJECT_DATABASE_URL 
OK INCIDENT_DATABASE_URL 
WARN S3 (default): SSLError: SSL validation failed for https://storage-02.pea.eagle.neopolis.com:8333/ [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010)
```

## Push data — `run_interactive.py`

Interactive menu: read Excel, convert, upload images, push to MongoDB (plus delete / incident / gallery).

```
uv run run_interactive.py
```

Steps (arrow keys ↑/↓, Enter to select, q to quit):
1. **Select mode**
   - `Process Detection` — read Excel, convert, upload images, push to MongoDB (main insert)
   - `Delete` — clear MongoDB records by camera (from workbook)
   - `Push incident` — replay incident rows to MongoDB, paced by speed
   - `Delete incident` — clear incident records by camera + watchlist type
   - `Upload gallery` — push `suspect_person/S*.jpg` to S3
2. **Select type** — `vehicle` (2.2.x) / `person` (2.3.x) / `object` (2.4.x)
3. **Select worksheet** — one tab, or `ALL (full run)`
4. **Select run datetime** — `parameter.json` (default) / `Override` (type date+time) / `Now`
   - Push incident also asks: **replay speed** (`x10000`/`x100`/`x1`/manual) and **Notify?**
5. Review printed command, confirm `Proceed? [y/N]` → `y`

Notes:
- Dataset dir comes from `INPUT_DIR` in `.env` (default `data_a`).
- `SIMULATE_UI=1` shows fake detection progress bars; real output only printed on failure.

## Export CSV — `script_export_csv.py`

Export one workbook tab's MongoDB records to CSV (Thai preset headers, optional image download).

**Interactive:**
```
uv run script_export_csv.py
```
Steps: select type → worksheet (or `ALL`) → preset (`thai_a`/`thai_b`) → apply filters? → download images? → confirm. CSV lands in the preset's `save_path`.

**CLI (scripted):**
```
uv run script_export_csv.py --type person --tab 2.3.1 --preset thai_a
```
Common flags:
- `--tab` — exact worksheet name (e.g. `2.3.1`)
- `--preset thai_a|thai_b` — delivery preset from `config/exporter.json` `extra`
- `--no-filter` — skip per-tab filters
- `--download-images` — also fetch each record's image
- `--output PATH` / `--images-dir PATH` — override outputs
- `--mongo-url` / `--mongo-database` — override DB target

Output dir from `INPUT_DIR` (default `data_v2`) for source workbook; CSV path defaults to `out/TYPE_TAB.csv`.

## Wipe all — `script_wipe_all.py`

**DESTRUCTIVE.** Full wipe of the 3 real collections or S3 images by date — independent of any workbook.

```
uv run script_wipe_all.py
```
Steps:
1. **Choice [1/2]:**
   - `1` — Wipe Mongo: `customers`, `vehicle-objects`, `incident-transaction`. Shows counts, one confirm.
   - `2` — Wipe S3: prompts a date `YYYY-MM-DD`, deletes all images under `{BASE_TARGET_DIR}/{date}`.
2. Review counts, confirm `[y/N]` → `y`.

> Warning: deletes ALL documents in those collections (not camera-scoped). No undo. Verify backup / correct target DB first.

## Common errors (notes)

| Message | Cause | Fix |
|---|---|---|
| `workbook not found for <type>: <path>` | wrong `INPUT_DIR`, or dataset dir missing the `2_x_*/csv/*.xlsx` | check `.env` `INPUT_DIR`, confirm the xlsx exists |
| `worksheet '<tab>' not found ... available: ...` | tab name typo (must be exact, e.g. `2.3.1`) | copy exact name from the picker / listed available |
| `worksheet '<tab>' has no 'camera_name' column` | wrong sheet or bad header row | verify sheet has `camera_name` header |
| `worksheet '<tab>' has no camera names` | camera column empty | fill camera_name rows |
| `no routed worksheets for <type>` / `no incident-routed worksheets` | tab not mapped in `record_map.json` | add sheet to `record_map.json` raw/incident |
| `MongoDB collection not configured for <type>` | missing collection in config | set `mongodb_config.collections[type]` |
| `exporter file not found` / `has no configured type` / `has no extra preset` | bad `config/exporter.json` or wrong `--preset` | check preset name (`thai_a`/`thai_b`), file path |
| `sync file has no '<preset>' column` | preset column missing in `sync_name_export.csv` | add the column |
| `image_name has no FID token / no trailing epochs / no ... prefix` | stored image_name not in expected format | data issue — record's image_name malformed |
| `WARN S3 (default): SSLError ...` | self-signed S3 cert | expected, ignore (`PATH_ADAPTER_S3_INSECURE=1`) |
| `S3 listing failed ...` / `skip <name>: ...` on export/delete | S3 unreachable or object missing | non-fatal — Mongo op still runs; check S3 creds/endpoint |
| `Run failed (exit N)` after progress bars | real subprocess errored (SIMULATE_UI hid it) | error output printed below the bars; read it |
| Menu frozen / no arrow keys | not a real TTY (piped run) | falls back to numbered input — type the number |
| `pymongo ... ServerSelectionTimeoutError` | DB URL wrong / DB down | check `PROJECT_DATABASE_URL`, `INCIDENT_DATABASE_URL`, run `script_check_connectivity.py` |
