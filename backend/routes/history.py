from fastapi import APIRouter
import os
import json

router = APIRouter()

HISTORY_FILE = "history.json"


@router.get("/history")
def get_history():

    if not os.path.exists(HISTORY_FILE):
        return []

    with open(HISTORY_FILE, "r", encoding="utf-8") as f:
        return json.load(f)[::-1]

from fastapi import HTTPException


@router.delete("/history/{index}")
def delete_history(index: int):

    if not os.path.exists(HISTORY_FILE):
        raise HTTPException(status_code=404, detail="History not found")

    with open(HISTORY_FILE, "r", encoding="utf-8") as f:
        history = json.load(f)

    history.reverse()

    if index >= len(history):
        raise HTTPException(status_code=404, detail="Invalid index")

    history.pop(index)

    history.reverse()

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=4)

    return {"message": "Deleted"}    

@router.delete("/history")
def clear_history():

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump([], f, indent=4)

    return {
        "message": "History Cleared"
    }