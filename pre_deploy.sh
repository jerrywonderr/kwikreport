# Install requirements
pip install -r requirements.txt

# Make migrations
python3.9 manage.py migrate

# Collect static
python3.9 manage.py collectstatic
