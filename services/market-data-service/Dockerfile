FROM python:3.11-slim

WORKDIR /app

RUN useradd -m corei

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

USER corei

CMD ["python", "app/main.py"]
