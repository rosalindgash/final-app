# Django Backend Project

This is a Django-based backend project template with a modern setup including REST framework, testing, and code quality tools.

## Features

- Django 5.0.2
- Django REST Framework
- PostgreSQL database support
- CORS headers configuration
- Testing setup with pytest
- Code formatting with black and isort
- Linting with flake8

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Linux/Mac
# or
.\venv\Scripts\activate  # On Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with your environment variables:
```
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

## Development

- Run tests: `pytest`
- Format code: `black .`
- Sort imports: `isort .`
- Lint code: `flake8`

## Project Structure

```
backend/
├── manage.py
├── requirements.txt
├── .env
├── .gitignore
├── core/                 # Main project settings
│   ├── settings/
│   │   ├── base.py
│   │   ├── local.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
└── apps/                # Application modules
    └── api/            # API application
        ├── urls.py
        └── views.py
``` 