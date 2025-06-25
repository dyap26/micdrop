import os
import json

STATE_DIR = "state"

def _load_set(name):
    path = os.path.join(STATE_DIR, f"{name}.json")
    if not os.path.exists(path):
        return set()
    with open(path, "r") as f:
        return set(json.load(f))

def _save_set(name, s):
    path = os.path.join(STATE_DIR, f"{name}.json")
    with open(path, "w") as f:
        json.dump(list(s), f)

def get_seen_ids():
    return _load_set("artists"), _load_set("albums")

def add_to_seen(set_name, item_id):
    seen = _load_set(set_name)
    seen.add(item_id)
    _save_set(set_name, seen)
