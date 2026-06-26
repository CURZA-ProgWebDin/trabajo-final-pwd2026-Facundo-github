FROM python:3.11-slim


WORKDIR /code

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


COPY . .


ENV FLASK_APP=/app/run.py

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=5000", "--reload"]