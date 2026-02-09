from fastapi import FastAPI

app = FastAPI(
    title="{{PROJECT_NAME}}",
    description="{{PROJECT_DESCRIPTION}}",
    version="0.1.0",
)


@app.get("/")
async def root():
    return {"message": "Hello from {{PROJECT_NAME}}"}


@app.get("/health")
async def health():
    return {"status": "ok"}
