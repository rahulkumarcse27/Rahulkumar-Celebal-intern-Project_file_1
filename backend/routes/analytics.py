from fastapi import APIRouter
import os
from collections import defaultdict
from datetime import datetime

router = APIRouter()

UPLOAD_DIR = "uploads"


@router.get("/analytics")
def analytics():

    total_docs = 0
    storage = 0
    file_types = {}
    trend = defaultdict(int)

    if os.path.exists(UPLOAD_DIR):

        for file in os.listdir(UPLOAD_DIR):

            path = os.path.join(UPLOAD_DIR, file)

            if os.path.isfile(path):

                total_docs += 1

                storage += os.path.getsize(path)

                ext = file.split(".")[-1].upper()

                file_types[ext] = file_types.get(ext, 0) + 1

                month = datetime.fromtimestamp(
                    os.path.getctime(path)
                ).strftime("%b")

                trend[month] += 1

    storage_mb = round(storage / 1024 / 1024, 2)

    months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]

    upload_trend = []

    for m in months:
        upload_trend.append({
            "month": m,
            "uploads": trend.get(m, 0)
        })

    return {
        "documents": total_docs,
        "storage_mb": storage_mb,
        "file_types": file_types,
        "upload_trend": upload_trend,
    }