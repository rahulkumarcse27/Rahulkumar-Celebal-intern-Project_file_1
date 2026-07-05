from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router
from routes.upload import router as upload_router
from routes.dashboard import router as dashboard_router
from routes.analytics import router as analytics_router
from routes.documents import router as documents_router
from routes.history import router as history_router
app = FastAPI(title="Lumen AI Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(analytics_router)
app.include_router(upload_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)
app.include_router(documents_router)
app.include_router(chat_router)
@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Lumen AI Backend Running 🚀"
    }